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
    console.log("responseeee: ", response.data)
    return response.data;
  } catch (error) {
    console.error("Error in log in user:", error);
    throw error;
  }
};