import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../states/redux/store";
import { AuthContext } from "../../../states/context/AuthContext/AuthContext";
import { getAdminByIdAction } from "../../../states/redux/AdminStates/adminSlice";
import { getAllClientsByAdminIdAction } from "../../../states/redux/ClientStates/allClientSlice";
import ConfirmationDialog from "./Compo-ClientDialogeBox";
import { ClientType } from "../../../types/types";
import CompoLoading from "./Compo-Loding";
import CompoAddClient from "./Compo_AddClient";

const SelectClient = () => {
  const { isAuth, adminId } = useContext(AuthContext);
  const [companyLogo, setCompanyLogo] = useState("");
  //--------------------------------------------------------
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // -------------------------------------------------------
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.adminState
  );
  const clients = useSelector((state: RootState) => state.allClientsState);
  const selectedClient = useSelector(
    (state: RootState) => state.selectedClientState
  );
  const addedNewClientState = useSelector(
    (state: RootState) => state.addClientState
  );
  console.log("selectedClient-", selectedClient);
  // -------------------------------------------------------

  useEffect(() => {
    if (
      loading === "succeeded" &&
      adminId &&
      adminId === "6516a4ba98fd8b5ed365d5f4"
    ) {
      setCompanyLogo("https://gammaedge.io/images/logo1.png");
    } else if (loading === "succeeded" && adminId) {
      setCompanyLogo("https://www.cubexo.io/images/Logo.webp");
    }
  }, [loading, data, adminId]);

  useEffect(() => {
    if (isAuth && adminId) {
      dispatch(getAdminByIdAction(adminId));
    }
  }, [isAuth, adminId, dispatch]);

  useEffect(() => {
    if (adminId && loading === "succeeded") {
      let timer = setTimeout(() => {
        dispatch(getAllClientsByAdminIdAction(adminId));
        return () => {
          clearTimeout(timer);
        };
      }, 1000);
    }
  }, [dispatch, adminId, loading]);

  useEffect(() => {
    if (addedNewClientState.loading === "succeeded" && adminId) {
      dispatch(getAllClientsByAdminIdAction(adminId));
    }
  }, [
    addedNewClientState.loading,
    addedNewClientState,
    addedNewClientState.data,
    dispatch,
    adminId,
  ]);
  useEffect(() => {
    if ((adminId && error) || selectedClient.error) {
      window.location.reload();
    }
  }, [error, adminId, selectedClient.error]);

  if (
    loading === "pending" ||
    // clients.loading === "pending" ||
    selectedClient.loading === "pending" ||
    addedNewClientState.loading === "pending"
  ) {
    return <CompoLoading />;
  } else if (error || selectedClient.error) {
    return (
      <h3>
        Error in getting admin detail, refresh or login again.
        <br />
        {"adminId--->" + adminId}
        <br />
        {"Admin network error-" + error}
        <br />
        {"All Client get req network error-" + clients.error}
        <br />
        {"Selected client get reqById nework error-" +
          selectedClient.error}{" "}
      </h3>
    );
  }

  const clientsArr: ClientType[] = clients.data;
  const clientObj: ClientType = selectedClient.data;

  return (
    <section>
      <div className="flex justify-around sm:justify-end items-center pr-4 sm:pr-8 sticky top-16 bg-slate-200 dark:bg-slate-600 z-10 ">
        <div>
          <ConfirmationDialog clientsArr={clientsArr} adminId={adminId} />
        </div>
        <div>
          <CompoAddClient
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            user={adminId!}
          />
        </div>
      </div>
      <div className="flex flex-row text-xs sm:text-sm  sm:flex-row  w-auto    m-2 rounded-lg sm:mx-8 bg-white dark:bg-slate-700 bg-opacity-50 shadow-lg dark:shadow-slate-800 sm:p-2 ">
        <div className="w-1/2 ">
          {data ? (
            <div className="text-black dark:text-colorLightFont p-4">
              <div className="bg-slate-100 flex justify-start items-center  h-8 sm:h-16 w-30 sm:w-48  p-3 mb-2 rounded-lg">
                <img
                  src={companyLogo}
                  alt="CompanyLogo"
                  className="h-auto w-auto "
                />
              </div>
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
    </section>
  );
};

export default SelectClient;
