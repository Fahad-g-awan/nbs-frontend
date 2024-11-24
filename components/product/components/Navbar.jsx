import React from "react";

const Navbar = ({ itemQuantity, toggleCart }) => {
  return (
    <div className="w-full flex justify-between items-center mb-4 px-10 py-3">
      <h1 className="text-2xl font-bold">Products</h1>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={toggleCart}
      >
        Cart ({itemQuantity})
      </button>
    </div>
  );
};

export default Navbar;
