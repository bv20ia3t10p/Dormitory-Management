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
import { url } from "./HandleObject";


const roomTypesInit = {
  1: 'Phòng kiểu A',
  2: 'Phòng kiểu B',
  3: 'Phòng kiểu C',
  4: 'Phòng kiểu D'
}

const getRoomTypes = async (setRoomTypes) => {
  await fetch(url + "RoomType").then((e) => {
    if (e.ok) return e.json()
    else throw new Error("Failed to get roomtypes");
  }).then(e => setRoomTypes(() => e.map((t) => ({ ...t, name: roomTypesInit[t.id] })))).catch(e => alert(e))
}


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
  const [state, setState] = useState(
    {
      id: 0,
      numberOfSLot: "",
      furniture: true,
      domitoryFee: "",
    }
  );
  const [roomTypes, setRoomTypes] = useState(roomTypesInit);
  const [currentRoomTypeDetail, setCurrentRoomTypeDetail] = useState();
  // const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getRoomTypes(setRoomTypes);
  }, []);
  useEffect(() => {
    setState(() => ({ ...state, ...currentRoomTypeDetail }))
  }, [currentRoomTypeDetail])
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
    let isValid = checkValideInput();
    if (isValid === true) {
      props.updateTypeRoom(state);
      console.log("check data modalUpdate from children: ", state);
    }
  };

  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <ModalHeader>Cập nhật thông tin loại phòng</ModalHeader>
        <ModalBody>
          <Form>
            {(roomTypes && roomTypes.length) && (
              <Autocomplete
                options={roomTypes}
                getOptionLabel={(r) => r.name}
                value={currentRoomTypeDetail}
                id="roomTypeId"
                label="Chọn loại phòng"
                noOptionsText="Không có lựa chọn"
                style={{ paddingBottom: "2vh" }}
                onChange={(e, newVal) => {
                  setCurrentRoomTypeDetail(() => newVal);
                  if (newVal && typeof newVal.id)
                    setState({ ...state, id: newVal.id });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm mã loại phòng"
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
            <div className="modalConfirmationControlButtons">
              <Button color="secondary" onClick={props.toggle}>
                Hủy
              </Button>
              <Button color="primary" onClick={() => handleUpdateTypeRoom()}>
                Cập nhật
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default UpdateTypeRoom;
