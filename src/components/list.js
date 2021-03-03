import React from 'react';
import './sidebar.css';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faClock, faCamera } from '@fortawesome/free-solid-svg-icons';

function List () {
    return (
        <React.Fragment>
            <li data-tag="1"><FontAwesomeIcon icon={faClipboard} /> <a href="https://lbaker15.github.io/ReactPhoto/#/dashboard">Dashboard</a> </li>
            <li data-tag="2"><FontAwesomeIcon icon={faClock} /> <a href="https://lbaker15.github.io/ReactPhoto/#/scheduled">View Schedule</a> </li>
            <li data-tag="3"><FontAwesomeIcon icon={faCamera} /> <a href="https://lbaker15.github.io/ReactPhoto/#/upload">Upload</a> </li>
        </React.Fragment>
    )
}

export default connect((state) => ({

}))(List)