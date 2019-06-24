'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {Link} from "react-router-dom";
const arrCourse=[];

export default class EditAssignment extends Component {
    constructor(props){
        super(props);
        this.onChangeAssignmentName=this.onChangeAssignmentName.bind(this);
        this.onChangeCourseName=this.onChangeCourseName.bind(this);
        this.onChangeDeuDate=this.onChangeDeuDate.bind(this);
        this.courseNameList=this.courseNameList.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.state={
            assignmentName:'',
            deuDate:'',
            courses:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/assignments/'+ this.props.match.params.id)
            .then(response=> {
                this.setState({
                    assignmentName:response.data.assignmentName,
                    courseName:response.data.courseName,
                    deuDate:response.data.deuDate
                });
            })
            .catch(function (error) {
                console.log(error)
            });

        axios.get('http://localhost:4000/courses/approvedCourses')
            .then(response=>{
                this.setState({courses: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeAssignmentName(e){
        this.setState({
            assignmentName:e.target.value
        });
    }

    onChangeCourseName(e){
        this.setState({
            courseName:e.target.value
        });
    }

    onChangeDeuDate(e){
        this.setState({
            deuDate:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj={
            assignmentName:this.state.assignmentName,
            courseName:this.state.courseName,
            deuDate:this.state.deuDate
        };

        let updatedDate=obj.deuDate;

        axios.get('http://localhost:4000/assignments/'+ this.props.match.params.id)
            .then(response=> {
                let originalDate= response.data.deuDate;
                if(updatedDate >= originalDate){
                    axios.put('http://localhost:4000/assignments/update/' + this.props.match.params.id, obj)
                        .then(res => console.log(res, data));
                    this.props.history.push('/assignment')
                }
                else{
                    alert('Please Select Only a Later Date Than Original One');
                }
            });
    }

    courseNameList(){
        return this.state.courses.map(function(currentCourse){
            arrCourse.push(currentCourse.name);
        });
    }

    static dropDownList(){
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
            <h3>Update Assignment</h3>
            <div style={{marginTop: 20}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <strong><label>Assignment Name: </label></strong>
                        <input type="text"
                               className="form-control"
                               value={this.state.assignmentName}
                               onChange={this.onChangeAssignmentName}/>
                    </div>
                    <div className="form-group">
                        {this.courseNameList()}
                        <strong><label>Course Name: </label></strong>&nbsp;&nbsp;
                        {EditAssignment.dropDownList()}
                        <select onChange={this.onChangeCourseName}>
                            {window.optionItems}
                        </select>
                    </div>
                    <div className="form-group">
                        <strong><label>Deu Date:</label></strong>
                        <input type="date"
                               className="form-control"
                               value={this.state.deuDate}
                               onChange={this.onChangeDeuDate}/>
                        <br/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        </div>
    }
}