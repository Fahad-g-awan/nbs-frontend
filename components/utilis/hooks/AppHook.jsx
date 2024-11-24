"use client";

import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

// Css
import "react-toastify/dist/ReactToastify.css";

// Initiali states used in reducer
const initialState = {
  isLoading: false,
  showEditWorkDays: false,
  showAddApt: false,
  aptAdded: false,
  profileUpdated: false,
  workDaysUpdated: false,
};

// Create context with a default value
export const AppContext = createContext();

// Reducer function to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

// Hook to manage state with useReducer
const AppHookComp = () => {
  const [session, setSession] = useState();

  const [state, dispatch] = useReducer(reducer, initialState);
  const pathname = usePathname();

  // Set session
  useEffect(() => {
    if (typeof window !== "undefined") {
      let _session = JSON.parse(localStorage.getItem("session"));
      if (_session) {
        setSession(_session);
      }
    }
  }, [pathname]);

  return {
    state,
    dispatch,
  };
};

/**
 * AppContextProvider component that wraps its children with the context provider.
 *
 * @param params - Destructures 'children', representing the nested components to be rendered within the context provider.
 *
 * @returns A context provider that passes down the values from 'appHookComp' to its children.
 */
const AppContextProvider = ({ children }) => {
  const appContext = AppHookComp();

  return (
    <AppContext.Provider value={appContext}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppHook = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppHook must be used within an AppContextProvider");
  }

  return context;
};

export default AppContextProvider;
