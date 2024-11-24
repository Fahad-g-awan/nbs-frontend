import api from "./api";

export const getProductsApi = async () => {
  try {
    let response = await api.get("/products");
    console.log("Products API response", response.data);

    return response.data;
  } catch (error) {
    console.log("Products API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};
