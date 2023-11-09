import React from "react";
import "./SideNav.css";
import { Link, useLocation } from "react-router-dom";
import { FaFileMedicalAlt } from "react-icons/fa";
export default function SideNav({ links }) {
  const location = useLocation();
  const nestedLinks = (links) => {
    return (
      <ul className="pl-8">
        {" "}
        {links.map((link, index) => {
          return (
            <li key={link.name + "." + index}>
              <Link to={link.to}>
                <div
                  className={
                    (location.pathname == link.to
                      ? `bg-white dark:bg-gray-900 active text-black dark:text-white  before:bg-gray-950 after:bg-gray-950`
                      : "text-white") +
                    " pl-3 py-2 rounded-l-lg flex items-center gap-2"
                  }
                >
                  {location.pathname == link.to && (
                    <span className="before dark:bg-gray-900"></span>
                  )}
                  {link?.icon && link.icon}
                  {link.name}
                  {location.pathname == link.to && (
                    <span className="after dark:bg-gray-900"></span>
                  )}
                </div>
              </Link>
              {link?.links && nestedLinks(link.links)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="sideNav bg-gray-950 text-white">
      <div className="flex justify-center items-center gap-3 py-10 text-xl font-extrabold">
        <FaFileMedicalAlt />
        <h3>Data Logger</h3>
      </div>
      {nestedLinks(links)}
    </div>
  );
}
