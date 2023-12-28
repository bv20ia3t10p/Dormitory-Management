import React, { useEffect, useState } from "react";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";

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
import { getRooms } from "./AddReceipt";
import { FormControl } from "@mui/base";

function UpdateTypeRoom(props) {
  // let Receipt = props.CurrentReceipt;
  // console.log("check prop receipt in child: ", Receipt)
  // // https://localhost:7184/ElectricWaterLog/1?RoomId=1
  // // RoomId
  // // ElectricWaterLogId
  // // "electricNew": 0,
  // // "electricOld": 0,
  // // "waterOld": 0,
  // // "waterNew": 0,
  // // "feeStatus": true
  const [state, setState] = useState({
    id: 0,
    numberOfSLot: "",
    furniture: true,
    domitoryFee: "",
  });
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getRooms(setRooms);
  }, []);
  const [selectedRoom, setSelectedRoom] = useState();
  // console.log("check state in children: ", state);
  const handleOnchangeInput = (event, item) => {
    let copyState = { ...state };
    console.log("check event: ", event);
    if (event.target.value == "true" && item == "furniture") {
      copyState["furniture"] = true;
    } else if (event.target.value == "false" && item == "furniture") {
      copyState["furniture"] = false;
    } else {
      copyState[item] = event.target.value;
    }
    setState({
      ...copyState,
    });
  };
  const checkValideInput = () => {
    let isValid = true;
    let arrInput = ["id", "numberOfSLot", "domitoryFee"];
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
  const handleUpdateTypeRoom = () => {
    // alert("ngia")
    let isValid = checkValideInput();
    if (isValid === true) {
      props.updateTypeRoom(state);
      console.log("check data modalUpdate from children: ", state);
    }
  };

  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <ModalHeader>Update Receipt</ModalHeader>
        <ModalBody>
          <Form>
            {rooms && (
              <Autocomplete
                options={rooms}
                getOptionLabel={(r) => r.name}
                value={selectedRoom}
                id="roomId"
                label="Tìm kiếm phòng"
                style={{ paddingBottom: "2vh" }}
                onChange={(e, newVal) => {
                  setSelectedRoom(() => newVal);
                  setState({ ...state, id: newVal.id });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm phòng"
                    variant="standard"
                  />
                )}
              />
            )}
            <FormGroup>
              <Label for="numberOfSLot">Số chỗ</Label>
              <Input
                id="numberOfSLot"
                name="numberOfSLot"
                onChange={(event) => handleOnchangeInput(event, "numberOfSLot")}
                value={state.numberOfSLot}
              />
            </FormGroup>
            {/* <Label for="furniture">Đồ nội thất</Label> */}
            <FormGroup>
              <Label for="gender">Trạng thái nội thất</Label>
              <FormControl style={{ width: "100%", maxWidth: "unset" }}>
                <Select
                  name={"furniture"}
                  id="furniture"
                  value={state.furniture}
                  style={{ width: "100%", maxWidth: "unset" }}
                  onChange={(event) => handleOnchangeInput(event, "furniture")}
                >
                  <MenuItem value={false}>Không có nội thất</MenuItem>
                  <MenuItem value={true}>Có nội thất</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Label for="domitoryFee">Giá tiền / tháng</Label>
              <Input
                id="domitoryFee"
                name="domitoryFee"
                onChange={(event) => handleOnchangeInput(event, "domitoryFee")}
                value={state.domitoryFee}
              />
            </FormGroup>
            <Button color="primary" onClick={() => handleUpdateTypeRoom()}>
              Cập nhật
            </Button>
            <Button color="secondary" onClick={props.toggle}>
              Hủy
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UpdateTypeRoom;
