'use strict';
import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

        this.state = {
            fName: '',
            lName: '',
            email: '',
            address: '',
            tp: '',
            pwd: '',
            conPwd: ''
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

    addInstructor(e) {
        e.preventDefault();
        const newAdmin = {
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            address: this.state.address,
            tp: this.state.tp,
            pwd: this.state.pwd,
            conPwd: this.state.conPwd
        };

        this.setState({
            fName: '',
            lName: '',
            email: '',
            address: '',
            tp: '',
            pwd: '',
            conPwd: ''
        })
    }

    render() {
        return <div className="addAdminDiv" style={{marginTop: "40px"}}>
            <center><h3>Create Admin / Instructor</h3></center>
            <div className="form-group">
                <form onSubmit={this.addInstructor}>
                    <div className="row">
                        <div className="col-sm-6">
                            <label>First Name: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.fName}
                                   onChange={this.onfNameChange}
                                   required="required"
                            />
                        </div>
                        <div className="col-sm-6">
                            <label>Last Name: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.lName}
                                   onChange={this.onlNameChange}
                                   required="required"
                            />
                        </div>
                    </div>
                    <label>Email: </label>
                    <input type="text"
                           className="form-control"
                           value={this.state.email}
                           onChange={this.onEmailChange}
                           required="required"
                    />
                    <label>Address Line 01: </label>
                    <input type="text-area"
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
                    />
                    <label>Password: </label>
                    <input type="password"
                           className="form-control"
                           value={this.state.pwd}
                           onChange={this.onPwdChange}
                           required="required"
                    />
                    <label>Confirm Password: </label>
                    <input type="password"
                           className="form-control"
                           value={this.state.conPwd}
                           onChange={this.onConPwdChange}
                           required="required"
                    />

                    <div>
                        <button type="submit" className="btn btn-primary" value="register" style={{marginTop:"10px"}}>Create Member
                        </button>
                    </div>
                </form>
            </div>

        </div>
    }
}
ReactDOM.render(<Create_AdminOrInstructors_Container/>, document.getElementById('main'));