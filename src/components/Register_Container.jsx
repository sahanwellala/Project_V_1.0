'use strict';
import React, {Component} from 'react';
import '../../css/register_page.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Redirect} from "react-router-dom";
import swal from "sweetalert";
//Inline style variables used
let register_style = {
    width: '300px',
    float: 'right',
    marginRight: '160px',
    marginTop: '20px'
};
let register_btn_styles = {
    marginTop: '10px',
    width: '48%',
};
let login_btn_styles = {
    marginTop: '10px',
    width: '48%',
    float: 'right',
};

export default class Register_Container extends Component {
    constructor(props) {
        super(props);
        this.onITNumChange = this.onITNumChange.bind(this);
        this.onfNameChange = this.onfNameChange.bind(this);
        this.onLNameChange = this.onLNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onTpChange = this.onTpChange.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onChangeConPwd = this.onChangeConPwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.checkPasswordMatches = this.checkPasswordMatches.bind(this);
        this.onLoginClicked = this.onLoginClicked.bind(this);

        this.state = {
            reg_IT_Num: '',
            reg_fName: '',
            reg_lName: '',
            reg_email: '',
            reg_pwd: '',
            reg_address: '',
            reg_tp: '',
            reg_con_pwd: '',
            isEmailValid: true,
            isPwdMatched: true
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            ITNum: this.state.reg_IT_Num,
            fName: this.state.reg_fName,
            lName: this.state.reg_lName,
            email: this.state.reg_email,
            address: this.state.reg_address,
            tp: this.state.reg_tp,
            pwd: this.state.reg_pwd,
            accType: 'Student'

        };

        axios.post('http://localhost:4000/users/create-user', newUser)
            .then(res => {
                console.log(res);
                //alert("Successfully Registered ! Please Log Into Continue");
                swal("Almost there!", "Please log in to continue !", "success").then(() => {
                    window.location.href = "http://localhost:1234";
                })

            });

        this.setState({
            reg_IT_Num: '',
            reg_fName: '',
            reg_lName: '',
            reg_email: '',
            reg_pwd: '',
            reg_address: '',
            reg_tp: '',
            reg_con_pwd: ''
        })

    }

    onITNumChange(e) {
        this.setState({
            reg_IT_Num: e.target.value
        });
    }

    onfNameChange(e) {
        this.setState({
            reg_fName: e.target.value
        });
    }

    onLNameChange(e) {
        this.setState({
            reg_lName: e.target.value
        })
    }

    onEmailChange(e) {
        this.setState({
            reg_email: e.target.value
        });
    }

    onChangePwd(e) {
        this.setState({
            reg_pwd: e.target.value
        });
    }

    onAddressChange(e) {
        this.setState({
            reg_address: e.target.value
        });
    }

    onTpChange(e) {
        this.setState({
            reg_tp: e.target.value
        });
    }

    onChangeConPwd(e) {
        this.setState({
            reg_con_pwd: e.target.value
        })
    }

    //Validations
    //Validating the Email
    checkEmailExists() {
        let email = {
            email: this.state.reg_email
        };
        axios.post('http://localhost:4000/users/check-email', email).then(res => {
            console.log(res.data);
            let validity = res.data;
            if (parseInt(validity.count) >= 1) {
                this.setState({
                    isEmailValid: false
                })
            } else {
                this.setState({
                    isEmailValid: true
                })
            }

        })
    }

    //Validating the Passwords
    checkPasswordMatches() {
        let pwd = this.state.reg_pwd;
        let conPwd = this.state.reg_con_pwd;
        if (pwd === conPwd) {
            this.setState({
                isPwdMatched: true
            })
        } else {
            this.setState({
                isPwdMatched: false
            })
        }
    }

    onLoginClicked() {
        window.location.href = "http://localhost:1234";
    }


    render() {
        let emailValidity = () => {
            if (!this.state.isEmailValid) {
                return <p style={{color: "red"}}>Already Exists Please Enter Another Email !</p>
            } else {
                return null
            }
        };
        let passwordMatch = () => {
            if (!this.state.isPwdMatched) {
                return <p style={{color: "red"}}>Passwords didn't match !</p>
            } else {
                return null;
            }
        };
        return <div>
            <div className="register_container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={register_style}>
                        <center><h3>Register</h3></center>
                        <label>IT Num:</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.reg_IT_Num}
                               onChange={this.onITNumChange}
                               required="required"
                        />
                        <div className="row">
                            <div className="col-sm-6">
                                <label>First Name: </label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.reg_fName}
                                       onChange={this.onfNameChange}
                                       required="required"
                                       pattern="[a-zA-Z]+"
                                       title="Please Enter a valid Name"
                                />
                            </div>
                            <div className="col-sm-6">
                                <label>Last Name: </label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.reg_lName}
                                       onChange={this.onLNameChange}
                                       required="required"
                                       pattern="[a-zA-Z]+"
                                       title="Please Enter a valid Name"
                                />
                            </div>
                        </div>
                        <label>Email: {emailValidity()}</label>
                        <input type="text"
                               className="form-control"
                               value={this.state.reg_email}
                               onChange={this.onEmailChange}
                               required="required"
                               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                               title="Please Enter a Email Address"
                               onBlur={this.checkEmailExists}
                        />
                        <label>Address: </label>
                        <input type="text-area"
                               className="form-control"
                               value={this.state.reg_address}
                               onChange={this.onAddressChange}
                               required="required"
                        />
                        <label>Telephone: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.reg_tp}
                               onChange={this.onTpChange}
                               required="required"
                               pattern="\d{10}"
                               title="Please Enter a Valid Phone number Eg - 0771234567"
                        />
                        <label>Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.reg_pwd}
                               onChange={this.onChangePwd}
                               required="required"
                        />
                        <label>Confirm Password: {passwordMatch()} </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.reg_con_pwd}
                               onChange={this.onChangeConPwd}
                               required="required"
                               onBlur={this.checkPasswordMatches}
                        />

                        <div>
                            <button type="submit" className="btn btn-primary" value="register"
                                    style={register_btn_styles}>Register
                            </button>

                            <button type="button" className="btn btn-primary" value="login"
                                    style={login_btn_styles} onClick={this.onLoginClicked}
                            >Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}