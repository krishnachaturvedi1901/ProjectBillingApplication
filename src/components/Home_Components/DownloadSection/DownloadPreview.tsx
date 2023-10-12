import React from "react";
import "./DownloadPreview.module.css";
import dayjs, { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { ClientType } from "../../../types/types";
import cubexoLogo from "../../../utils/images/cubexoLogo.webp";
import gammaedgeLogo from "../../../utils/images/gammaedgeLogo.png";

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

  console.log("download executed");
  if (data.companyLogo === "https://gammaedge.io/images/logo1.png") {
  }
  return (
    <div className="p-4 text-black w-[793px] bg-white m-auto ">
      {/* Logo and Admin seection */}
      <div className=" flex justify-between mb-12">
        <div className="w-[45%] h-auto mr-16 mt-4 ">
          {data.companyLogo === "https://gammaedge.io/images/logo1.png" ? (
            <img
              src={gammaedgeLogo}
              alt="gammaedgeLogo"
              className="h-1/2 w-auto "
            />
          ) : (
            <img src={cubexoLogo} alt="cubexoLogo" className="h-auto w-auto " />
          )}
        </div>
        <div className=" text-black w-[40%]  ">
          <h3 className=" text-sm  font-semibold ">{data.companyName}</h3>
          <p className="my-1 text-sm ">
            <b>Gstin: </b>
            {data.gistin}
            <br />
            <b>Pan: </b>
            {data.pancardNo}
          </p>
          <p className="my-1"></p>
          <div className="text-black text-sm opacity-70 flex flex-col justify-start ">
            <p>{data.address?.street}</p>
            <p>
              {data.address?.city +
                " " +
                data.address?.state +
                " " +
                data.address?.postalCode +
                " -" +
                data.address?.country}
            </p>
            <p>
              <span className="text-colorCancelButton font-semibold ">
                {data.email}
              </span>
              {" | " + data.contactNo}
            </p>
          </div>
        </div>
      </div>
      {/* Invoivce and Client section */}
      <div className="flex justify-between mb-8 px-8 pr-0 ">
        <div>
          <div className=" text-white bg-thirdColor  rounded-lg pb-4 mb-1 px-6">
            Invoice no: {invoiceObject.invoiceNo}
          </div>
          <div className=" text-white bg-thirdColor  rounded-lg pb-4 mb-1 px-6">
            Bill date: {dayjs(invoiceObject.billDate).format("DD/MM/YYYY")}
          </div>
          <div className=" text-white bg-thirdColor  rounded-lg pb-4 mb-1 px-6">
            Due date: {dayjs(invoiceObject.dueDate).format("DD/MM/YYYY")}
          </div>
        </div>
        <div className=" text-black w-[41%]  ">
          <h3 className=" text-sm  font-semibold ">
            {selectedClient.data.clientName}
          </h3>
          <p className="my-1 text-sm ">
            <b>Gstin: </b>
            {selectedClient.data.gistin}
          </p>
          <p className="my-1"></p>
          <div className="text-black text-sm opacity-70 flex flex-col justify-start ">
            <p>{selectedClient.data.address?.street}</p>
            <p>
              {selectedClient.data.address?.city +
                " " +
                selectedClient.data.address?.state +
                " " +
                selectedClient.data.address?.postalCode +
                " -" +
                selectedClient.data.address?.country}
            </p>
          </div>
        </div>
      </div>
      {/* Table section */}
      <div className="px-4 pb-4 ">
        <table className="border-none">
          <thead>
            <tr className=" bg-thirdColor text-white ">
              <th>Sr.no.</th>
              <th>Project</th>
              <th>Project Period</th>
              <th>Rate</th>
              <th>Working Period</th>
              <th>Conversion Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-3"></tr>
            {projectsForInvoice?.map((project: any, index: any) => {
              return (
                <tr className="text-black border bg-white" key={project._id}>
                  <td className="border">
                    <label>{index + 1}</label>
                  </td>
                  <td className="border">
                    {project.projectName}
                    <br />
                    <span className="opacity-70 text-sm">
                      ({project.projectManager})
                    </span>
                  </td>
                  <td className="border">
                    {project.projectPeriod ? (
                      <>
                        {project.projectPeriod} <br />(
                        {project.workingPeriodType}){" "}
                      </>
                    ) : (
                      "Hour based project"
                    )}
                  </td>
                  <td className="border">
                    {project.rate}
                    <br />(
                    {project.currencyType === "rupees" ? (
                      <span>&#x20B9;</span>
                    ) : project.currencyType === "dollars" ? (
                      <span>$</span>
                    ) : project.currencyType === "pounds" ? (
                      <span>&#163;</span>
                    ) : null}
                    /{project.workingPeriodType})
                  </td>
                  <td className="border">
                    {project.workingPeriod}
                    <br />({project.workingPeriodType})
                  </td>
                  <td className="border">
                    {project.currencyType === "rupees" ? (
                      <span>&#x20B9; </span>
                    ) : project.currencyType === "dollars" ? (
                      <span>$ </span>
                    ) : project.currencyType === "pounds" ? (
                      <span>&#163; </span>
                    ) : null}
                    {project.conversionRate}
                  </td>
                  <td className="border">
                    {" "}
                    &#x20B9; {project.amount ? project.amount : 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Total bill amount section */}
      <div className="p-8 flex justify-end">
        <Box
          sx={{
            width: "300px",
            mr: "15px",
            pb: { xs: "40px", sm: "15px" },
            color: "black",
          }}
        >
          <p className=" text-xl border-b-2 px-2 pr-0 pb-4 rounded-lg text-white  border-slate-800 border-opacity-70 mb-4 mt-4 bg-thirdColor  ">
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
