import { useHistory } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarStudent from "../Sidebar/SidebarStudent";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { toast } from 'react-toastify';
function Invoice(props) {
    const [Invoice, setInvoice] = useState([]);
    var id = localStorage.getItem("id");
    console.log("check id: ", id);
    useEffect(() => {
        async function fetchMyAPI() {
            let data = await axios.get(`https://localhost:7184/RegisterRoom/${id}/student`);
            setInvoice(
                data.data
            )
        }
        fetchMyAPI()
    }, [])
    const handlePayFeeRoom = async (item) => {
        try {
            let res = await axios.put(`https://localhost:7184/RegisterRoom/${item.id}`, {
                studentId: item.studentId,
                roomId: item.roomId,
                dateBegin: item.dateBegin,
                numberOfMonth: item.numberOfMonth,
                domitoryFeeStatus: true,
                status: item.status
            });
            console.log('response create user: ', res)
            toast.success("Thanh toán thành công");
        } catch (error) {
            toast.error("Thanh toán không thành công");
            console.log(error)
        }
    }
    return <div>
        <SidebarStudent />
        <h3 class="text-center p-3 text-danger">Hóa đơn tiền phòng</h3>
        <div class="section row" >
            <div class="w-100" >
                {Invoice && Invoice.length > 0 &&
                    Invoice.map((item, index) => {
                        return (
                            <>
                                <div class=" mb-2 border border-primary w-75" style={{ "margin-left": "10%" }}>
                                    <div class="bg-primary text-white p-1"><i class="fa fa-table ml-2 text-white" aria-hidden="true"></i> Số biên lai: {item.id}</div>
                                    <div class="ml-2 p-1">Số tháng: {item.numberOfMonth}</div>
                                    <div class="ml-2 p-1">Năm học: {moment(item.dateBegin).format("YYYY") + " - " + moment(item.dateEnd).format("YYYY")}</div>
                                    <div class="ml-2 p-1">Trạng thái: {item.domitoryFeeStatus ? <span class="text-success">Đã thanh toán</span> : <span class="text-danger">Chưa thanh toán</span>}</div>

                                    <table class=" ml-2 mr-2 border" style={{ "width": "97%" }}>
                                        <tr class="border">
                                            <th class="text-left p-1">Nội dung</th>
                                            <th class=" p-1 ">Số tiền</th>
                                        </tr>
                                        <tr>
                                            <td class="p-1" style={{ "font-size": "17px" }}>Phí lưu trú phòng phục vụ sinh viên từ ngày {moment(item.dateBegin).format("DD/MM/YYYY") + " đến " + moment(item.dateEnd).format("DD/MM/YYYY")}</td>
                                            <td>{item.domitoryFee}</td>
                                        </tr>

                                    </table>
                                    <table class="w-100">
                                        <tr>
                                            <td class="text-left"><input type="button" class="btn btn-success m-2" value="Thanh toán" onClick={() => handlePayFeeRoom(item)} /></td>
                                            <td class="text-right pr-5"><span class="font-weight-bold text-danger"> Tổng cộng: </span> <span>{item.domitoryFee}</span></td>
                                        </tr>
                                    </table>

                                </div>
                            </>


                        )
                    })
                }

            </div>

        </div>
        <div class="clear-fix">
        </div>
    </div>
}

export default Invoice;