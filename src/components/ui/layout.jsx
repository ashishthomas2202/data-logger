import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Loader from "./loader";
import SideNav from "./SideNav";
export default function Layout({ children, links }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return (
    <div className="flex w-screen h-screen overflow-y-hidden dark:bg-gray-900 ">
      <SideNav links={links} />
      <div className="w-full h-full">
        {isLoading && (
          <div className="h-full flex justify-center items-center">
            <Loader />
          </div>
        )}

        <div
          className={
            (isLoading ? "invisible" : "visible") +
            " h-full w-full overflow-y-auto flex-auto px-4 md:px-10 py-10"
          }
        >
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </div>
    </div>
  );
}
