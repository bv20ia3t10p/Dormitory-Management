import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import AddregisRoom from "./AddRegisRoom";
import UpdateRegister from "./UpdateRegister";
import RowRegisterRoom from "./RowRegisterRoom";
import HandleObject from "./HandleObject";

function ManageRegisterRoom(props) {
  const listHeaderCols = [
    "MASV",
    "MAP",
    "Ngày bắt đầu",
    "Ngày kết thúc",
    "Số tháng",
    "Số tiền",
    "Trạng thái phòng",
    "Thời hạn",
    "Sửa",
  ];

  return (
    <>
      {/* <SidebarAdmin /> */}
      <HandleObject
        title="Quản lý Đăng ký Lưu trú"
        addButtonTitle="Đăng ký"
        listHeaderCols={listHeaderCols}
        object="RegisterRoom"
        addModalComponent={AddregisRoom}
        editModalComponent={UpdateRegister}
        rowComponent={RowRegisterRoom}
      />
      <div className="clear-fix"></div>
    </>
  );
}

export default ManageRegisterRoom;
