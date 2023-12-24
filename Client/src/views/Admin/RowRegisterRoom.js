import React from "react";
import moment from 'moment';

const RowRegisterRoom = (props) => {
    function mouseOver(id) {
        document.getElementById(`${id}`).setAttribute("class", "font-weight-bold text-primary");
        document.getElementById(`${id}`).setAttribute("style", "text-decoration: underline;");
    }
    function mouseOut(id) {
        document.getElementById(`${id}`).setAttribute("class", "font-weight-bold text-primary");
        document.getElementById(`${id}`).setAttribute("style", "text-decoration: none;");

    }

    const { item, handleEditObject, handleDeleteObject, handleViewDetailUser } = props;
    return (
        <tr className="child" key={item.id} class="border" onClick={() => handleViewDetailUser(item)}>
            <td>{item.id}</td>
            <td class="font-weight-bold text-primary" id={item.studentId}
                onMouseOut={() => mouseOut(item.studentId)} onMouseOver={() => mouseOver(item.studentId)}
            >{item.studentId}</td>
            <td class=""  >{item.roomId}</td>

            {/* <td >{item.dateBegin}</td> */}
            <td >{moment(item.dateBegin).format("DD-MM-YYYY")}</td>
            <td>{moment(item.dateEnd).format("DD-MM-YYYY")}</td>

            <td>{item.numberOfMonth}</td>
            <td>{item.domitoryFee} VNĐ</td>
            <td>{item.domitoryFeeStatus ? <div class="text-success">Đã thanh toán</div> : <div class="text-danger">Chưa thanh toán</div>}</td>
            <td>{item.status ? <div class="text-success">Còn hạn</div> : <div class="text-danger">Hết hạn</div>}</td>
            <td onClick={(e) => e.stopPropagation()}>
                <button class="btn btn-success mr-1" onClick={() => handleEditObject(item)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="btn btn-danger" onClick={() => handleDeleteObject(item)}><i class="fa fa-calendar-times-o" aria-hidden="true"></i></button>
            </td>
        </tr>
    );
}

export default RowRegisterRoom;