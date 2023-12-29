import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import UpdateTypeRoom from "./UpdateTypeRoom";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { inline } from "@floating-ui/core";
import { url } from "./HandleObject";
function Room(props) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [state, setState] = useState({ ListRooms: [] });
  const [student, setStudent] = useState([]);
  const [storeId, setStoreId] = useState(1);
  const [roles, setRoles] = useState("primary");
  const [room, SetRoom] = useState({});
  useEffect(() => {
    async function fetchMyAPI() {
      let res = await axios.get(url + `Rooms`);
      setState({
        ListRooms: res.data ? res.data : [],
      });
      console.log("check res: ", res);
    }
    fetchMyAPI();
  }, []);
  state.ListRooms &&
    state.ListRooms.length > 0 &&
    state.ListRooms.map((item, index) => {
      return (
        <>
          {item.slotRemain == 0 && item.id == storeId ? (
            setStoreId(item.id + 1)
          ) : (
            <></>
          )}
        </>
      );
    });

  const handleSearchListRoom = async (data) => {
    document.getElementById(storeId).setAttribute("class", "text-primary");
    if (data == 0) {
      let res = await axios.get(url + `Rooms`);
      setState({
        ListRooms: res.data ? res.data : [],
      });
    } else if (data == 1) {
      let res = await axios.get(url + `Rooms/${1}/Block`);
      setState({
        ListRooms: res.data ? res.data : [],
      });
      setStoreId(1);
    } else {
      let res = await axios.get(url + `Rooms/${2}/Block`);
      setState({
        ListRooms: res.data ? res.data : [],
      });
      setStoreId(5);
    }
  };
  const handleListStudent = async (id, role) => {
    if (role == "danger") {
      document.getElementById(storeId).setAttribute("class", "text-primary");
    }
    if (role == "primary") {
      document.getElementById(id).setAttribute("class", "text-success");
    }
    console.log("storeId: ", storeId);

    if (id != storeId && role == "primary" && roles == "primary") {
      document.getElementById(storeId).setAttribute("class", "text-primary");
      setStoreId(id);
    }

    let res = await axios.get(url + `api/RegisterRoom/${id}/room`);
    setStudent(res.data);
    let rooms = await axios.get(url + `RoomType/${id}`);
    SetRoom(rooms.data);
    console.log("check room: ", room);
  };
  const handleOnclickUpdate = () => {
    toggle();
  };
  const updateTypeRoom = async (data) => {
    console.log("check data from parent: ", data);
    try {
      await axios.put(url + `RoomType/${data.id}`, data);
      toast.success("Cập nhật thành công");
      toggle();
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };
  return (
    <>
      <SidebarAdmin />
      {modal && (
        <UpdateTypeRoom
          modal={modal}
          toggle={toggle}
          // currentTypeRoom={editstaff}
          updateTypeRoom={updateTypeRoom}
        />
      )}
      <div class="roomManagementContainer">
        <div class="section">
          <h3 class="">Quản lý phòng</h3>
          <FormControl
            style={{
              marginLeft: "0.5svw",
              width: "15%",
              maxWidth: "unset",
              paddingBottom: "2vh",
              position: "absolute",
            }}
          >
            <InputLabel>Tìm kiếm theo tòa</InputLabel>
            <Select
              name={"block"}
              id="block"
              value={state.status}
              label="Tìm kiếm theo"
              style={{ width: "100%", maxWidth: "unset", display: "inline" }}
              onChange={(event) => handleSearchListRoom(event.target.value)}
            >
              <MenuItem value={0}>Tất cả</MenuItem>
              <MenuItem value={1}>Tòa A1</MenuItem>
              <MenuItem value={2}>Tòa A2</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="h6"
            style={{
              paddingBottom: "3svh",
              textAlign: "center",
            }}
          >
            Các trạng thái phòng
          </Typography>
          <div
            class="row"
            style={{
              paddingTop: "2svh",
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div class="col text-primary ml-2 d-flex align-items-center justify-content-center">
              <i class="fa fa-home fa-xl mr-2" aria-hidden="true"></i>Phòng còn
              trống
            </div>
            <div class="col  text-danger d-flex align-items-center justify-content-center">
              <i class="fa fa-home fa-xl mr-2" aria-hidden="true"></i>Phòng đầy
            </div>
            <div class="col  text-success d-flex align-items-center justify-content-center">
              <i class="fa fa-home fa-xl mr-2" aria-hidden="true"></i>Phòng đang
              chọn
            </div>
            {localStorage.getItem(localStorage.getItem("account")) ==
            "Admin" ? (
              <div class="col">
                <input
                  type="button"
                  class="btn btn-primary"
                  value="Cập nhật loại phòng"
                  style={{ position: "absolute", left: "75vw", top: "-10vh" }}
                  onClick={() => handleOnclickUpdate()}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <Typography
            style={{
              textAlign: "center",
              color: "var(--primary)",
              borderBottom: "0.5svh solid var(--primary)",
            }}
            className="pb-4 pt-4"
            variant="h6"
          >
            Danh sách các phòng
          </Typography>
          <div class="row mt-4 d-flex align-items-center justify-content-center">
            {state.ListRooms &&
              state.ListRooms.length > 0 &&
              state.ListRooms.map((item, index) => {
                return (
                  <div
                    className="row ml-2"
                    key={item.id}
                    style={{ width: "14%" }}
                  >
                    {item.slotRemain > 0 ? (
                      <div
                        class=" text-primary room"
                        id={item.id}
                        style={{ padding: "1px" }}
                        onClick={() => handleListStudent(item.id, "primary")}
                      >
                        <i class="fa fa-home fa-2x mr-2" aria-hidden="true"></i>
                        {item.name}
                      </div>
                    ) : (
                      <div
                        class="col text-danger room"
                        id={item.id}
                        style={{ padding: "1px" }}
                        onClick={() => handleListStudent(item.id, "danger")}
                      >
                        <i class="fa fa-home fa-2x mr-2" aria-hidden="true"></i>
                        {item.name}
                      </div>
                    )}
                  </div>
                );
                // </div>
              })}
          </div>
        </div>
        <div class="row">
          <h4 class=" text-center mt-3" style={{ width: "67%" }}>
            Sinh viên trong phòng
          </h4>
          <h4 class=" text-center mt-3" style={{ width: "30%" }}>
            Thông tin phòng
          </h4>
          <table class="table table-hover mt-2 shadow" style={{ width: "67%" }}>
            <thead class="bg-info text-white ">
              <tr class="border ">
                <td style={{ "font-size": "16px" }}>Mã sinh viên</td>
                <td style={{ "font-size": "16px" }}>Ngày bắt đầu</td>
                <td style={{ "font-size": "16px" }}>Ngày kết thúc</td>
                <td style={{ "font-size": "16px" }}>Số tháng</td>
                <td style={{ "font-size": "16px" }}>Phí thanh toán</td>
                <td style={{ "font-size": "16px" }}>Trạng thái đóng phí</td>
                <td style={{ "font-size": "16px" }}>Trạng thái</td>
              </tr>
            </thead>
            <tbody>
              {student &&
                student.length > 0 &&
                student.map((item, index) => {
                  return (
                    <>
                      {item.status ? (
                        <tr key={item.id} class="border">
                          <td style={{ "font-size": "16px" }}>
                            {item.studentId}
                          </td>
                          <td style={{ "font-size": "16px" }}>
                            {moment(item.dateBegin).format("DD-MM-YYYY")}
                          </td>
                          <td style={{ "font-size": "16px" }}>
                            {moment(item.dateEnd).format("DD-MM-YYYY")}
                          </td>
                          <td style={{ "font-size": "16px" }}>
                            {item.numberOfMonth}
                          </td>
                          <td style={{ "font-size": "16px" }}>
                            {item.domitoryFee}
                          </td>
                          <td style={{ "font-size": "16px" }}>
                            {item.domitoryFeeStatus ? (
                              <div
                                class="text-success"
                                style={{ "font-size": "16px" }}
                              >
                                Đã thanh toán
                              </div>
                            ) : (
                              <div
                                class="text-danger"
                                style={{ "font-size": "16px" }}
                              >
                                Chưa thanh toán
                              </div>
                            )}
                          </td>
                          <td style={{ "font-size": "16px" }}>
                            {item.status ? (
                              <div
                                class="text-success"
                                style={{ "font-size": "16px" }}
                              >
                                Còn hạn
                              </div>
                            ) : (
                              <div
                                class="text-danger"
                                style={{ "font-size": "16px" }}
                              >
                                Hết hạn
                              </div>
                            )}
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
          <table class="table table-hover shadow mt-2" style={{ width: "30%" }}>
            <thead class="bg-info text-white">
              <tr>
                <td style={{ "font-size": "16px" }}>Mã loại phòng</td>
                <td style={{ "font-size": "16px" }}>Số chỗ</td>
                <td style={{ "font-size": "16px" }}>Đồ đạc</td>
                <td style={{ "font-size": "16px" }}>Phí phòng</td>
              </tr>
            </thead>
            <tbody>
              <tr class="border">
                <td style={{ "font-size": "16px" }}>{room.id}</td>
                <td style={{ "font-size": "16px" }}>{room.numberOfSLot}</td>
                <td style={{ "font-size": "16px" }}>
                  {room.furniture ? (
                    <div class="text-success" style={{ "font-size": "16px" }}>
                      Còn
                    </div>
                  ) : (
                    <>
                      {room.furniture == false ? (
                        <div
                          class="text-danger"
                          style={{ "font-size": "16px" }}
                        >
                          Không
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </td>
                <td style={{ "font-size": "16px" }}>{room.domitoryFee}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="clear-fix"></div>
    </>
  );
}

export default Room;
