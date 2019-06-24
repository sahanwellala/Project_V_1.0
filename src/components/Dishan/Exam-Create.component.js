'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from "react-router-dom";
const arrCourse=[];

export default class CreateExam extends Component {

    constructor(props) {
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.onChangeExamName=this.onChangeExamName.bind(this);
        this.onChangeCourseName=this.onChangeCourseName.bind(this);
        this.onChangeDeuDate=this.onChangeDeuDate.bind(this);
        this.courseNameList=this.courseNameList.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            examName:'',
            examDeuDate:'',
            courses:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/courses/approvedCourses')
            .then(response=>{
                this.setState({courses: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeExamName(e){
        this.setState({
            examName:e.target.value
        });
    }

    onChangeCourseName(e){
        this.setState({
            examCourseName:e.target.value
        });
    }

    onChangeDeuDate(e){
        this.setState({
            examDeuDate:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const newExam={
            examName:this.state.examName,
            examCourseName:this.state.examCourseName,
            examDeuDate:this.state.examDeuDate
        };

        axios.post('http://localhost:4000/exams/add',newExam)
            .then(res=>console.log(res.data));

        this.setState({
            examName:'',
            examDeuDate:''
        });
    }

    courseNameList(){
        return this.state.courses.map(function(currentCourse){
            arrCourse.push(currentCourse.name);
        });
    }

    static examdropDownList(){
        let obj = {
            array:[]
        };
        for (var l=0;l<100;l++){
            obj.array[l] = arrCourse.pop();
            if((obj.array[l])===undefined){
                break;
            }
        }

        console.log("obj: ", obj);
        window.optionItems = obj.array.map((item) =>
            <option key={item}>{item}</option>
        );
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
            <h3>Create New Exam</h3>
            <div style={{marginTop: 20}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <strong><label>Exam Name: </label></strong>
                        <input type="text"
                               className="form-control"
                               value={this.state.examName}
                               onChange={this.onChangeExamName}/>
                    </div>
                    <div className="form-group">
                        {this.courseNameList()}
                        <strong><label>Course Name: </label></strong>&nbsp;&nbsp;
                        {CreateExam.examdropDownList()}
                        <select onChange={this.onChangeCourseName}>
                            {window.optionItems}
                        </select>
                    </div>
                    <div className="form-group">
                        <strong><label>Deu Date:</label></strong>
                        <input type="date"
                               className="form-control"
                               value={this.state.examDeuDate}
                               onChange={this.onChangeDeuDate}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exam" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        </div>;
    }
}
