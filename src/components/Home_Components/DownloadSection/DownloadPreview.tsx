import React from "react";
import "./DownloadPreview.module.css";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { ClientType } from "../../../types/types";

const DownloadPreview = () => {
  const { loading, data, error } = useSelector(
    (state: RootState) => state.adminState
  );
  const selectedClient = useSelector(
    (state: RootState) => state.selectedClientState
  );
  const { projectsForInvoice } = useSelector(
    (state: RootState) => state.projectsForInvoiceState
  );
  const invoiceObject = useSelector(
    (state: RootState) => state.invoiceObjectState
  );

  const clientObj: ClientType = selectedClient.data;

  const taxAmount = +(
    invoiceObject.amountAfterTax - invoiceObject.amountWithoutTax
  ).toFixed(2);

  return (
    <div>
      <div>
        <div style={{ marginTop: "100px" }}>
          <div className="bg-slate-100 flex justify-start items-center  h-8 sm:h-16 w-30 sm:w-48  p-3 mb-2 rounded-lg">
            <img
              src={data.companyLogo}
              alt="CompanyLogo"
              className="h-auto w-auto "
            />
          </div>

          <div>{/*Render here dates*/}</div>
        </div>
        <div className="flex flex-row text-xs sm:text-sm  sm:flex-row  w-auto    m-2 rounded-lg sm:mx-8 bg-white dark:bg-slate-800 bg-opacity-50 shadow-lg dark:shadow-slate-800 sm:p-2 ">
          <div className="w-1/2 ">
            {data ? (
              <div className="text-black dark:text-colorLightFont p-4">
                <div className=" text-black dark:text-colorLightFont">
                  <h3 className=" text-sm sm:text-sm mt-6 font-semibold ">
                    {data.companyName}
                  </h3>
                  <p className="my-2">
                    <b>Gstin: </b>
                    {data.gistin}
                  </p>
                  <div className="text-black dark:text-colorLightFont opacity-70 flex flex-col justify-start gap-1">
                    <p>{data.address ? data.address.street : null}</p>
                    <p>
                      {data.address
                        ? data.address.city + data.address.state
                        : null}
                    </p>
                    <p>
                      {data.address
                        ? data.address.postalCode + " -" + data.address.country
                        : null}
                    </p>
                    <b>
                      <b>Contact: </b>
                      {data.contactNo}
                    </b>
                  </div>
                </div>
              </div>
            ) : (
              "Loding..."
            )}
          </div>
          <div className=" border-l border-l-slate-400 ">
            {clientObj && selectedClient.loading !== "idle" ? (
              <div className="text-black ml-0.5 sm:ml-4 dark:text-colorLightFont p-4">
                <div className=" text-black dark:text-colorLightFont">
                  <h2 className=" text-sm sm:text-lg my-2 font-semibold">
                    {clientObj.clientName}
                  </h2>
                  <p className="mt-2">
                    <b>Gstin: </b>
                    {clientObj.gistin}
                  </p>
                  <p className="mb-2">
                    <b>Pancard: </b>
                    {clientObj.pancardNo}
                  </p>

                  <div className="text-black dark:text-colorLightFont opacity-70 flex flex-col justify-start gap-1 ">
                    <p>{clientObj.address ? clientObj.address.street : null}</p>
                    <p>
                      {clientObj.address
                        ? clientObj.address.city + clientObj.address.state
                        : null}
                    </p>
                    <p>
                      {clientObj.address
                        ? clientObj.address.postalCode +
                          " -" +
                          clientObj.address.country
                        : null}
                    </p>
                    <p>
                      <b>Contact: </b>
                      {clientObj.contactNo}
                    </p>
                    <p>
                      <b>Email: </b>
                      {clientObj.email}
                    </p>
                    <p>
                      <b>Conversion rate:</b>
                      {" " + clientObj.conversionRate}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <h4>{null}</h4>
            )}
          </div>
        </div>
      </div>
      <div className=" dark:text-colorLightFont px-8 pb-4 ">
        <table className="border-none">
          <caption className="text-xl font-bold text-center p-4 ">
            PROJECT DETAILS
          </caption>
          <thead>
            <tr className="dark:bg-slate-800 dark:text-colorLightFont ">
              <th className=" md:flex md:pl-8 ">Sr.no.</th>
              <th>Project</th>
              <th>Project Period</th>
              <th>Rate</th>
              <th>Working Period</th>
              <th>Conversion Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {projectsForInvoice?.map((project: any, index: any) => {
              return (
                <tr
                  className="dark:bg-slate-800 dark:text-colorLightFont  "
                  key={project._id}
                >
                  <td data-label="Sr.no." className=" md:pl-8 ">
                    <label>{index + 1}</label>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
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
            Subtotal:<span>{invoiceObject.amountWithoutTax} &#8377; </span>
          </div>
          <Box sx={{ mt: "10px" }}>
            {selectedClient.data.sameState ? (
              <>
                <div className="flex justify-between ">
                  SGST:(9%)<span>{taxAmount / 2}</span>
                </div>
                <div className="flex justify-between ">
                  CGST:(9%)<span>{taxAmount / 2}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between ">
                IGST:(18%)<span>{taxAmount}</span>
              </div>
            )}
          </Box>
          <div className="flex justify-between border-t border-slate-800 border-opacity-70 text-xl md:text-2xl mt-4">
            Amount:
            <span className=" ">{invoiceObject.amountAfterTax} &#8377; </span>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default DownloadPreview;
