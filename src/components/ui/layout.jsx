import React, { useState, useEffect, useContext } from "react";
import "./layout.css";
import { useLocation } from "react-router";
import { LoadingContext } from "../../contexts/loadingContext";
import Loader from "./loader";
import SideNav from "./SideNav";
import Page from "./Page";
export default function Layout({ children, links }) {
  // const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return (
    <div className="flex w-screen h-screen bg-gray-900 ">
      <SideNav links={links} />
      <div className="w-full h-full">
        {isLoading && (
          <div className="h-full flex justify-center items-center">
            <Loader />
          </div>
        )}
        <div
          className={
            (isLoading ? "content-hidden" : "content-visible") +
            " h-full w-full overflow-y-auto flex-auto px-10 py-10"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}