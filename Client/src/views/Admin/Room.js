
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Room(props) {
    const [state, setState] = useState({ ListRooms: [] });
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
        console.log('check data: ', data)
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
        }
        else {
            let res = await axios.get(`https://localhost:7184/Rooms/${2}/Block`);
            setState({
                ListRooms: res.data ? res.data : []
            })
        }
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
                                <div className="col " key={item.id} >
                                    {item.slotRemain != 0 ? <div class="col text-primary" style={{ padding: "1px" }}><i class="fa fa-home fa-2x" aria-hidden="true"></i>{item.name}</div> : <div class="col text-danger"><i class="fa fa-home fa-2x" aria-hidden="true"></i>{item.name}</div>}
                                </div>
                            )
                            // </div>
                        })
                    }
                </div>

            </div>
            <div class="clear-fix">
            </div>
        </>
    )
}


export default Room;