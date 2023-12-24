import React from "react";

const RowReceipt = (props) => {
    const { item, handleEditObject, handleDeleteObject, _} = props;

    return (
        <tr key={item.id} className="border">
            <td>{item.id}</td>
            <td>{item.room.name}</td>
            <td>{item.room.slotRemain}</td>
            <td>
                <div>Chỉ số đầu:  <span className="font-weight-bold">{item.electricNew} Kwh</span> </div>
                <div>Chỉ số cuối:  <span className="font-weight-bold">{item.electricOld} Kwh</span> </div>
                <div>Sử dụng:  <span className="font-weight-bold">{item.electricNew - item.electricOld} Kwh</span> </div>
                <div>Tiền điện:  <span className="font-weight-bold">{item.electricFee} VNĐ</span> </div>
            </td>
            <td>
                <div>Chỉ số đầu:  <span className="font-weight-bold">{item.waterNew} m<sup>3</sup></span></div>
                <div>Chỉ số cuối:<span className="font-weight-bold">{item.waterOld} m<sup>3</sup></span></div>
                <div>Sử dụng:  <span className="font-weight-bold">{item.waterNew - item.waterOld} m<sup>3</sup></span> </div>
                <div>Tiền nước:  <span className="font-weight-bold">{item.waterFee} VNĐ</span> </div>
            </td>
            <td>
                <div className="font-weight-bold ">{item.totalFee} VNĐ</div>
                <div>(4 sinh viên)</div>
            </td>
            <td>{item.feeStatus ? <div className="text-success">Đã thanh toán</div> : <div className="text-danger">Chưa thanh toán</div>}</td>
            <td onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-success mr-1" onClick={() => handleEditObject(item)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                <button className="btn btn-danger" onClick={() => handleDeleteObject(item)}><i className="fa fa-trash" aria-hidden="true"></i></button>
            </td>
        </tr>
    );
};

export default RowReceipt;