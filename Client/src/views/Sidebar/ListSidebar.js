import React from "react";
import './SidebarAdmin.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';
import './ListSidebar.scss';

const ListSidebar = ({ menuItems }) => {
    return (
        <ul className="list-sidebar bg-info list-side-bar">
            {menuItems.map((item, index) => (
                <li key={index}>
                    <Link to={item.to} activeClassName="active" exact={true}>
                        <i className={`fa ${item.icon}`}></i>
                        <span className="nav-label">{item.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ListSidebar; 