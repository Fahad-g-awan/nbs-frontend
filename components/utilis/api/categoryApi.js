import api from "./api";

export const getCategoryApi = async (endpoint) => {
  try {
    console.log("endpoint", endpoint);
    let response = await api.get(`${endpoint}`);
    console.log("Category API response", response.data);

    return response.data;
  } catch (error) {
    console.log("Category API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};

export const createCategoryApi = async (endpoint, data) => {
  try {
    let response = await api.post(`${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Category API response", response.data);

    return response.data;
  } catch (error) {
    console.log("Category API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};

export const updateCategoryApi = async (endpoint, data) => {
  try {
    let response = await api.put(`${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Category API response", response.data);

    return response.data;
  } catch (error) {
    console.log("Category API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};

export const deleteCategoryApi = async (endpoint) => {
  try {
    let response = await api.delete(`${endpoint}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Category API response", response.data);

    return response.data;
  } catch (error) {
    console.log("Category API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};
