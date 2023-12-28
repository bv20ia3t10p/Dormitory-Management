import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./user/Home";
import Admin from "./Admin/Admin";
import Room from "./Admin/Room";
import ManageRegisterRoom from "./Admin/ManageRegisterRoom";
import ManageStudent from "./Admin/ManageStudent";
import ManageReceipt from "./Admin/ManageReceipt";
import Statistical from "./Admin/Statistical";
import BotChat from "./Admin/BotChat";
import Student from "./Student/Student";
import PayElicWar from "./Student/PayElicWar";
import Accommodation from "./Student/Accommodation";
import Invoice from "./Student/Invoice";
import DetailStaff from "./Admin/DetailStaff";
import DetailStudent from "./Admin/DetailStudent";
import Login from "./Login/Login";
import NotFound from "./NotFound";

import { useState } from "react";
import Header from "./Sidebar/Header";
import SidebarAdmin from "./Sidebar/SidebarAdmin";

const App = () => {
  const [state, setState] = useState({
    token: "",
  });

  const check = (data) => {
    console.log("check data: ", data);
    state.token = data;
    localStorage.setItem("account", state.token);
  };

  // const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={(props) => {
  //       const userRole = localStorage.getItem(localStorage.getItem("account"));
  //       if (roles.includes(userRole)) {
  //         return <Component {...props} />;
  //       } else {
  //         return <Redirect to="/Login" />;
  //       }
  //     }}
  //   />
  // );

  return (
    <Router>
      <BotChat />
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route path="/" exact>
            {localStorage.getItem("accessToken") === "user" ? (
              <Home />
            ) : (
              <Redirect to="/Login" />
            )}
          </Route>

          <Route path="/admin">
            <Header />
            <div className="adminContentWrapper">
              <SidebarAdmin />
              <Route path="" exact elements={<Admin />} />
              <Route path="room" elements={<Room />} />
              <Route
                path="/registerRoom"
                component={ManageRegisterRoom}
                // roles={["Admin", "Manager"]}
              />
              <Route
                path="/ManageStudent"
                component={ManageStudent}
                // roles={["Admin", "Manager"]}
              />
              <Route
                path="/ManageReceipt"
                component={ManageReceipt}
                // roles={["Admin", "Manager"]}
              />
              <Route
                path="/statistical"
                component={Statistical}
                // roles={["Admin", "Manager"]}
              />
            </div>
          </Route>
          <Route path="/room" component={Room} roles={["Admin", "Manager"]} />
          <Route
            path="/registerRoom"
            component={ManageRegisterRoom}
            roles={["Admin", "Manager"]}
          />
          <Route
            path="/ManageStudent"
            component={ManageStudent}
            roles={["Admin", "Manager"]}
          />
          <Route
            path="/ManageReceipt"
            component={ManageReceipt}
            roles={["Admin", "Manager"]}
          />
          <Route
            path="/statistical"
            component={Statistical}
            roles={["Admin", "Manager"]}
          />
          <Route
            path="/botchat"
            component={BotChat}
            roles={["Admin", "Manager", "Student"]}
          />
          <Route path="/student" component={Student} roles={["Student"]} />
          <Route
            path="/payElicWar"
            component={PayElicWar}
            roles={["Student"]}
          />
          <Route
            path="/accommodation"
            component={Accommodation}
            roles={["Student"]}
          />
          <Route path="/Invoice" component={Invoice} roles={["Student"]} />
          {/* <Route path="/s" component={ManageStudent} roles={['Manager']} /> */}
          <Route
            path="/DetailManager/:id"
            component={DetailStaff}
            roles={["Admin", "Manager"]}
          />
          <Route
            path="/DetailStudent/:id"
            component={DetailStudent}
            roles={["Admin", "Manager"]}
          />

          <Route path="/Login">
            <Login Token={check} />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
