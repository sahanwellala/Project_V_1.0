'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from "react-router-dom";
const AssignmentUpload=props=>(
    <tr>
        <td>{props.assignmentMarks.assignment_studentId}</td>
        <td>
            <Link to={"/student_assignment_uploads/"+props.assignmentMarks._id}>Mark</Link>
        </td>
    </tr>
);

export default class StudentAssignmentList extends Component {
    constructor(props){
        super(props);
        this.state={
            assignmentMarks:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/assignmentUpload/')
            .then(response=>{
                this.setState({assignmentMarks: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        axios.get('http://localhost:4000/assignmentUpload/')
            .then(response=>{
                this.setState({assignmentMarks: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    assignment_marksList(){
        return this.state.assignmentMarks.map(function(currentAssignmentMarks,i){
            return <AssignmentUpload assignmentMarks={currentAssignmentMarks} key={i} />;
        });
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
            <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                <tr>
                    <th>Student ID</th>
                </tr>
                </thead>
                <tbody>
                {this.assignment_marksList()}
                </tbody>
            </table>
        </div>
    }
}
