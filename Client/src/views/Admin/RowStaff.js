import React, { useState } from "react";
import Button from '../Button';

const RowStaff = (props) => {

    const { item, handleEditObject, handleDeleteObject, handleViewDetailUser } = props;
    return (
        <tr className="child border" key={item.id} onClick={() => handleViewDetailUser(item)}>
            {/* different part */}
            <td>{item.id}</td>
            <td>{item.lastName + " " + item.firstName}</td>
            <td>{item.gender ? "Nam" : "Nữ"}</td>
            <td>{item.email}</td>
            <td>{item.idCard}</td>
            <td>{item.phoneNumber}</td>
            <td>
                {item.status ? (
                    <div className="text-success">Đang làm</div>
                ) : (
                    <div className="text-danger">Đã nghỉ</div>
                )}
            </td>
            {/* different part */}

            <td onClick={(e) => e.stopPropagation()}>
                <Button color="success" icon="pencil" onClick={() => handleEditObject(item)} />
                <Button color="danger" icon="trash" onClick={() => handleDeleteObject(item)} />
            </td>
        </tr>
    );
};
export default RowStaff;