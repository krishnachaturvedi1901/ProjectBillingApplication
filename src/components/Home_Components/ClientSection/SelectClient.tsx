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
  // -------------------------------------------------------
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

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
  // console.log("selectedClient-", selectedClient);
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
  }, [loading, data]);

  useEffect(() => {
    if (isAuth && adminId) {
      dispatch(getAdminByIdAction(adminId));
    }
  }, [isAuth, dispatch]);

  useEffect(() => {
    if (adminId && loading === "succeeded") {
      let timer = setTimeout(() => {
        dispatch(getAllClientsByAdminIdAction(adminId));
        return () => {
          clearTimeout(timer);
        };
      }, 1000);
    }
  }, [dispatch, loading]);

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
  }, [error, selectedClient.error]);

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
      <div className="flex justify-end items-center">
        <div className="bg-colorMedium rounded-lg border border-x-colorMedium w-38 h-11 flex justify-center items-center my-4 mx-4">
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
      <div className="flex flex-col sm:flex-row sm:justify-between  ">
        <div className="">
          {data ? (
            <div className="text-black dark:text-colorLightFont p-4">
              <div className="bg-slate-300 h-16 w-48 p-2 mb-4 rounded-lg">
                <img
                  src={companyLogo}
                  alt="CompanyLogo"
                  className="h-10 w-auto "
                />
              </div>
              <div className=" text-black dark:text-colorLightFont">
                <h2 className="text-2xl my-2">{data.companyName}</h2>
                <p className="my-2">
                  <b>Gstin: </b>
                  {data.gistin}
                </p>
                <div className="text-black dark:text-colorLightFont opacity-70">
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
        <div className="">
          {clientObj && selectedClient.loading !== "idle" ? (
            <div className="text-black dark:text-colorLightFont p-4">
              <div className=" text-black dark:text-colorLightFont">
                <h2 className="text-2xl my-2">{clientObj.clientName}</h2>
                <p className="mt-2">
                  <b>Gstin: </b>
                  {clientObj.gistin}
                </p>
                <p className="mb-2">
                  <b>Pancard: </b>
                  {clientObj.pancardNo}
                </p>

                <div className="text-black dark:text-colorLightFont opacity-70">
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
