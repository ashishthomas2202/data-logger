import React from "react";
import styles from "./SideNav.module.css";
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
                    (location.pathname == link.to ? "bg-gray-900" : "") +
                    " pl-3 py-2 rounded-l-lg  text-white flex items-center gap-2"
                  }
                >
                  {link?.icon && link.icon}
                  {link.name}
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
    <div className={styles.sideNav + " bg-gray-950"}>
      <div className="flex justify-center items-center gap-3 py-3 my-5 text-xl font-extrabold">
        <FaFileMedicalAlt />
        <h3>Data Logger</h3>
      </div>
      {nestedLinks(links)}
    </div>
  );
}
