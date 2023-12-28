import React from "react";
import './SidebarStudent.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';
import { useState } from "react";
import componentDidMount from 'react';
import Student from "../Student/Student";

class SidebarStudent extends React.Component {
    render() {
        return (

            <div class="sidebar-for-admin">
                <header class="header">
                    {/* <div class="bg-primary text-info pb-4">.</div> */}
                    <div class="text-center p-3"><img class="mr-3" src="https://upload.wikimedia.org/wikipedia/vi/c/c6/Logo_KTX_%C4%90HQGTPHCM.png"></img><span class="h5 text-info">TRANG THÔNG TIN SINH VIÊN Ở KÝ TÚC XÁ ĐẠI HỌC QUỐC GIA</span></div>
                </header>

                <div class="main sidebar " >
                    <aside>
                        <div class="sidebar left ">
                            <div class="user-panel">

                                <div class="pull-left info">
                                 
                                </div>
                            </div>
                            <ul class="list-sidebar bg-info" id="sidebar">

                                <li><Link to="/student" activeClassName="active" exact={true}><i class="fa fa-address-book"></i> <span class="nav-label">Thông tin sinh viên</span></Link></li>
                                <li><Link to="/accommodation" activeClassName="active" exact={true}><i class="fa fa-list-alt"></i> <span class="nav-label">Thông tin lưu trú</span></Link> </li>

                                        <li><Link to="/Invoice" activeClassName="active" exact={true} ><i class="fa fa-money"></i>Hóa đơn lưu trú</Link></li>
                                        <li><Link to="/payElicWar" activeClassName="active" exact={true}> <i class="fa fa-money"></i>Hóa đơn tiền điện</Link></li>
                                <li><Link to="/Login" activeClassName="active" exact={true}><i class="fa fa-sign-out"></i> <span class="nav-label">Log out</span></Link> </li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                                <li class="text-info" ><div>.</div></li>
                            </ul>

                        </div>
                    </aside>

                </div>
            </div >
        )
    }
}
export default SidebarStudent;