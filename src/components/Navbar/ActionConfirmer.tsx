import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AiOutlineLogout } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useTheme } from "@mui/material";

export default function ActionConfirmer({
  actionTag,
  actionFunction,
  parameter,
}: {
  actionTag: string;
  actionFunction: (id: string) => void;
  parameter: string | undefined;
}) {
  const materialTheme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const executeActionFunction = () => {
    if (parameter) {
      actionFunction(parameter);
    } else {
      actionFunction("forLogout");
    }
    handleClose();
  };

  return (
    <div>
      {actionTag === "Logout" ? (
        <Button onClick={handleClickOpen}>
          <AiOutlineLogout size={20} />
        </Button>
      ) : null}
      {actionTag === "Delete" ? (
        <Button onClick={handleClickOpen}>
          <RiDeleteBin7Line
            color={materialTheme.palette.primary.main}
            size={20}
            style={{ margin: "auto" }}
          />
        </Button>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ width: "300px", color: materialTheme.palette.primary.main }}
        >
          {"Confirm " + actionTag}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => executeActionFunction()} autoFocus>
            {actionTag}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
