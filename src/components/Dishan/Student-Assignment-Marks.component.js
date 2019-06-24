'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
const AssignmentMark=props=>(
    <tr>
        <td>{props.assignmentMarks.assignment_studentId}</td>
        <td>{props.assignmentMarks.assignment_marks}</td>
        <td>{props.assignmentMarks.assignment_state}</td>
    </tr>
);

export default class StudentAssignmentMarks extends Component {
    constructor(props){
        super(props);
        this.state={
            assignmentMarks:[],
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

    assignment_markList(){
        return this.state.assignmentMarks.map(function(currentAssignmentMarks,i){
            return <AssignmentMark assignmentMarks={currentAssignmentMarks} key={i} />;
        });
    }

    render() {
        return <div>
            <h3>Marks</h3>
            <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Assignment Marks</th>
                    <th>Pass/Fail</th>
                </tr>
                </thead>
                <tbody>
                {this.assignment_markList()}
                </tbody>
            </table>
        </div>
    }
}
