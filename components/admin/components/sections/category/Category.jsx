import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { useAppHook } from "@/components/utilis/hooks/AppHook";
import AddOrUpdateCategory from "./AddOrUpdateCaregory";
import DeleteCategory from "./DeleteCategory";
import CategoryList from "./CategoryList";

const Category = ({ metadata }) => {
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [title, setTitle] = useState("All Categories");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const { dispatch, state } = useAppHook();

  const fetchCategories = async () => {
    dispatch({ type: "SET_IS_LOADING", payload: true });

    try {
      const res = await axios.get(`http://localhost:5000/api/${metadata.api}`);
      setCategories(res.data);
      console.log("res", res.data);
    } catch (error) {
      console.log("Error fetching categories:", error.message);

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

    dispatch({ type: "SET_IS_LOADING", payload: false });
  };

  const handleEditCategory = (category) => {
    setEditCategory(true);
    setCategory(category);
  };

  const handleDeleteCategory = (category) => {
    setDeleteCategory(true);
    setCategory(category);
  };

  const handleTitleAndSection = (newTitle) => {
    setAddCategory(false);
    setEditCategory(false);

    if (newTitle === "Add Category") {
      setAddCategory(true);
    } else if (newTitle === "Edit Category") {
      setEditCategory(true);
    }

    setTitle(newTitle);
  };

  useEffect(() => {
    fetchCategories();
  }, [metadata]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <button
          onClick={() =>
            handleTitleAndSection(
              title === "All Categories"
                ? "Add Category"
                : title === "Add Category"
                ? "All Categories"
                : "All Categories"
            )
          }
          className="flex justify-center items-center"
        >
          <span>
            {title === "All Categories"
              ? "Add Category"
              : title === "Add Category" || title === "Edit Category"
              ? "All Categories"
              : ""}
          </span>
        </button>
      </div>

      {editCategory || addCategory ? (
        <AddOrUpdateCategory
        fetchCategories={fetchCategories}
        setEditCategory={setEditCategory}
        setAddCategory={setAddCategory}
        editCategory={editCategory}
        addCategory={addCategory}
        category={category}
        metadata={metadata}
        setTitle={setTitle}
        />
      ) : (
        <CategoryList
          handleTitleAndSection={handleTitleAndSection}
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory}
          categories={categories}
          metadata={metadata}
        />
      )}

      {deleteCategory && (
        <DeleteCategory
          closeModal={() => setDeleteCategory(false)}
          fetchCategories={fetchCategories}
          category={category}
          metadata={metadata}
        />
      )}
    </div>
  );
};

export default Category;
