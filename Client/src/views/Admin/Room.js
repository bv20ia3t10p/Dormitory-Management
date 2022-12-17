
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
function Room(props) {
    const [state, setState] = useState({ ListRooms: [] });
    const [student, setStudent] = useState([]);
    const [storeId, setStoreId] = useState(1);
    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(`https://localhost:7184/Rooms`);
            setState({
                ListRooms: res.data ? res.data : []
            })
            console.log("check res: ", res)
        }
        fetchMyAPI()
    }, [])
    // https://localhost:7184/Rooms/1/Block
    const handleSearchListRoom = async (data) => {
        document.getElementById(storeId).setAttribute("class", "text-primary");
        if (data == 0) {
            let res = await axios.get(`https://localhost:7184/Rooms`);
            setState({
                ListRooms: res.data ? res.data : []
            })

        }
        else if (data == 1) {
            let res = await axios.get(`https://localhost:7184/Rooms/${1}/Block`);
            setState({
                ListRooms: res.data ? res.data : []
            })
            setStoreId(
                1
            )
        }
        else {
            let res = await axios.get(`https://localhost:7184/Rooms/${2}/Block`);
            setState({
                ListRooms: res.data ? res.data : []
            })
            setStoreId(
                5
            )

        }
    }
    const handleListStudent = async (id) => {
        document.getElementById(id).setAttribute("class", "text-success")
        console.log("id: ", id)
        console.log("storeId: ", storeId)
        if (id != storeId) {
            document.getElementById(storeId).setAttribute("class", "text-primary");
            setStoreId(
                id
            )
        }
        let res = await axios.get(`https://localhost:7184/RegisterRoom/${id}/room`);
        setStudent(
            res.data
        )
        console.log("check student: ", res.data)
    }
    return (
        <>
            <SidebarAdmin />
            <div class="section">
                <h3>Danh sách phòng</h3>
                <select class="rounded ml-2 text-center" onClick={(event) => handleSearchListRoom(event.target.value)}>
                    <option value={0}>Tất cả</option>
                    <option value={1}>Tòa A1</option>
                    <option value={2}>Tòa A2</option>
                </select>
                <div class="row">
                    <div class=" text-primary ml-2"><i class="fa fa-home fa-2x" aria-hidden="true"></i>Phòng còn trống</div>
                    <div class=" text-danger"><i class="fa fa-home fa-2x" aria-hidden="true"></i>Phòng đầy</div>
                    <div class=" text-success"><i class="fa fa-home fa-2x" aria-hidden="true"></i>Phòng đang chọn</div>
                </div>

                <div class="row">
                    {state.ListRooms && state.ListRooms.length > 0 &&
                        state.ListRooms.map((item, index) => {
                            return (
                                <div className="col " key={item.id}>
                                    {item.slotRemain != 0 ? <div class="col text-primary room" id={item.id} style={{ padding: "1px" }} onClick={() => handleListStudent(item.id)}><i class="fa fa-home fa-2x" aria-hidden="true"></i>{item.name}</div> : <div class="col text-danger room" onClick={() => handleListStudent(item.id)}><i class="fa fa-home fa-2x" aria-hidden="true"></i>{item.name}</div>}
                                </div>
                            )
                            // </div>
                        })
                    }
                </div>

            </div>
            <div >
                <table class="table table-hover mt-5 w-75 shadow" >
                    <thead class="bg-success">
                        <tr class="border ">
                            <td>Mã sinh viên</td>
                            <td>Ngày bắt đầu</td>
                            <td>Ngày kết thúc</td>
                            <td>Số tháng</td>
                            <td>Phí thanh toán</td>
                            <td>Trạng thái đóng phí</td>
                            <td>Trạng thái</td>
                        </tr>
                    </thead>
                    <tbody>
                        {student && student.length > 0 &&
                            student.map((item, index) => {
                                return (
                                    <tr key={item.id} class="border">
                                        <td>{item.studentId}</td>
                                        <td>{moment(item.dateBegin).format("DD-MM-YYYY")}</td>
                                        <td>{moment(item.dateEnd).format("DD-MM-YYYY")}</td>
                                        <td>{item.numberOfMonth}</td>
                                        <td>{item.domitoryFee}</td>
                                        <td>{item.domitoryFeeStatus ? <div class="text-success">Đã thanh toán</div> : <div class="text-danger">Chưa thanh toán</div>}</td>
                                        <td>{item.status ? <div class="text-success">Còn hạn</div> : <div class="text-danger">Hết hạn</div>}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
            <div class="clear-fix">
            </div>
        </>
    )
}


export default Room;