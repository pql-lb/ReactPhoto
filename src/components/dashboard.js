import React from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Switch, Route, Link, Redirect, useLocation} from 'react-router-dom';
import Info from './info';
import Loader from './loader';
import BtnHolder from './btnHolder';
import ErrorPage from './errorPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const Query = (props) => {
    const location = useLocation();
    props.setAccess(location.search)
    return <div> </div>
}

class Dashboard extends React.Component {
    state = {
        name: '',
        avatar: '',
        hovered: false,
        recentPhotos: new Array,
        completed: false,
        loggedOut: false
    }
    setName = (name) => {
        this.setState({
            name: name
        })
    }
    setAvatar = (avatar) => {
        this.setState({
            avatar: avatar
        })
    }
    setPhotos = (photos) => {
        this.setState({
            recentPhotos: photos
        })
        setTimeout(() => {this.forceUpdate()}, 1000)
    }
    setAccess = (a) => {
        let access = document.cookie.match(new RegExp('(^| )' + 'access' + '=([^;]+)'));
        if (!access) {
            let now = new Date()
            let time = now.getTime()
            time += 1 * 3600 * 1000 * 2
            now.setTime(time)
            document.cookie = `access=${a};expires=${now.toUTCString()};path=/;`
            setTimeout(() => {this.forceUpdate()}, 500)
        }
    }
    logout = () => {
        this.setState({loggedOut: true})
    }
    render() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let userId = document.cookie.match(new RegExp('(^| )' + 'userId' + '=([^;]+)'));
        let access = document.cookie.match(new RegExp('(^| )' + 'access' + '=([^;]+)'));
        const {name, avatar, completed, recentPhotos, loggedOut} = this.state;  
        console.log(recentPhotos)
        // will have to hide prop info if not access
        if (cookie && userId) {
            return(
                <div className="dashFlex">
                        {loggedOut ? <Redirect to="/" /> : null}
                        <Loader top={-100 + "px"} left={0} color="purpleD" scale={1.5} overlay={true} conditions={recentPhotos.length === 0 || name.length === 0 || avatar.length === 0} />
                    
                    <Query setAccess={this.setAccess} />
                    {access &&
                    <React.Fragment>
                    <div class="leftPanel">
                        {recentPhotos.length > 0 && (
                            recentPhotos.map((x,i) => {
                                if (i < 4) {
                                    return (
                                        <div key={i} className={`widget widget${x.number}`}>
                                            <div className="widgImg" style={{backgroundImage: `url(${x.url})`}} />
                                            <div style={{color: 'rgb(50, 15, 107)', marginTop: '6px', textAlign: 'center', fontFamily: 'poppins'}} className="likes">
                                                <FontAwesomeIcon icon={faHeart} />
                                                <span style={{paddingLeft: '5px'}}>{x.likes} </span>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        )}
                    </div>
                    <div className="mainSection">
                        <div className="head">
                        <div class="headAvatar" style={{backgroundImage: `url(${avatar})`}}> </div>
                        <span style={{marginLeft: 10+"px"}}>Welcome {name} </span></div>
                        <Info access={access} setPhotos={this.setPhotos} setName={this.setName} setAvatar={this.setAvatar} />
                    </div>
                    <BtnHolder logout={this.logout} />
                    </React.Fragment>
                    }
                </div>
            )
        } else {
            return <ErrorPage />
        }
    }
}

export default connect((state) => ({

}))(Dashboard);