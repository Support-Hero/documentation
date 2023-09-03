import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Bottom from "../Bottom/Bottom";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import allcontext from "../../context";
const Body = ({ body }) => {
  const location = useLocation();
  const users = useContext(allcontext)[0]

  return (
    <div style={{ minHeight: "100vh", position: "relative" }} >
      <div >
        <Navbar  />
        <div className="d-flex">
        {(location.pathname.includes('/welcome') || users.isManager) &&<Sidebar  />}
          {body}
        </div>
      </div>
      <Bottom />
    </div>
  );
};
export default Body;
