"use client";

import React from "react";

import { useAppHook } from "@/components/utilis/hooks/AppHook";
import { useRouter } from "next/navigation";

const ProductList = ({ filteredProducts = [], addToCart, cart }) => {
  const { dispatch, state } = useAppHook();
  const router = useRouter();

  const handleProductClick = (id) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    router.push(`/products/${id}`);
  };

  return (
    <div className="w-[75%] grid grid-cols-3 gap-4 px-5">
      {filteredProducts.length < 1 && <>no products found</>}
      {filteredProducts.map((product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        return (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden">
                <img
                  src={product.image_url[0]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <h2 className="text-xl font-bold mt-4">{product.name}</h2>
              <p className="text-lg font-medium text-gray-600">
                {product.metadata.category.category}
              </p>
              <p className="text-gray-700 text-sm mb-2">
                {product.description}
              </p>
              <p className="text-lg font-semibold text-blue-600">
                ${product.price}
              </p>
            </div>

            <button
              className={`w-full p-2 rounded mt-4 ${
                productInCart
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition`}
              onClick={() => !productInCart && addToCart(product)}
              disabled={!!productInCart}
            >
              {productInCart
                ? `Added (${productInCart.quantity})`
                : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
