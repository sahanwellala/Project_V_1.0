'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from "react-router-dom";

export default class StudentAssignmentUploads extends Component{
    constructor(props) {
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.onChangeAssignmentMark=this.onChangeAssignmentMark.bind(this);
        this.onChangeAssignmentState=this.onChangeAssignmentState.bind(this);
        this.getUploadFile=this.getUploadFile.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            studentId:'',
            filePath:'',
            assignmentMark:'',
            assignmentState:'',
            assignmentUploadedDate:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/assignmentUpload/find/'+ this.props.match.params.id)
            .then(response=>{
                this.setState({
                    studentId:response.data.assignment_studentId,
                    filePath:response.data.assignment_file,
                    assignmentMark:response.data.assignment_marks,
                    assignmentState:response.data.assignment_state,
                    assignmentUploadedDate:response.data.assignmentUploadedDate
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeAssignmentMark(e){
        const mark=e.target.value;
        if((mark>=0)&&(mark<=100)){
            this.setState({
                assignmentMark:e.target.value
            });
        }
    }

    onChangeAssignmentState(e){
        this.setState({
            assignmentState:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const mark={
            assignment_studentId:this.state.studentId,
            assignment_file:this.state.filePath,
            assignment_marks:this.state.assignmentMark,
            assignment_state:this.state.assignmentState,
            assignmentUploadedDate:this.state.assignmentUploadedDate
        };
        axios.get('http://localhost:4000/assignmentUpload/find/'+ this.props.match.params.id)
            .then(response=> {
                axios.put('http://localhost:4000/assignmentUpload/update/' + this.props.match.params.id, mark)
                    .then(res=>console.log(res.data));
                this.props.history.push('/student_assignment_list')
            });
    }

    getUploadFile(){
        return window.open(this.state.filePath+"");
    }

    render() {
        return <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/assignment" className="nav-link">Assignments</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create_assignment" className="nav-link">Create Assignment</Link>
                            </li>
                            <li>
                                <Link to={"/student_assignment_list"} className="nav-link">Marks</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <br/>
            </div>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <strong><label>Uploaded File: </label></strong>&nbsp;&nbsp;
                    <Link onClick={this.getUploadFile}>{this.state.filePath}</Link>
                </div>
                <div className="form-group">
                    <strong><label>Uploaded Date: </label></strong>&nbsp;&nbsp;
                    <text>{this.state.assignmentUploadedDate}</text>
                </div>
                <div className="form-group">
                    <strong><label>Mark:</label></strong>
                    <input type="number"
                           className="form-control"
                           value={this.state.assignmentMark}
                           onChange={this.onChangeAssignmentMark}/>
                    <br/>
                </div>
                <div className="form-group">
                    <strong><label>State: </label></strong>&nbsp;
                    <select onChange={this.onChangeAssignmentState}>
                        <option>Pass</option>
                        <option>Fail</option>
                        <option>AB</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    }
}