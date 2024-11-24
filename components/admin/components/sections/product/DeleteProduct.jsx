import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

import { useAppHook } from "@/components/utilis/hooks/AppHook";
import { deleteProductsApi } from "@/components/utilis/api/productsApi";

const DeleteProduct = ({ fetchProducts, product, closeModal }) => {
  const { dispatch, state } = useAppHook();

  const deleteProduct = async () => {
    dispatch({ type: "SET_IS_LOADING", payload: true });

    try {
      await deleteProductsApi(product.id);

      await fetchProducts();

      toast.success("Product Deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log("Error deleting product", error);

      toast.error("Something went wrong, please try again", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    closeModal();
    dispatch({ type: "SET_IS_LOADING", payload: false });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the category </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setIsOpenDeleteConfirmModal(false)}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={deleteProduct}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
