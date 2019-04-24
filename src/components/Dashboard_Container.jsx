'use strict';
import React, {Component} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons';
// import "../../css/home_page.css";


library.add(faStroopwafel);

export default class Dashboard_Container extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return <div>
            {/*Favorite Food: <FontAwesomeIcon icon="stroopwafel"/>*/}
            {/*<div className="navbar">*/}

            {/*</div>*/}

        </div>
    }
}