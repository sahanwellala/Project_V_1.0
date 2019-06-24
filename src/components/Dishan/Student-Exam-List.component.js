'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from "react-router-dom";
const ExamUpload=props=>(
    <tr>
        <td>{props.examMarks.exam_studentId}</td>
        <td>
            <Link to={"/student_exam_uploads/"+props.examMarks._id}>Mark</Link>
        </td>
    </tr>
);

export default class StudentExamList extends Component {
    constructor(props){
        super(props);
        this.state={
            examMarks:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/examUpload/')
            .then(response=>{
                this.setState({examMarks: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        axios.get('http://localhost:4000/examUpload/')
            .then(response=>{
                this.setState({examMarks: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    exam_marksList(){
        return this.state.examMarks.map(function(currentExamMarks,i){
            return <ExamUpload examMarks={currentExamMarks} key={i} />;
        });
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
            <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                <tr>
                    <th>Student ID</th>
                </tr>
                </thead>
                <tbody>
                {this.exam_marksList()}
                </tbody>
            </table>
        </div>
    }
}
