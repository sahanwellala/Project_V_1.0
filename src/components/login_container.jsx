'use strict';
import React, {Component} from 'react';
import '../../css/login_page.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import ls from 'local-storage'

import swal from 'sweetalert';

import {Redirect} from "react-router";


//Inline style variables used
let login_style = {
    width: '240px',
    float: 'right',
    marginRight: '160px',
    marginTop: '150px'
};
let login_btn_styles = {
    marginTop: '5px',
    width: '48%'
};
let register_btn_styles = {
    marginTop: '5px',
    width: '48%',
    float: 'right'
};
let check_box_styles = {
    marginTop: '10px',
    marginLeft: '20px'
};


export default class Login_Container extends Component {
    componentDidMount() {
    }

    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            login_user_name: '',
            login_pwd: '',
            logged: false,
            resData: {
                success: false,
                message: '',
                userID: '',
                email: '',
                fName: '',
                accType: '',
                token: '',
                isLogged: false
            }
        }
    }

    //Method used to update State

    onChangeUserName(e) {
        this.setState({
            login_user_name: e.target.value
        });
    }

    onChangePwd(e) {
        this.setState({
            login_pwd: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('Test onSubmit()');
        console.log(`User Name : ${this.state.login_user_name}`);
        console.log(`Password : ${this.state.login_pwd}`);

        const newCredentials = {
            user_email: this.state.login_user_name,
            user_pwd: this.state.login_pwd
        };

        axios.post('http://localhost:4000/users/login-check', newCredentials)
            .then((res) => {
                console.log(res.data);
                let data = res.data;
                this.setState({
                    resData: {
                        success: data.success,
                        message: data.message,
                        userID: data.userID,
                        email: data.email,
                        fName: data.fName,
                        accType: data.accType,
                        token: data.token,
                        isLogged: data.isLogged
                    }
                });
                console.log('state variable data : ' + this.state.resData.success + this.state.resData.accType);
                if (!data.success) {
                    //alert('Invalid Username or Password !');
                    swal("Oops!", "Username or Password Invalid!", "error")
                        .then(() => {
                            window.location.href = 'http://localhost:1234/';
                        });

                } else {
                    //Setting the logged details for identifying the user session
                    localStorage.setItem('success', data.success);
                    localStorage.setItem('userID', data.userID);
                    localStorage.setItem('email', data.email);
                    localStorage.setItem('fName', data.fName);
                    localStorage.setItem('accType', data.accType);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('isLogged', data.isLogged);
                    //alert('Logged Successfully !');
                    swal("Welcome " + localStorage.getItem('fName'), "Logging Successful !", "success").then(() => {
                        window.location.href = 'http://localhost:1234/home';
                    })
                }

            });


        this.setState({
            login_user_name: '',
            login_pwd: ''
        })
    }

    render() {
        return <div>
            <div className="login_container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={login_style}>
                        <center><h3>Login</h3></center>
                        <label>User Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.login_user_name}
                               onChange={this.onChangeUserName}
                               required="required"
                        />

                        <label>Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.login_pwd}
                               onChange={this.onChangePwd}
                               required="required"
                        />

                        <div style={check_box_styles}>
                            <input className="form-check-input"
                                   type="checkbox"
                                   name="rememberMe"
                                   id="remember"
                                   value="Remember Me"/>
                            <label>Remember Me</label><br/>
                        </div>
                        <div>
                            <input type="submit" value="Login" className="btn btn-primary"
                                   style={login_btn_styles}/>
                            <Link to="/register">
                                <button type="button" className="btn btn-primary" value="register"
                                        style={register_btn_styles}>Register
                                </button>
                            </Link>
                        </div>
                        <button type="button" className="btn btn-link">Forgotten Your Username or Password ?</button>
                    </div>
                </form>
            </div>
        </div>;
    }
}