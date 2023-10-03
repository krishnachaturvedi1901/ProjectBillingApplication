import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../states/redux/store";
import { AuthContext } from "../../../states/context/AuthContext/AuthContext";
import { getAdminByIdAction } from "../../../states/redux/AdminStates/adminSlice";
import { Button, Skeleton } from "@mui/material";
import { getAllClientsByAdminIdAction } from "../../../states/redux/ClientStates/allClientSlice";
import ConfirmationDialog from "./Compo-ClientDialogeBox";
import { ClientType } from "../../../types/types";

const SelectClient = () => {
  const { isAuth, adminId } = useContext(AuthContext);
  const [allClients, setAllClients] = useState<ClientType[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.adminState
  );
  const clients = useSelector((state: RootState) => state.allClientsState);
  const selectedClient = useSelector(
    (state: RootState) => state.selectedClientState
  );
  console.log("selectedClient-", selectedClient);
  useEffect(() => {
    // Add adminId later
    if (isAuth) {
      dispatch(getAdminByIdAction(2));
    }
  }, [isAuth, dispatch]);

  useEffect(() => {
    dispatch(getAllClientsByAdminIdAction(1));
  }, [dispatch]);

  console.log("data in client compo of admin ", loading, error, data);
  useEffect(() => {
    if (clients.data.length > 0) {
      setAllClients(clients.data.filter((client) => data.id === client.user));
    }
  }, [clients, data, dispatch]);

  if (
    loading === "pending" ||
    clients.loading === "pending" ||
    selectedClient.loading === "pending"
  ) {
    return (
      <div className="flex justify-between items-center p-8">
        <div>
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7, mb: "10px" }}
            variant="rectangular"
            width={150}
            height={50}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7 }}
            variant="text"
            width={220}
            height={20}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7 }}
            variant="text"
            width={220}
            height={20}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7 }}
            variant="text"
            width={220}
            height={20}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7 }}
            variant="text"
            width={220}
            height={20}
          />
        </div>
        <div>
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7, mb: "10px" }}
            variant="rectangular"
            width={150}
            height={50}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7 }}
            variant="text"
            width={220}
            height={20}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7 }}
            variant="text"
            width={220}
            height={20}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7 }}
            variant="text"
            width={220}
            height={20}
          />
          <Skeleton
            sx={{ bgcolor: "grey.700", opacity: 0.7 }}
            variant="text"
            width={220}
            height={20}
          />
        </div>
      </div>
    );
  } else if (error || clients.error || selectedClient.error) {
    return <h3>Error in getting admin detail, logout and login again</h3>;
  }

  const clientsArr: ClientType[] = allClients;
  const clientObj: ClientType = selectedClient.data;

  return (
    <section className="flex flex-col sm:flex-row sm:justify-between  ">
      <div className="">
        {data ? (
          <div className="text-black dark:text-colorLightFont p-4">
            <div className="bg-slate-300 h-16 w-48 p-2 mb-4 rounded-lg">
              <img
                src={data.companyLogo}
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
                  {data.address ? data.address.city + data.address.state : null}
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
        <div className="bg-colorMedium rounded-lg border border-x-colorMedium w-38 h-11 flex justify-center items-center my-4 mx-4">
          <ConfirmationDialog clientsArr={clientsArr} />
        </div>
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
    </section>
  );
};

export default SelectClient;
