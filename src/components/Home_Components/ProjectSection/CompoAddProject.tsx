import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../states/redux/store";
import {
  Alert,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ProjectType } from "../../../types/types";

export default function CompoAddProject({
  open,
  handleClickOpen,
  handleClose,
  adminId,
  clientId,
  forAddProject,
}: {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  clientId: string | undefined;
  adminId: string | null;
  forAddProject: boolean;
  projectId?: string | undefined;
}) {
  const [incompleteError, setIncompleteError] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const [projectData, setProjectData] = useState<ProjectType>({
    projectName: "",
    projectManager: "",
    periodFrom: "",
    periodTo: "",
    rate: 0,
    workingPeriod: 0,
    workingPeriodType: "hours",
    currencyType: "rupees",
    conversionRate: 83.25,
    paymentStatus: false,
    adminId: "",
    clientId: "",
    amount: null,
  });
  console.log("projectData", projectData);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });

    setFormError("");
  }

  function handleSelectElementChange(
    e:
      | SelectChangeEvent<"rupees" | "dollars">
      | SelectChangeEvent<"hours" | "months">
  ) {
    console.log("e of rupee hour change------>", e.target.name, e.target.value);
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  }

  function areAllFieldsFilled(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (!areAllFieldsFilled(obj[key])) {
          return false;
        }
      } else {
        if (obj[key] === "" || obj[key] === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  function areEntriesValid(obj: any) {
    if (obj.contactNo.length !== 10) {
      setFormError("Contactno. must be of 10 digit only.");
      return false;
    } else if (obj.gistin.length !== 15) {
      setFormError("Gstin must be of 15 digit only.");
      return false;
    } else if (obj.pancardNo.length !== 10) {
      setFormError("Pancard must be of 10 digit only.");
      return false;
    } else if (obj.email) {
      const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      !pattern.test(obj.email)
        ? setFormError("Invalid email address*")
        : setFormError("");
      return pattern.test(obj.email);
    }
    setFormError("");
    return true;
  }

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (areAllFieldsFilled(projectData) && areEntriesValid(projectData)) {
      handleClose();
    } else {
      setIncompleteError("Incomplete fields");
    }
  };

  return (
    <>
      <div className="flex w-screen justify-end pr-12 pt-4">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkorchid",
            ":hover": {
              backgroundColor: "#7f05bc",
            },
          }}
          onClick={handleClickOpen}
        >
          Add Project
        </Button>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Project</DialogTitle>;
          {formError.length > 0 ? (
            <Alert severity="error"> {formError}</Alert>
          ) : incompleteError.length > 0 ? (
            <Alert severity="error"> {incompleteError}</Alert>
          ) : null}
          <DialogContent>
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormControl>
                <Input
                  id="projectName"
                  name="projectName"
                  placeholder="Project Name"
                  required
                  value={projectData.projectName}
                  onChange={handleChange}
                />{" "}
              </FormControl>
              <FormControl>
                <Input
                  id="projectManager"
                  name="projectManager"
                  placeholder="Project Manager"
                  value={projectData.projectManager}
                  onChange={handleChange}
                />{" "}
              </FormControl>
              <FormControl>
                <label>Project start from:</label>
                <Input
                  id="periodFrom"
                  name="periodFrom"
                  placeholder="Project start from"
                  type="date"
                  required
                  value={projectData.periodFrom}
                  onChange={handleChange}
                />{" "}
              </FormControl>
              <FormControl>
                <label>Project end at:</label>
                <Input
                  id="periodTo"
                  name="periodTo"
                  placeholder="Project End At"
                  type="date"
                  required
                  value={projectData.periodTo}
                  onChange={handleChange}
                />{" "}
              </FormControl>

              <div>
                <FormControl>
                  <Input
                    placeholder="Rate"
                    id="rate"
                    name="rate"
                    type="number"
                    value={projectData.rate}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <Select
                    placeholder="Select currency type"
                    id="currencyType"
                    name="currencyType"
                    value={projectData.currencyType || ""}
                    onChange={handleSelectElementChange}
                  >
                    <MenuItem value="rupees">Rupees</MenuItem>
                    <MenuItem value="dollars">Dollars</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <Select
                    placeholder="Work period type"
                    id="workingPeriodType"
                    name="workingPeriodType"
                    value={projectData.workingPeriodType || ""}
                    onChange={handleSelectElementChange}
                  >
                    <MenuItem value="hours">Hours</MenuItem>
                    <MenuItem value="months">Months</MenuItem>
                  </Select>{" "}
                </FormControl>
              </div>
              <FormControl>
                <Input
                  id="workingPeriod"
                  name="workingPeriod"
                  placeholder="Working period"
                  type="number"
                  value={projectData.workingPeriod}
                  onChange={handleChange}
                />{" "}
              </FormControl>
              <FormControl>
                <label>Conversion rate *</label>
                <Input
                  id="conversionRate"
                  name="conversionRate"
                  placeholder="Conversion rate *"
                  type="number"
                  required
                  value={projectData.conversionRate}
                  onChange={handleChange}
                />{" "}
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={(e) => handleSubmit(e)}>Add Project</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
