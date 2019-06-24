'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
const Exam=props=>(
    <tr>
        <td>{props.exams.examName}</td>
        <td>{props.exams.examCourseName}</td>
        <td>{props.exams.examDeuDate}</td>
        <td>
            <Link to={"/edit_exam/"+props.exams._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/delete_exam/"+props.exams._id}>Remove</Link>
        </td>
    </tr>
);

export default class ListExam extends Component {

    constructor(props){
        super(props);
        this.state={exams:[]};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/exams/')
            .then(response=>{
                this.setState({exams: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        axios.get('http://localhost:4000/exams/')
            .then(response=>{
                this.setState({exams: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    examList(){
        return this.state.exams.map(function(currentExam,i){
            return <Exam exams={currentExam} key={i} />;
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
            <h3>Exams</h3>
            <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                <tr>
                    <th>Exam Name</th>
                    <th>Course Name</th>
                    <th>Deu Date</th>
                </tr>
                </thead>
                <tbody>
                {this.examList()}
                </tbody>
            </table>
        </div>
    }
}
