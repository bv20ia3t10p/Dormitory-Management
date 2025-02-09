import { useHistory } from "react-router-dom"
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import Checklogin from "./CheckLogin"
import "./Login.scss"
import axios from "axios"
import { toast } from "react-toastify"
import Addstudent from "../Admin/AddStudent"
import ChangePass from "../Admin/ChangePass"
import { url } from "../Admin/HandleObject"
import { useDispatch } from "react-redux"
import { store_login, clear_logout } from "../../redux/funcSlice"

function Login(props) {
    const dispatch = useDispatch()
    const [state, setState] = useState({ ListUsers: [] })
    const [modal, setModal] = useState(false)
    const [openChangePass, setOpenChangePass] = useState(false)
    const [loginn, setLogin] = useState({
        userName: "",
        password: "",
    })

    let history = useHistory()

    const toggle = () => setModal(!modal)
    const toggleChangePass = () => setOpenChangePass(!openChangePass)

    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(url + `api/Student`)
            setState({
                ListUsers: res.data ? res.data : [],
            })
        }
        fetchMyAPI()
    }, [])
    const createNewStudent = async (data) => {
        try {
            console.log("check data child: ", data)
            let res = await axios.post(url + `api/Student`, data)
            console.log("response create student: ", res)
            setModal(false)
            toast.success("Add new student success")
        } catch (error) {
            toast.error("Add new student fail")
            console.log("check data from child: ", data)
        }
    }

    const login = async (data) => {
        try {
            let res = await axios.post(url + `Account/Authenticate`, data)
            console.log("check res: ", res)
            dispatch(store_login(res.data))
            if (res.data.role == "Student") {
                localStorage.setItem(res.data.token, res.data.role)
                localStorage.setItem("id", res.data.id)
                props.Token(res.data.token)
                history.replace("/student")
            } else if (res.data.role == "Admin") {
                localStorage.setItem(res.data.token, res.data.role)
                props.Token(res.data.token)
                history.replace("/admin")
            } else if (res.data.role == "Manager") {
                localStorage.setItem(res.data.token, res.data.role)
                props.Token(res.data.token)
                history.replace("/ManageStudent")
            } else {
                // history.replace("/login")
                alert("nhap sai tk va mk")
            }
        } catch (error) {
            console.log("check error: ", error)
            toast.error("Tài khoản hoặc mật khẩu không đúng")
        }
    }
    const checkLogin = (event, item) => {
        let coppyState = { ...loginn }
        coppyState[item] = event.target.value
        setLogin({
            ...coppyState,
        })
    }
    dispatch(clear_logout())
    return (
        <div className='login'>
            {localStorage.removeItem(localStorage.getItem("account"))}
            {localStorage.removeItem("account")}
            {localStorage.removeItem("id")}
            <div class='bg-info text-info pb-4'>.</div>
            <div class='text-center p-3'>
                <img
                    class='mr-3'
                    src='https://upload.wikimedia.org/wikipedia/vi/c/c6/Logo_KTX_%C4%90HQGTPHCM.png'
                ></img>
                <span class='h5 text-info'>
                    TRANG THÔNG TIN SINH VIÊN Ở KÝ TÚC XÁ ĐẠI HỌC QUỐC GIA
                </span>
            </div>
            <div class='text-info p-2 bg-light border '>.</div>
            <div class='mt-5'>
                <Addstudent
                    modal={modal}
                    toggle={toggle}
                    createNewStudent={createNewStudent}
                />
                <ChangePass modal={openChangePass} toggle={toggleChangePass} />
                <div class='d-flex justify-content-center h-100 '>
                    <div class='card'>
                        <div class='card-header bg-light'>
                            <h3 class='text-center text-info'>Đăng nhập</h3>
                        </div>
                        <div class='card-body bg-light'>
                            {/* form login */}
                            <div>
                                <div class='input-group form-group'>
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text bg-primary'>
                                            <i class='fas fa-user text-white'></i>
                                        </span>
                                    </div>
                                    <input
                                        type='text'
                                        class='form-control'
                                        placeholder='Tài khoản'
                                        onChange={(event) =>
                                            checkLogin(event, "userName")
                                        }
                                    />
                                </div>
                                <div class='input-group form-group'>
                                    <div class='input-group-prepend'>
                                        <span class='input-group-text bg-primary'>
                                            <i class='fa fa-lock text-white'></i>
                                        </span>
                                    </div>
                                    <input
                                        type='password'
                                        class='form-control'
                                        placeholder='Mật khẩu'
                                        onChange={(event) =>
                                            checkLogin(event, "password")
                                        }
                                    />
                                </div>
                                <div class='form-group'>
                                    <button
                                        type='button'
                                        class='btn btn-primary pr-5 pl-5 w-100'
                                        onClick={() => login(loginn)}
                                    >
                                        <i
                                            class='fa fa-key'
                                            aria-hidden='true'
                                        ></i>{" "}
                                        Đăng nhập
                                    </button>
                                </div>
                                <button
                                    type='button'
                                    class='btn btn-success'
                                    onClick={toggle}
                                >
                                    Đăng ký ở ktx
                                </button>
                                <button
                                    type='button'
                                    class='btn btn-info ml-3'
                                    onClick={toggleChangePass}
                                >
                                    Quên mật khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
