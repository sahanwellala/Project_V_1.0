'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from "react-router-dom";

export default class StudentExamUploads extends Component{
    constructor(props) {
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.onChangeExamMark=this.onChangeExamMark.bind(this);
        this.onChangeExamState=this.onChangeExamState.bind(this);
        this.getUploadFile=this.getUploadFile.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            studentId:'',
            filePath:'',
            examMark:'',
            examState:'',
            examUploadedDate:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/examUpload/find/'+ this.props.match.params.id)
            .then(response=>{
                this.setState({
                    studentId:response.data.exam_studentId,
                    filePath:response.data.exam_file,
                    examMark:response.data.exam_marks,
                    examState:response.data.exam_state,
                    examUploadedDate:response.data.examUploadedDate
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeExamMark(e){
        const mark=e.target.value;
        if((mark>=0)&&(mark<=100)){
            this.setState({
                examMark:e.target.value
            });
        }
    }

    onChangeExamState(e){
        this.setState({
            examState:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const mark={
            exam_studentId:this.state.studentId,
            exam_file:this.state.filePath,
            exam_marks:this.state.examMark,
            exam_state:this.state.examState,
            examUploadedDate:this.state.examUploadedDate
        };
        axios.get('http://localhost:4000/examUpload/find/'+ this.props.match.params.id)
            .then(response=> {
                axios.put('http://localhost:4000/examUpload/update/' + this.props.match.params.id, mark)
                    .then(res=>console.log(res.data));
                this.props.history.push('/student_exam_list')
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
                                <Link to="/exam" className="nav-link">Exams</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create_exam" className="nav-link">Create Exam</Link>
                            </li>
                            <li>
                                <Link to={"/student_exam_list"} className="nav-link">Marks</Link>
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
                    <text>{this.state.examUploadedDate}</text>
                </div>
                <div className="form-group">
                    <strong><label>Mark:</label></strong>
                    <input type="number"
                           className="form-control"
                           value={this.state.examMark}
                           onChange={this.onChangeExamMark}/>
                    <br/>
                </div>
                <div className="form-group">
                    <strong><label>State: </label></strong>&nbsp;
                    <select onChange={this.onChangeExamState}>
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

