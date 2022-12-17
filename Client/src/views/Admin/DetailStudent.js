import React from "react";
import { withRouter } from "react-router-dom"
import axios from 'axios';
import './DetailStaff.scss';


class DetailStudent extends React.Component {
    state = {
        student: {}
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            let res = await axios.get(`https://localhost:7184/Student/${id}`);
            this.setState({
                student: res.data ? res.data : []
            })
            console.log('>>> check res student: ', res)
        }

    }
    handleBackButton = () => {
        this.props.history.push('/admin');
    }
    render() {
        let { student } = this.state;
        let isEmptyObj = Object.keys(student).length === 0;
        console.log('>>> check props: ', this.props)
        return (
            <>
                {isEmptyObj === false &&
                    <>
                        <div class="Staff-detail">
                            <h1 class="Staff-detail h1">Staff Student</h1>
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <td scope="col">{student.id}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Staff's name</th>
                                        <td>{student.firstName} {student.lastName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's email</th>
                                        <td>{student.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's dateOfBirth</th>
                                        <td>{student.dateOfBirth}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's email</th>
                                        <td>{student.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's identiFyCardNumber</th>
                                        <td>{student.identiFyCardNumber}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's phoneNumber</th>
                                        <td>{student.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's address</th>
                                        <td>{student.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's gender</th>
                                        <td>{JSON.stringify(student.gender)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's idCard</th>
                                        <td>{student.idCard}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">student's status</th>
                                        <td>{JSON.stringify(student.status)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><button type="button" class="btn btn-danger" onClick={() => this.handleBackButton()}>Back</button></th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default withRouter(DetailStudent);