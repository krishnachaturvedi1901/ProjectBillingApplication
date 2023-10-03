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

function ConfirmationDialogRaw(props: {
  onClose: (newValue: number) => void;
  open: boolean;
  value: number;
  id: string; // Add the id prop here
  keepMounted: boolean;
  clients: ClientType[];
}) {
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
    onClose(0);
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
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
            <FormControlLabel
              value={client.id}
              key={client.id}
              control={<Radio />}
              label={client.clientName}
            />
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
}: {
  clientsArr: ClientType[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    if (value > 0) {
      dispatch(getClientByIdAction(value));
    }
  }, [value, dispatch]);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue: number) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box>
      <List component="div" role="group">
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="select-client-menu"
          aria-label="select clients"
          onClick={handleClickListItem}
        >
          <ListItemText primary="SELECT CLIENT" />
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
