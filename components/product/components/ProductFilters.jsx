"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { filtersApi } from "@/components/utilis/api/filtersApi";

const ProductFitlers = ({
  filteredProducts = [],
  allProducts = [],
  setFilteredProducts,
}) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState({
    id: "",
    category: "",
    subCategory: "",
  });
  const [dropdownData, setDropdownData] = useState({
    mainCategory: [],
    subCategory: [],
    spaceAssociation: [],
    styleCategory: [],
    materialCategory: [],
    additionalFeatures: [],
  });
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  const fetchFiltersData = async () => {
    try {
      const [
        mainCategory,
        spaceAssociation,
        styleCategory,
        materialCategory,
        additionalFeatures,
      ] = await filtersApi();

      mainCategory.data.unshift({
        id: "All",
        category: "All",
        subCategory: "All",
      });
      spaceAssociation.data.unshift({
        id: "All",
        type: "All",
      });
      styleCategory.data.unshift({
        id: "All",
        style: "All",
      });
      materialCategory.data.unshift({
        id: "All",
        material: "All",
      });

      additionalFeatures.data.unshift({
        id: "All",
        feature: "All",
      });

      setDropdownData({
        mainCategory: mainCategory.data,
        spaceAssociation: spaceAssociation.data,
        styleCategory: styleCategory.data,
        materialCategory: materialCategory.data,
        additionalFeatures: additionalFeatures.data,
      });
    } catch (error) {
      console.log("Error fetching dropdown data:", error);

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
  };

  useEffect(() => {
    fetchFiltersData();
  }, []);

  console.log("filteredProducts", filteredProducts);
  console.log("allProducts", allProducts);

  return (
    <div className="w-[25%] flex flex-col items-start justify-start gap-4 text-sm px-5">
      {/* Main Category Dropdown */}
      <div>
        <label
          className="block font-semibold text-gray-700 mb-1"
          htmlFor="mainCategory"
        >
          Main Category
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="mainCategory"
          onChange={(e) => {
            let filter = e.target.value;
            console.log("filter", filter);
            let foundProducts;

            if (filter == "All") {
              setFilteredProducts(allProducts);
              return;
            }

            const selectedCategory = dropdownData.mainCategory.find(
              (category) => category.category === e.target.value
            );
            let category = {
              id: selectedCategory.id,
              category: selectedCategory.category,
              subCategory: "",
            };
            setSelectedMainCategory(category);

            foundProducts = allProducts.filter(
              (product) => product.metadata.category.category == filter
            );
            setFilteredProducts(foundProducts);
          }}
        >
          <option value="" disabled>
            Select Main Category
          </option>
          {dropdownData.mainCategory.map((category) => (
            <option key={category.id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      {/* Sub Category Dropdown */}
      <div>
        <label
          className="block font-semibold text-gray-700 mb-1"
          htmlFor="subCategory"
        >
          Sub Category
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="subCategory"
          onChange={(e) => {
            let filter = e.target.value;
            console.log("filter", filter);
            if (filter == "All") {
              setFilteredProducts(allProducts);
              return;
            }

            let foundProducts;
            if (filteredProducts.length > 0) {
              foundProducts = filteredProducts.filter(
                (product) => product.metadata.category.subCategory == filter
              );
            } else {
              foundProducts = allProducts.filter(
                (product) => product.metadata.category.subCategory == filter
              );
            }

            setFilteredProducts(foundProducts);
          }}
          disabled={!selectedMainCategory.category}
        >
          <option value="">Select Sub Category</option>
          {selectedMainCategory.category &&
            dropdownData.mainCategory
              .find((category) => category.id === selectedMainCategory.id)
              ?.sub_categories.map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
        </select>
      </div>

      {/* Space Association Dropdown */}
      <div>
        <label
          className="block font-semibold text-gray-700 mb-1"
          htmlFor="spaceAssociation"
        >
          Space Association
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="spaceAssociation"
          onChange={(e) => {
            let filter = e.target.value;
            console.log("filter", filter);
            if (filter == "All") {
              setFilteredProducts(allProducts);
              return;
            }

            let foundProducts;
            if (filteredProducts.length > 0) {
              foundProducts = filteredProducts.filter((product) =>
                product.metadata.spaceAssociations.some(
                  (item) => item.type == filter
                )
              );
            } else {
              foundProducts = allProducts.filter((product) =>
                product.metadata.spaceAssociations.some(
                  (item) => item.type == filter
                )
              );
            }

            setFilteredProducts(foundProducts);
          }}
        >
          <option value="" disabled>
            Select Space Association
          </option>
          {dropdownData.spaceAssociation.map((space) => (
            <option key={space.id} value={space.type}>
              {space.type}
            </option>
          ))}
        </select>
      </div>

      {/* style category */}
      <div>
        <label
          className="block font-semibold text-gray-700 mb-1"
          htmlFor="spaceAssociation"
        >
          Style Category
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="spaceAssociation"
          onChange={(e) => {
            let filter = e.target.value;
            console.log("filter", filter);
            if (filter == "All") {
              setFilteredProducts(allProducts);
              return;
            }
            let foundProducts;
            if (filteredProducts.length > 0) {
              foundProducts = filteredProducts.filter((product) =>
                product.metadata.style.some((item) => item.style == filter)
              );
            } else {
              foundProducts = allProducts.filter((product) =>
                product.metadata.style.some((item) => item.style == filter)
              );
            }
            setFilteredProducts(foundProducts);
          }}
        >
          <option value="" disabled>
            Select Style Category
          </option>
          {dropdownData.styleCategory.map((ctg) => (
            <option key={ctg.id} value={ctg.style} className="">
              {ctg.style}
            </option>
          ))}
        </select>
      </div>

      {/* material */}
      <div>
        <label
          className="block font-semibold text-gray-700 mb-1"
          htmlFor="spaceAssociation"
        >
          Material Categories
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="material"
          onChange={(e) => {
            let filter = e.target.value;
            console.log("filter", filter);
            if (filter == "All") {
              setFilteredProducts(allProducts);
              return;
            }

            let foundProducts;
            if (filteredProducts.length > 0) {
              foundProducts = filteredProducts.filter((product) =>
                product.metadata.materialCategory.some(
                  (item) => item.material == filter
                )
              );
            } else {
              foundProducts = allProducts.filter((product) =>
                product.metadata.materialCategory.some(
                  (item) => item.material == filter
                )
              );
            }

            setFilteredProducts(foundProducts);
          }}
        >
          <option value="" disabled>
            Select Material Category
          </option>
          {dropdownData.materialCategory.map((ctg) => (
            <option key={ctg.id} value={ctg.material} className="">
              {ctg.material}
            </option>
          ))}
        </select>
      </div>

      {/* Add features */}
      <div>
        <label
          className="block font-semibold text-gray-700 mb-1"
          htmlFor="spaceAssociation"
        >
          Additional Features
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="spaceAssociation"
          onChange={(e) => {
            let filter = e.target.value;
            console.log("filter", filter);
            if (filter == "All") {
              setFilteredProducts(allProducts);
              return;
            }
            let foundProducts;
            if (filteredProducts.length > 0) {
              foundProducts = filteredProducts.filter((product) =>
                product.metadata.features.some((item) => item.feature == filter)
              );
            } else {
              foundProducts = allProducts.filter((product) =>
                product.metadata.features.some((item) => item.feature == filter)
              );
            }

            setFilteredProducts(foundProducts);
          }}
        >
          <option value="" disabled>
            Select Material Category
          </option>
          {dropdownData.additionalFeatures.map((ctg) => (
            <option key={ctg.id} value={ctg.feature} className="">
              {ctg.feature}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div>
          {/* Make Dropdown */}
          <label className="block font-semibold text-gray-700 mb-1">
            Select Make
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            // onChange={(e) => setMake(e.target.value)}
            onChange={(e) => {
              let filter = e.target.value;
              console.log("filter", filter);
              if (filter == "All") {
                setFilteredProducts(allProducts);
                return;
              }
              let foundProducts;
              if (filteredProducts.length > 0) {
                foundProducts = filteredProducts.filter(
                  (product) => product.metadata.make == filter
                );
              } else {
                foundProducts = allProducts.filter(
                  (product) => product.metadata.make == filter
                );
              }

              setFilteredProducts(foundProducts);
            }}
          >
            <option value="All">All</option>
            {allProducts.map((product) => (
              <option key={product.id} value={product.metadata.make}>
                {product.metadata.make}
              </option>
            ))}
          </select>

          <label className="block mt-3 font-semibold text-gray-700 mb-1">
            Select Color
          </label>
          {/* Color Dropdown */}
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            // onChange={(e) => setColor(e.target.value)}
            onChange={(e) => {
              let filter = e.target.value;
              console.log("filter", filter);
              if (filter == "All") {
                setFilteredProducts(allProducts);
                return;
              }
              let foundProducts;
              if (filteredProducts.length > 0) {
                foundProducts = filteredProducts.filter((product) =>
                  product.metadata.color.some((item) => item == filter)
                );
              } else {
                foundProducts = allProducts.filter((product) =>
                  product.metadata.color.some((item) => item == filter)
                );
              }

              setFilteredProducts(foundProducts);
            }}
          >
            <option value="All">All</option>
            {allProducts.map((product) =>
              product.metadata.color.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))
            )}
          </select>

          {/* Price Range Inputs */}
          <label className="block mt-3 font-semibold text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => {
                // if (!minPrice) {
                //   setFilteredProducts(allProducts);
                //   return;
                // }
                let foundProducts;

                // Check if either minPrice or maxPrice is defined
                if (minPrice > 0 || maxPrice > 0) {
                  foundProducts = filteredProducts.filter((product) => {
                    // Apply both min and max filters if both are provided
                    if (minPrice > 0 && maxPrice > 0) {
                      return (
                        product.price >= minPrice && product.price <= maxPrice
                      );
                    }
                    // Apply only min filter if minPrice is provided
                    if (minPrice > 0) {
                      return product.price >= minPrice;
                    }
                    // Apply only max filter if maxPrice is provided
                    if (maxPrice > 0) {
                      return product.price <= maxPrice;
                    }
                    return true; // Default case (shouldn't happen)
                  });
                } else {
                  // If no min or max is defined, use all products
                  // foundProducts = allProducts;
                }

                setFilteredProducts(foundProducts);
              }}
            >
              Set Price Range
            </button>
            {/* <button >Rest Price Range</button> */}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setFilteredProducts(allProducts);
          setMinPrice("");
          setMaxPrice("");
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFitlers;
