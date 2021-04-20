import React from 'react';
import './sidebar.css';
import List from './list';
import {drawerChange} from '../reducers/sidebar';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";

class SideBar extends React.Component {
    state = {
        drawerOpen: false
    }
    openDrawer = () => {
        // this.setState((prev) => ({
        //     drawerOpen: true,
        // }))
        this.props.dispatch( drawerChange({val: true}) )
    }
    closeDrawer = (e) => {
        const tag = e.target.attributes.getNamedItem('data-tag');
        //SHOULD ONLY FIRE IF STATE IS OPEN
        if (e.target !== this.list.current && e.target !== this.listUl.current && tag === null) {
            // this.setState((prev) => ({
            //     drawerOpen: false,
            // }))
            this.props.dispatch( drawerChange({val: false}) )
        }
    }
    componentDidMount() {
        const {parent} = this.props;
        const parentEl = parent !== null ? this.props.parent : null;
        setTimeout(() => {
            const tryThis = ReactDOM.findDOMNode(parentEl.current)
            parentEl.current.addEventListener('click', (e) => this.closeDrawer(e))
        }, 2000)
    }
    list = React.createRef();
    listUl = React.createRef();
    render() {
        const {drawerOpen} = this.state;
        const {sidebar} = this.props;
        return (
            <React.Fragment>
            {!sidebar &&
            <div
            style={{marginLeft: '25px', fontSize: '35px'}}
            className="burgerIcon"
            onClick={this.openDrawer}
            >
              <FontAwesomeIcon icon={faList} />
            </div>
            }
            {sidebar &&
            <React.Fragment>
            <Animate play={drawerOpen} start={{translateX: '-250px'}} end={{translateX: '0px'}}>
            <div className="blur"></div>
            <div
            onClick={this.openDrawer}
            className="list"
            ref={this.list}
            >
           

                <ul ref={this.listUl}>
                    <List parent={this.listUl} />
                </ul>
                <button
                className="logout"
                >Logout</button>
              
            </div>
            </Animate>
            </React.Fragment>
            }
            </React.Fragment>
        )
    }
}

export default connect((state) => ({
    sidebar: state.sidebar
}))(SideBar);