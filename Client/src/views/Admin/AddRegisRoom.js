import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
  Table,
} from "reactstrap";
import { url } from "./HandleObject";

function AddregisRoom(props) {
  const [searchStudents, setSearchStudent] = useState();
  const [studentInfor, setStudentInfor] = useState([]);
  const [searchRoom, setSearchRoom] = useState();
  const [roomInfor, setRoomInfor] = useState([]);
  const [state, setState] = useState({
    studentId: "",
    roomId: "",
    numberOfMonth: "",
  });

  useEffect(() => {
    fetchSearchStudentsResults(searchStudents);
  }, [searchStudents]);

  useEffect(() => {
    fetchSearchRoomResults(searchRoom);
  }, [searchRoom]);

  const fetchSearchStudentsResults = async (searchQuery) => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your search API
      const response = await fetch(
        url + `api/Student/searchAllContent?search=${searchQuery}`
      );
      const data = await response.json();

      // Assuming the API response has an array of results under a 'data' key
      setStudentInfor(data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };
  const fetchSearchRoomResults = async (searchQuery) => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your search API
      const response = await fetch(url + `Rooms/Search?search=${searchQuery}`);
      const data = await response.json();

      // Assuming the API response has an array of results under a 'data' key
      setRoomInfor(data);
    } catch (error) {
      console.error("Error fetching data from the API:", error);
    }
  };
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
    let arrInput = ["studentId", "roomId", "numberOfMonth"];
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
  const handleAddRegister = () => {
    let isValid = checkValideInput();
    if (isValid === true) {
      props.createObject(state);
      console.log("data modal: ", state);
      // { lastName: 'df', firstName: 'sdf', dateOfBirth: '2022-12-03', email: 'test1@gmail.com', identiFyCardNumber: '123', phoneNumber: '12345', address: '12345', gender: true, status: true }
    }
  };
  const handleSudentRowClick = (studentId) => {
    // Update the state with the clicked studentId
    setState((prevState) => ({
      ...prevState,
      studentId: studentId,
    }));
  };

  const handleRoomRowClick = (roomId) => {
    // Update the state with the clicked studentId
    setState((prevState) => ({
      ...prevState,
      roomId: roomId,
    }));
  };

  return (
    <div>
      <Modal
        isOpen={props.modal}
        fade={false}
        toggle={props.toggle}
        fullscreen="lg"
        size="lg"
        style={{ maxWidth: "1600px", width: "80%" }}
      >
        <ModalHeader>Register Room</ModalHeader>
        <ModalBody>
          <Row>
            <Col className="bg-light border" md={8}>
              <Label for="Student Infor">Tìm Kiếm Sinh Viên</Label>
              <Input onChange={(e) => setSearchStudent(e.target.value)} />
            </Col>
            <Col className="bg-light border" md={4}>
              <Label for="Room Infor">Search Room</Label>
              <Input onChange={(e) => setSearchRoom(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th>Id Sinh Viên</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>MSSV</th>
                  </tr>
                </thead>
                <tbody>
                  {studentInfor.map((item) => {
                    return (
                      <tr
                        id="studentId"
                        name="studentId"
                        scope="row"
                        onClick={() => handleSudentRowClick(item.id)}
                      >
                        <th>{item.id}</th>
                        <th>{`${item.firstName} ${item.lastName}`}</th>
                        <th>{item.email}</th>
                        <th>{item.phoneNumber}</th>
                        <th>{item.identifyCardNumber}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col md={4}>
              <Table hover size="sm">
                <thead>
                  <tr>
                    <th>Id Phòng</th>
                    <th>Tên Phòng</th>
                    <th>Chỗ Trống</th>
                  </tr>
                </thead>
                <tbody>
                  {roomInfor.map((item) => {
                    return (
                      <tr
                        id="roomId"
                        name="roomId"
                        scope="row"
                        onClick={() => handleRoomRowClick(item.id)}
                      >
                        <th>{item.id}</th>
                        <th>{item.name}</th>
                        <th>{item.slotRemain}</th>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Form>
            <FormGroup>
              <Label for="studentId">MSSV</Label>
              <Input
                id="studentId"
                name="studentId"
                onChange={(event) => handleOnchangeInput(event, "studentId")}
                value={state.studentId}
              />
            </FormGroup>
            <FormGroup>
              <Label for="roomId">Mã phòng</Label>
              <Input
                id="roomId"
                name="roomId"
                onChange={(event) => handleOnchangeInput(event, "roomId")}
                value={state.roomId}
              />
            </FormGroup>
            <FormGroup>
              <Label for="numberOfMonth">Số tháng dự kiến lưu trú</Label>
              <Input
                id="numberOfMonth"
                name="numberOfMonth"
                onChange={(event) =>
                  handleOnchangeInput(event, "numberOfMonth")
                }
                value={state.numberOfMonth}
              />
            </FormGroup>

            <div className="modalConfirmationControlButtons">
              <Button color="primary" onClick={() => handleAddRegister()}>
                Đăng ký ở
              </Button>{" "}
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

export default AddregisRoom;
