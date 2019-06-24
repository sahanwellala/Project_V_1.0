'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
const Assignment=props=>(
    <tr>
        <td>{props.assignments.assignmentName}</td>
        <td>{props.assignments.courseName}</td>
        <td>{props.assignments.deuDate}</td>
        <td>
            <Link to={"/file_upload"}>Upload File</Link>
        </td>
    </tr>
);

export default class ViewListAssignment extends Component {

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
            <h3>Assignments</h3>
            <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                <tr>
                    <th>Assignment Name</th>
                    <th>Course Name</th>
                    <th>Deu Date</th>
                    <th>Upload</th>
                </tr>
                </thead>
                <tbody>
                {this.assignmentList()}
                </tbody>
            </table>
        </div>
    }
}
