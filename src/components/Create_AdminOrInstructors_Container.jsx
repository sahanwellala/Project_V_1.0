'use strict';
import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from 'axios';
import swal from "sweetalert";
import Nav from "react-bootstrap/Nav";

export default class Create_AdminOrInstructors_Container extends Component {
    constructor(props) {
        super(props);
        this.onfNameChange = this.onfNameChange.bind(this);
        this.onlNameChange = this.onlNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onTpChange = this.onTpChange.bind(this);
        this.onPwdChange = this.onPwdChange.bind(this);
        this.onConPwdChange = this.onConPwdChange.bind(this);
        this.addInstructor = this.addInstructor.bind(this);
        this.updateMember = this.updateMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
        this.onAdminSelected = this.onAdminSelected.bind(this);
        this.onInstructorSelected = this.onInstructorSelected.bind(this);
        this.onStudentSelected = this.onStudentSelected.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.checkPasswordMatches = this.checkPasswordMatches.bind(this);
        this.sendEmail = this.sendEmail.bind(this);

        this.onSearchClicked = this.onSearchClicked.bind(this);
        this.onAddMemberSelected = this.onAddMemberSelected.bind(this);
        this.onEditDeleteSelected = this.onEditDeleteSelected.bind(this);
        this.onPwdChangeNavSelected = this.onPwdChangeNavSelected.bind(this);
        this.onITNumberChange = this.onITNumberChange.bind(this);
        this.onSearchValueChange = this.onSearchValueChange.bind(this);

        this.onNeedToChangePwd = this.onNeedToChangePwd.bind(this);
        this.onDoNotNeedToChangePwd = this.onDoNotNeedToChangePwd.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.state = {
            fName: '',
            lName: '',
            email: '',
            address: '',
            tp: '',
            pwd: '',
            conPwd: '',
            accType: 'Admin',
            ITNum: '',
            isEmailValid: true,
            isPwdMatched: true,
            operation: 'add',
            search: '',
            noSearchResults: false,
            needToChangePwd: 'no'
        }
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

    onStudentSelected(e) {
        this.setState({
            accType: e.target.value
        })
    }

    onSearchValueChange(e) {
        this.setState({
            search: e.target.value
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

    sendEmail(to, subject, toFName, fromFName, accType) {
        let content = "Dear " + toFName + ", <br/>" + "I am happy to announce you that you have been appointed as a new " +
            accType + " at T & S System. So, this email is to notify your appointment as a new " + accType + " ! <br/> " +
            "Good Luck ! <br/><br/>" +
            "Thanks and Regards <br/> " + fromFName;
        let emailData = {
            to: to,
            subject: subject,
            content: content
        };
        console.log(emailData);
        axios.post('http://localhost:4000/users/send-mail', emailData).then((res) => {
            if (res.data.success == true) {
                swal("Great !", "Confirmation Email is sent to " + to + " Successfully !", "success").then(() => {
                })
            }
        })
    }

    onAddMemberSelected() {
        this.setState({
            operation: 'add'
        });

        this.clearFields();
    }

    onEditDeleteSelected() {
        this.setState({
            operation: 'edit'
        });
        this.clearFields();
    }

    onPwdChangeNavSelected() {
        this.setState({
            operation: 'updatePwd'
        })
    }

    onNeedToChangePwd() {
        this.setState({
            needToChangePwd: 'yes'
        })
    }

    onDoNotNeedToChangePwd() {
        this.setState({
            needToChangePwd: 'no'
        })
    }

    onITNumberChange(e) {
        this.setState({
            ITNum: e.target.value
        })
    }

    onSearchClicked(e) {
        let searchMail = this.state.search;
        if (searchMail == null) {
            return;
        }
        console.log(searchMail);
        console.log(this.state);
        if (searchMail) {
            if (this.state.operation === 'edit') {
                if (searchMail !== '' || searchMail == null) {
                    axios.get('http://localhost:4000/users/get-by-email/' + searchMail).then(res => {
                        let data = res.data.user;
                        let user = data[0];
                        if (typeof user !== 'undefined') {
                            this.setState({
                                fName: user.fName,
                                lName: user.lName,
                                email: user.email,
                                address: user.address,
                                tp: user.tp,
                                accType: user.accType,
                                noSearchResults: false,
                                ITNum: user.ITNum
                            })
                        } else {
                            this.setState({
                                noSearchResults: true
                            })
                        }
                    })
                }
            }
        }
    }

    clearFields() {
        this.setState({
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
            search: '',
            noSearchResults: false,
            ITNum: ''
        })
    }

    addInstructor() {
        if (!this.state.isEmailValid) {
            return;
        }
        const newMember = {
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            address: this.state.address,
            tp: this.state.tp,
            pwd: this.state.pwd,
            accType: this.state.accType,
            ITNum: this.state.ITNum
        };
        console.log(newMember);

        axios.post('http://localhost:4000/users/create-member', newMember)
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    swal("Great !", 'Successfully Created an ' + newMember.accType, "success").then(() => {
                        let fName = newMember.fName;
                        this.sendEmail(newMember.email, "Congratulations " + fName, fName, localStorage.getItem('fName'), newMember.accType);
                    });
                }
                //alert("Successfully Created an " + newAdmin.accType);

            });

        this.clearFields();
    }

    updateMember() {
        if (this.state.email !== '') {
            let updatedMember = {};
            if (this.state.needToChangePwd === 'yes') {
                updatedMember = {
                    fName: this.state.fName,
                    lName: this.state.lName,
                    email: this.state.email,
                    address: this.state.address,
                    tp: this.state.tp,
                    pwd: this.state.pwd,
                    accType: this.state.accType
                }
            } else {
                updatedMember = {
                    fName: this.state.fName,
                    lName: this.state.lName,
                    email: this.state.email,
                    address: this.state.address,
                    tp: this.state.tp,
                    accType: this.state.accType
                }
            }

            axios.put('http://localhost:4000/users/update-member', updatedMember).then(res => {
                if (res.data.success === true) {
                    swal("Great !", "Successfully Updated Member Details !", "success").then(() => {
                        let data = res.data.updated;

                        if (typeof data !== 'undefined') {
                            this.setState({
                                fName: data.fName,
                                lName: data.lName,
                                email: data.email,
                                address: data.address,
                                tp: data.tp,
                                accType: data.accType,
                                ITNum: data.ITNum,
                                noSearchResults: false

                            })
                        }
                    })
                }
            })
        }
    }

    deleteMember() {
        if (this.state.email !== '' && this.state.email != null && typeof this.state.email !== 'undefined') {
            let email = this.state.email;

            console.log(email);
            axios.delete('http://localhost:4000/users/delete/' + email).then((res) => {
                console.log(res);
                if (res.data.success == true) {
                    swal("Great !", "Successfully Deleted Member Details !", "success").then(() => {
                        this.clearFields();
                    })
                }
            })
        } else {
            swal("Cannot Delete!", "Please Select a user to Delete ! ", "error")
                .then(() => {

                });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.operation === 'add') {
            this.addInstructor();
        } else if (this.state.operation === 'edit') {
            this.updateMember();
        }
    }

    render() {

        //Giving Custom Validations
        let emailValidity = () => {
            if (!this.state.isEmailValid && this.state.operation === 'add') {
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

        let ifNoAnySearchResults = () => {
            if (this.state.noSearchResults) {
                return <p style={{color: "red"}}>Sorry ! there is no user with this Email.</p>
            }
        };
        let searchBar = () => {
            if (this.state.operation === 'edit') {
                return <div>
                    <label>Search: {ifNoAnySearchResults()} </label>
                    <div className="row" style={{marginLeft: "0", marginRight: "0"}}>
                        <input type="text" className="form-control col-md-9" style={{marginRight: "10px"}}
                               onChange={this.onSearchValueChange}
                               value={this.state.search}/>
                        <button className="btn btn-primary col" onClick={this.onSearchClicked}>Search</button>
                    </div>
                </div>
            }
        };

        let functionButton = () => {
            if (this.state.operation === 'add') {
                return <div>
                    <button type="submit" className="btn btn-primary" value="register"
                            style={{marginTop: "10px"}}>Create Member
                    </button>
                </div>
            } else if (this.state.operation === 'edit') {
                return <div>
                    <button type="submit" className="btn btn-primary" value="Update"
                            style={{marginTop: "10px", marginRight: "10px"}}>Update Member
                    </button>

                    <button type="button" className="btn btn-primary" value="Delete"
                            style={{marginTop: "10px"}} onClick={this.deleteMember}>Delete Member
                    </button>
                </div>
            } else {
                return null;
            }
        };

        let pwdInputManagement = () => {
            if (this.state.needToChangePwd === 'yes' || this.state.operation === 'add') {
                return <div>
                    <label>Password: </label>
                    <input type="password"
                           className="form-control"
                           value={this.state.pwd}
                           onChange={this.onPwdChange}
                           required={this.state.operation === 'add'}
                    />
                    <label>Confirm Password: {passwordMatch()}</label>
                    <input type="password"
                           className="form-control"
                           value={this.state.conPwd}
                           onChange={this.onConPwdChange}
                           required={this.state.operation === 'add'}
                           onBlur={this.checkPasswordMatches}
                    />
                </div>
            }
        };

        let passwordChangeOptionRadioBtns = () => {
            if (this.state.operation === 'edit') {
                return <div>
                    <label>Need to Change the Password?</label>
                    <br/>
                    <label className="radio-inline">
                        <input type="radio" name="pwdChange" value="yes" onChange={this.onNeedToChangePwd}
                               style={{marginTop: "15px"}}
                               checked={this.state.needToChangePwd === 'yes'}/>Yes
                    </label>
                    <label>
                        <input type="radio" name="pwdChange" value="no"
                               onChange={this.onDoNotNeedToChangePwd}
                               style={{marginLeft: "20px", marginTop: "15px"}}
                               checked={this.state.needToChangePwd === 'no'}/>No
                    </label>
                </div>
            }
        };
        let userManagementMain = () => {
            if (this.state.operation === 'add' || this.state.operation === 'edit') {
                return <div>
                    <div className="form-group">
                        <form onSubmit={this.handleSubmit}>
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
                                   onChange={this.onEmailChange}
                                   required="required"
                                   readOnly={(this.state.operation === 'edit')}
                                   onBlur={this.checkEmailExists}
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

                            {passwordChangeOptionRadioBtns()}

                            {pwdInputManagement()}

                            <label className="radio-inline">
                                <input type="radio" name="accType" value="Admin" onChange={this.onAdminSelected}
                                       style={{marginTop: "15px"}}
                                       checked={this.state.accType === 'Admin'}/>Admin
                            </label>
                            <label>
                                <input type="radio" name="accType" value="Instructor"
                                       onChange={this.onInstructorSelected}
                                       style={{marginLeft: "20px", marginTop: "15px"}}
                                       checked={this.state.accType === 'Instructor'}/>Instructor
                            </label>

                            <label>
                                <input type="radio" name="accType" value="Student"
                                       onChange={this.onStudentSelected}
                                       style={{marginLeft: "20px", marginTop: "15px"}}
                                       checked={this.state.accType === 'Student'}/>Student
                            </label>

                            {studentIDInput()}
                            <div>
                                {functionButton()}
                            </div>
                        </form>
                    </div>
                </div>
            }
        };
        let studentIDInput = () => {
            if (this.state.accType === 'Student') {
                return <div>
                    <label>IT Number: </label>
                    <input type="text" className="form-control" value={this.state.ITNum}
                           onChange={this.onITNumberChange}
                           readOnly={this.state.operation === 'edit'}/>
                </div>
            }
        };
        return <div className="addAdminDiv" style={{marginTop: "40px"}}>
            <center><h3>User Management</h3></center>

            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="add" active={(this.state.operation === 'add')}
                              onClick={this.onAddMemberSelected}>Add Member</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="update" onClick={this.onEditDeleteSelected}>Edit / Delete
                        Member</Nav.Link>
                </Nav.Item>
            </Nav>
            <br/>
            {searchBar()}
            {userManagementMain()}
        </div>
    }
}

ReactDOM.render(<Create_AdminOrInstructors_Container/>, document.getElementById('main'));