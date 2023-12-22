import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./Admin.scss";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Addstaff from "./AddStaff";
import UpdateStaff from "./UpdateStaff";
import { toast } from "react-toastify";
function Admin(props) {
  const [state, setState] = useState({ ListUsers: [] });
  const [modal, setModal] = useState(false);
  const [editstaff, setEditStaff] = useState({ StaffEdit: {} });
  const [modalEdit, setModalEdit] = useState(false);
  const [id, setId] = useState({ id: "" });

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    async function fetchMyAPI() {
      let res = await axios.get(`https://localhost:7184/api/Manager`);
      setState({
        ListUsers: res.data ? res.data : [],
      });
    }
    fetchMyAPI();
  }, []);

  const createNewStaff = async (data) => {
    try {
      let res = await axios.post(`https://localhost:7184/api/Manager`, data);
      console.log("response create staff: ", res);
      setModal(false);
      toast.success("Thêm nhân viên thành công");
    } catch (error) {
      toast.error("Thêm nhân viên thất bại");
      console.log("check data from child: ", data);
    }
  };
  const handleEditStaff = (data) => {
    toggleEdit();
    setEditStaff({
      StaffEdit: data,
    });
    console.log("check edit staff: ", editstaff.StaffEdit);
  };

  const updateStaffId = async (data) => {
    console.log("check updateUser: ", data);
    try {
      let res = await axios.put(
        `https://localhost:7184/api/Manager/${data.id}`,
        data
      );
      console.log("response create user: ", res);
      toggleEdit();
      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error("Cập nhật không thành công");
      console.log(error);
    }
    console.log("check data from child: ", data);
  };

  let history = useHistory();
  const handleViewDetailUser = (staff) => {
    history.replace(`/DetailStaff/${staff.id}`);
  };

  const handleDeleteStaff = async (data) => {
    // Hàm dùng để xóa đối tượng sinh viên
    // Tiến trình gồm 2 bước:
    // 1. cập nhật trạng thái Hết hạn nếu Sinh viên còn hạn  ~~ còn thời gian lưu trú tại ktx
    // 2. xóa sinh viên nếu sinh viên đó đã hết hạn lưu trú tại ktx

    // Kiểm tra tình trạng của sinh viên chuẩn bị xóa/ cập nhật trạng thái

    // Biến cờ isPersisted = 0 nếu sv đã hết hạn và = 1 nếu còn
    var isPersisted = data.status;

    try {
      let res = await axios.delete("https://localhost:7184/api/Manager", {
        params: {
          id: data.id,
        },
      });

      if (isPersisted == true) {
        console.log(`Đã cập nhật trạng thái Manager ${data.id} thành HẾT HẠN`);
        toast.success(`Cập nhật trạng thái thành công!`);
      } else {
        console.log("Delete successful:", res.data);
        // Xử lý thành công sau khi xóa
        toast.success("Xóa thành công");
      }
    } catch (error) {
      toast.error("Xóa không thành công");
      console.error("Error deleting Manager:", error);
    }

    let res = await axios.get(`https://localhost:7184/api/Manager`);
    setState({
      ListUsers: res.data ? res.data : [],
    });
  };

  useEffect(() => {
    handleOnclickSearch();
  }, [id]);

  const handleOnclickSearch = async () => {
    console.log(id.id);
    if (id.id != "") {
      const apiString = `https://localhost:7184/api/Manager/${id.id}/manager`
      try {
        let res = await axios.get(
          apiString
        );
        console.log(apiString);
        setState({
          ListUsers: [res.data],
        });
        console.log("check state id in onclick", state.ListUsers);
      } catch (error) {
        toast.error("Không có dữ liệu");
      }
    } else if (id.id == "") {
      try {
        let res = await axios.get(`https://localhost:7184/api/Manager`);
        setState({
          ListUsers: res.data ? res.data : [],
        });
      } catch (error) {
        toast.error("Không có dữ liệu");
      }
    }
  };

  const handleOnChangeInput = async (event, item) => {
    let coppy = { ...id };
    coppy[item] = event.target.value;
    setId({
      ...coppy,
    });
  };

  return (
    <>
      <SidebarAdmin />
      <div class="section row">
        <h3 class="col-12">Quản lý nhân viên</h3>
        <nav class="navbar navbar-light">
          <div class="row">
            <input
              class="col form-control mr-sm-2 "
              type="text"
              placeholder="MSNV"
              value={id.id}
              aria-label="Search"
              onChange={(event) => handleOnChangeInput(event, "id")}
            ></input>
            <button
              class="col btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={() => handleOnclickSearch()}
            >
              Search
            </button>
            {/* <div class="col-6"></div> */}
          </div>
        </nav>

        <button
          style={{ marginLeft: "auto" }}
          class="pl-3 mb-2 btn btn-primary pull-right"
          onClick={toggle}
        >
          Thêm nhân viên
        </button>

        
        <Addstaff
          modal={modal}
          toggle={toggle}
          createNewStaff={createNewStaff}
        />

        {modalEdit && (
          <UpdateStaff
            modal={modalEdit}
            toggle={toggleEdit}
            currentUser={editstaff}
            updateStaff={updateStaffId}
          />
        )}
        
        <div id="" class="col-12 table-container">
          <table class="table table-hover shadow">
            <thead>
              <tr class="border bg-light">
                <th scope="col">Id</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Email</th>
                <th scope="col">MSNV</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Sửa / xóa</th>
              </tr>
            </thead>
            <tbody>
              {state.ListUsers &&
                state.ListUsers.length > 0 &&
                state.ListUsers.map((item, index) => {
                  return (
                    <tr className="child " key={item.id} class="border">
                      <td onClick={() => handleViewDetailUser(item)}>
                        {item.id}
                      </td>
                      <td onClick={() => handleViewDetailUser(item)}>
                        {item.lastName + " " + item.firstName}
                      </td>
                      <td onClick={() => handleViewDetailUser(item)}>
                        {item.gender ? "Nam" : "Nữ"}
                      </td>
                      <td onClick={() => handleViewDetailUser(item)}>
                        {item.email}
                      </td>
                      <td onClick={() => handleViewDetailUser(item)}>
                        {item.idCard}
                      </td>
                      <td onClick={() => handleViewDetailUser(item)}>
                        {item.phoneNumber}
                      </td>
                      <td onClick={() => handleViewDetailUser(item)}>
                        {item.status ? (
                          <div class="text-success">Đang làm</div>
                        ) : (
                          <div class="text-danger">Đã nghỉ</div>
                        )}
                      </td>
                      <td>
                        <button
                          class="btn btn-success mr-1"
                          onClick={() => handleEditStaff(item)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button
                          class="btn btn-danger"
                          onClick={() => handleDeleteStaff(item)}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div class="clear-fix"></div>
    </>
  );
}

export default Admin;
