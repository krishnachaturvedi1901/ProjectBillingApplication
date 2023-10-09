import * as React from "react";
import { Global } from "@emotion/react";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { deepPurple, grey, purple } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { useSnackbar } from "notistack";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { updateInvoiceObjectStateAction } from "../../../states/redux/InvoiceProjectState/invoiceObjectState";
const drawerBleeding = 56;
let windowWidth: number | undefined = window.innerWidth;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled("div")(({ theme }) => {
  const materialTheme = useTheme();
  return {
    height: "100%",
    backgroundColor: materialTheme.palette.secondary.main,
  };
});

const StyledBox = styled(Box)(({ theme }) => {
  const materialTheme = useTheme();
  return {
    backgroundColor: materialTheme.palette.primary.main,
  };
});

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[100] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function InvoiceDrawer(props: Props) {
  const materialTheme = useTheme();
  const adminState = useSelector((state: RootState) => state.adminState);
  const selectedClientState = useSelector(
    (state: RootState) => state.selectedClientState
  );
  const [invoiceNo, setInvoiceNo] = React.useState(0);
  const [clientSameState, setClientSameState] = React.useState(false);
  const [amountWithoutTax, setAmountWithoutTax] = React.useState(0);
  const [amountAfterTax, setAmountAfterTax] = React.useState(0);
  const [invoiceDate, setInvoiceDate] = React.useState(dayjs());
  const [dueDate, setDueDate] = React.useState(dayjs());

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { projectsForInvoice } = useSelector(
    (state: RootState) => state.projectsForInvoiceState
  );
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setInvoiceNo(+adminState.data.invoiceNo + 1);
    if (selectedClientState.data.sameState) {
      setClientSameState(selectedClientState.data.sameState);
    }
  }, [adminState, selectedClientState]);

  const handleInvoiceDateChange = (newDate: dayjs.Dayjs | null) => {
    // Update the invoiceDate state
    if (newDate) {
      setInvoiceDate(newDate);
    }
  };
  const handleDueDateChange = (newDate: dayjs.Dayjs | null) => {
    // Check if the new dueDate is before the invoiceDate
    if (!newDate) {
      return console.log("Invalid Date");
    }
    if (newDate.isBefore(invoiceDate)) {
      // Handle the case where dueDate is before invoiceDate (e.g., show an error message)
      console.error("Due date cannot be before the invoice date");
    } else {
      // Update the dueDate state and dispatch the values
      setDueDate(newDate);
      // Dispatch the updated values to your Redux store or context here
      // dispatch(updateInvoiceState({ invoiceData: value, dueDate: newDate }));
    }
  };
  console.log("Invoce and due date====================>", invoiceDate, dueDate);
  const toggleDrawer = (newOpen: boolean) => () => {
    if (projectsForInvoice && projectsForInvoice.length > 0) {
      setOpen(newOpen);
      const projectsIdArr = projectsForInvoice.map((project) => {
        return project._id;
      });
      let amountPreTax = 0;
      projectsForInvoice.map((project) => {
        if (project.amount) {
          amountPreTax += project.amount;
        }
      });
      let amountPostTax = amountPreTax + (amountPreTax * 18) / 100;
      setAmountWithoutTax(amountPreTax);
      setAmountAfterTax(amountPostTax);

      const clientId = projectsForInvoice[0].clientId;
      const adminId = projectsForInvoice[0].adminId;
      dispatch(
        updateInvoiceObjectStateAction({
          invoiceNo,
          projectsId: projectsIdArr,
          clientId,
          adminId,
          amountWithoutTax: amountPreTax,
          amountAfterTax: amountPostTax,
        })
      );
    } else {
      enqueueSnackbar("Select project to create and generate invoice.", {
        variant: "error",
      });
    }
  };

  // This is used only for the example

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: "89%",
          right: "12%",
          maxWidth: "100px",
          height: "40px",
          zIndex: 60,
          color: "white",
        }}
      >
        <Button variant="contained" onClick={toggleDrawer(true)} sx={{}}>
          Invoice
        </Button>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            bgcolor: deepPurple[700],
          }}
        >
          <Puller />
          <Typography
            sx={{ p: 2, color: purple[100], fontWeight: "semibold" }}
            variant="h6"
          >
            Fill invoice required details.
          </Typography>
          <Box
            sx={{
              width: "98%",
              borderBottom: "1px solid",
              borderColor: deepPurple[900],
              m: "auto",
            }}
          ></Box>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: { xs: "block", sm: "flex", md: "flex" },
              pt: "20px",
              px: "20px",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "270px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                pt: "10px",
              }}
            >
              {windowWidth && windowWidth > 768 ? (
                <>
                  <DemoItem label="Invoice date">
                    <DesktopDatePicker
                      defaultValue={invoiceDate}
                      onChange={(newDate) => handleInvoiceDateChange(newDate)}
                      format="DD/MM/YYYY"
                    />
                  </DemoItem>
                  <DemoItem label="Due date">
                    <DesktopDatePicker
                      defaultValue={dueDate}
                      onChange={(newDate) => handleDueDateChange(newDate)}
                      format="DD/MM/YYYY"
                    />
                  </DemoItem>
                </>
              ) : (
                <>
                  <DemoItem label="Invoice date">
                    <MobileDatePicker
                      defaultValue={invoiceDate}
                      onChange={(newDate) => handleInvoiceDateChange(newDate)}
                      format="DD/MM/YYYY"
                    />
                  </DemoItem>
                  <DemoItem label="Due date">
                    <MobileDatePicker
                      defaultValue={dueDate}
                      onChange={(newDate) => handleDueDateChange(newDate)}
                      format="DD/MM/YYYY"
                    />
                  </DemoItem>
                </>
              )}
            </Box>
            <Box
              sx={{
                minWidth: { xs: "100px", sm: "250px", md: "300px" },
                padding: "5px",
                mr: "15px",
                pb: { xs: "40px", sm: "15px" },
              }}
            >
              <p className=" text-xl md:text-2xl border-b-2 border-slate-800 border-opacity-70 mb-4 mt-4 md:mt-1 ">
                Bill Total
              </p>
              <div className="flex justify-between text-lg md:text-lg">
                Subtotal:<span>{amountWithoutTax} &#8377; </span>
              </div>
              <Box sx={{ mt: "10px" }}>
                {clientSameState ? (
                  <>
                    <div className="flex justify-between ">
                      SGST:<span>"9%"</span>
                    </div>
                    <div className="flex justify-between ">
                      CGST:<span>"9%"</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between ">
                    IGST:<span>18%</span>
                  </div>
                )}
              </Box>
              <div className="flex justify-between border-t border-slate-800 border-opacity-70 text-xl md:text-2xl mt-4">
                Amount:
                <span className=" ">{amountAfterTax} &#8377; </span>
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "space-between",
                sm: "flex-end",
                md: "flex-end",
              },
              width: { xs: "100%", sm: "100%" },
              mt: "20px",
              px: { xs: "0px", sm: "35px", md: "38px" },
              position: { xs: "fixed", sm: "static" },
              bottom: "0%",
              left: "1%",
            }}
          >
            <Button
              sx={{
                width: { xs: "50%", sm: "150px" },
                backgroundColor: deepPurple[700],
                color: purple[100],
                ":hover": {
                  backgroundColor: deepPurple[800],
                },
                padding: { sm: "10px 25px" },
                mr: { xs: "3px", sm: "35px", md: "40px" },
              }}
            >
              Download
            </Button>
            <Button
              sx={{
                width: { xs: "50%", sm: "150px" },

                backgroundColor: deepPurple[700],
                color: purple[100],
                ":hover": {
                  backgroundColor: deepPurple[800],
                },
                padding: "10px 25px",
              }}
            >
              Preview
            </Button>
          </Box>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
