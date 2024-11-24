"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import { getProductsApi } from "../utilis/api/productsApi";
import ProductFitlers from "./components/ProductFilters";
import { useAppHook } from "../utilis/hooks/AppHook";
import ProductList from "./components/ProductList";
import ProductCart from "./components/ProductCart";
import Navbar from "./components/Navbar";
import { toast } from "react-toastify";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const { dispatch, state } = useAppHook();

  const fetchProducts = async () => {
    try {
      dispatch({ type: "SET_IS_LOADING", payload: true });

      const res = await getProductsApi();

      setAllProducts(res);
      setFilteredProducts(res);
    } catch (error) {
      console.log("Error while getting products", error);

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

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full  flex flex-col items-center justify-start">
      <Navbar
        itemQuantity={cart.length}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />
      <div className="w-full flex items-start justify-center mb-28">
        <ProductFitlers
          setFilteredProducts={setFilteredProducts}
          filteredProducts={filteredProducts}
          allProducts={allProducts}
        />
        <ProductList
          filteredProducts={filteredProducts}
          addToCart={addToCart}
          cart={cart}
        />
      </div>

      {isCartOpen && (
        <ProductCart
          closeCart={() => setIsCartOpen(false)}
          setCart={setCart}
          cart={cart}
        />
      )}
    </div>
  );
};

export default Products;
