import api from "./api";

export const quotationApi = async (data) => {
  try {
    let response = await api.post("/quotations", data);
    console.log("Quotations API response", response.data);

    return response.data.quotation;
  } catch (error) {
    console.log("Quotations API error", error);

    throw new Error(
      error?.response?.data || "Something went wrong, please try again"
    );
  }
};
