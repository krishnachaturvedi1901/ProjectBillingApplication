import React, { useContext, useRef, useState } from "react";
import "./ProjectTable.module.css";
import CompoAddProject from "./CompoAddProject";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { AuthContext } from "../../../states/context/AuthContext/AuthContext";
import {
  useDeleteProject,
  useFetchAllProjectsByClientId,
} from "../../../states/query/Project_queries/projectQueries";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import { RiDeleteBin7Line } from "react-icons/ri";
import { queryClient } from "../../..";
import { useSnackbar } from "notistack";
import { ProjectType } from "../../../types/types";
import {
  addAllProjectsForInvoiceAction,
  addProjectForInvoiceAction,
  removeAllProjectsFromInvoiceAction,
  removeProjectFromInvoiceAction,
} from "../../../states/redux/InvoiceProjectState/addProjectForInvoiceSlice";

const ProjectTable = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  // -----------------------------------------------------
  const { isAuth, adminId } = useContext(AuthContext);
  const selectedClientState = useSelector(
    (state: RootState) => state.selectedClientState
  );
  const { isLoading, data, isError } = useFetchAllProjectsByClientId(
    selectedClientState.data._id
  );
  const DeleteProjectMutationHandler = useDeleteProject(
    selectedClientState.data._id
  );
  // -----------------------------------------------------
  const [allChecked, setAllChecked] = useState<boolean>();
  type CheckboxRefType = React.RefObject<HTMLInputElement>;
  const checkboxesRefs = useRef<CheckboxRefType[]>([]);

  console.log("Chekboxref--------------------==>", checkboxesRefs);

  const handleProjectDelete = (projectId: string) => {
    DeleteProjectMutationHandler.mutate(projectId, {
      onSuccess: () => {
        enqueueSnackbar("Project deleted successfully.", {
          variant: "success",
        });
        queryClient.refetchQueries(["projects", selectedClientState.data._id]);
      },
      onError: () => {
        enqueueSnackbar("Error in deleting project. Try again!", {
          variant: "error",
        });
      },
    });
  };

  // console.log(
  //   isLoading,
  //   data,
  //   isError,
  //   "->",
  //   "clientId",
  //   selectedClientState.data._id,
  //   "adminId->",
  //   adminId
  // );

  if (isError || isLoading || data === "" || data.length <= 0) {
    return (
      <div>
        <div>
          <CompoAddProject
            clientId={selectedClientState.data._id}
            adminId={adminId}
            forAddProject={true}
          />
        </div>
        <div className="text-xl font-bold text-center p-4 ">
          <h3>PROJECT DETAILS</h3>
          {isLoading ? (
            <p className="text-lg text-purple-500 font-thin dark:text-purple-300 p-4 ">
              {!selectedClientState.data._id
                ? "Please select client to display projects or to add project !!"
                : null}
            </p>
          ) : null}
          {isError ? (
            <p className="font-thin p-4 ">
              <Alert severity="error">Network request error, refresh!!!</Alert>
            </p>
          ) : null}
          {data && (data === "" || data.length <= 0) ? (
            <p className="text-lg text-purple-500 font-thin dark:text-purple-300 p-4 ">
              Selected Client has no project available !
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  const handleAllCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: ProjectType[]
  ) => {
    console.log("====allChecked====>", e.target.checked);
    let isAllChecked = e.target.checked;
    setAllChecked(isAllChecked);

    checkboxesRefs.current.forEach((checkboxRef) => {
      if (checkboxRef.current) {
        checkboxRef.current.checked = isAllChecked;
      }
    });

    if (isAllChecked) {
      dispatch(addAllProjectsForInvoiceAction(data));
    } else if (!isAllChecked) {
      dispatch(removeAllProjectsFromInvoiceAction());
    }
  };

  const handleSingleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    project: ProjectType
  ) => {
    const isChecked = e.target.checked;
    console.log("single checkbox checked-", isChecked, e.target);
    checkboxesRefs.current.forEach((checkboxRef) => {
      if (checkboxRef.current) {
        checkboxRef.current.checked = isChecked;
      }
    });

    const areAllChecked = checkboxesRefs.current.every(
      (checkboxRef) => checkboxRef.current?.checked
    );
    setAllChecked(areAllChecked);
    console.log("outside remove elseif-single project=====>", project._id);

    if (isChecked) {
      dispatch(addProjectForInvoiceAction(project));
    } else if (!isChecked && project._id) {
      console.log("Inside remove elseif-single project=====>", project._id);
      dispatch(removeProjectFromInvoiceAction(project._id));
    }
  };

  return (
    <section className="">
      <div>
        <CompoAddProject
          clientId={selectedClientState.data._id}
          adminId={adminId}
          forAddProject={true}
        />
      </div>
      <div className=" dark:text-colorLightFont px-8 pb-4 ">
        <table className="border-none">
          <caption className="text-xl font-bold text-center p-4 ">
            PROJECT DETAILS
          </caption>
          <thead>
            <tr className="dark:bg-slate-800 dark:text-colorLightFont ">
              <th className=" md:flex md:pl-8 ">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "darkorchid",
                        "&.Mui-checked": {
                          color: "darkorchid",
                        },
                      }}
                      onChange={(e) => handleAllCheckboxChange(e, data)}
                    />
                  }
                  label="Sr.no."
                />
              </th>
              <th>Project</th>
              <th>Project Period</th>
              <th>Rate</th>
              <th>Working Period</th>
              <th>Conversion Rate</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((project: any, index: any) => {
              // checkboxesRefs.current[index] = useRef<HTMLInputElement>(null);

              return (
                <tr
                  className="dark:bg-slate-800 dark:text-colorLightFont  "
                  key={project._id}
                >
                  <td data-label="Sr.no." className=" md:flex md:pl-8 ">
                    <div className=" flex justify-end items-center md:justify-start md:w-full md:text-start md:mt-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 border-2  accent-[darkorchid] cursor-pointer mr-4 "
                        ref={checkboxesRefs.current[index]}
                        onChange={(e) =>
                          handleSingleCheckboxChange(e, index, project)
                        }
                      />
                      <label>{index + 1}</label>
                    </div>
                  </td>
                  <td data-label="Project">
                    {project.projectName}
                    <br />
                    {project.projectManager}
                  </td>
                  <td data-label="Project Period">
                    {project.projectPeriod ? (
                      <>
                        {project.projectPeriod} ({project.workingPeriodType}){" "}
                      </>
                    ) : (
                      "Hour based project"
                    )}
                  </td>
                  <td data-label="Rate">
                    {project.rate}(
                    {project.currencyType === "rupees" ? (
                      <span>&#x20B9;</span>
                    ) : project.currencyType === "dollars" ? (
                      <span>$</span>
                    ) : project.currencyType === "pounds" ? (
                      <span>&#163;</span>
                    ) : null}
                    /{project.workingPeriodType})
                  </td>
                  <td data-label="Working Period">
                    {project.workingPeriod}({project.workingPeriodType})
                  </td>
                  <td data-label="Conversion Rate">
                    {project.currencyType === "rupees" ? (
                      <span>&#x20B9; </span>
                    ) : project.currencyType === "dollars" ? (
                      <span>$ </span>
                    ) : project.currencyType === "pounds" ? (
                      <span>&#163; </span>
                    ) : null}
                    {project.conversionRate}
                  </td>
                  <td data-label="Amount">
                    {" "}
                    &#x20B9; {project.amount ? project.amount : 0}
                  </td>
                  <td>
                    <div className="h-14 md:h-auto flex  justify-between items-center md:justify-around ">
                      <div>
                        <CompoAddProject
                          clientId={selectedClientState.data._id}
                          adminId={adminId}
                          forAddProject={false}
                          projectToEdit={project}
                        />
                      </div>
                      <div
                        className=" cursor-pointer 
                      opacity-70 hover:opacity-100 "
                        onClick={() => handleProjectDelete(project._id)}
                      >
                        <RiDeleteBin7Line
                          color="orchid"
                          size={25}
                          style={{ margin: "auto" }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProjectTable;
