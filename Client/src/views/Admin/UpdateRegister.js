import React, { useState } from 'react';
import {
    Form, Row, FormGroup, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label
} from 'reactstrap';

function UpdateRegister(props) {
    let RegisterRoom = props.currentObject;
    console.log("check prop registerroom: ", RegisterRoom)

    const [state, setState] = useState({
        id: RegisterRoom.ObjectEdit.id,
        studentId: RegisterRoom.ObjectEdit.studentId,
        roomId: RegisterRoom.ObjectEdit.roomId,
        dateBegin: RegisterRoom.ObjectEdit.dateBegin,
        numberOfMonth: RegisterRoom.ObjectEdit.numberOfMonth,
        domitoryFeeStatus: RegisterRoom.ObjectEdit.domitoryFeeStatus,
        status: RegisterRoom.ObjectEdit.status,
    });
    console.log("check state in children: ", state);
    const handleOnchangeInput = (event, item) => {
        let copyState = { ...state }
        console.log('check event: ', event);
        if (event.target.value == "true" && item == "domitoryFeeStatus") {
            copyState["domitoryFeeStatus"] = true;
        }
        else if (event.target.value == "false" && item == "domitoryFeeStatus") {
            copyState["domitoryFeeStatus"] = false;
        }
        else if (event.target.value == "true" && item == "status") {
            copyState["status"] = true;
        }
        else if (event.target.value == "false" && item == "status") {
            copyState["status"] = false;
        }
        else {
            copyState[item] = event.target.value;
        }
        setState({
            ...copyState
        })
    }
    const checkValideInput = () => {
        let isValid = true;
        let arrInput = ['studentId', 'roomId', 'dateBegin', 'numberOfMonth']
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop', state[arrInput[i]], arrInput[i])
            if (!state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    const handleUpdateRegister = () => {
        let isValid = checkValideInput();
        if (isValid === true) {
            props.updateObject(state);
            console.log("check data modalUpdate: ", state);
        }
    }
    return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                <ModalHeader >Update RegisterRoom</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            <Label for="studentId">
                                MSSV
                            </Label>
                            <Input
                                id="studentId"
                                name="studentId"
                                onChange={(event) => handleOnchangeInput(event, "studentId")}
                                value={state.studentId}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="roomId">
                                Mã phòng
                            </Label>
                            <Input
                                id="roomId"
                                name="roomId"
                                onChange={(event) => handleOnchangeInput(event, "roomId")}
                                value={state.roomId}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dateBegin">
                                Ngày bắt đầu ở
                            </Label>
                            <Input
                                id="dateBegin"
                                name="dateBegin"
                                type="date"
                                onChange={(event) => handleOnchangeInput(event, "dateBegin")}
                                value={state.dateBegin}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numberOfMonth">
                                Số tháng dự kiến lưu trú
                            </Label>
                            <Input
                                id="numberOfMonth"
                                name="numberOfMonth"
                                onChange={(event) => handleOnchangeInput(event, "numberOfMonth")}
                                value={state.numberOfMonth}
                            />
                        </FormGroup>
                        <Label for="gender">
                            Tình trạng hóa đơn
                        </Label>

                        <FormGroup>
                            <select onChange={(event) => handleOnchangeInput(event, "domitoryFeeStatus")}>
                                <option >--Chọn tình trạng hóa đơn--</option>
                                <option value={true}>Đã thanh toán</option>
                                <option value={false}>Chưa thanh toán</option>
                            </select>
                        </FormGroup>
                        <Label for="status">
                            Trạng thái
                        </Label>
                        <FormGroup>
                            <select onChange={(event) => handleOnchangeInput(event, "status")}>
                                <option>-- Chọn trạng thái--</option>
                                <option value={true}>Còn hạn</option>
                                <option value={false}>Hết hạn</option>
                            </select>
                        </FormGroup>
                        <Button color="primary" onClick={() => handleUpdateRegister()}>
                            Cập nhật
                        </Button>{' '}
                        <Button color="secondary" onClick={props.toggle}>
                            Quay lại
                        </Button>
                    </Form>
                </ModalBody>
                {/* Nút tắt phần modal */}
                {/* <ModalFooter>
                    <Button color="primary" onClick={props.toggle}>
                        Create
                    </Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>
                        Cancel
                    </Button>
                </ModalFooter> */}
            </Modal>
        </div>
    );
}

export default UpdateRegister;