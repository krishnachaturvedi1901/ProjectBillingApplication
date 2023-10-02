import axios from "axios";
import config from "../config/config";
import { ProjectType } from "../types/types";

export async function getAllProjectsByClientId(clientId: number) {
  try {
    const response = await axios(`${config.apiUrlProject}/${clientId}`);
    return response.data;
  } catch (error) {
    console.log(
      "Error in getting allprojects :from getAllClients function-",
      error
    );
    throw new Error("Error in getting all client projects");
  }
}

export async function addProject(projectData: ProjectType) {
  try {
    const response = await axios.post(`${config.apiUrlProject}`, projectData);
    return response.data;
  } catch (error) {
    console.log(
      "Error in adding project :from  adding project function-",
      error
    );
    throw new Error("Error in  adding project");
  }
}
