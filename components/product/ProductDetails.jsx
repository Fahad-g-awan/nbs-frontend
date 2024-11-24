"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { getProductsApi } from "../utilis/api/productsApi";
import { useAppHook } from "../utilis/hooks/AppHook";
import Link from "next/link";

const ProductDetails = ({ params }) => {
  const [currentImage, setCurrentImage] = useState("");
  const [product, setProduct] = useState(null);

  const { dispatch, state } = useAppHook();
  const { id } = useParams(params);

  const fetchProduct = async () => {
    try {
      dispatch({ type: "SET_IS_LOADING", payload: true });

      const allProducts = await getProductsApi();
      const foundProduct = allProducts.find((prod) => prod.id === Number(id));

      setProduct(foundProduct);
      setCurrentImage(foundProduct?.image_url[0]);
    } catch (error) {
      console.error("Error fetching product:", error);

      toast.error(
        "Something went wrong, pelase try again or refresh the page.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }

    dispatch({ type: "SET_IS_LOADING", payload: false });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div className="p-10">
      {/* Back Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Details</h1>
        <Link
          href={"/"}
          className="flex items-center gap-2 mb-6 text-blue-500 hover:text-blue-700 transition"
        >
          Back To Products
        </Link>
      </div>

      {product && (
        <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
          {/* Left Side: Images */}
          <div className="flex flex-col items-center lg:w-1/2">
            {/* Main Image */}
            <div className="w-full max-w-lg h-96 bg-gray-100 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden shadow-md">
              <img
                src={currentImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto mt-4">
              {product.image_url.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                    currentImage === image
                      ? "border-blue-500"
                      : "border-gray-300"
                  } hover:shadow-lg transition`}
                  onClick={() => setCurrentImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="flex-1 lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-blue-600 mb-3">
              ${product.price}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Category:{" "}
              <span className="">{product.metadata.category.category}</span>
            </p>

            {/* Additional Details */}
            <div className="space-y-4 mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Make:</span>{" "}
                {product.metadata.make || "No Make Date Available"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Material:</span>{" "}
                {product.metadata.materialCategory[0].material || "Not Rated"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Style:</span>{" "}
                {product.metadata.style[0].style || "Not Rated"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Space Association:</span>{" "}
                {product.metadata.spaceAssociations[0].type || "Not Rated"}
              </p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
