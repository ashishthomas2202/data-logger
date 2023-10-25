import React, { useState, useEffect, useContext } from "react";
import "./layout.css";
import { useLocation } from "react-router";
import { LoadingContext } from "../../contexts/loadingContext";
import Loader from "./loader";

export default function Layout({ children }) {
  // const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className={isLoading ? "content-hidden" : "content-visible"}>
        {children}
      </div>
    </div>
  );
}
