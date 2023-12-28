import React from "react";
import './Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        const { adminActions } = this.props;

        const toggle = () => {
            var menu = document.querySelector('.sidebar')
            menu.classList.toggle("fliph");
        }

        return (
            <header className="header d-flex ">
                <div className="text-center p-2" style={{ "marginLeft": "35%" }}>
                    <img className="mr-3 " src="https://upload.wikimedia.org/wikipedia/vi/c/c6/Logo_KTX_%C4%90HQGTPHCM.png"></img>
                    <span className="h5 text-info">TRANG QUẢN LÝ KÝ TÚC XÁ ĐẠI HỌC QUỐC GIA</span>
                </div>

                <nav className="navbar navbar-toggleable-md navbar-light pt-0 pb-0">

                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* <div className="float-left"> <a href="#" className="button-left" onClick={() => toggle()}><span className="fa fa-fw fa-bars "></span></a> </div> */}
                    <div className="collapse navbar-collapse flex-row-reverse" id="navbarNavDropdown">
                        <ul className="navbar-nav">

                            <li className="nav-item dropdown  user-menu">
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src="http://via.placeholder.com/160x160" className="user-image" alt="User Image" />
                                    <span className="hidden-xs">Quản trị viên</span>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink admin-action">
                                    {adminActions.map((action, index) => (
                                        <a key={index} className="dropdown-item" href="#">
                                            {action}
                                        </a>
                                    ))}
                                </div>
                            </li>
                            <li className="nav-item-btn-left" >
                                <div className=""> <a href="#" className="button-left" onClick={() => toggle()}><span className="fa fa-fw fa-bars "></span></a> </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}
export default Header;