import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import "./Admin.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import "./HandleObject.scss"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

// export const url = "https://localhost:7184/"
export const url ="https://se310dormitorymanagement.azurewebsites.net/"

const HandleObject = (props) => {
    const [state, setState] = useState({ ListUsers: [] })
    const [modal, setModal] = useState(false)
    const [editObject, setEditObject] = useState({ ObjectEdit: {} })
    const [modalEdit, setModalEdit] = useState(false)
    const toggleEdit = () => setModalEdit(!modalEdit)
    const toggle = () => setModal(!modal)

    const successToast = (message) => toast.success(message)
    const errorToast = (message) => toast.error(message)
    const apiUrl = url + "api/" + props.object
    let history = useHistory()

    const fetchMyAPI = async () => {
        try {
            let res = await axios.get(apiUrl)
            setState((prevState) => ({
                ...prevState,
                ListUsers: res.data ? res.data : [],
            }))
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        fetchMyAPI()
    }, []) // Run once on component mount

    const handleApiRequest = async (url, method, data, successMessage) => {
        try {
            console.log("data: ", data)
            let res = await axios[method](url, data)
            successToast(successMessage)
            fetchMyAPI()
            return res
        } catch (error) {
            console.log(`ERROR: ${error}`)
            errorToast(`Error: ${error.response.data.message}`)
            console.error("API Request Error:", error.response.data.message)
            throw error
        }
    }

    const createObject = async (data) => {
        try {
            await handleApiRequest(apiUrl, "post", data, "Thêm thành công")
            setModal(false)
        } catch (error) {
            console.log("check data from child: ", data)
        }
    }

    const updateObject = async (data) => {
        console.log("Update Object:", data)
        try {
            await handleApiRequest(
                `${apiUrl}/${data.id}`,
                "put",
                data,
                "Cập nhật thành công"
            )
            setModal(false)
        } catch (error) {
            console.log(error.message)
            console.log("check data from child: ", data)
        }
    }

    const handleDeleteObject = async (data) => {
        var isPersisted = data.Status
        const successMessage = isPersisted
            ? `Cập nhật trạng thái thành công!`
            : "Xóa thành công"

        try {
            await handleApiRequest(
                apiUrl,
                "delete",
                { params: { id: data.id } },
                successMessage
            )
            setModal(false)
        } catch (error) {
            console.log("check data from child: ", data)
        }
    }

    const handleViewDetailUser = (object) => {
        history.replace(`/Detail${props.object}/${object.id}`)
    }

    // EDIT
    const handleEditObject = (data) => {
        toggleEdit()
        setEditObject({ ObjectEdit: data })
    }

    const handleSearch = (event) => {
        let keyword = event.target.value

        if (keyword) {
            let filter = state.ListUsers.filter((item) => {
                for (const key in item) {
                    if (Object.prototype.hasOwnProperty.call(item, key)) {
                        const value = item[key]
                        if (
                            typeof value === "string" &&
                            value
                                .toLowerCase()
                                .indexOf(keyword.toLowerCase()) !== -1
                        ) {
                            return true
                        }
                    }
                }
                return false
            })

            setState((prevState) => ({
                ...prevState,
                ListUsers: filter,
            }))
        } else {
            fetchMyAPI()
        }
    }

    return (
        <div className='section row black'>
            <h3 className='col-12'>{props.title}</h3>
            <nav className='navbar navbar-light'>
                <div className='row'>
                    {/* <button
            className="col btn btn-outline-success my-2 my-sm-0"
            onClick={() => handleOnclickSearch()}
          >
            {" "}
            Search{" "}
          </button> */}
                    <TextField
                        id='outlined-basic'
                        label='Search'
                        variant='outlined'
                        size='small'
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(event) => handleSearch(event)}
                    />
                </div>
            </nav>

            <button
                style={{ marginLeft: "auto" }}
                className='pl-3 mb-2 btn btn-primary pull-right'
                onClick={toggle}
            >
                {props.addButtonTitle}
            </button>

            {/* dynamic components */}
            {props.addModalComponent && (
                <props.addModalComponent
                    modal={modal}
                    toggle={toggle}
                    createObject={createObject}
                    object={props.object}
                />
            )}

            {props.editModalComponent && modalEdit && (
                <props.editModalComponent
                    modal={modalEdit}
                    toggle={toggleEdit}
                    currentObject={editObject}
                    updateObject={updateObject}
                />
            )}

            <div className='col-12 table-container'>
                <table className='table table-hover shadow'>
                    <thead>
                        <tr className='border bg-light'>
                            <th scope='col'>ID</th>
                            {props.listHeaderCols.map((header, index) => (
                                <th key={index} scope='col'>
                                    {" "}
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {state.ListUsers &&
                            state.ListUsers.length > 0 &&
                            state.ListUsers.map((item, index) => {
                                return (
                                    <props.rowComponent
                                        key={index}
                                        item={item}
                                        handleEditObject={handleEditObject}
                                        handleDeleteObject={handleDeleteObject}
                                        handleViewDetailUser={
                                            handleViewDetailUser
                                        }
                                    />
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HandleObject
