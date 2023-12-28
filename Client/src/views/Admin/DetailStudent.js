import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./DetailStaff.scss";
import moment from "moment";
import { url } from "./HandleObject";

class DetailStudent extends React.Component {
  state = {
    student: {},
  };
  async componentDidMount() {
    if (this.props.match && this.props.match.params) {
      let id = this.props.match.params.id;
      console.log("check prams", this.props.match.params);
      let res = await axios.get(url + `api/Student/${id}`);
      this.setState({
        student: res.data ? res.data : [],
      });
      console.log(">>> check res student: ", res);
    }
  }
  handleBackButton = () => {
    this.props.history.push("/ManageStudent");
  };
  render() {
    let { student } = this.state;
    let isEmptyObj = Object.keys(student).length === 0;
    console.log(">>> check props: ", this.props);
    return (
      <>
        {isEmptyObj === false && (
          <>
            <div className="bg-info text-info pb-4">.</div>
            <div className="text-center p-3">
              <img
                className="mr-3"
                src="https://upload.wikimedia.org/wikipedia/vi/c/c6/Logo_KTX_%C4%90HQGTPHCM.png"
              ></img>
              <span className="h5 text-info">
                TRANG THÔNG TIN SINH VIÊN Ở KÝ TÚC XÁ ĐẠI HỌC QUỐC GIA
              </span>
            </div>
            <div className="section row">
              <div className="" style={{ width: "100%" }}>
                <table className="table table-hover">
                  <tr>
                    <td className="table-active border">Họ và tên</td>
                    <td className="font-weight-bold border">
                      {student.lastName + " " + student.firstName}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Ngày sinh</td>
                    <td className="font-weight-bold border">
                      {moment(student.birthDate).format("DD-MM-YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Giới tính</td>
                    <td className="font-weight-bold border">
                      {student.gender == true ? "Nam" : "Nữ"}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Niên khóa</td>
                    <td className="font-weight-bold border">
                      {student.schoolYear}
                    </td>
                  </tr>
                  {/* <tr><td className="table-active border">Mã trường</td><td className="font-weight-bold border">{student.universitysutdentId}</td></tr> */}
                  <tr>
                    <td className="table-active border">Khoa</td>
                    <td className="font-weight-bold border">{student.major}</td>
                  </tr>
                  <tr>
                    <td className="table-active border">Mã số sinh viên</td>
                    <td className="font-weight-bold border">
                      {student.universitysutdentId}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">CCCD</td>
                    <td className="font-weight-bold border">
                      {student.identifyCardNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Địa chỉ nhà</td>
                    <td className="font-weight-bold border">
                      {student.homeAddress}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Quốc gia</td>
                    <td className="font-weight-bold border">
                      {student.nationnality}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Dân tộc</td>
                    <td className="font-weight-bold border">
                      {student.ethnic}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Số điện thoại</td>
                    <td className="font-weight-bold border">
                      {student.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">
                      Tên người thân cần liên hệ
                    </td>
                    <td className="font-weight-bold border">
                      {student.relatedPersonName}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">
                      Số điện thoại người thân
                    </td>
                    <td className="font-weight-bold border">
                      {student.relatedPersonPhoneNumber}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div scope="row">
              <button
                type="button"
                className="btn btn-primary ml-5"
                onClick={() => this.handleBackButton()}
              >
                Quay lại
              </button>
            </div>
            <div className="clear-fix"></div>
          </>
        )}
      </>
    );
  }
}

export default withRouter(DetailStudent);
