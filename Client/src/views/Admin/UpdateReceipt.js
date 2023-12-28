// import {  } from "@mui/base";
import { InputLabel, FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import {
  Form,
  Row,
  FormGroup,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

function UpdateReceipt(props) {
  let Receipt = props.currentObject;
  console.log(`Check Receipt:`, Receipt);
  // https://localhost:7184/ElectricWaterLog/1?RoomId=1
  // RoomId
  // ElectricWaterLogId
  // "electricNew": 0,
  // "electricOld": 0,
  // "waterOld": 0,
  // "waterNew": 0,
  // "feeStatus": true
  const [state, setState] = useState({
    id: Receipt.ObjectEdit.id,
    RoomId: Receipt.ObjectEdit.room.id,
    electricNew: Receipt.ObjectEdit.electricNew,
    electricOld: Receipt.ObjectEdit.electricOld,
    waterNew: Receipt.ObjectEdit.waterNew,
    waterOld: Receipt.ObjectEdit.waterOld,
    feeStatus: Receipt.ObjectEdit.feeStatus,
  });
  const handleOnchangeInput = (event, item) => {
    // let copyState = { ...state };
    // console.log("check event: ", event);
    // if (event.target.value == "true" && item == "feeStatus") {
    //   copyState["feeStatus"] = true;
    // } else if (event.target.value == "false" && item == "feeStatus") {
    //   copyState["feeStatus"] = false;
    // } else {
    //   copyState[item] = event.target.value;
    // }
    const copyState = { ...state, [item]: event.target.value };
    // alert(copyState[item]);
    setState({
      ...copyState,
    });
  };
  const checkValideInput = () => {
    let isValid = true;
    let arrInput = [
      "id",
      "RoomId",
      "electricNew",
      "electricOld",
      "waterNew",
      "waterOld",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      console.log("check inside loop", state[arrInput[i]], arrInput[i]);
      if (!state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  const handleUpdateReceipt = () => {
    let isValid = checkValideInput();
    if (isValid === true) {
      props.updateObject(state);
      console.log("check data modalUpdate : ", state);
    }
  };
  return (
    <div>
      {state.id && (
        <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
          <ModalHeader>Cập nhật thông tin hóa đơn</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="electricNew">Tiêu thụ điện đầu</Label>
                <Input
                  id="electricNew"
                  name="electricNew"
                  onChange={(event) =>
                    handleOnchangeInput(event, "electricNew")
                  }
                  value={state.electricNew}
                />
              </FormGroup>
              <FormGroup>
                <Label for="electricOld">Tiêu thụ điện cuối</Label>
                <Input
                  id="electricOld"
                  name="electricOld"
                  onChange={(event) =>
                    handleOnchangeInput(event, "electricOld")
                  }
                  value={state.electricOld}
                />
              </FormGroup>
              <FormGroup>
                <Label for="waterNew">Tiêu thụ nước đầu</Label>
                <Input
                  id="waterNew"
                  name="waterNew"
                  onChange={(event) => handleOnchangeInput(event, "waterNew")}
                  value={state.waterNew}
                />
              </FormGroup>
              <FormGroup>
                <Label for="waterOld">Tiêu thụ nước cuối</Label>
                <Input
                  id="waterOld"
                  name="waterOld"
                  onChange={(event) => handleOnchangeInput(event, "waterOld")}
                  value={state.waterOld}
                />
              </FormGroup>
              {/* <Label for="feeStatus">feeStatus</Label> */}
              <FormGroup>
                {/* <select onChange={(event) => handleOnchangeInput(event, "feeStatus")}>
                                <option >--Choose feeStatus--</option>
                                <option value={true}>Đã thanh toán</option>
                                <option value={false}>Chưa thanh toán</option>
                            </select> */}
                <FormControl style={{ width: "100%", maxWidth: "unset" }}>
                  <InputLabel>Trạng thái thanh toán</InputLabel>
                  <Select
                    name={"feeStatus"}
                    id="feeStatus"
                    className="feeStatus"
                    label={"Trạng thái thanh toán"}
                    value={state.feeStatus}
                    style={{ width: "100%", maxWidth: "unset" }}
                    onChange={(event) =>
                      handleOnchangeInput(event, "feeStatus")
                    }
                  >
                    <MenuItem value={false}>Chưa thanh toán</MenuItem>
                    <MenuItem value={true}>Đã thanh toán</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
              <FormGroup>
                {/* <Label for="ElectricWaterLogId">
                                ElectricWaterLogId
                            </Label> */}
                <Input
                  id="id"
                  name="id"
                  type="hidden"
                  onChange={(event) => handleOnchangeInput(event, "Id")}
                  value={state.id}
                />
              </FormGroup>
              <FormGroup>
                {/* <Label for="RoomId">
                                RoomId
                            </Label> */}
                <Input
                  id="RoomId"
                  name="RoomId"
                  type="hidden"
                  onChange={(event) => handleOnchangeInput(event, "RoomId")}
                  value={state.RoomId}
                />
              </FormGroup>
              <div className="modalConfirmationControlButtons">
                <Button color="secondary" onClick={props.toggle}>
                  Cancel
                </Button>
                <Button color="primary" onClick={() => handleUpdateReceipt()}>
                  Update
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}

export default UpdateReceipt;
