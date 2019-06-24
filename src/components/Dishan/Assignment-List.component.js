'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
const Assignment=props=>(
    <tr>
        <td>{props.assignments.assignmentName}</td>
        <td>{props.assignments.courseName}</td>
        <td>{props.assignments.deuDate}</td>
        <td>
            <Link to={"/edit_assignment/"+props.assignments._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/delete_assignment/"+props.assignments._id}>Remove</Link>
        </td>
    </tr>
);

export default class ListAssignment extends Component {

    constructor(props){
        super(props);
        this.state={assignments:[]};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/assignments/')
            .then(response=>{
                this.setState({assignments: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        axios.get('http://localhost:4000/assignments/')
            .then(response=>{
                this.setState({assignments: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    assignmentList(){
        return this.state.assignments.map(function(currentAssignment,i){
            return <Assignment assignments={currentAssignment} key={i} />;
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
            <h3>Assignments</h3>
            <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                <tr>
                    <th>Assignment Name</th>
                    <th>Course Name</th>
                    <th>Deu Date</th>
                </tr>
                </thead>
                <tbody>
                {this.assignmentList()}
                </tbody>
            </table>
        </div>
    }
}
