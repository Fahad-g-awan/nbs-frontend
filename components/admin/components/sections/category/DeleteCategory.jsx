import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

import { useAppHook } from "@/components/utilis/hooks/AppHook";

const DeleteCategory = ({
  category,
  closeModal,
  fetchCategories,
  metadata,
}) => {
  const { dispatch, state } = useAppHook();

  const handleDeleteCategory = async () => {
    dispatch({ type: "SET_IS_LOADING", payload: true });

    try {
      if (!category) {
        throw new Error("Missing category ID");
      }
      await axios.delete(
        `http://localhost:5000/api/${metadata.api}/${category.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchCategories();

      toast.success("Category deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error deleting category", error);

      toast.error(error.message || "Something went wrong, Please try again.", {
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
    <div className="container mx-auto p-4">
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete the category </p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => closeModal()}
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCategory}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
