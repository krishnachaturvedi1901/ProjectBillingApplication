import axios from "axios";
import config from "../config/config";
import { ClientType } from "../types/types";

export async function getAllClientsByAdminId(adminId: number) {
  try {
    const response = await axios(`${config.apiUrlClient}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in getting allclients :from getAllClients function-",
      error
    );
    throw new Error("Error in getting allclients");
  }
}
export async function getClientByClientId(clientId: number) {
  try {
    const response = await axios(`${config.apiUrlClient}/${clientId}`);
    return response.data;
  } catch (error) {
    console.log("Error in getClientById :from getClientById function-", error);
    throw new Error("Network error during fetch client by id");
  }
}
export async function addClient(clientData: ClientType) {
  try {
    const response = await axios.post(`${config.apiUrlClient}`, clientData);
    return response.data;
  } catch (error) {
    console.log("Error in adding client :from addCVlient function");
    throw new Error("Error in adding client");
  }
}
