"use client";

import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useAppHook } from "@/components/utilis/hooks/AppHook";

const Quotation = () => {
  const [quotation, setQuotation] = useState({
    name: "",
    phone: "",
    email: "",
    cart: [],
  });

  const { dispatch, state } = useAppHook();

  useEffect(() => {
    let quotation = JSON.parse(localStorage.getItem("quotation"));

    const name = quotation.name;
    const phone = quotation.phone;
    const email = quotation.email;
    const cart = quotation.data;

    setQuotation({
      name,
      phone,
      email,
      cart,
    });

    dispatch({ type: "SET_IS_LOADING", payload: false });
  }, []);

  const getTotal = () => {
    return quotation.cart.length
      ? quotation.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      : 0;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text(`Quotation for ${quotation.name}`, 10, 10);
    doc.text(`Phone: ${quotation.phone}`, 10, 20);
    doc.text(`Email: ${quotation.email}`, 10, 30);
    doc.text("Products:", 10, 40);

    let yOffset = 50;
    quotation.cart.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - Quantity: ${item.quantity} - Price: $${
          item.price
        }`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    doc.text(`Total: $${getTotal().toFixed(2)}`, 10, yOffset + 10);
    doc.save("quotation.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {quotation.cart.length && (
        <div className="bg-white p-6 rounded shadow-md w-1/3">
          <h1 className="text-xl font-bold mb-4">Quotation Details</h1>
          <p className="mb-2">
            <strong>Name:</strong> {quotation.name}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {quotation.phone}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {quotation.email}
          </p>

          <h2 className="text-lg font-bold mt-4">Products:</h2>
          <ul className="list-disc pl-5">
            {quotation.cart.map((item, index) => (
              <li key={index}>
                {item.item} - Quantity: {item.quantity} - Price: ${item.price}
              </li>
            ))}
          </ul>

          <p className="mt-4 font-bold">Total: ${getTotal().toFixed(2)}</p>

          <button
            onClick={downloadPDF}
            className="bg-blue-500 text-white p-2 rounded w-full mt-4"
          >
            Download Quotation
          </button>
        </div>
      )}
    </div>
  );
};

export default Quotation;
