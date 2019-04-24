'use strict';
import React, {Component} from 'react';
import '../../css/login_page.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom'

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
            login_pwd: ''
        }
    }

    //Method used to update State

    onChangeUserName(e) {
        this.setState({
            reg_fName: e.target.value
        });
    }

    onChangePwd(e) {
        this.setState({
            reg_pwd: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('Test onSubmit()');
        console.log(`User Name : ${this.state.reg_fName}`);
        console.log(`Password : ${this.state.reg_pwd}`);

        this.setState({
            reg_fName: '',
            reg_pwd: ''
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
                               value={this.state.reg_fName}
                               onChange={this.onChangeUserName}
                               required="required"
                        />

                        <label>Password: </label>
                        <input type="password"
                               className="form-control"
                               value={this.state.reg_pwd}
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