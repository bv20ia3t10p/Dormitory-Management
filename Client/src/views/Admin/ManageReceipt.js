
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import AddReceipt from './AddReceipt';
import UpdateReceipt from './UpdateReceipt';
import HandleObject from "./HandleObject";
import RowReceipt from './RowReceipt';
const ManageReceipt = (props)  => {
    const listHeaderCols = ["Phòng", "Còn trống", "Chỉ số điện", "Chỉ số nước", "Tổng tiền", "Trạng thái thanh toán", "Sửa"]

    return (
        <>
            {/* <SidebarAdmin /> */}
            <HandleObject
                title="Quản lý Hóa đơn Điện Nước"
                addButtonTitle="Thêm hóa đơn"
                listHeaderCols={listHeaderCols}
                object='ElectricWaterLog'
                addModalComponent={AddReceipt}
                editModalComponent={UpdateReceipt}
                rowComponent={RowReceipt}
            />
            <div className="clear-fix"></div>
        </>
    )
}


export default ManageReceipt;