import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./ManagerStudent.scss";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import Addstudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import RowStudent from "./RowStudent";
import HandleObject from "./HandleObject";

const ManagerStudent = (props) => {
  const listHeaderCols = ["ID", "Họ và Tên", "Giới tính", "Email", "Trường", "Số điện thoại", "Trạng thái", "Sửa"]
  return (
    <>
      {/* <NavStudent /> */}
      <SidebarAdmin />
      
      <HandleObject
        title="Quản lý Sinh Viên"
        addButtonTitle="Thêm Sinh Viên"
        listHeaderCols={listHeaderCols}
        object='Student'
        addModalComponent={Addstudent}
        editModalComponent={UpdateStudent}
        rowComponent={RowStudent}
      />
      
      <div class="clear-fix"></div>
    </>
  );
}

export default ManagerStudent;
