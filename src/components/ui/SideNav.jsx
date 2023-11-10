import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFileMedicalAlt } from "react-icons/fa";
export default function SideNav({ links }) {
  const location = useLocation();
  const nestedLinks = (links, root = true) => {
    return (
      <ul
        className={`${
          root ? "md:pl-4" : "md:pl-8"
        } transition-all duration-500`}
      >
        {links.map((link, index) => {
          return (
            <li className="relative" key={link.name + "." + index}>
              <Link to={link.to}>
                <div
                  className={
                    (location.pathname == link.to
                      ? `bg-white dark:bg-gray-950  text-black dark:text-white 
                      before:content-[''] before:w-[20px] before:h-[20px] before:bg-indigo-950 before:absolute before:top-[-20px] before:right-0 before:rounded-br-[10px] before:z-10
                      after:content-[''] after:w-[20px] after:h-[20px] after:bg-indigo-950 after:absolute after:top-[40px] after:right-0 after:rounded-tr-[10px] after:z-10`
                      : "text-white") +
                    " h-[40px] md:pl-3 py-2 rounded-l-lg flex justify-center md:justify-start items-center gap-2 "
                  }
                >
                  {location.pathname == link.to && (
                    <span className="w-[19px] h-[19px] bg-white absolute top-[-19px] right-0 z-0 dark:bg-gray-950"></span>
                  )}
                  {link?.icon && (
                    <span className="text-lg z-20">{link.icon}</span>
                  )}
                  <span className="hidden md:block">{link.name}</span>

                  {/* {link.name} */}
                  {location.pathname == link.to && (
                    <span className="w-[19px] h-[19px] bg-white absolute top-[39px] right-0 z-0 dark:bg-gray-950"></span>
                  )}
                </div>
              </Link>
              {link?.links && nestedLinks(link.links, false)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="w-[60px] md:w-[250px] min-h-screen h-full bg-indigo-950 text-white overflow-y-auto hide-scrollbar transition-all duration-500">
      <div className="flex justify-center items-center gap-3 py-10 text-xl font-extrabold">
        <span className="text-2xl">
          <FaFileMedicalAlt />
        </span>
        <h3 className="hidden md:block">Data Logger</h3>
      </div>
      {nestedLinks(links)}
    </div>
  );
}
