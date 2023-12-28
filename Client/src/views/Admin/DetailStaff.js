import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./DetailStaff.scss";
import moment from "moment";
import { url } from "./HandleObject";

class DetailStaff extends React.Component {
  state = {
    staff: {},
  };
  async componentDidMount() {
    if (this.props.match && this.props.match.params) {
      let id = this.props.match.params.id;
      let res = await axios.get(url + `api/Manager/${id}/manager`);
      this.setState({
        staff: res.data ? res.data : [],
      });
      console.log(">>> check res staff: ", res);
    }
  }
  handleBackButton = () => {
    this.props.history.push("/admin");
  };
  render() {
    let { staff } = this.state;
    let isEmptyObj = Object.keys(staff).length === 0;
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
                      {staff.lastName + " " + staff.firstName}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Email</td>
                    <td className="font-weight-bold border">{staff.email}</td>
                  </tr>
                  <tr>
                    <td className="table-active border">Mã nhân viên</td>
                    <td className="font-weight-bold border">
                      {staff.identiFyCardNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Ngày sinh</td>
                    <td className="font-weight-bold border">
                      {moment(staff.dateOfBirth).format("DD-MM-YYYY")}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Giới tính</td>
                    <td className="font-weight-bold border">
                      {staff.gender == true ? "Nam" : "Nữ"}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Số điện thoại</td>
                    <td className="font-weight-bold border">
                      {staff.phoneNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-active border">Địa chỉ</td>
                    <td className="font-weight-bold border">{staff.address}</td>
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
          </>
        )}
      </>
    );
  }
}

export default withRouter(DetailStaff);
