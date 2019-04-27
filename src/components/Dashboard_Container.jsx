'use strict';
import React, {Component} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "react-sidebar";
import {Link} from "react-router-dom";
import "../../css/home_page.css";
import logo_with_name from "../../resources/images/logo_with_name.png";
import Create_AdminOrInstructors_Container from "./Create_AdminOrInstructors_Container";
import Create_Course_Container from "./Create_Course_Container";

library.add(faStroopwafel);

export default class Dashboard_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            menuItem: ""
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

        this.onCreateMemberClick = this.onCreateMemberClick.bind(this);
        this.onCourseClick = this.onCourseClick.bind(this);
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    handleToggleMenu() {
        if (this.state.sidebarOpen == false) {
            this.setState({
                sidebarOpen: true
            })
        } else {
            this.setState({
                sidebarOpen: false
            })
        }
    }

    //Handling menu Items
    onCreateMemberClick() {
        this.setState({
            menuItem: "admin-ins"
        })
    }

    onCourseClick() {
        this.setState({
            menuItem: "course"
        })
    }

    render() {
        let menuContent = () => {
            switch (this.state.menuItem) {
                case "admin-ins":
                    return <Create_AdminOrInstructors_Container/>;
                    break;
                case "course":
                    return <Create_Course_Container/>;
                    break;
                default:
                    return <div className="main"><b>Switch Case Working</b></div>
            }
        };
        return <div>
            {/*Favorite Food: <FontAwesomeIcon icon="stroopwafel"/>*/}
            <div className="navbar">

            </div>
            <Sidebar
                sidebar={
                    <div>
                        <div className="menuTop">
                            <img src={logo_with_name} className="menuImg" alt="Menu"/>
                            <label>Menu</label>
                        </div>
                        <br/>
                        <button className="navMenuBtnList" onClick={this.onCreateMemberClick}>Create Member</button>
                        <button className="navMenuBtnList" onClick={this.onCourseClick}>Courses</button>
                        <button className="navMenuBtnList">Assignments</button>
                        <button className="navMenuBtnList">Projects</button>
                    </div>}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{sidebar: {background: "#00a65a", zIndex: 10}}}
            >
                <button onClick={() => this.handleToggleMenu(false)} className="btnMenu"
                        style={{position: "fixed", zIndex: 10}}>
                    <FontAwesomeIcon icon={faBars}/>
                </button>
                <div style={{marginTop: "40px"}}>
                    {menuContent()}
                </div>
            </Sidebar>
        </div>
    }
}