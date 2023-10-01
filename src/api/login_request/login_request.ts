import axios from "axios";
import config from "../../config/config";
import { LoginDataType } from "../../types/types";

export async function getLogin(loginData: LoginDataType) {
  try {
    const response = await axios.post(`${config.apiUrlAuth}/login`, loginData);
    return response.data;
  } catch (error) {
    console.log("Error in admin login :from getLogin function-", error);
    throw new Error("Error in admin login");
  }
}
export async function getAdminById(adminId: string) {
  try {
    const response = await axios.get(`${config.apiUrlAdmin}/${adminId}`);
    return response.data;
  } catch (error) {
    console.log("Error in getAdminById :from getLogin function-", error);
    throw new Error("Network error in fetch admin by id");
  }
}
