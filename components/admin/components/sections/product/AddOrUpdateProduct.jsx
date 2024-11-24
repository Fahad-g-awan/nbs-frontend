import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { useAppHook } from "@/components/utilis/hooks/AppHook";
import AddProductCategories from "./AddProductCategories";
import { filtersApi } from "@/components/utilis/api/filtersApi";
import {
  createProductsApi,
  updateProductsApi,
} from "@/components/utilis/api/productsApi";

const yearRegex = /^(19|20)\d{2}$/;

const AddOrUpdateProduct = ({
  fetchProducts,
  editProduct = false,
  addProduct = false,
  setEditProduct,
  setAddProduct,
  product = null,
}) => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const [existingImageURLs, setExistingImageURLs] = useState([]);
  const [newColor, setNewColor] = useState([]);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [make, setMake] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [selectedMainCategory, setSelectedMainCategory] = useState({
    id: "",
    category: "",
    subCategory: "",
  });
  const [selectedMaterialCategories, setSelectedMaterialCategories] = useState(
    []
  );
  const [selectedStyleCategories, setSelectedStyleCategories] = useState([]);
  const [selectedAddFeatures, setSelectedAddFeatures] = useState([]);
  const [selectedSpaceAss, setSelectedSpaceAss] = useState([]);

  const [dropdownData, setDropdownData] = useState({
    mainCategory: [],
    subCategory: [],
    spaceAssociation: [],
    styleCategory: [],
    materialCategory: [],
    additionalFeatures: [],
  });

  const { dispatch, state } = useAppHook();

  const fetchDropdownData = async () => {
    try {
      const [
        mainCategory,
        spaceAssociation,
        styleCategory,
        materialCategory,
        additionalFeatures,
      ] = await filtersApi();

      setDropdownData({
        mainCategory: mainCategory.data,
        spaceAssociation: spaceAssociation.data,
        styleCategory: styleCategory.data,
        materialCategory: materialCategory.data,
        additionalFeatures: additionalFeatures.data,
      });
    } catch (error) {
      console.log("Error fetching dropdown data:", error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...images, ...files].slice(0, 5);
    setImages(updatedImages);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitValidations = () => {
    if (!yearRegex.test(make)) {
      setErrorMessage("Please enter valid year");
      return true;
    } else {
      setErrorMessage("");
    }

    if (!selectedMainCategory.category) {
      setErrorMessage("Please select main category");
      return true;
    } else {
      setErrorMessage("");
    }

    if (!selectedMainCategory.subCategory) {
      setErrorMessage("Please select main sub category");
      return true;
    } else {
      setErrorMessage("");
    }

    if (selectedStyleCategories.length < 1) {
      setErrorMessage("Please select style category");
      return true;
    } else {
      setErrorMessage("");
    }

    if (selectedMaterialCategories.length < 1) {
      setErrorMessage("Please select material category");
      return true;
    } else {
      setErrorMessage("");
    }

    if (selectedAddFeatures.length < 1) {
      setErrorMessage("Please select additional features");
      return true;
    } else {
      setErrorMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      console.log("newColor", newColor);
      const color = newColor.trim();

      if (newColor && !colors.includes(newColor)) {
        setColors([...colors, color]); // Add new tag
      }

      setNewColor(""); // Clear input field
    }
  };

  const removeColor = (color) => {
    setColors(colors.filter((t) => t !== color));
  };

  const populateProductdataForUpdate = (productData) => {
    console.log("Populating product data:", productData);

    setName(productData.name || "");
    setDescription(productData.description || "");
    setPrice(productData.price || "");
    setExistingImageURLs(productData.image_url || []);
    setSelectedMainCategory(
      productData.metadata?.category || {
        id: "",
        category: "",
        subCategory: "",
      }
    );
    setSelectedStyleCategories(productData.metadata?.style || []);
    setSelectedSpaceAss(productData.metadata?.spaceAssociations || []);
    setSelectedMaterialCategories(productData.metadata?.materialCategory || []);
    setSelectedAddFeatures(productData.metadata?.features || []);
    setMake(productData.metadata?.make || "");
    setColors(productData.metadata?.color || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "SET_IS_LOADING", payload: true });

    if (submitValidations()) {
      console.log("Errors found!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);

    let metadata = {
      make: make,
      color: colors,
      materialCategory: selectedMaterialCategories,
      features: selectedAddFeatures,
      category: selectedMainCategory,
      spaceAssociations: selectedSpaceAss,
      style: selectedStyleCategories,
    };

    console.log("metadata", metadata);

    formData.append("metadata", JSON.stringify(metadata));

    images.forEach((image) => {
      formData.append("images", image);
    });

    if (existingImageURLs.length) {
      formData.append("existingImgUrls", JSON.stringify(existingImageURLs));
    }

    try {
      if (addProduct) {
        response = await createProductsApi(formData);
      } else if (editProduct) {
        response = await updateProductsApi(formData, product.id);
      }

      await fetchProducts();

      let msg = addProduct
        ? "Product added successfully!"
        : "Product updated successfully!";
      toast.success(msg, {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error creating product:", error);

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

    dispatch({ type: "SET_IS_LOADING", payload: false });
    setEditProduct(false);
    setAddProduct(false);
    setErrorMessage("");
    setImages([]);
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (product && editProduct) {
      populateProductdataForUpdate(product);
    }
  }, [product]);

  useEffect(() => {
    if (addProduct && !editProduct) {
      console.log("Clearing states");

      setName("");
      setDescription("");
      setPrice("");
      setMake("");
      setColors([]);
      setPrice("");
      setImages([]);
      setColors([]);
      setExistingImageURLs([]);
      setSelectedMainCategory({
        id: "",
        category: "",
        subCategory: "",
      });
      setSelectedMaterialCategories([]);
      setSelectedStyleCategories([]);
      setSelectedAddFeatures([]);
      setSelectedSpaceAss([]);
    }
  }, [addProduct]);

  useEffect(() => {
    setErrorMessage("");
    setImages([]);
  }, [editProduct]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [errorMessage]);

  console.log("editProduct", editProduct);
  console.log("addProduct", addProduct);
  console.log("product", product);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* price */}
        <div>
          <label htmlFor="price" className="block font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Make Year */}
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Product Make (Year)
          </label>
          <input
            type="text"
            id="year"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {make && !yearRegex.test(make) && (
            <div className="text-sm text-red-600">Please enter valid year</div>
          )}
        </div>

        {/* Add color */}
        <div className="mb-4">
          <label htmlFor="newType" className="block font-semibold mb-2">
            Add Colors
          </label>

          {/* Tags List */}
          <div className="tags flex flex-wrap gap-2 mb-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className="color flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {color}
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeColor(color)}
                  type="button"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <input
            type="text"
            id="newType"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            onKeyDown={handleKeyDown}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Type and press ',' to add colors"
          />
        </div>

        <AddProductCategories
          dropdownData={dropdownData}
          selectedMainCategory={selectedMainCategory}
          setSelectedMainCategory={setSelectedMainCategory}
          setSelectedSpaceAss={setSelectedSpaceAss}
          selectedSpaceAss={selectedSpaceAss}
          setSelectedStyleCategories={setSelectedStyleCategories}
          selectedStyleCategories={selectedStyleCategories}
          setSelectedMaterialCategories={setSelectedMaterialCategories}
          selectedMaterialCategories={selectedMaterialCategories}
          setSelectedAddFeatures={setSelectedAddFeatures}
          selectedAddFeatures={selectedAddFeatures}
        />

        {/* Image Picker */}
        <div>
          <label htmlFor="images" className="block font-semibold mb-1">
            Upload Images (up to 5)
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageUpload}
            className="w-full px-4 py-2 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-4 mt-4">
            {editProduct &&
              existingImageURLs.map((url) => (
                <div key={url} className="relative w-24 h-24">
                  <img
                    src={url}
                    alt={`Preview ${url}`}
                    className="w-full h-full object-cover rounded-md shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      let urls = existingImageURLs.filter(
                        (item) => item != url
                      );
                      setExistingImageURLs(urls);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                  >
                    &times;
                  </button>
                </div>
              ))}
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {addProduct && "Create Product"}
          {editProduct && "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default AddOrUpdateProduct;
