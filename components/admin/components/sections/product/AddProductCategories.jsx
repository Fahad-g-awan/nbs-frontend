import React from "react";

import { X } from "lucide-react";

const AddProductCategories = ({
  dropdownData,
  selectedMainCategory,
  setSelectedMainCategory,
  setSelectedSpaceAss,
  selectedSpaceAss,
  setSelectedStyleCategories,
  selectedStyleCategories,
  setSelectedMaterialCategories,
  selectedMaterialCategories,
  setSelectedAddFeatures,
  selectedAddFeatures,
}) => {
  return (
    <div className="w-full">
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
          value={selectedMainCategory.category || ""}
          onChange={(e) => {
            const selectedCategory = dropdownData.mainCategory.find(
              (category) => category.category === e.target.value
            );

            if (selectedCategory) {
              let category = {
                id: selectedCategory.id,
                category: selectedCategory.category,
                subCategory: "",
              };
              setSelectedMainCategory(category);
            }
          }}
        >
          <option value="">Select Main Category</option>
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
          value={selectedMainCategory.subCategory || ""}
          onChange={(e) => {
            if (e.target.value.includes("Select")) return;
            setSelectedMainCategory({
              ...selectedMainCategory,
              subCategory: e.target.value,
            });
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
            let spaceAss = selectedSpaceAss;

            if (!spaceAss.some((space) => space.type == e.target.value)) {
              let selectedSA = dropdownData.spaceAssociation.find(
                (space) => space.type == e.target.value
              );
              setSelectedSpaceAss([...spaceAss, selectedSA]);
            }
          }}
          multiple
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

        <div className="w-full flex flex-col gap-2 mt-3">
          {selectedSpaceAss?.map((space) => (
            <div
              key={space.type}
              className="w-full px-2 p-2 rounded-md bg-gray-300 text-gray-700 relative"
            >
              <span>{space.type}</span>
              <X
                className="absolute size-4 text-red-600 right-2 top-2 cursor-pointer"
                onClick={() => {
                  let spaceAss = [...selectedSpaceAss];
                  spaceAss = spaceAss.filter((sa) => sa.id != space.id);
                  setSelectedSpaceAss(spaceAss);
                }}
              />
            </div>
          ))}
        </div>
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
            let category = selectedStyleCategories;

            if (!category.some((ctg) => ctg.style == e.target.value)) {
              let selectedCtg = dropdownData.styleCategory.find(
                (ctg) => ctg.style == e.target.value
              );
              setSelectedStyleCategories([...category, selectedCtg]);
            }
          }}
          multiple
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

        <div className="w-full flex flex-col gap-2 mt-3">
          {selectedStyleCategories?.map((ctg) => (
            <div
              key={ctg.style}
              className="w-full px-2 p-2 rounded-md bg-gray-300 text-gray-700 relative"
            >
              <span>{ctg.style}</span>
              <X
                className="absolute size-4 text-red-600 right-2 top-2 cursor-pointer"
                onClick={() => {
                  let stleCtg = [...selectedStyleCategories];
                  stleCtg = stleCtg.filter((c) => c.id != ctg.id);
                  setSelectedStyleCategories(stleCtg);
                }}
              />
            </div>
          ))}
        </div>
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
          id="spaceAssociation"
          onChange={(e) => {
            let categories = selectedMaterialCategories;

            if (!categories.some((ctg) => ctg.material == e.target.value)) {
              let selectedCtg = dropdownData.materialCategory.find(
                (ctg) => ctg.material == e.target.value
              );
              setSelectedMaterialCategories([...categories, selectedCtg]);
            }
          }}
          multiple
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

        <div className="w-full flex flex-col gap-2 mt-3">
          {selectedMaterialCategories?.map((ctg) => (
            <div
              key={ctg.material}
              className="w-full px-2 p-2 rounded-md bg-gray-300 text-gray-700 relative"
            >
              <span>{ctg.material}</span>
              <X
                className="absolute size-4 text-red-600 right-2 top-2 cursor-pointer"
                onClick={() => {
                  let stleCtg = [...selectedMaterialCategories];
                  stleCtg = stleCtg.filter((c) => c.id != ctg.id);
                  setSelectedMaterialCategories(stleCtg);
                }}
              />
            </div>
          ))}
        </div>
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
            let categories = selectedAddFeatures;

            if (!categories.some((ctg) => ctg.feature == e.target.value)) {
              let selectedCtg = dropdownData.additionalFeatures.find(
                (ctg) => ctg.feature == e.target.value
              );
              setSelectedAddFeatures([...categories, selectedCtg]);
            }
          }}
          multiple
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

        <div className="w-full flex flex-col gap-2 mt-3">
          {selectedAddFeatures?.map((ctg) => (
            <div
              key={ctg.feature}
              className="w-full px-2 p-2 rounded-md bg-gray-300 text-gray-700 relative"
            >
              <span>{ctg.feature}</span>
              <X
                className="absolute size-4 text-red-600 right-2 top-2 cursor-pointer"
                onClick={() => {
                  let stleCtg = [...selectedAddFeatures];
                  stleCtg = stleCtg.filter((c) => c.id != ctg.id);
                  setSelectedAddFeatures(stleCtg);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductCategories;
