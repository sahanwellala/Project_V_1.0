'use strict';
import React, {Component} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "react-sidebar";
import "../../css/home_page.css";

//Importing Images Needed
import logo_with_name from "../../resources/images/logo_white.png";
import profile_icon from "../../resources/images/profile-icon.png";
import home_button_image from "../../resources/images/logo_with_system_name.png";

//Importing Components
import Create_AdminOrInstructors_Container from "./Create_AdminOrInstructors_Container";
import Create_Course_Container from "./Create_Course_Container";
import axios from "axios";
import Home_Container from "./Home_Container";
import UserProfile_Container from "./UserProfile_Container";
import Change_Pwd_Container from "./Change_Pwd_Container";
import swal from "sweetalert";


library.add(faStroopwafel);
export default class Dashboard_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            menuItem: "home",
            accType: localStorage.getItem('accType'),
            isProfileDropDownMenuClicked: false
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

        this.onCreateMemberClick = this.onCreateMemberClick.bind(this);
        this.onCourseClick = this.onCourseClick.bind(this);
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
        this.onProfileDropDownMenuClicked = this.onProfileDropDownMenuClicked.bind(this);
        this.onLogoutClicked = this.onLogoutClicked.bind(this);
        this.onHomeButtonCLicked = this.onHomeButtonCLicked.bind(this);
        this.onProfileClicked = this.onProfileClicked.bind(this);
        this.onChangePwdClicked = this.onChangePwdClicked.bind(this);
        console.log(this.state.menuItem);
        console.log(this.state.accType);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    handleToggleMenu() {
        if (this.state.sidebarOpen === false) {
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

    //Handling the Profile Drop Down Menu Click

    onProfileDropDownMenuClicked() {
        if (this.state.isProfileDropDownMenuClicked) {
            this.setState({
                isProfileDropDownMenuClicked: false
            })
        } else {
            this.setState({
                isProfileDropDownMenuClicked: true
            })
        }
        console.log(this.state.isProfileDropDownMenuClicked);
    }

    //Handle the Home Button in the Nav Bar

    onHomeButtonCLicked() {
        this.setState({
            menuItem: "home"
        })
    }

    onProfileClicked() {
        this.setState({
            menuItem: "profile",
            isProfileDropDownMenuClicked: false
        });
        console.log(this.state.menuItem);
    }

    onChangePwdClicked() {
        this.setState({
            menuItem: "changePwd",
            isProfileDropDownMenuClicked: false
        });
        console.log(this.state.menuItem);
    }

    //Handle Log Out Function
    onLogoutClicked() {
        let token = {
            token: localStorage.getItem('token'),
            isProfileDropDownMenuClicked: false
        };

        axios.post('http://localhost:4000/users/log-out', token)
            .then((res) => {
                console.log(res.data);
                let data = res.data;

                if (!data.success) {
                    swal("Oops!", data.message, "error")
                        .then(() => {
                        });
                    //alert(data.message);
                } else {
                    //Setting the logged details for identifying the user session
                    let fName = localStorage.getItem('fName');
                    localStorage.removeItem('success');
                    localStorage.removeItem('userID');
                    localStorage.removeItem('fName');
                    localStorage.removeItem('accType');
                    localStorage.removeItem('token');
                    localStorage.removeItem('isLogged');

                    //alert('Successfully Logged Out !');
                    swal("See you soon " + fName, "Successfully Logged Out !", "success").then(() => {
                        window.location.href = 'http://localhost:1234/';
                    })

                }

            });


        this.setState({
            login_user_name: '',
            login_pwd: ''
        })
    }


    render() {

        let menuContent = () => {
            switch (this.state.menuItem) {
                case "admin-ins":
                    return <Create_AdminOrInstructors_Container/>;
                case "course":
                    return <Create_Course_Container/>;
                case "home":
                    return <Home_Container/>;
                case "profile":
                    return <UserProfile_Container/>;
                case "changePwd":
                    return <Change_Pwd_Container/>;
                default:
                    return <div className="main"><b>Loading ...</b></div>
            }
        };
        let adminFunctions = () => {
            if (localStorage.getItem('accType').toString() === 'Admin') {
                return <div>
                    <button className="navMenuBtnList" onClick={this.onCreateMemberClick}>Create Member</button>
                    <button className="navMenuBtnList" onClick={this.onCourseClick}>Courses</button>
                </div>
            } else {
                return null;
            }
        };
        let profileDropDownMenu = () => {
            if (this.state.isProfileDropDownMenuClicked) {
                return <div>
                    <div id="myDropdown" className="dropdown-content">
                        <a onClick={this.onProfileClicked}>View Profile</a>
                        <a onClick={this.onChangePwdClicked}>Change Password</a>
                        <a onClick={this.onLogoutClicked}>Log Out</a>

                    </div>
                </div>
            }
        };
        return <div>
            {/*Favorite Food: <FontAwesomeIcon icon="stroopwafel"/>*/}
            <div className="navbar">
                <button className="navHomeButton" onClick={this.onHomeButtonCLicked}>
                    <img
                        src={home_button_image}
                        style={{
                            width: "auto",
                            height: "40px",
                            marginTop: "-7px",
                            marginLeft: "-34px",
                            paddingLeft: "20px",
                            paddingRight: "20px"
                        }}/>
                </button>
                <div style={{display: "inline-block"}}>
                    <label
                        onClick={this.onProfileDropDownMenuClicked}
                        className="profileWithNameLabel"
                        style={{
                            fontFamily: "Arial",
                            color: "white",
                            padding: "5px",
                            display: "block",
                            float: "left",
                            marginTop: "-10px",
                            textAlign: "right"
                        }}><img src={profile_icon}
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    marginRight: "20px"
                                }}/>{localStorage.getItem('fName').toString()}</label>
                </div>

            </div>
            {profileDropDownMenu()}
            <Sidebar
                sidebar={
                    <div>
                        <div className="menuTop">
                            <img src={logo_with_name} className="menuImg" alt="Menu"/>
                            <label>Menu</label>
                        </div>

                        <br/>
                        {adminFunctions()}
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