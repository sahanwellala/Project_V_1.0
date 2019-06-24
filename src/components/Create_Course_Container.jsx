'use strict';
import React, {Component} from 'react';
import * as ReactDOM from "react-dom";
import Nav from "react-bootstrap/Nav";
import InstructorMap from "./InstructorMap";
import axios from "axios";
import "../../ApplicationProperties";
import swal from "sweetalert";
import {Accordion} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default class Create_Course_Container extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            description: '',
            instructors: [],
            instructor: '',
            courses: [],
            students: '',
            search: '',
            status: '',
            isApproved: false,
            operation: 'add',
            allCourses: []
        };

        this.handleInput = this.handleInput.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.onCourseAdd = this.onCourseAdd.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onUpdateBtnClicked = this.onUpdateBtnClicked.bind(this);
        this.onDeleteBtnClicked = this.onDeleteBtnClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCourseAddSelected = this.onCourseAddSelected.bind(this);
        this.onCourseEditOrDeleteSelected = this.onCourseEditOrDeleteSelected.bind(this);
        this.onCourseViewSelected = this.onCourseViewSelected.bind(this);

    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault();

        if (this.state.operation === 'add') {
            this.onCourseAdd();
        } else if (this.state.operation === 'edit-delete') {
            this.onUpdateBtnClicked();
        }
    }

    clearFields() {
        this.setState({
            name: '',
            description: '',
            instructor: '',
            students: '',
            id: '',
            search: '',

        })
    }

    onCourseAddSelected() {
        this.setState({
            operation: 'add'
        })

    }

    onCourseEditOrDeleteSelected() {
        this.setState({
            operation: 'edit-delete'
        })
    }

    onCourseViewSelected() {
        this.setState({
            operation: 'view'
        })
    }

    onCourseAdd(e) {
        const courseDetails = {
            name: this.state.name,
            description: this.state.description,
            instructor: this.state.instructor,
            status: 'Waiting for Approval.',
            isApproved: this.state.isApproved
        };

        axios.post('http://localhost:8080/courses/create', courseDetails).then(res => {
            let data = res.data;
            if (data.success === "true") {
                swal("Success ", "Course Details Added Successfully !", "success").then(() => {
                    this.clearFields();
                })
            }
        })
    }

    onSearch() {
        let url = 'http://localhost:4000/courses/' + this.state.search
        axios.get(url).then(res => {
            let data = res.data;
            console.log(data.success);
            console.log(data.courses[0]);
            if (data.success) {
                this.setState({
                    courses: data.courses[0],
                    name: data.courses[0].name,
                    description: data.courses[0].description,
                    instructor: data.courses[0].instructor._id,
                    id: data.courses[0]._id,
                    status: data.courses[0].status
                })
                console.log(data.courses);
                console.log(data.courses.name);
                console.log(data.courses.instructor);
            } else {
                alert(this.state.courses);
            }
        })
    }

    onUpdateBtnClicked(e) {
        const updateDetails = {
            name: this.state.name,
            description: this.state.description,
            instructor: this.state.instructor
        };
        if (this.state.id !== '' || this.state.id !== null) {
            let url = 'http://localhost:8080/courses/update?id=' + this.state.id;
            axios.put(url, updateDetails).then(res => {
                let data = res.data;
                if (data.success === "true") {
                    swal("Success !", "Course Details Updated Successfully !", "success").then(() => {
                        this.clearFields();
                    })
                }
            })
        }

    }

    onDeleteBtnClicked() {
        if (this.state.id !== null || this.state.id !== '') {
            let url = 'http://localhost:8080/courses/delete?id=' + this.state.id;
            axios.delete(url).then(res => {
                if (res.data.success === "true") {
                    swal("Success !", "Course Details Deleted Successfully !", "success").then(() => {
                        this.clearFields();
                    })
                } else {
                    swal("Oops!", "Something went wrong ...", "error")
                        .then(() => {

                        });
                }
            })
        } else {
            swal("Cannot Delete !", "Please select a Course to Delete !", "error")
                .then(() => {

                });
        }
    }


    componentDidMount() {
        this.axiosCancelSource = axios.CancelToken.source();

        axios
            .get('http://localhost:4000/users/instructors/tns', {cancelToken: this.axiosCancelSource.token})
            .then(response => {
                this.setState({
                    instructors: response.data.instructor
                })
                console.log(this.state.instructors)
            })
            .catch(err => console.log(err))

        axios
            .get('http://localhost:4000/courses', {cancelToken: this.axiosCancelSource.token})
            .then(response => {
                this.setState({
                    allCourses: response.data.courses
                });
                console.log(this.state.allCourses)
            })
            .catch(err => console.log(err))

        console.log(this.state.allCourses)

    }


    componentWillUnmount() {
        this.axiosCancelSource.cancel('Component unmounted.')
    }

    render() {

        let editDeleteCourse = () => {
            if (this.state.operation === "edit-delete") {
                return <div>
                    <br/>
                    <div style={{marginLeft: "16px", marginRight: "16px"}}>
                        <div className="row">
                            <input type="text" name="search" className="col-md-9 form-control" value={this.state.search}
                                   onChange={this.handleInput}
                                   style={{marginRight: "10px"}}/>

                            <button className="btn btn-primary col" onClick={this.onSearch}>Search</button>
                        </div>
                    </div>
                    <label>Course ID:</label>
                    <input type="text"
                           name="id"
                           className="form-control"
                           value={this.state.id}
                           readOnly={true}/>
                </div>
            }
        };

        let operationBtns = () => {
            if (this.state.operation === 'add') {
                return <div>
                    <button className="btn btn-primary" type="submit"
                            style={{marginTop: "10px"}}>Add Course
                    </button>
                </div>
            } else if (this.state.operation === "edit-delete") {
                return <div>
                    <label>Status:</label>
                    <input type="text" readOnly={true} value={this.state.status} className="form-control"/>

                    <button className="btn btn-primary" type="submit"
                            style={{marginTop: "10px", marginRight: "10px"}}>Update Course
                    </button>
                    <button type="button" className="btn btn-primary" value="Delete"
                            style={{marginTop: "10px"}} onClick={this.onDeleteBtnClicked}>Delete Course
                    </button>
                </div>
            }
        }

        let courseDetails = () => {
            if (this.state.operation === 'add' || this.state.operation === 'edit-delete') {
                return <div>
                    <div className="form-group">
                        {editDeleteCourse()}
                        <form onSubmit={this.handleSubmit}>
                            <label>Course Name: </label>
                            <input type="text"
                                   name="name"
                                   className="form-control"
                                   value={this.state.name}
                                   required={true}
                                   onChange={this.handleInput}/>

                            <label>Description: </label>
                            <input type="text"
                                   name="description"
                                   className="form-control"
                                   required={true}
                                   value={this.state.description}
                                   onChange={this.handleInput}/>

                            <label>Instructor: </label>

                            <select value={this.state.instructor}
                                    name="instructor"
                                    className="form-control"
                                    required={true}
                                    onChange={this.handleInput}>
                                <option> -- Select Instructor --</option>
                                {this.state.instructors.map((ins) => <option key={ins._id} className="form-control"
                                                                             value={ins._id}>{ins.fName + ' ' + ins.lName}</option>)}
                            </select>

                            {operationBtns()}

                        </form>
                    </div>
                </div>
            }
        };

        let viewCourses = () => {
            if (this.state.operation === 'view') {
                return <div>
                    <br/>
                    <Accordion>

                        {this.state.allCourses.map((course, key) => {
                            return <Card key={key}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={key}>
                                        {course.name}
                                    </Accordion.Toggle>
                                </Card.Header>

                                <Accordion.Collapse eventKey={key}>
                                    <Card.Body>
                                        <ul className="list-group">
                                            <li className="list-group-item"><b>ID: </b> {course._id}</li>
                                            <li className="list-group-item"><b>Name: </b> {course.name}</li>
                                            <li className="list-group-item"><b>Description: </b>{course.description}
                                            </li>
                                            {/*<li className="list-group-item">*/}
                                            {/*    <b>Instructor: </b>{course.instructor.fName + ' ' + course.instructor.lName}*/}
                                            {/*</li>*/}
                                            {/*{console.log(course.instructor.fName + ' ' + course.instructor.lName)}*/}
                                            <li className="list-group-item"><b>Status: </b> {course.status}</li>
                                        </ul>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        })}

                    </Accordion>
                </div>
            }
        };
        return <div className="courseManagementContainer" style={{marginTop: "40px"}}>
            <center><h3>Course Management</h3></center>

            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="add" active={(this.state.operation === 'add')}
                              onClick={this.onCourseAddSelected}>Add Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="update"
                              active={(this.state.operation === 'edit-delete')}
                              onClick={this.onCourseEditOrDeleteSelected}>Edit / Delete
                        Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="view"
                              active={(this.state.operation === 'view')}
                              onClick={this.onCourseViewSelected}>View Courses</Nav.Link>
                </Nav.Item>
            </Nav>

            {courseDetails()}
            {viewCourses()}
        </div>
    }
}
ReactDOM.render(<Create_Course_Container/>, document.getElementById('main'));