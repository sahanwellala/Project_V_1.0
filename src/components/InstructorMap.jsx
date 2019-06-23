import React, {Component} from 'react';

export default class InstructorMap extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let instructors = this.props.state;
        let optionItems = instructors.map((ins) => {
            return <option key={ins._id} value={ins._id}>{ins.fName + ' ' + ins.lName}</option>
        });

        return {optionItems}

    }
}