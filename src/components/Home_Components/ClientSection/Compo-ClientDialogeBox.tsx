import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ClientType } from "../../../types/types";
import { useDispatch } from "react-redux";
import { getClientByIdAction } from "../../../states/redux/ClientStates/selectedClientSlice";
import { AppDispatch } from "../../../states/redux/store";
import { getAllClientsByAdminIdAction } from "../../../states/redux/ClientStates/allClientSlice";
import { removeAllProjectsFromInvoiceAction } from "../../../states/redux/InvoiceProjectState/addProjectForInvoiceSlice";
import { useTheme } from "@mui/material";
import { deleteClientAction } from "../../../states/redux/ClientStates/deleteClientSlice";

function ConfirmationDialogRaw(props: {
  onClose: (newValue: string) => void;
  open: boolean;
  value: string;
  id: string; // Add the id prop here
  keepMounted: boolean;
  clients: ClientType[];
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { onClose, value: valueProp, open, clients, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
    }
  };

  const handleCancel = () => {
    onClose("");
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEditClient = (client: ClientType) => {};

  const handleDeleteClient = (clientId: string | undefined) => {
    if (clientId) {
      dispatch(deleteClientAction(clientId));
    }
  };
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Select</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="clients"
          name="clients"
          value={value}
          onChange={(e) => handleChange(e)}
        >
          {clients.map((client) => (
            <div className="flex justify-between items-center">
              <FormControlLabel
                value={client._id}
                key={client._id}
                control={<Radio />}
                label={client.clientName}
                sx={{
                  width: "50%",
                }}
              />
              <div
                className="cursor-pointer"
                onClick={() => handleEditClient(client)}
              >
                Edit
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleDeleteClient(client._id)}
              >
                Delete
              </div>
            </div>
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog({
  clientsArr,
  adminId,
}: {
  clientsArr: ClientType[];
  adminId: string | null;
}) {
  const materialTheme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    if (value.length > 0) {
      dispatch(getClientByIdAction(value));
      dispatch(removeAllProjectsFromInvoiceAction());
    }
  }, [value, dispatch]);

  React.useEffect(() => {
    if (adminId && clientsArr.length === 0) {
      dispatch(getAllClientsByAdminIdAction(adminId));
    }
  }, [adminId, dispatch]);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box>
      <List component="div" role="group">
        <ListItem onClick={handleClickListItem}>
          <Button
            sx={{
              backgroundColor: materialTheme.palette.primary.main,
              color: "white",
              padding: { sx: "3px 5px", sm: "7px 8px" },
              fontSize: { sx: "8px", sm: "14px" },
              borderRadius: "2px",
              transition: "background-color 0.3s, box-shadow 0.3s",
              "&:hover": {
                backgroundColor: materialTheme.palette.secondary.main,
              },
            }}
          >
            Select Clients
          </Button>
        </ListItem>
        <ConfirmationDialogRaw
          id="select-client-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
          clients={clientsArr}
        />
      </List>
    </Box>
  );
}
