import api from "./api";

export const filtersApi = async () => {
  try {
    return await Promise.all([
      api.get("/category"),
      api.get("/spaces"),
      api.get("/style-category"),
      api.get("/material-category"),
      api.get("/features"),
    ]);
  } catch (error) {
    console.log("Filters API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};
