import React, { useEffect, useState } from "react";
import "./SidebarAdmin.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Header from "./Header";
import ListSidebar from "./ListSidebar";

const SidebarAdmin = () => {
  // render() {
  const [menuItems, setMenuItems] = useState([
    {
      to: "/ManageStudent",
      icon: "fa fa-graduation-cap",
      label: "Quản lý sinh viên",
    },
    { to: "/room", icon: "fa fa-list-alt", label: "Quản lý phòng" },
    { to: "/registerRoom", icon: "fa fa-laptop", label: "Quản lý đăng ký" },
    { to: "/ManageReceipt", icon: "fa fa-money", label: "Hóa đơn điện nước" },
    { to: "/statistical", icon: "fa fa-signal", label: "Thống kê" },
    // { to: "/botchat", icon: "fa fa-signal", label:"Botchat"},
    { to: "/Login", icon: "fa fa-sign-out", label: "Log out" },
  ]);
  useEffect(() => {
    let newPriv = "";
    try {
      newPriv = localStorage.getItem(localStorage.getItem("account"));
    } catch {
      console.log("No token");
    }
    let newMenuItems = menuItems;
    if (menuItems.filter((n) => n.to === "/admin").length > 0) return;
    if (newPriv === "Admin")
      newMenuItems = [
        {
          to: "/admin",
          icon: "fa fa-address-book",
          label: "Quản lý nhân viên",
        },
        ...newMenuItems,
      ];
    setMenuItems(() => newMenuItems);
  }, []);
  const adminActions = ["Action 1", "Action 2", "Action 3"];
  return (
    <div className="sidebar-for-admin bg-info">
      <Header adminActions={adminActions} />

      <div className="main">
        <aside>
          <div className="sidebar left">
            <ListSidebar menuItems={menuItems} />
          </div>
        </aside>
      </div>
    </div>
  );
};
export default SidebarAdmin;
