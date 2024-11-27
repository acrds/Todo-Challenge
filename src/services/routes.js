import api from "./api";

// User Authentication 
// Register user
export const registerUser = async (data) => {
  try {
    const response = await api.post("users/register", data); 
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Log in user
export const loginUser = async (data) => {
  try {
    const response = await api.post("users/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


//Projects
//List all projects
export const listProjects = async () => {
    try {
      const response = await api.get("projects");
      return response.data?.projects;
    } catch (error) {

      throw error;
    }
};

//Create a project
export const createProject = async (data) => {
  try {
    const response = await api.post("projects", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Tasks
//List all tasks of a project
export const listTaskAproject = async (projectId) => {
  try {
    const response = await api.get(`tasks/project/${projectId}`);
    return response.data?.tasks;
  } catch (error) {
    throw error;
  }
};

//Create a task
export const createTask = async (data) => {
  try {
    const response = await api.post("tasks", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Generate description
export const generateDescriptionNewTask = async (data) => {
  try {
    const response = await api.post("tasks/gen-description", data);
    return response.data?.description;
  } catch (error) {
    throw error;
  }
};

//Update task
export const updateTask = async (data, taskId) => {
  try {
    const response = await api.put(
      `tasks/${taskId}`,
      {},
      { 
        params: data
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error))
    throw error;
  }
};

//Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.patch(`tasks/${taskId}/archive`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Create comment
export const createComment = async (data) => {
  try {
    const response = await api.post("comments", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Edit comment
export const updateComment = async (data, taskId) => {
  try {
    const response = await api.put(`comments/${taskId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Delete comment
export const deleteComment = async (taskId) => {
  try {
    const response = await api.delete(`comments/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Update status of a task
export const updateStatus = async (data) => {
  try {
    const response = await api.post("taskstates", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};