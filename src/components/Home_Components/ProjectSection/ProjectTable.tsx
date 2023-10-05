import React, { useContext } from "react";
import "./ProjectTable.module.css";
import CompoAddProject from "./CompoAddProject";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { AuthContext } from "../../../states/context/AuthContext/AuthContext";

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
          <caption>Statement Summary</caption>
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
