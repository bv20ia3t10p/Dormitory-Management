import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Autocomplete,
  TextField,
} from "@mui/material";
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

const uniInit = [
  { id: 1, name: "Trường Đại Học Công Nghệ Thông Tin" },
  {
    id: 2,
    name: "Trường Đại Học Bách Khoa",
  },
  {
    id: 3,
    name: "Trường Đại Học Khoa Học Tự Nhiên",
  },
  {
    id: 4,
    name: "Trường Đại Học Kinh Tế Luật",
  },
];

function Addstudent(props) {
  const [universities, setUniversities] = useState(uniInit);
  const [currentUni, setCurrentUni] = useState(uniInit[0]);
  const [state, setState] = useState({
    lastName: "",
    firstName: "",
    birthDate: "",
    gender: true,
    ethnic: "",
    nationnality: "",
    phoneNumber: "",
    homeAddress: "",
    mainAddress: "",
    email: "",
    avartar: "test",
    identifyCardNumber: "",
    universitysutdentId: "",
    faculty: "",
    major: "",
    schoolYear: "",
    relatedPersonName: "",
    relatedPersonPhoneNumber: "",
    universityId: "",
  });
  const handleOnchangeInput = (event, item) => {
    let copyState = { ...state };
    if (event.target.value == "true" && item == "gender") {
      copyState["gender"] = true;
    } else if (event.target.value == "false" && item == "gender") {
      copyState["gender"] = false;
    } else {
      copyState[item] = event.target.value;
    }
    setState({
      ...copyState,
    });
  };
  const checkValideInput = () => {
    let isValid = true;
    let arrInput = [
      "lastName",
      "firstName",
      "birthDate",
      "ethnic",
      "nationnality",
      "phoneNumber",
      "homeAddress",
      "mainAddress",
      "email",
      "avartar",
      "identifyCardNumber",
      "universitysutdentId",
      "faculty",
      "major",
      "schoolYear",
      "relatedPersonName",
      "relatedPersonPhoneNumber",
      "universityId",
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
  const handleAddNewStudent = () => {
    let isValid = checkValideInput();
    if (isValid === true) {
      props.createObject(state);
      console.log("data modal: ", state);
      // { lastName: 'df', firstName: 'sdf', dateOfBirth: '2022-12-03', email: 'test1@gmail.com', identiFyCardNumber: '123', phoneNumber: '12345', address: '12345', gender: true, status: true }
    }
  };
  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <ModalHeader>Thêm Sinh Viên</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="lastName">Tên</Label>
              <Input
                id="lastName"
                name="lastName"
                onChange={(event) => handleOnchangeInput(event, "lastName")}
                value={state.lastName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="LastName">Họ và Tên lót</Label>
              <Input
                id="firstName"
                name="firstName"
                onChange={(event) => handleOnchangeInput(event, "firstName")}
                value={state.firstName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthDate">Ngày sinh</Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                onChange={(event) => handleOnchangeInput(event, "birthDate")}
                value={state.birthDate}
              />
            </FormGroup>
            <FormGroup>
              <Label for="gender">Giới tính</Label>
              <FormControl style={{ width: "100%", maxWidth: "unset" }}>
                <Select
                  name={"gender"}
                  id="gender"
                  value={state.gender}
                  style={{ width: "100%", maxWidth: "unset" }}
                  onChange={(event) => handleOnchangeInput(event, "gender")}
                >
                  <MenuItem value={false}>Nữ</MenuItem>
                  <MenuItem value={true}>Nam</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <Label for="ethnic">Dân tộc</Label>
              <Input
                id="ethnic"
                name="ethnic"
                onChange={(event) => handleOnchangeInput(event, "ethnic")}
                value={state.ethnic}
              />
            </FormGroup>
            <FormGroup>
              <Label for="nationnality">Quốc tịch</Label>
              <Input
                id="nationnality"
                name="nationnality"
                onChange={(event) => handleOnchangeInput(event, "nationnality")}
                value={state.nationnality}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                onChange={(event) => handleOnchangeInput(event, "phoneNumber")}
                value={state.phoneNumber}
              />
            </FormGroup>
            <FormGroup>
              <Label for="homeAddress">Địa chỉ tạm trú</Label>
              <Input
                id="homeAddress"
                name="homeAddress"
                onChange={(event) => handleOnchangeInput(event, "homeAddress")}
                value={state.homeAddress}
              />
            </FormGroup>
            <FormGroup>
              <Label for="mainAddress">Địa chỉ thường trú</Label>
              <Input
                id="mainAddress"
                name="mainAddress"
                onChange={(event) => handleOnchangeInput(event, "mainAddress")}
                value={state.mainAddress}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                onChange={(event) => handleOnchangeInput(event, "email")}
                value={state.email}
              />
            </FormGroup>
            <FormGroup>
              <Input
                id="avartar"
                name="avartar"
                type="hidden"
                onChange={(event) => handleOnchangeInput(event, "avartar")}
                value={state.avartar}
              />
            </FormGroup>
            <FormGroup>
              <Label for="identifyCardNumber">CMND/CCCD</Label>
              <Input
                id="identifyCardNumber"
                name="identifyCardNumber"
                onChange={(event) =>
                  handleOnchangeInput(event, "identifyCardNumber")
                }
                value={state.identifyCardNumber}
              />
            </FormGroup>
            <FormGroup>
              <Label for="universitysutdentId">MSSV</Label>
              <Input
                id="universitysutdentId"
                name="universitysutdentId"
                onChange={(event) =>
                  handleOnchangeInput(event, "universitysutdentId")
                }
                value={state.universitysutdentId}
              />
            </FormGroup>
            <FormGroup>
              <Label for="faculty">Khoa</Label>
              <Input
                id="faculty"
                name="faculty"
                onChange={(event) => handleOnchangeInput(event, "faculty")}
                value={state.faculty}
              />
            </FormGroup>
            <FormGroup>
              <Label for="major">Chuyên ngành</Label>
              <Input
                id="major"
                name="major"
                onChange={(event) => handleOnchangeInput(event, "major")}
                value={state.major}
              />
            </FormGroup>
            <FormGroup>
              <Label for="schoolYear">Năm học</Label>
              <Input
                id="schoolYear"
                name="schoolYear"
                onChange={(event) => handleOnchangeInput(event, "schoolYear")}
                value={state.schoolYear}
              />
            </FormGroup>
            <FormGroup>
              <Label for="relatedPersonName">Tên Người thân</Label>
              <Input
                id="relatedPersonName"
                name="relatedPersonName"
                onChange={(event) =>
                  handleOnchangeInput(event, "relatedPersonName")
                }
                value={state.relatedPersonName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="relatedPersonPhoneNumber">SĐT Người thân</Label>
              <Input
                id="relatedPersonPhoneNumber"
                name="relatedPersonPhoneNumber"
                onChange={(event) =>
                  handleOnchangeInput(event, "relatedPersonPhoneNumber")
                }
                value={state.relatedPersonPhoneNumber}
              />
            </FormGroup>
            <FormGroup>
              {/* <Label for="universityId">Mã trường</Label>
              <Input
                id="universityId"
                name="universityId"
                onChange={(event) => handleOnchangeInput(event, "universityId")}
                value={state.universityId}
              /> */}
              {universities && (
                <Autocomplete
                  options={universities}
                  getOptionLabel={(r) => r.name}
                  value={currentUni}
                  id="univeristyId"
                  label="Mã trường"
                  style={{ paddingBottom: "2vh" }}
                  onChange={(e, newVal) => {
                    setState(() => {
                      return { ...state, universityId: newVal.id };
                    });
                    setCurrentUni(newVal);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tìm kiếm trường"
                      variant="standard"
                    />
                  )}
                />
              )}
            </FormGroup>
            <div className="modalConfirmationControlButtons">
              <Button color="secondary" onClick={props.toggle}>
                Quay lại
              </Button>
              <Button color="primary" onClick={() => handleAddNewStudent()}>
                Thêm
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

export default Addstudent;
