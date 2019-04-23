'use strict';
import React, {Component} from 'react';
import '../../css/register_page.css';
import "bootstrap/dist/css/bootstrap.min.css";

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

        this.state = {
            reg_IT_Num: '',
            reg_fName: '',
            reg_lName: '',
            reg_email: '',
            reg_pwd: '',
            reg_address: '',
            reg_tp: '',
            reg_con_pwd: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();

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


    render() {
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
                                />
                            </div>
                            <div className="col-sm-6">
                                <label>Last Name: </label>
                                <input type="text"
                                       className="form-control"
                                       value={this.state.reg_lName}
                                       onChange={this.onLNameChange}
                                       required="required"
                                />
                            </div>
                        </div>
                        <label>Email: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.reg_email}
                               onChange={this.onEmailChange}
                               required="required"
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
                        />
                        <label>Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.reg_pwd}
                               onChange={this.onChangePwd}
                               required="required"
                        />
                        <label>Confirm Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.reg_con_pwd}
                               onChange={this.onChangeConPwd}
                               required="required"
                        />

                        <div>
                            <button type="submit" className="btn btn-primary" value="register"
                                    style={register_btn_styles}>Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }

}