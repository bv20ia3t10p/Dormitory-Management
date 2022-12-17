import { useHistory } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarStudent from "../Sidebar/SidebarStudent";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import Payment from "./Payment";
import { toast } from 'react-toastify';
function PayElicWar(props) {
    // const [modal, setModal] = useState(false);
    // const [CurrentInvoice, setCurrentInvoice] = useState({});
    const [payElicWar, setPayElicWar] = useState({});
    // const toggle = () => setModal(!modal);
    // var id = localStorage.getItem("id");
    // console.log("check id: ", id);
    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(`https://localhost:7184/ElectricWaterLog/${localStorage.getItem("id")}`);
            setPayElicWar(
                res.data
            )
            console.log(payElicWar)
        }

        fetchMyAPI()
    }, [])
    // const PaymentRoom = async (item) => {
    //     toggle()
    //     console.log('check updateUser in parent: ', item)
    //     try {
    //         let res = await axios.put(`https://localhost:7184/RegisterRoom/${item.id}`, {
    //             studentId: item.studentId,
    //             roomId: item.roomId,
    //             dateBegin: item.dateBegin,
    //             numberOfMonth: item.numberOfMonth,
    //             domitoryFeeStatus: item.domitoryFeeStatus,
    //             status: item.status
    //         });
    //         console.log('response create user: ', res)
    //         toast.success("Thanh toán thành công");
    //     } catch (error) {
    //         toast.error("Thanh toán không thành công");
    //         console.log(error)
    //     }
    // }
    // const handlePayFeeRoom = (data) => {
    //     toggle()
    //     setCurrentInvoice(
    //         data
    //     )
    // }
    return <div>
        <SidebarStudent />
        {/* {
            modal && <Payment
                modal={modal}
                toggle={toggle}
                CurrentInvoice={CurrentInvoice}
                handlePayFeeRoom={PaymentRoom}
            />
        } */}

        <h3 class="text-center p-3 text-danger">Tiền điện tiền nước</h3>
        <div class="section row" >
            <div class="w-100" >

                <table class="table mt-5 w-75 shadow" >
                    <thead class="bg-light">
                        <tr class="border font-weight-bold">
                            <td>Phòng</td>
                            <td>Ngày đăng ký</td>
                            <td>Chỉ số điện</td>
                            <td>Chỉ Số nước</td>
                            <td>Tổng cộng</td>
                            <td>Trạng thái thanh toán</td>
                        </tr>
                    </thead>
                    <tbody>
                        {payElicWar && payElicWar.length > 0 &&
                            payElicWar.map((item, index) => {
                                return (
                                    <tr key={item.id} class="border">
                                        <td>{item.room.name}</td>
                                        <td>{moment(item.logDate).format("DD/MM/YYYY")}</td>
                                        <td>
                                            <div>Chỉ số đầu:  <span class="font-weight-bold">{item.electricNew} Kwh</span> </div>
                                            <div>Chỉ số cuối:  <span class="font-weight-bold">{item.electricOld} Kwh</span> </div>
                                            <div>Sử dụng:  <span class="font-weight-bold">{item.electricUse} Kwh</span> </div>
                                            <div>Tổng tiền: <span class="font-weight-bold">{item.electricFee}</span></div>
                                        </td>
                                        <td>
                                            <div>Chỉ số đầu:  <span class="font-weight-bold">{item.waterNew} m<sup>3</sup></span></div>
                                            <div>Chỉ số cuối:<span class="font-weight-bold">{item.waterOld} m<sup>3</sup></span></div>
                                            <div>Sử dụng:  <span class="font-weight-bold">{item.waterUse} m<sup>3</sup></span> </div>
                                            <div>Tổng tiền: <span class="font-weight-bold">{item.waterFee}</span></div>
                                        </td>
                                        <td>
                                            <div class="font-weight-bold">{item.totalFee}</div>
                                            <div>(4 sinh viên)</div>
                                        </td>
                                        <td>
                                            {item.room.status ? <div class="text-success">Đã thanh toán</div> : <div class="text-danger">Chưa thanh toán</div>}
                                            <input type="button" class="btn btn-success" value="Thanh toán"></input>
                                        </td>

                                    </tr>
                                )
                            })}
                    </tbody>
                </table>

            </div>

        </div>
        <div class="clear-fix">
        </div>
    </div>
}

export default PayElicWar;