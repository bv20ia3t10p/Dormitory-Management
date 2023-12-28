import "./App.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Home from "./user/Home"
import Admin from "./Admin/Admin"
import Room from "./Admin/Room"
import ManageRegisterRoom from "./Admin/ManageRegisterRoom"
import ManageStudent from "./Admin/ManageStudent"
import ManageReceipt from "./Admin/ManageReceipt"
import Statistical from "./Admin/Statistical"
import BotChat from "./Admin/BotChat"
import Student from "./Student/Student"
import PayElicWar from "./Student/PayElicWar"
import Accommodation from "./Student/Accommodation"
import Invoice from "./Student/Invoice"
import DetailStaff from "./Admin/DetailStaff"
import DetailStudent from "./Admin/DetailStudent"
import Login from "./Login/Login"
import NotFound from "./NotFound"
import ChangePass from "./Admin/ChangePass"

import { useState } from "react"

const App = () => {
    const [state, setState] = useState({
        token: "",
    })

    const check = (data) => {
        console.log("check data: ", data)
        state.token = data
        localStorage.setItem("account", state.token)
    }

    const PrivateRoute = ({ component: Component, roles, ...rest }) => (
        <Route
            {...rest}
            render={(props) => {
                const userRole = localStorage.getItem(
                    localStorage.getItem("account")
                )
                if (roles.includes(userRole)) {
                    return <Component {...props} />
                } else {
                    return <Redirect to='/Login' />
                }
            }}
        />
    )

    return (
        <Router>
            <BotChat />
            <div className='App'>
                <div className='App-header'>
                    <ToastContainer />
                    <Switch>
                        <Route path='/' exact>
                            {localStorage.getItem("accessToken") === "user" ? (
                                <Home />
                            ) : (
                                <Redirect to='/Login' />
                            )}
                        </Route>
                        <PrivateRoute
                            path='/admin'
                            component={Admin}
                            roles={["Admin"]}
                        />
                        <PrivateRoute
                            path='/room'
                            component={Room}
                            roles={["Admin", "Manager"]}
                        />
                        <PrivateRoute
                            path='/registerRoom'
                            component={ManageRegisterRoom}
                            roles={["Admin", "Manager"]}
                        />
                        <PrivateRoute
                            path='/ManageStudent'
                            component={ManageStudent}
                            roles={["Admin", "Manager"]}
                        />
                        <PrivateRoute
                            path='/ManageReceipt'
                            component={ManageReceipt}
                            roles={["Admin", "Manager"]}
                        />
                        <PrivateRoute
                            path='/statistical'
                            component={Statistical}
                            roles={["Admin", "Manager"]}
                        />
                        <PrivateRoute
                            path='/botchat'
                            component={BotChat}
                            roles={["Admin", "Manager", "Student"]}
                        />
                        <PrivateRoute
                            path='/student'
                            component={Student}
                            roles={["Student"]}
                        />
                        <PrivateRoute
                            path='/payElicWar'
                            component={PayElicWar}
                            roles={["Student"]}
                        />
                        <PrivateRoute
                            path='/accommodation'
                            component={Accommodation}
                            roles={["Student"]}
                        />
                        <PrivateRoute
                            path='/Invoice'
                            component={Invoice}
                            roles={["Student"]}
                        />
                        {/* <PrivateRoute path="/s" component={ManageStudent} roles={['Manager']} /> */}
                        <PrivateRoute
                            path='/DetailManager/:id'
                            component={DetailStaff}
                            roles={["Admin", "Manager"]}
                        />
                        <PrivateRoute
                            path='/DetailStudent/:id'
                            component={DetailStudent}
                            roles={["Admin", "Manager"]}
                        />

                        <Route path='/Login'>
                            <Login Token={check} />
                        </Route>
                        <Route path='*' component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App
