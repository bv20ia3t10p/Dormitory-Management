import React, { useState } from "react";
import { Form, Button, Modal, ModalHeader, ModalBody, Input } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "../InputField";
import { url } from "./HandleObject";

const ChangePass = (props) => {
  const [state, setState] = useState({
    userName: "",
    oldPassWord: "",
    newPassword: "",
  });

  const handleOnChangeInput = (event, item) => {
    setState({
      ...state,
      [item]:
        item === "gender" ? event.target.value === "true" : event.target.value,
    });
  };

  const checkValidInput = () => {
    const requiredFields = ["userName", "oldPassWord", "newPassword"];
    const missingField = requiredFields.find((field) => !state[field]);
    if (missingField) {
      toast.error("Missing parameter: " + missingField);
      return false;
    }
    return true;
  };

  const handleChangePassWord = async () => {
    try {
      if (checkValidInput()) {
        const response = await axios.put(url + "Account/ChangePassword", state);
        toast.success("Change password success");
        console.log("data modal: ", response.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <ModalHeader>Đổi mật khẩu</ModalHeader>
        <ModalBody>
          <Form>
            <InputField
              id="userName"
              label="Tên đăng nhập"
              type="text"
              value={state.userName}
              onChange={(event) => handleOnChangeInput(event, "userName")}
            />
            <InputField
              id="oldPassWord"
              label="Mật khẩu cũ"
              type="password"
              value={state.oldPassWord}
              onChange={(event) => handleOnChangeInput(event, "oldPassWord")}
            />
            <InputField
              id="newPassword"
              label="Mật khẩu mới"
              type="password"
              value={state.newPassword}
              onChange={(event) => handleOnChangeInput(event, "newPassword")}
            />

            <div className="modalConfirmationControlButtons">
              <Button color="primary" onClick={handleChangePassWord}>
                Đổi mật khẩu
              </Button>
              <Button color="secondary" onClick={props.toggle}>
                Quay lại
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ChangePass;
