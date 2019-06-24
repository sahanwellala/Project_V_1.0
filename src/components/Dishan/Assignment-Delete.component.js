'use strict';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default class DeleteAssignment extends Component {
    constructor(props){
        super(props);
        this.onDeleteAssignment=this.onDeleteAssignment.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/assignments/'+ this.props.match.params.id)
            .then(()=> {
                this.setState({
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onDeleteAssignment(){
        axios.delete('http://localhost:4000/assignments/delete/'+this.props.match.params.id)
            .then(res=>console.log(res,data));
        window.location.href = 'http://localhost:1234/Assignment';
    }

    render() {
        return this.onDeleteAssignment();
    }
}