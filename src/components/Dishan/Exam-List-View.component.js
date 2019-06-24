'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from 'react-router-dom';
const Exam=props=>(
    <tr>
        <td>{props.exams.examName}</td>
        <td>{props.exams.examCourseName}</td>
        <td>{props.exams.examDeuDate}</td>
        <td>
            <Link to={"/file_upload"}>Upload File</Link>
        </td>
    </tr>
);

export default class ViewListExam extends Component {

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
            <h3>Exams</h3>
            <table className="table table-striped" style={{marginTop:20}}>
                <thead>
                <tr>
                    <th>Exam Name</th>
                    <th>Course Name</th>
                    <th>Deu Date</th>
                    <th>Upload</th>
                </tr>
                </thead>
                <tbody>
                {this.examList()}
                </tbody>
            </table>
        </div>
    }
}
