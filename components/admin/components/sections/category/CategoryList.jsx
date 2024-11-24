import React from "react";

const CategoryList = ({
  handleTitleAndSection,
  handleDeleteCategory,
  handleEditCategory,
  categories,
  metadata,
}) => {
  return (
    <div className="">
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="border p-4 bg-white">
              <div className="flex justify-between items-center">
                <h2 className="">{category[metadata.field]}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      handleTitleAndSection("Edit Category");
                      handleEditCategory(category);
                    }}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No categories available.</p>
      )}
    </div>
  );
};

export default CategoryList;
