import React from 'react';
import {HashRouter as Router, Switch, Route, Link, Redirect, useLocation} from 'react-router-dom';

class BtnHolder extends React.Component {
    handleLogout = () => {
        //Gather token cookie 
        let useCook = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let useCooki = useCook[0].split('=')
        let useCookie = useCooki[1]
        //THINK ALL YOU NEED TO DO HERE IS WIPE THE ACCESS TOKEN AS THATS HOW IDENTIFYING USER
        let now = new Date();
        let now2 = now.getTime();
        now2 -= 1;
        now.setTime(now2);
        document.cookie = "token" + "=" + null + ";expires=" + now.toUTCString() +";path=/";
        document.cookie = "access" + "=" + null + ";expires=" + now.toUTCString() +";path=/";
        document.cookie = "userId" + "=" + null + ";expires=" + now.toUTCString() +";path=/";
        this.props.logout(true)
        // window.location.href = "https://lbaker15.github.io/ReactPhoto/#/";
    }
    render() {
        return (
            <div className="btnHolder">
                <Link style={{'textDecoration': 'none'}} to ="/upload">
                    <div style={{'height': 'auto'}} 
                    className="btnDash purpleGradient">Schedule an upload</div>
                </Link>
                <Link style={{'textDecoration': 'none'}} to ="/scheduled">
                    <div style={{'height': 'auto'}} 
                    className="btnDash purpleGradient">View your scheduled posts</div>
                </Link>
                <div style={{'height': 'auto'}} 
                    // onMouseEnter={() => this.setState({hovered: true})}
                    // onMouseLeave={() => this.setState({hovered: false})}
                    // id={!hovered ? "shadow1" : "shadow2"} 
                    onClick={this.handleLogout}
                    className="btnDash purpleGradient">Logout of the associated instagram account</div>
            </div>
        )
    }
}

export default BtnHolder;