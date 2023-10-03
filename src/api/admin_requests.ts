import axios from "axios";
import config from "../config/config";

export async function getAdminByAdminId(adminId: number) {
  try {
    const response = await axios(`${config.apiUrlAdmin}/${adminId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in getting allclients :from getAllClients function-",
      error
    );
    throw new Error("Error in getting allclients");
  }
}
