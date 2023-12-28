import React, { useState,useEffect } from 'react';
import {
    Form, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, Label,Row,Col,Table
} from 'reactstrap';
import InputField from '../InputField';

function AddReceipt(props) {
    const [searchRoom,setSearchRoom] = useState()
    const [roomInfor,setRoomInfor] = useState([])
    const [state, setState] = useState({
        roomId: '',
        electricNew: '',
        electricOld: '',
        waterOld: '',
        waterNew: '',
    });
    const handleOnchangeInput = (event, item) => {
        setState({
            ...state,
            [item]: item === 'gender' ? event.target.value === 'true' : event.target.value,
        });
    };
    useEffect(()=>{
        fetchSearcRoomhResults(searchRoom)
    },[searchRoom])

    const fetchSearcRoomhResults = async (searchQuery) => {
        try {
          // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your search API
          const response = await fetch(`https://localhost:7184/Rooms/Search?search=${searchQuery}`);
          const data = await response.json();
       
          // Assuming the API response has an array of results under a 'data' key
          setRoomInfor(data)
        } catch (error) {
          console.error('Error fetching data from the API:', error);
        }
      };

    const checkValidInput = () => {
        const requiredFields = ['roomId', 'electricNew', 'electricOld', 'waterOld', 'waterNew'];
        const missingField = requiredFields.find(field => !state[field]);
        if (missingField) {
            alert('Missing parameter: ' + missingField);
            return false;
        }
        return true;
    };

    const handleAddReceipt = () => {
        if (checkValidInput()) {
            props.createObject(state);
            console.log("data modal: ", state);
        }
    }

    const handleRoomRowClick = (roomId) => {
        // Update the state with the clicked studentId
        setState((prevState) => ({
          ...prevState,
          roomId: roomId
        }));
      };
    return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                <ModalHeader >Thêm tiền điện, tiền nước</ModalHeader>
                <ModalBody>
                <Row> 
                    <Col className="bg-light border" md={8} > 
                            <Label for="Room Infor">
                               Tìm phòng
                            </Label>
                            <Input
                                onChange={(e)=>setSearchRoom(e.target.value)}
                            />
                    </Col>
                </Row>
                <Row>
                <Table hover size='sm'>
                                <thead>
                                    <tr>
                                    <th>
                                        Id Phòng
                                    </th>
                                    <th>
                                        Tên Phòng
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomInfor.map((item)=>{
                                    
                                    return(
                                        <tr
                                        id="roomId"
                                        name="roomId"
                                        scope="row"
                                        onClick={()=>handleRoomRowClick(item.id)}
                                        >
                                        <th>{item.id}</th>
                                        <th>{item.name}</th>
                                                                    
                                        </tr>)
                                    })}

                                </tbody>
                                </Table>
                </Row>
                    <Form >
                        <InputField id="roomId" label="roomId" type="number" value={state.roomId} onChange={handleOnchangeInput} />
                        <InputField id="electricNew" label="electricNew" type="number" value={state.electricNew} onChange={handleOnchangeInput} />
                        <InputField id="electricOld" label="electricOld" type="number" value={state.electricOld} onChange={handleOnchangeInput} />
                        <InputField id="waterNew" label="waterNew" type="number" value={state.waterNew} onChange={handleOnchangeInput} />
                        <InputField id="waterOld" label="waterOld" type="number" value={state.waterOld} onChange={handleOnchangeInput} />

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
                        <Button color="primary" onClick={handleAddReceipt}>Thêm</Button>
                        <Button color="secondary" onClick={props.toggle}>Quay lại</Button>
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