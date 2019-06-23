import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import {Accordion} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";

export default class MyCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            approvedCourses: [],
            operation: 'view'
        };
        this.onCourseViewSelected = this.onCourseViewSelected.bind(this);
        this.onEnrollSelected = this.onEnrollSelected.bind(this);
        this.handleEnroll = this.handleEnroll.bind(this);
        this.handleUnEnroll = this.handleUnEnroll.bind(this);
    }

    onCourseViewSelected() {
        this.setState({
            operation: 'view'
        })

    }

    onEnrollSelected() {
        this.setState({
            operation: 'enroll'
        })
    }

    handleEnroll(id) {
        //alert(id)
        let url = 'http://localhost:4000/users/courses/' + localStorage.getItem('userID');
        let courses = {
            courses: id
        }
        axios.put(url, courses).then(res => {
            console.log(res.data);
            swal("Success ! ", "You have Successfully Enrolled to the Course !", "success").then(() => {
                window.location.href = 'http://localhost:1234/home';
            })
        })

    }

    handleUnEnroll(courseId) {
        let url = 'http://localhost:4000/users/courses/unenroll/' + localStorage.getItem("userID");
        let courses = {
            courses: courseId
        }
        axios.put(url, courses).then((res) => {
            swal("Success ! ", "You have Successfully Un Enrolled from the Course !", "success").then(() => {
                window.location.href = 'http://localhost:1234/home';
            })
        })
    }

    componentDidMount() {
        let url = 'http://localhost:4000/users/courses/' + localStorage.getItem("email");
        axios.get(url).then(res => {
            let data = res.data.courses[0].courses;
            this.setState({
                courses: data
            })
        });

        axios.get('http://localhost:4000/courses/approved').then(approved => {
            let data = approved.data.courses;
            this.setState({
                approvedCourses: data
            })
        })
    }

    componentWillUnmount() {

    }

    render() {

        let viewMyCourseDetails = () => {
            if (this.state.operation === 'view') {
                return <div>
                    <br/>
                    <Accordion>

                        {this.state.courses.map((course, key) => {
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
                                        </ul>
                                        <br/>

                                        <button className="btn btn-primary"
                                                onClick={() => this.handleUnEnroll(course._id)}>Un Enroll
                                        </button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        })}

                    </Accordion>
                </div>
            } else {
                return null;
            }
        };

        let courseList = () => {
            if (this.state.operation === 'enroll') {
                return <div>
                    <br/>
                    <Accordion>

                        {this.state.approvedCourses.map((course, key) => {
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
                                            {/*<li className="list-group-item"><b>Status: </b> {course.status}</li>*/}
                                        </ul>
                                        <br/>
                                        <button className="btn btn-primary"
                                                onClick={() => this.handleEnroll(course._id)}>Enroll
                                        </button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        })}

                    </Accordion>
                </div>
            } else {
                return null;
            }
        };
        return <div className="courseManagementContainer" style={{marginTop: "40px"}}>
            <center><h3>My Courses</h3></center>

            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="view" active={(this.state.operation === 'view')}
                              onClick={this.onCourseViewSelected}>My Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="enroll"
                              active={(this.state.operation === 'enroll')}
                              onClick={this.onEnrollSelected}>Enroll to Courses</Nav.Link>
                </Nav.Item>
            </Nav>

            {viewMyCourseDetails()}
            {courseList()}
        </div>
    }
}