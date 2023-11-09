import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Loader from "./loader";
import SideNav from "./SideNav";
export default function Layout({ children, links }) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
  }, [location]);

  return (
    <div className="flex w-screen h-screen overflow-y-hidden dark:bg-gray-900 ">
      <SideNav links={links} />
      <div className="w-full h-full overflow-y-auto ">
        {isLoading && (
          <div className="h-full flex justify-center items-center">
            <Loader />
          </div>
        )}

        {!isLoading && (
          <div
            className={
              "w-full flex-auto px-4 md:px-10 py-10"

              // " h-full w-full overflow-y-auto flex-auto px-4 md:px-10 py-10"
            }
          >
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
