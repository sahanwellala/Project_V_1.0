'use strict';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Register_Container from "./Register_Container";
import * as ReactDOM from "react-dom";
import Login_Container from "./login_container";
import Dashboard_Container from "./Dashboard_Container";
import ListAssignment from "./Dishan/Assignment-List.component"
import ViewListAssignment from "./Dishan/Assignment-List-View.component"
import EditAssignment from "./Dishan/Assignment-Edit.component"
import CreateAssignment from "./Dishan/Assignment-Create.component"
import DeleteAssignment from "./Dishan/Assignment-Delete.component"
import ListExam from "./Dishan/Exam-List.component"
import ViewListExam from "./Dishan/Exam-List-View.component"
import EditExam from "./Dishan/Exam-Edit.component"
import CreateExam from "./Dishan/Exam-Create.component"
import DeleteExam from "./Dishan/Exam-Delete.component"
import StudentExamList from "./Dishan/Student-Exam-List.component"
import StudentAssignmentList from "./Dishan/Student-Assignment-List.component"
import StudentExamUploads from "./Dishan/Student-Exam-Uploads.component"
import StudentAssignmentUploads from "./Dishan/Student-Assignment-Uploads.component"
import StudentAssignmentMarks from "./Dishan/Student-Assignment-Marks.component"
import StudentExamMarks from "./Dishan/Student-Exam-Marks.component"

// render(<Register_Container/>, document.getElementById('root'));
// optional cofiguration


ReactDOM.render((
    <Router>
        <Route path="/" exact component={Login_Container}/>
        <Route path="/register" exact component={Register_Container}/>

        <Route path="/home" exact
               component={() => localStorage.getItem('success') === "true" ? <Dashboard_Container/> :
                   <Login_Container/>}/>
            <Route path="/assignment" exact component={ListAssignment}/>
            <Route path="/view_assignment" exact component={ViewListAssignment}/>
            <Route path="/edit_assignment/:id" exact component={EditAssignment}/>
            <Route path="/create_assignment" exact component={CreateAssignment}/>
            <Route path="/delete_assignment/:id" exact component={DeleteAssignment}/>
            <Route path="/exam" exact component={ListExam}/>
            <Route path="/view_exam" exact component={ViewListExam}/>
            <Route path="/edit_exam/:id" exact component={EditExam}/>
            <Route path="/create_exam" exact component={CreateExam}/>
            <Route path="/delete_exam/:id" exact component={DeleteExam}/>
            <Route path="/student_assignment_list" exact component={StudentAssignmentList}/>
            <Route path="/student_exam_list" exact component={StudentExamList}/>
            <Route path="/student_exam_uploads/:id" exact component={StudentExamUploads}/>
            <Route path="/student_assignment_uploads/:id" exact component={StudentAssignmentUploads}/>
            <Route path="/student_assignment_marks" exact component={StudentAssignmentMarks}/>
            <Route path="/student_exam_marks" exact component={StudentExamMarks}/>
    </Router>
), document.getElementById('root'));


// ReactDOM.render((
//     <Router>
//         <Route path="/create-admin-ins" exact component={Create_AdminOrInstructors_Container}/>
//     </Router>
// ), document.getElementById('main'));


