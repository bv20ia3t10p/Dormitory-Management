import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./Admin.scss";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import HandleObject from "./HandleObject";
import AddStaff from './AddStaff';
import UpdateStaff from './UpdateStaff';
import RowStaff from './RowStaff';


const Admin = (props) => {
  const listHeaderCols = [
    "Họ và tên",
    "Giới tính",
    "Email",
    "MSNV",
    "Số điện thoại",
    "Trạng thái",
    "Sửa"
  ]

  return (
    <>
      {/* <SidebarAdmin /> */}
      <HandleObject
        title="Quản lý Nhân Viên"
        addButtonTitle="Thêm Nhân Viên"
        listHeaderCols={listHeaderCols}
        object='Manager'
        addModalComponent={AddStaff}
        editModalComponent={UpdateStaff}
        rowComponent={RowStaff}
      />

      <div className="clear-fix"></div>
    </>
  );
}

export default Admin;
