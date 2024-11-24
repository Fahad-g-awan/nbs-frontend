import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import AddOrUpdateProduct from "./AddOrUpdateProduct";
import DeleteProduct from "./DeleteProduct";
import ProductList from "./ProductList.";
import { getProductsApi } from "@/components/utilis/api/productsApi";

const Product = () => {
  const [editProduct, setEditProduct] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [title, setTitle] = useState("All Products");

  const [deleteProduct, setDeleteProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const router = useRouter();

  const fetchProducts = async () => {
    const res = await getProductsApi();
    setProducts(res.length ? res : []);
  };

  const handleTitleAndSection = (newTitle) => {
    setAddProduct(false);
    setEditProduct(false);

    if (newTitle === "Add Product") {
      setAddProduct(true);
    } else if (newTitle === "Edit Product") {
      setEditProduct(true);
    }

    setTitle(newTitle);
  };

  const handleEditClick = (product) => {
    setProduct(product);
    setEditProduct(true);
  };

  const handleDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProduct(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signin");
    }

    fetchProducts();
  }, []);

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <button
          onClick={() =>
            handleTitleAndSection(
              title === "All Products"
                ? "Add Product"
                : title === "Add Product"
                ? "All Products"
                : "All Products"
            )
          }
          className="flex justify-center items-center"
        >
          <span>
            {title === "All Products"
              ? "Add Product"
              : title === "Add Product" || title === "Edit Product"
              ? "All Products"
              : ""}
          </span>
        </button>
      </div>

      {addProduct || editProduct ? (
        <AddOrUpdateProduct
          setEditProduct={setEditProduct}
          setAddProduct={setAddProduct}
          fetchProducts={fetchProducts}
          editProduct={editProduct}
          addProduct={addProduct}
          product={product}
        />
      ) : (
        <ProductList
          handleTitleAndSection={handleTitleAndSection}
          handleDeleteProduct={handleDeleteProduct}
          handleEditClick={handleEditClick}
          products={products}
        />
      )}

      {deleteProduct && (
        <DeleteProduct
          closeModal={() => setDeleteProduct(false)}
          fetchProducts={fetchProducts}
          product={product}
        />
      )}
    </div>
  );
};

export default Product;
