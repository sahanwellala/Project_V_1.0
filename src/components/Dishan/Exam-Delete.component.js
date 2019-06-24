'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default class DeleteExam extends Component {
    constructor(props){
        super(props);
        this.onDeleteExam=this.onDeleteExam.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/exams/'+ this.props.match.params.id)
            .then(()=> {
                this.setState({
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onDeleteExam(){
        axios.delete('http://localhost:4000/exams/delete/'+this.props.match.params.id)
            .then(res=>console.log(res,data));
        window.location.href = 'http://localhost:1234/Exam';
    }

    render() {
        return this.onDeleteExam();
    }
}