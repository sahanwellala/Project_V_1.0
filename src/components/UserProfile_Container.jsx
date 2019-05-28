'use strict';
import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from 'axios';
import Alert from "react-bootstrap/Alert";
import swal from "sweetalert";

export default class UserProfile_Container extends Component {
    constructor(props) {
        super(props);
        this.onfNameChange = this.onfNameChange.bind(this);
        this.onlNameChange = this.onlNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onTpChange = this.onTpChange.bind(this);
        this.onPwdChange = this.onPwdChange.bind(this);
        this.onConPwdChange = this.onConPwdChange.bind(this);
        this.onUpdateProfileDetailsClicked = this.onUpdateProfileDetailsClicked.bind(this);
        this.onAdminSelected = this.onAdminSelected.bind(this);
        this.onInstructorSelected = this.onInstructorSelected.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.checkPasswordMatches = this.checkPasswordMatches.bind(this);

        this.state = {
            fName: '',
            lName: '',
            email: '',
            address: '',
            tp: '',
            pwd: '',
            conPwd: '',
            accType: 'Admin',
            isEmailValid: true,
            isPwdMatched: true,
            userData: []
        };
    }

    onfNameChange(e) {
        this.setState({
            fName: e.target.value
        });
    }

    onlNameChange(e) {
        this.setState({
            lName: e.target.value
        });
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    onAddressChange(e) {
        this.setState({
            address: e.target.value
        });
    }

    onTpChange(e) {
        this.setState({
            tp: e.target.value
        });
    }

    onPwdChange(e) {
        this.setState({
            pwd: e.target.value
        });
    }

    onConPwdChange(e) {
        this.setState({
            conPwd: e.target.value
        })
    }

    onAdminSelected(e) {
        this.setState({
            accType: e.target.value
        })
    }

    onInstructorSelected(e) {
        this.setState({
            accType: e.target.value
        })
    }

    //Validating


    //Validating the Email
    checkEmailExists() {
        let email = {
            email: this.state.email
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
        let pwd = this.state.pwd;
        let conPwd = this.state.conPwd;
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

    onUpdateProfileDetailsClicked(e) {
        e.preventDefault();
        // if (!this.state.isEmailValid) {
        //     return;
        // }
        const updateProfile = {
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            address: this.state.address,
            tp: this.state.tp,
            // pwd: this.state.pwd,
            // conPwd: this.state.conPwd,
            // accType: this.state.accType
        };
        console.log(updateProfile);

        axios.put('http://localhost:4000/users/create-admin-or-instructor', updateProfile).then(res => {
            let updatedData = res.data;
            this.setState({
                fName: updatedData.fName,
                lName: updatedData.lName,
                address: updatedData.address,
                tp: updatedData.tp,
            })
        }).then(() => {
            swal("Great !", "Profile Details Successfully Updated !", "success").then(() => {
            })
            //alert("Profile Details Successfully Updated !");
        });
    }

    componentDidMount() {
        let url = 'http://localhost:4000/users/' + localStorage.getItem('userID');
        axios.get(url).then(res => {
            console.log(res.data);
            this.setState({
                userData: res.data
            });
        }).then(() => {
            console.log(this.state.userData);
            this.setState({
                fName: this.state.userData.fName,
                lName: this.state.userData.lName,
                email: this.state.userData.email,
                address: this.state.userData.address,
                tp: this.state.userData.tp
            })
        })
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
        return <div className="addAdminDiv" style={{marginTop: "40px"}}>
            <center><h5>Profile Details of {localStorage.getItem('fName') + "'"}</h5></center>
            <div className="form-group">
                <form onSubmit={this.onUpdateProfileDetailsClicked}>
                    <div className="row">
                        <div className="col-sm-6">
                            <label>First Name: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.fName}
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
                                   value={this.state.lName}
                                   onChange={this.onlNameChange}
                                   required="required"
                                   pattern="[a-zA-Z]+"
                                   title="Please Enter a valid Name"
                            />
                        </div>
                    </div>
                    <label>Email: {emailValidity()}</label>
                    <input type="text"
                           className="form-control"
                           value={this.state.email}
                           required="required"
                           readOnly={true}
                           pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                           title="Please Enter a Email Address"

                    />

                    <label>Address: </label>
                    <textarea type="text-area"
                              className="form-control"
                              value={this.state.address}
                              onChange={this.onAddressChange}
                              required="required"
                    />
                    <label>Telephone: </label>
                    <input type="text"
                           className="form-control"
                           value={this.state.tp}
                           onChange={this.onTpChange}
                           required="required"
                           pattern="\d{10}"
                           title="Please Enter a Valid Phone number Eg - 0771234567"
                    />
                    {/*<label>Password: </label>*/}
                    {/*<input type="password"*/}
                    {/*       className="form-control"*/}
                    {/*       value={this.state.pwd}*/}
                    {/*       onChange={this.onPwdChange}*/}
                    {/*       required="required"*/}
                    {/*/>*/}
                    {/*<label>Confirm Password: {passwordMatch()}</label>*/}
                    {/*<input type="password"*/}
                    {/*       className="form-control"*/}
                    {/*       value={this.state.conPwd}*/}
                    {/*       onChange={this.onConPwdChange}*/}
                    {/*       required="required"*/}
                    {/*       onBlur={this.checkPasswordMatches}*/}
                    {/*/>*/}

                    {/*<label className="radio-inline">*/}
                    {/*    <input type="radio" name="accType" value="Admin" onChange={this.onAdminSelected}*/}
                    {/*           style={{marginTop: "15px"}}*/}
                    {/*           checked={this.state.accType === 'Admin'}/>Admin*/}
                    {/*</label>*/}
                    {/*<label>*/}
                    {/*    <input type="radio" name="accType" value="Instructor" onChange={this.onInstructorSelected}*/}
                    {/*           style={{marginLeft: "20px", marginTop: "15px"}}*/}
                    {/*           checked={this.state.accType === 'Instructor'}/>Instructor*/}
                    {/*</label>*/}

                    <div>
                        <button type="submit" className="btn btn-primary" value="register"
                                style={{marginTop: "10px"}}>Update My Details
                        </button>
                    </div>
                </form>
            </div>

        </div>
    }
}
ReactDOM.render(<UserProfile_Container/>, document.getElementById('main'));