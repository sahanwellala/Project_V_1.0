'use strict';
import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Logo from "../../resources/images/notice-bg.jpg";
import Button from "react-bootstrap/Button";
import axios from "axios";
import swal from "sweetalert";

export default class Home_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heading: '',
            notices: [],
            assignmentNotification:[],
            examNotification:[],
            examMarkNotification:[],
            assignmentMarkNotification:[]
        };
        this.handleApprove = this.handleApprove.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/assignments/')
            .then(response=>{
                this.setState({assignmentNotification: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/exam/')
            .then(response=>{
                this.setState({examNotification: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/examUpload/')
            .then(response=>{
                this.setState({examMarkNotification: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/assignmentUpload/')
            .then(response=>{
                this.setState({assignmentMarkNotification: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:4000/notices/' + localStorage.getItem("userID")).then(res => {
            console.log(res.data);
            this.setState({
                notices: res.data.data
            });

            console.log(this.state.notices)
        });
        if (localStorage.getItem('accType').toString() === 'Student') {
            {this.examAssignmentNotifier()}
        }

    }

    handleApprove(id) {
        let url = 'http://localhost:4000/notices/approve/' + id;
        axios.put(url).then(res => {
            console.log(res.data);
            let data = res.data;
            if (data.success) {
                swal("Success !", "Course has been approved !", "success").then(() => {

                })
            }
        })
    }

    examAssignmentNotifier(){
        if((this.state.assignmentNotification)!==null){
            alert("Assignments available....")
        }
        if((this.state.examNotification)!==null){
            alert("Exams available....")
        }
        this.state.examMarkNotification.map(function(currentExamMark){
            if(currentExamMark.exam_marks!==null){
                alert("Exam marks available....")
            }
        });
        if((this.state.examMarkNotification.mark!==null)||(this.state.examMarkNotification.mark !==undefined)){
            alert("Exam marks available....")
        }
        if((this.state.assignmentMarkNotification.mark!==null)||(this.state.assignmentMarkNotification.mark !== undefined)){
            alert("Assignment marks available....")
        }
    }

    render() {

        let noticeMsg = () => {
            console.log(this.state.notices);
            if (this.state.notices.length === 0) {
                return <label>
                    No notices available at the moment !
                </label>
            } else {
                return <label>
                    Pending Courses for the Approval !
                </label>
            }
        };
        return <div>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src={Logo}/>
                <Card.Body>
                    <div className='text-center'>
                        <Card.Title>Notices</Card.Title>
                    </div>
                    <Card.Text>
                        {noticeMsg()}
                    </Card.Text>

                    {
                        this.state.notices.map(course => {
                            return <div key={course._id}>
                                <ul className="list-group">
                                    <li className="list-group-item">{course.name}</li>
                                    <li className="list-group-item">{course.description}</li>
                                </ul>
                                <br/>
                                <div className="row">
                                    <Button variant="primary" className="col"
                                            style={{width: "50%", marginRight: "8px"}}
                                            value={course._id} onClick={() => {
                                        this.handleApprove(course._id)
                                    }}>Approve</Button>
                                    {/*<Button variant="primary" className="col" style={{width: "50%"}}*/}
                                    {/*        value={course._id}>Reject</Button>*/}
                                </div>
                            </div>
                        })
                    }
                </Card.Body>
            </Card>
        </div>
    }
}