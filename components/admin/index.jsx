"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SectionContent from "./components/SectionContent";
import Sidebar from "./components/Sidebar";
import { useAppHook } from "../utilis/hooks/AppHook";

const AdminIndex = () => {
  const [activeSection, setActiveSection] = useState("Products");

  const { dispatch, state } = useAppHook();
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/signin");
    } else {
      dispatch({ type: "SET_IS_LOADING", payload: false });
    }
  }, []);

  return (
    <div className="flex">
      <div className="w-[25%]">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      <div className="w-[75%] flex-1 bg-gray-100 min-h-screen overflow-y-auto">
        <SectionContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default AdminIndex;
