"use client";

import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { quotationApi } from "@/components/utilis/api/quotationApi";
import { useAppHook } from "@/components/utilis/hooks/AppHook";
import { userApi } from "@/components/utilis/api/userApi";

const ProductCart = ({ closeCart, cart, setCart }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { dispatch, state } = useAppHook();
  const router = useRouter();

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleGetQuoatation = async (e) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    e.preventDefault();

    try {
      let requiredCart = cart.map(({ name, quantity, price }) => ({
        item: name,
        quantity,
        price,
      }));
      console.log("Clicked before sending data cart", requiredCart);

      let quotationResponse;
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        let userId = user.id;

        quotationResponse = await quotationApi({
          user_id: userId,
          cart: requiredCart,
          total: getTotal(),
        });
        console.log("quotationResponse", quotationResponse);

        if (quotationResponse) {
          localStorage.setItem("quotation", JSON.stringify(quotationResponse));

          router.push(`/products/quotation`);
        }
      } else {
        dispatch({ type: "SET_IS_LOADING", payload: false });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error while getting quotation", message);
      dispatch({ type: "SET_IS_LOADING", payload: false });
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
  };

  const handleCreateUserAndGetQuoatation = async (e) => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    e.preventDefault();

    try {
      let requiredCart = cart.map(({ name, quantity, price }) => ({
        item: name,
        quantity,
        price,
      }));
      console.log("Clicked before sending data cart", requiredCart);

      const user = await userApi({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        user_type: "user",
      });
      console.log("data of create user:", user);

      localStorage.setItem("user", JSON.stringify(user));

      const userId = user.id;

      let quotationResponse = await quotationApi({
        user_id: userId,
        cart: requiredCart,
        total: getTotal(),
      });

      if (quotationResponse) {
        localStorage.setItem("quotation", JSON.stringify(quotationResponse));

        router.push(`/products/quotation`);
      }
    } catch (error) {
      console.error("Error while getting quotation:", message);
      dispatch({ type: "SET_IS_LOADING", payload: false });
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

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="fixed top-0 right-0 w-1/3 bg-white h-full p-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Cart</h2>
          <button className="px-5 py-2" onClick={closeCart}>
            X
          </button>
        </div>
        <div className="mb-4">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div>{item.name}</div>
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="border p-1 w-16 text-center"
                  />
                </div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mb-4 font-semibold">
          Total: ${getTotal().toFixed(2)}
        </div>

        <button
          onClick={handleGetQuoatation}
          disabled={cart.length === 0}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Get Quotation
        </button>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center bg-[rgba(0,0,0,.8)] min-h-screen">
          <div className="bg-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Enter Details</h2>
              <button
                className="px-5 py-2"
                onClick={() => setIsModalOpen(false)}
              >
                X
              </button>
            </div>
            <form action="" onSubmit={handleCreateUserAndGetQuoatation}>
              <input
                type="text"
                placeholder="Name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                className="border p-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Phone"
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
                className="border p-2 w-full mb-4"
              />
              <input
                type="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                className="border p-2 w-full mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Check Your Quotations
              </button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductCart;
