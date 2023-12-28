import React from "react";
import "./SidebarAdmin.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Header from "./Header";
import ListSidebar from "./ListSidebar";

class SidebarAdmin extends React.Component {
  render() {
    // const adminActions = ["Action 1", "Action 2", "Action 3"];

    const menuItems = [
      { to: "/admin", icon: "fa fa-address-book", label: "Quản lý nhân viên" },
      {
        to: "/admin/ManageStudent",
        icon: "fa fa-graduation-cap",
        label: "Quản lý sinh viên",
      },
      { to: "/admin/room", icon: "fa fa-list-alt", label: "Quản lý phòng" },
      { to: "/admin/registerRoom", icon: "fa fa-laptop", label: "Quản lý đăng ký" },
      { to: "/admin/ManageReceipt", icon: "fa fa-money", label: "Hóa đơn điện nước" },
      { to: "/admin/statistical", icon: "fa fa-signal", label: "Thống kê" },
      { to: "/admin/botchat", icon: "fa fa-signal", label: "Botchat" },
      { to: "/admin/Login", icon: "fa fa-sign-out", label: "Log out" },
    ];

    return (
      <>
        {/* <Header adminActions={adminActions} /> */}
        <div className="sidebar-for-admin bg-info">
          <div className="main">
            <aside>
              <div className="sidebar left">
                <ListSidebar menuItems={menuItems} />
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  }
}
export default SidebarAdmin;
