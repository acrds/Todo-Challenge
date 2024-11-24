import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
  }
};

export const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token;
    } catch (error) {
      console.error("Erro ao recuperar o token:", error);
      return null;
    }
  };
  
  export const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
    } catch (error) {
      console.error("Erro ao remover o token:", error);
    }
  };