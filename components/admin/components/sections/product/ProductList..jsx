import React from "react";

const ProductList = ({
  handleTitleAndSection,
  handleEditClick,
  handleDeleteProduct,
  products,
}) => {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 border border-gray-300">Image</th>
          <th className="px-4 py-2 border border-gray-300">Name</th>
          <th className="px-4 py-2 border border-gray-300">Description</th>
          <th className="px-4 py-2 border border-gray-300">Price</th>
          <th className="px-4 py-2 border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-4 py-2 border border-gray-300">
              <img
                src={product.image_url[0]}
                alt={product.name}
                className="h-20"
              />
            </td>
            <td className="px-4 py-2 border border-gray-300">{product.name}</td>
            <td className="px-4 py-2 border border-gray-300">
              {product.description}
            </td>
            <td className="px-4 py-2 border border-gray-300">
              ${product.price}
            </td>
            <td className="px-4 py-2 border border-gray-300">
              <button
                onClick={() => {
                  handleTitleAndSection("Edit Product");
                  handleEditClick(product);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
