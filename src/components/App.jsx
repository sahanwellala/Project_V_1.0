'use strict';
import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Register_Container from "./Register_Container";
import * as ReactDOM from "react-dom";
import Login_Container from "./login_container";
import Dashboard_Container from "./Dashboard_Container";


// render(<Register_Container/>, document.getElementById('root'));

ReactDOM.render((
    <Router>
        <Route path="/" exact component={Login_Container}/>
        <Route path="/register" exact component={Register_Container}/>
        <Route path="/home" exact component={Dashboard_Container}/>
    </Router>
), document.getElementById('root'));


// ReactDOM.render((
//     <Router>
//         <Route path="/home" exact component={Dashboard_Container}/>
//     </Router>
// ), document.getElementById('container'));


