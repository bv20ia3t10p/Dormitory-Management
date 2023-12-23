import React, { useState } from "react";
import Button from '../Button';

const RowStudent = (props) => {

    const { item, handleEditObject, handleDeleteObject, handleViewDetailUser } = props;
    return (
        <tr className="child" key={item.id} class="border" onClick={() => handleViewDetailUser(item)}>
            {/* <td>{index + 1}</td> */}
            <td>{item.id}</td>
            <td> {item.lastName + " " + item.firstName}</td>
            <td>{item.gender ? "Nam" : "Nữ"}</td>
            <td>{item.email}</td>
            <td>{item.universityName}</td>
            <td>{item.phoneNumber}</td>
            <td>
                {item.status ? (
                    <div class="text-success">Còn hạn</div>
                ) : (
                    <div class="text-danger">Hết hạn</div>
                )}
            </td>

            <td onClick={(e) => e.stopPropagation()}>
                <Button color="success" icon="pencil" onClick={() => handleEditObject(item)} />
                <Button color="danger" icon="trash" onClick={() => handleDeleteObject(item)} />
            </td>
        </tr>
    );
};
export default RowStudent;