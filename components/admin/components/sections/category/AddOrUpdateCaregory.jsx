import axios from "axios";
import React, { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { toast } from "react-toastify";
import { useAppHook } from "@/components/utilis/hooks/AppHook";
import {
  createCategoryApi,
  updateCategoryApi,
} from "@/components/utilis/api/categoryApi";

const AddOrUpdateCategory = ({
  editCategory = false,
  addCategory = false,
  category = null,
  fetchCategories,
  setEditCategory,
  setAddCategory,
  metadata,
  setTitle,
}) => {
  const [subCategories, setSubCategories] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tags, setTags] = useState([]);

  const { dispatch, state } = useAppHook();

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newTag = subCategories.trim();

      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }

      setSubCategories("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleApiRequest = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_IS_LOADING", payload: true });

    if (subCategories.trim() !== "") {
      toast.error("Please press ',' to add the subcategory before updating", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    let apiMethod = null;
    let payload = null;
    let apiUrl = "";

    if (metadata.field == "category" && (addCategory || editCategory)) {
      payload = {
        category: categoryName,
        sub_categories: tags,
      };
    } else {
      if (addCategory) {
        payload = {
          [metadata.apiField]: tags,
        };
      } else {
        payload = {
          [metadata.apiField]: categoryName,
        };
      }
    }

    try {
      let res;

      if (addCategory) {
        apiUrl = `${metadata.api}`;
        res = await createCategoryApi(apiUrl, payload);
      } else if (editCategory) {
        apiUrl = `${metadata.api}/${category.id}`;
        res = await updateCategoryApi(apiUrl, payload);
      }

      if (res) {
        await fetchCategories();
      } else {
        throw new Error("Something went wrong");
      }

      let msg = addProduct
        ? "Category added successfully!"
        : "Category updated successfully!";
      toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log("Error updating category", err);

      toast.error("Something went wrong, please try again", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setTitle("Add Category");
    setEditCategory(false);
    setAddCategory(false);

    dispatch({ type: "SET_IS_LOADING", payload: false });
  };

  useEffect(() => {
    if (category) {
      if (metadata.field == "category") {
        setTags(category.sub_categories);
      }
      setCategoryName(category[metadata.field]);
    }
  }, [category]);

  useEffect(() => {
    if (addCategory) {
      setCategoryName("");
      setTags([]);
    }
  }, [addCategory]);

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleApiRequest}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {(metadata.subCategory || editCategory) && (
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter category name"
              required
            />
          </div>
        )}

        {(metadata.subCategory || addCategory) && (
          <div className="mb-4">
            <label
              htmlFor="subCategories"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {metadata.field === "category"
                ? "Sub-Categories (comma-separated)"
                : "Add Categories"}
            </label>

            <div className="tag-input-container">
              <div className="tags flex flex-wrap gap-2 mb-2">
                {tags.length > 0 &&
                  tags.map((tag, index) => (
                    <div
                      className="tag flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                      key={index}
                    >
                      {tag}
                      <button
                        className="ml-2 text-red-500 hover:text-red-700"
                        onClick={() => removeTag(tag)}
                        type="button"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
              </div>
              <input
                type="text"
                id="subCategories"
                value={subCategories}
                onChange={(e) => setSubCategories(e.target.value)}
                onKeyDown={handleKeyDown}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter categories and press 'Enter' or ',' key"
                // required
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editCategory ? "Update Category" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrUpdateCategory;
