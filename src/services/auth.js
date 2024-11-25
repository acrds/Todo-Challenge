import api from "./api";

// Register user
export const registerUser = async (data) => {
  try {
    const response = await api.post("users/register", data); 
    return response.data;
  } catch (error) {
    console.error("Error in register user:", error);
    throw error;
  }
};

// Log in user
export const loginUser = async (data) => {
  try {
    const response = await api.post("users/login", data);
    return response.data;
  } catch (error) {
    console.error("Error in log in user:", error);
    throw error;
  }
};

//List all projects
export const listProjects = async () => {
    try {
      const response = await api.get("projects");
      return response.data?.projects;
    } catch (error) {
      console.error("Error in list all projects:", error);
      throw error;
    }
};

//Create a project
export const createProject = async (data) => {
  try {
    const response = await api.post("projects", data);
    return response.data;
  } catch (error) {
    console.error("Error in create a project:", error);
    throw error;
  }
};

//List all tasks of a project
export const listTaskAproject = async (projectId) => {
  try {
    const response = await api.get(`tasks/project/${projectId}`);
    return response.data?.tasks;
  } catch (error) {
    console.error("Error in get all tasks of a project:", error);
    throw error;
  }
};
