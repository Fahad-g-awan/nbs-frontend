import api from "./api";

export const adminSigninApi = async (data) => {
  try {
    let response = await api.post("/admin/signin", data);
    console.log("Signin API response", response.data);

    return response.data.data.token;
  } catch (error) {
    console.log("Signin API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};

export const createAdminApi = async (data) => {
  try {
    let response = await api.post("/admin/create", data);
    console.log("Signin API response", response.data);

    return response.data;
  } catch (error) {
    console.log("Signin API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};
