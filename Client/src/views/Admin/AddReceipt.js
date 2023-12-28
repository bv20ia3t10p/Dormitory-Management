import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Autocomplete, TextField } from "@mui/material";
import InputField from "../InputField";
import { url } from "./HandleObject";

export const getRooms = async (setRooms) => {
  await fetch(url + "Rooms")
    .then((e) => e.ok && e.json())
    .then((e) => {
      setRooms(() => e);
    });
};

function AddReceipt(props) {
  const [state, setState] = useState({
    roomId: "",
    electricNew: "",
    electricOld: "",
    waterOld: "",
    waterNew: "",
  });
  const handleOnchangeInput = (event, item) => {
    setState({
      ...state,
      [item]:
        item === "gender" ? event.target.value === "true" : event.target.value,
    });
  };
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    getRooms(setRooms);
  }, []);

  const checkValidInput = () => {
    const requiredFields = [
      "roomId",
      "electricNew",
      "electricOld",
      "waterOld",
      "waterNew",
    ];
    const missingField = requiredFields.find((field) => !state[field]);
    if (missingField) {
      alert("Missing parameter: " + missingField);
      return false;
    }
    return true;
  };

  const handleAddReceipt = () => {
    if (checkValidInput()) {
      props.createObject(state);
      console.log("data modal: ", state);
    }
  };
  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <ModalHeader>Thêm tiền điện, tiền nước</ModalHeader>
        <ModalBody>
          <Form>
            {/* <InputField
              id="roomId"
              label="roomId"
              type="number"
              value={state.roomId}
              onChange={handleOnchangeInput}
            /> */}
            {rooms && (
              <Autocomplete
                options={rooms}
                getOptionLabel={(r) => r.name}
                value={state.room}
                id="roomId"
                noOptionsText="Không có lựa chọn"
                label="Tìm kiếm phòng"
                style={{ paddingBottom: "2vh" }}
                onChange={(e, newVal) =>
                  newVal.id && setState({ ...state, roomId: newVal.id })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm phòng"
                    variant="standard"
                  />
                )}
              />
            )}
            <InputField
              id="electricNew"
              label="electricNew"
              type="number"
              value={state.electricNew}
              onChange={handleOnchangeInput}
            />
            <InputField
              id="electricOld"
              label="electricOld"
              type="number"
              value={state.electricOld}
              onChange={handleOnchangeInput}
            />
            <InputField
              id="waterNew"
              label="waterNew"
              type="number"
              value={state.waterNew}
              onChange={handleOnchangeInput}
            />
            <InputField
              id="waterOld"
              label="waterOld"
              type="number"
              value={state.waterOld}
              onChange={handleOnchangeInput}
            />

            {/* <FormGroup>
                            <Label for="roomId">
                                roomId
                            </Label>
                            <Input
                                id="roomId"
                                name="roomId"
                                value={state.roomId}
                                onChange={handleOnchangeInput} 

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="electricNew">
                                electricNew
                            </Label>
                            <Input
                                id="electricNew"
                                name="electricNew"
                                onChange={handleOnchangeInput}
                                value={state.electricNew}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="electricOld">
                                electricOld
                            </Label>
                            <Input
                                id="electricOld"
                                name="electricOld"
                                onChange={handleOnchangeInput}
                                value={state.electricOld}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="waterNew">
                                waterNew
                            </Label>
                            <Input
                                id="waterNew"
                                name="waterNew"

                                onChange={handleOnchangeInput}
                                value={state.waterNew}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="waterOld">
                                waterOld
                            </Label>
                            <Input
                                id="waterOld"
                                name="waterOld"

                                onChange={handleOnchangeInput}
                                value={state.waterOld}
                            />
                        </FormGroup> */}
            <div className="modalConfirmationControlButtons">
              <Button color="primary" onClick={handleAddReceipt}>
                Thêm
              </Button>
              <Button color="secondary" onClick={props.toggle}>
                Quay lại
              </Button>
            </div>

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

export default AddReceipt;
