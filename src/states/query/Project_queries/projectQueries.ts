import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addProject,
  deleteProject,
  editProject,
  getAllProjectsByClientId,
  getProjectById,
} from "../../../api/project_requests";
import { ProjectType, UpdateProjectDataType } from "../../../types/types";
import { queryClient } from "../../..";

export const useFetchAllProjects = (clientId: string) => {
  return useQuery(["projects"], () => getAllProjectsByClientId(clientId));
};

export const useFetchProjectById = (projectId: string) => {
  return useQuery(["project", { projectId }], () => getProjectById(projectId));
};

export const useAddNewProject = () => {
  const AddProjectMutationHandler = useMutation(
    (projectData: ProjectType) => addProject(projectData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
      },
    }
  );
  return AddProjectMutationHandler;
};

export const useUpdateProject = (projectId: string) => {
  const UpdateProjectMutationHandler = useMutation(
    (variables: {
      projectId: string;
      updatedProjectData: UpdateProjectDataType;
    }) => editProject(variables.projectId, variables.updatedProjectData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
        queryClient.invalidateQueries(["projects", { projectId }]);
      },
    }
  );
  return UpdateProjectMutationHandler;
};

export const useDeleteProject = (projectId: string) => {
  const DeleteProjectMutationHandler = useMutation(
    (projectId: string) => deleteProject(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
        queryClient.invalidateQueries(["projects", { projectId }]);
      },
    }
  );
  return DeleteProjectMutationHandler;
};
