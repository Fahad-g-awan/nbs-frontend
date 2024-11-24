import api from "./api";

export const userApi = async (data) => {
  try {
    let response = await api.post("/user", data);
    console.log("User API response", response.data);

    return response.data.user;
  } catch (error) {
    console.log("User API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};
