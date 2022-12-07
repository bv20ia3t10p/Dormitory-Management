
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddregisRoom from './AddRegisRoom';
function RegisterRoom(props) {
    const [state, setState] = useState({ ListRegisterRooms: [] });
    const [modal, setModal] = useState(false);
    const [editroom, setEditRoom] = useState({ RoomEdit: {} })
    const [modalEdit, setModalEdit] = useState(false);
    const [id, setId] = useState({
        idStudent: '',
        idRoom: ''
    })
    const toggleEdit = () => setModalEdit(!modalEdit);
    const toggle = () => setModal(!modal);
    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(`https://localhost:7184/RegisterRoom`);
            setState({
                ListRegisterRooms: res.data ? res.data : []
            })
            console.log("check res get: ", res)
        }
        fetchMyAPI()
    }, [])
    const createNewRegisRoom = async (data) => {
        try {
            let res = await axios.post(`https://localhost:7184/RegisterRoom`, data);
            console.log('response create staff: ', res)
            setModal(false);
            toast.success("Add new register success");
        } catch (error) {
            toast.error("Add new staff fail")
            console.log('check data from child: ', data)
        }
    }
    const handleIdRegisterRoom = (event, item) => {
        let copyId = { ...id }
        copyId[item] = event.target.value;
        setId({
            ...copyId
        })
    }
    const handleOnclickSearch = async () => {
        if (id.idRoom != "" && id.idStudent != "") {
            try {
                let res = await axios.get(`https://localhost:7184/RegisterRoom/${id.idRoom}/${id.idStudent}`);
                setState({
                    ListRegisterRooms: res.data ? [res.data] : []
                })
            } catch (error) {
                toast.error("Không có dữ liệu")
            }
        }
        if (id.idRoom != "" && id.idStudent == "") {
            try {
                let res = await axios.get(`https://localhost:7184/RegisterRoom/${id.idRoom}/room`);
                setState({
                    ListRegisterRooms: res.data ? res.data : []
                })
                console.log("check res: ", res)
                console.log('check listResgisterRoom: ', state.ListRegisterRooms)
            } catch (error) {
                toast.error("Không có dữ liệu")
            }
        }

        else if (id.idStudent != "" && id.idRoom == "") {
            try {
                let res = await axios.get(`https://localhost:7184/RegisterRoom/${id.idStudent}/student`);
                setState({
                    ListRegisterRooms: res.data ? res.data : []
                })
                console.log("check res: ", res)
                console.log('check listResgisterRoom: ', state.ListRegisterRooms)
            } catch (error) {
                toast.error("Không có dữ liệu")
            }
        }

    }
    return (
        <>
            <SidebarAdmin />
            <AddregisRoom
                modal={modal}
                toggle={toggle}
                createNewRegisRoom={createNewRegisRoom}
            />
            <div class="section row">
                <h3 class="col-12">Danh sách Đăng ký</h3>
                <nav class="navbar navbar-light bg-light col-6 ml-5">
                    <div class="row">
                        <input class="col-3 form-control mr-sm-2" type="search" placeholder="Id Student" aria-label="Search" value={id.idStudent} onChange={(event) => handleIdRegisterRoom(event, "idStudent")}></input>
                        <input class="col-3 form-control mr-sm-2" type="search" placeholder="Id Room" aria-label="Search" value={id.idRoom} onChange={(event) => handleIdRegisterRoom(event, "idRoom")}></input>
                        <button class="col-3 btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() => handleOnclickSearch()}>Search</button>
                    </div>
                </nav>
                <button style={{ marginLeft: "auto" }} class="col-2 mb-2 btn btn-primary pull-right mr-5" onClick={toggle}>Đăng ký</button>
                <div id="collapse1" class="col-12">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">studentId</th>
                                <th scope="col">roomId</th>
                                <th scope="col">dateBegin</th>
                                <th scope="col">dateEnd</th>
                                <th scope="col">domitoryFeeStatus</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.ListRegisterRooms && state.ListRegisterRooms.length > 0 &&
                                state.ListRegisterRooms.map((item, index) => {
                                    return (
                                        <tr className="child" key={item.id}>
                                            <td >{item.studentId}</td>
                                            <td >{item.roomId}</td>
                                            {/* <td>{item.dateBegin}</td> */}
                                            <td>{item.dateBegin}</td>
                                            <td >{item.dateEnd}</td>
                                            <td >{item.domitoryFeeStatus ? <div class="text-success">True</div> : <div class="text-danger">false</div>}</td>
                                            <td >{item.status ? <div class="text-success">True</div> : <div class="text-danger">false</div>}</td>
                                            <td>
                                                <button class="btn btn-success" ><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                <button class="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="clear-fix">
            </div>
        </>
    )
}


export default RegisterRoom;