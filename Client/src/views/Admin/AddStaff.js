import React, { useState } from 'react';
import {
    Form, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, Label
} from 'reactstrap';
import InputField from '../InputField';

function AddStaff(props) {
    const [state, setState] = useState({
        lastName: '',
        firstName: '',
        dateOfBirth: '',
        email: '',
        identiFyCardNumber: '',
        phoneNumber: '',
        address: '',
        gender: true,
        idCard: '',
    });

    const handleOnchangeInput = (event, item) => {
        setState({
            ...state,
            [item]: item === 'gender' ? event.target.value === 'true' : event.target.value,
        });
    };

    const checkValidInput = () => {
        const requiredFields = ['lastName', 'firstName', 'dateOfBirth', 'identiFyCardNumber', 'phoneNumber', 'address', 'idCard'];
        const missingField = requiredFields.find(field => !state[field]);
        if (missingField) {
            alert('Missing parameter: ' + missingField);
            return false;
        }
        return true;
    };

    const handleAddNewStaff = () => {
        if (checkValidInput()) {
            props.createObject(state);
            console.log("data modal: ", state);
        }
    };
    return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                <ModalHeader>Thêm {props.object}</ModalHeader>
                <ModalBody>
                    <Form>
                        <InputField id="lastName" label="Tên" type="text" value={state.lastName} onChange={handleOnchangeInput} />
                        <InputField id="firstName" label="Họ và Tên lót" type="text" value={state.firstName} onChange={handleOnchangeInput} />
                        <InputField id="dateOfBirth" label="Ngày sinh" type="date" value={state.dateOfBirth} onChange={handleOnchangeInput} />
                        <InputField id="email" label="Email" type="text" value={state.email} onChange={handleOnchangeInput} />
                        <InputField id="identiFyCardNumber" label="CMND/ CCCD" type="text" value={state.identiFyCardNumber} onChange={handleOnchangeInput} />
                        <InputField id="phoneNumber" label="Số điện thoại" type="text" value={state.phoneNumber} onChange={handleOnchangeInput} />
                        <InputField id="address" label="Địa chỉ" type="text" value={state.address} onChange={handleOnchangeInput} />
                        <InputField id="idCard" label="MSNV" type="text" value={state.idCard} onChange={handleOnchangeInput} />

                        <Label for="gender">Giới tính</Label>
                        <FormGroup>
                            <Label for="gender">Nam</Label>
                            <Input
                                id="gender"
                                name="gender"
                                type="radio"
                                onChange={(event) => handleOnchangeInput(event, "gender")}
                                value={true}
                            />
                            <Label for="gender">Nữ</Label>
                            <Input
                                id="gender"
                                name="gender"
                                type="radio"
                                onChange={(event) => handleOnchangeInput(event, "gender")}
                                value={false}
                            />
                        </FormGroup>

                        <Button color="primary" onClick={handleAddNewStaff}>Thêm</Button>
                        <Button color="secondary" onClick={props.toggle}>Quay lại</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AddStaff;