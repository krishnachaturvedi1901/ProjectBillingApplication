import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Alert, LinearProgress, MenuItem } from "@mui/material";
import { ProjectType } from "../../../types/types";
import { useAddNewProject } from "../../../states/query/Project_queries/projectQueries";
import { queryClient } from "../../..";

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
  const [workPeriodType, setWorkPeriodType] = useState("hours");
  const [currencyType, setCurrencyType] = useState("rupees");
  const [loading, setLoading] = useState(false);
  const [incompleteError, setIncompleteError] = useState("");
  const [formError, setFormError] = useState("");

  const [projectData, setProjectData] = useState<ProjectType>({
    projectName: "",
    projectManager: "",
    periodFrom: "",
    periodTo: "",
    rate: 1,
    workingPeriod: 1,
    workingPeriodType: "hours",
    currencyType: "rupees",
    conversionRate: 1,
    paymentStatus: false,
    adminId: "",
    clientId: "",
    amount: null,
  });
  console.log("projectData", projectData);

  React.useEffect(() => {
    if (clientId && adminId) {
      setProjectData({ ...projectData, clientId, adminId });
    }
  }, [clientId, adminId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    let { name, value } = e.target;
    if (name === "rate" || name === "workingPeriod") {
      let numVal = +value;
      setProjectData((prevData) => ({
        ...prevData,
        [name]: numVal,
      }));
    } else {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (name === "workingPeriodType") {
      setWorkPeriodType(value);
    }
    if (name === "currencyType" && value === "rupees") {
      setProjectData((prevData) => ({
        ...prevData,
        conversionRate: 1,
      }));

      setCurrencyType(value);
    } else if (name === "currencyType" && value === "dollars") {
      setProjectData((prevData) => ({
        ...prevData,
        conversionRate: 83.25,
      }));
    }
    setFormError("");
    setIncompleteError("");
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

  const addProjectMutation = useAddNewProject();

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);
    addProjectMutation.mutate(projectData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects", clientId]);
        queryClient.refetchQueries(["projects", clientId]);
        setLoading(false);
        handleClose();
      },
      onError(error) {
        setLoading(false);
        setIncompleteError("Add request error, add again.");
      },
    });

    // if (areAllFieldsFilled(projectData) && areEntriesValid(projectData)) {
    //   handleClose();
    // } else {
    //   setIncompleteError("Incomplete fields");
    // }
  };

  return (
    <>
      <div className="flex w-screen justify-end pr-12 pt-4">
        <Button
          disabled={!clientId || !adminId}
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
          {loading ? <LinearProgress /> : null}
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="projectName"
                label="Project Name"
                type="text"
                fullWidth
                variant="standard"
                name="projectName"
                value={projectData.projectName}
                onChange={handleChange}
                required
              />

              <TextField
                margin="dense"
                id="projectManager"
                label="Project Manager"
                type="text"
                fullWidth
                variant="standard"
                name="projectManager"
                value={projectData.projectManager}
                onChange={handleChange}
              />
              <label className=" text-[12px] text-sky-700">Period from*</label>
              <TextField
                margin="dense"
                id="periodFrom"
                type="date"
                fullWidth
                variant="standard"
                name="periodFrom"
                value={projectData.periodFrom}
                onChange={handleChange}
                required
              />
              <label className=" text-[12px] text-sky-700">Period to*</label>
              <TextField
                margin="dense"
                id="periodTo"
                type="date"
                fullWidth
                variant="standard"
                name="periodTo"
                value={projectData.periodTo}
                onChange={handleChange}
                required
              />

              <TextField
                margin="dense"
                id="rate"
                label={`Rate (${currencyType}/${workPeriodType})`}
                type="number"
                fullWidth
                variant="standard"
                name="rate"
                value={projectData.rate}
                onChange={handleChange}
              />
              <div className="flex ">
                <TextField
                  select
                  margin="dense"
                  id="currencyType"
                  label="Rate/Currency type"
                  fullWidth
                  variant="standard"
                  name="currencyType"
                  value={projectData.currencyType || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="rupees">&#x20B9; (rupee)</MenuItem>
                  <MenuItem value="dollars">$ (dollar)</MenuItem>
                </TextField>

                <TextField
                  select
                  margin="dense"
                  id="workingPeriodType"
                  label="Rate/Work based on"
                  fullWidth
                  variant="standard"
                  name="workingPeriodType"
                  value={projectData.workingPeriodType || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="hours">Hours</MenuItem>
                  <MenuItem value="months">Months</MenuItem>
                </TextField>
              </div>
              <TextField
                margin="dense"
                id="workingPeriod"
                label={`Project time taken in ${workPeriodType}`}
                type="number"
                fullWidth
                variant="standard"
                name="workingPeriod"
                value={projectData.workingPeriod}
                onChange={handleChange}
              />
              <label className=" text-[12px] text-sky-700">
                Conversion rate*
              </label>

              <TextField
                margin="dense"
                id="conversionRate"
                type="number"
                fullWidth
                variant="standard"
                name="conversionRate"
                value={projectData.conversionRate}
                onChange={handleChange}
                required
              />
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
