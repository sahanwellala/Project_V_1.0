import React, {Component} from 'react';
import axios from "axios";
import swal from "sweetalert";

export default class Change_Pwd_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: '',
            newPassword: '',
            conPassword: '',
            isPasswordsMatched: true,
            isPasswordMatches: true
        };
        this.onCurrentPasswordChange = this.onCurrentPasswordChange.bind(this);
        this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.isPasswordMatches = this.isPasswordMatches.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    changePassword(e) {
        e.preventDefault();
        const checkData = {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token'),
            pwd: this.state.currentPassword
        };


        axios.post('http://localhost:4000/users/user-data/credential-request', checkData).then(res => {
            const data = res.data;
            if (data.success === true) {
                console.log(data);
                this.setState({
                    isPasswordsMatched: true
                })
            } else {
                this.setState({
                    isPasswordsMatched: false
                })
            }
        }).then(() => {
            if (this.state.isPasswordsMatched === false) {
                return;
            }
            if (this.state.isPasswordMatches === false) {
                return;
            }
            //Then change the password
            const newPwd = this.state.newPassword;
            const updateData = {
                email: checkData.email,
                newPwd: newPwd
            };
            axios.post('http://localhost:4000/users/user-data/credential-request/change-pwd', updateData).then(res => {
                const data = res.data;
                if (data.success === true) {
                    swal("Great !", "Successfully Updated the Password ! Please log in ...", "success").then(() => {
                        window.location.href = 'http://localhost:1234/';
                    });
                    //alert('Successfully Updated the Password ! Please log in ...');

                }
            })

        })

    }

    onCurrentPasswordChange(e) {
        this.setState({
            currentPassword: e.target.value
        })
    }

    onNewPasswordChange(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    onConfirmPasswordChange(e) {
        this.setState({
            conPassword: e.target.value
        })
    }

    isPasswordMatches() {

        if (this.state.newPassword === this.state.conPassword) {
            this.setState({
                isPasswordMatches: true
            })
        } else {
            this.setState({
                isPasswordMatches: false
            })
        }
    }


    render() {

        let currentPasswordValidation = () => {
            if (this.state.isPasswordsMatched === false) {
                return <div>
                    <p style={{color: "red"}}>Your current password did not matched !</p>
                </div>
            } else {
                return null;
            }
        };
        let passwordValidation = () => {
            if (this.state.isPasswordMatches === false) {
                return <div>
                    <p style={{color: "red"}}>Your Passwords did not matched !</p>
                </div>
            } else {
                return null;
            }
        };

        return <div>
            <form onSubmit={this.changePassword}
                  style={{width: "40%", marginRight: "auto", marginLeft: "auto", marginTop: "60px"}}>
                <div className="form-group">
                    <center><h5>Profile Password Update</h5></center>
                    <label>Current Password : </label>
                    {currentPasswordValidation()}
                    <input type="password"
                           className="form-control"
                           value={this.state.currentPassword}
                           onChange={this.onCurrentPasswordChange}
                           required="required"/>

                    <label>New Password : </label>
                    <input type="password"
                           className="form-control"
                           value={this.state.newPassword}
                           onChange={this.onNewPasswordChange}
                           required="required"/>


                    <label>Confirm Password : </label>
                    {passwordValidation()}
                    <input type="password"
                           className="form-control"
                           value={this.state.conPassword}
                           onBlur={this.isPasswordMatches}
                        // onFocus={this.isPasswordMatches}
                        // onClick={this.isPasswordMatches}
                           onChange={this.onConfirmPasswordChange}
                           required="required"/>

                    <button type="submit" className="btn btn-primary" value="register"
                            style={{marginTop: "10px"}}>Change Password

                    </button>

                </div>
            </form>
        </div>
    }
}