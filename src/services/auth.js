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

//Create a task
export const createTask = async (data) => {
  try {
    const response = await api.post("tasks", data);
    return response.data;
  } catch (error) {
    console.error("Error in create a task:", error);
    throw error;
  }
};

//Generate description
export const generateDescriptionNewTask = async (data) => {
  try {
    const response = await api.post("tasks/gen-description", data);
    return response.data?.description;
  } catch (error) {
    console.error("Error in generate task new description:", error);
    throw error;
  }
};

//Create comment
export const createComment = async (data) => {
  try {
    const response = await api.post("comments", data);
    return response.data;
  } catch (error) {
    console.error("Error in create a comment:", error);
    throw error;
  }
};

//Edit comment
export const updateComment = async (data, taskId) => {
  try {
    const response = await api.put(`comments/${taskId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error in update a comment:", error);
    throw error;
  }
};

//Delete comment
export const deleteComment = async (taskId) => {
  try {
    const response = await api.delete(`comments/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error in delete a comment:", error);
    throw error;
  }
};

//Update status of a task
export const updateStatus = async (data) => {
  try {
    console.log("apii: ", data)
    const response = await api.post("taskstates", data);
    console.log("repsonse: ", response.data)
    return response.data;
  } catch (error) {
    console.error("Error in update status:", error);
    throw error;
  }
};