'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
const ExamMark=props=>(
    <tr>
        <td>{props.examMarks.exam_studentId}</td>
        <td>{props.examMarks.exam_marks}</td>
        <td>{props.examMarks.exam_state}</td>
    </tr>
);

export default class StudentExamMarks extends Component {
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

    exam_markList(){
        return this.state.examMarks.map(function(currentExamMarks,i){
            return <ExamMark examMarks={currentExamMarks} key={i} />;
        });
    }

    render() {
        return <div>
            <h3>Marks</h3>
            <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Exam Marks</th>
                    <th>Pass/Fail</th>
                </tr>
                </thead>
                <tbody>
                {this.exam_markList()}
                </tbody>
            </table>
        </div>
    }
}
