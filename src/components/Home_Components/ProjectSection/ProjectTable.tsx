import React, { useContext } from "react";
import "./ProjectTable.module.css";
import CompoAddProject from "./CompoAddProject";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { AuthContext } from "../../../states/context/AuthContext/AuthContext";
import { useFetchAllProjectsByClientId } from "../../../states/query/Project_queries/projectQueries";
import CompoLoadingProjects from "./CompoLoadingProjects";
import { Alert } from "@mui/material";

const ProjectTable = () => {
  // ---------------------------------------------------
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // -----------------------------------------------------
  const { isAuth, adminId } = useContext(AuthContext);
  const selectedClientState = useSelector(
    (state: RootState) => state.selectedClientState
  );
  const { isLoading, data, isError } = useFetchAllProjectsByClientId(
    selectedClientState.data._id
  );
  console.log(isLoading, data, isError, "->", selectedClientState.data._id);
  if (isLoading) {
    return (
      <>
        <div>
          <CompoAddProject
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            clientId={selectedClientState.data._id}
            adminId={adminId}
            forAddProject={true}
          />
        </div>
        <div className="text-xl font-bold text-center p-4 ">
          <h3>PROJECT DETAILS</h3>
          <p className="text-lg text-purple-500 font-thin dark:text-purple-300 p-4 ">
            {!selectedClientState.data._id
              ? "Please select client to display projects or to add project !!"
              : null}
          </p>
        </div>
        <CompoLoadingProjects />;
      </>
    );
  }
  if (data === "" && data.length === 0) {
    return (
      <div>
        <div>
          <CompoAddProject
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            clientId={selectedClientState.data._id}
            adminId={adminId}
            forAddProject={true}
          />
        </div>
        <div className="text-xl font-bold text-center p-4 ">
          <h3>PROJECT DETAILS</h3>
          <p className="text-lg text-purple-500 font-thin dark:text-purple-300 p-4 ">
            Selected Client has no project available !
          </p>
        </div>
      </div>
    );
  }
  if (isError) {
    return <Alert severity="error">Network request error, refresh!!!</Alert>;
  }
  return (
    <section>
      <div>
        <CompoAddProject
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          clientId={selectedClientState.data._id}
          adminId={adminId}
          forAddProject={true}
        />
      </div>
      <div>
        <table>
          <caption className="text-xl font-bold text-center p-4 ">
            PROJECT DETAILS
          </caption>
          <thead>
            <tr>
              <th>Project</th>
              <th>Project Period</th>
              <th>Rate</th>
              <th>Working Period</th>
              <th>Conversion Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Project">Visa - 3412</td>
              <td data-label="Project Period">04/01/2016</td>
              <td data-label="Rate">$1,190</td>
              <td data-label="Working Period">03/01/2016 - 03/31/2016</td>
              <td data-label="Conversion Rate">03/01/2016 - 03/31/2016</td>
              <td data-label="Amount">03/01/2016 - 03/31/2016</td>
              <td data-label="Edit">Edit</td>
              <td data-label="Delete">Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProjectTable;
