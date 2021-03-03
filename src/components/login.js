import React from "react";
import { Redirect } from "react-router-dom";
import {testAPI, statusChange, login, loadFbApi, checkLoginState} from "../utils/helpers";
import { connect } from 'react-redux';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        invalidLogin: false,
        errorMsg: ' ',
        hidden: true,
        loginAlert: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = () => {
        let {email, password, invalidLogin} = this.state;
        if (email.length > 1 && password.length > 1) {
            //Show loader
            this.setState({hidden: false, loginAlert: 'Logging in...'})
            let obj = { 'email': email, 'password': password }
            //Send data to signin
            fetch(`https://multer-test123.herokuapp.com/signin`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({invalidLogin: false})
                    return res.json()
                } else {
                    this.setState({invalidLogin: true})
                    return res.json()
                }
            })
            .then(async (data) => {
                //Error here indicates a problem with form data
                let error = data.Error;
                if (this.state.invalidLogin === false && !error) {
                    //Generate date for cookie
                    let name = "token";
                    let now = new Date()
                    let time = now.getTime()
                    time += 1 * 3600 * 1000
                    now.setTime(time)
                    
                    //Set userId cookie
                    document.cookie = "userId" + "=" + data.userId + ";expires=" + now.toUTCString() +";path=/";

                    //Set token cookie (a jwt token signed with userid and email)
                    document.cookie = name + "=" + data.token + ";expires=" + now.toUTCString() +";path=/";
                    let useCook = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
                    let useCooki = useCook[0].split('=')
                    let useCookie = useCooki[1]
                    let formData = new FormData()

                    this.setState({loginAlert: 'Gathering images...'})
                    setTimeout(() => { 
                        this.setState({loginAlert: 'Linking with instagram...'}) 
                    }, 1000)
                    //Prepare for a test upload
                    let file1 = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png')
                    let file2 = await file1.blob()
                    let metadata = { type: 'image/jpeg' }
                    let img = new File([file2], "test.jpg", metadata)
                    formData.append('image', img)
                    //Do a test upload
                    new Promise((res, rej) => {
                        fetch('https://multer-test123.herokuapp.com/test', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Authorization': `Bearer ${useCookie}`
                        }})
                        .then(async (response) => {
                            
                            if (response.status === 200) {
                                res()
                            } else {
                                if (response.status === 403) {
                                    data = await response.json()
                                    this.setState({errorMsg: data.Error})
                                }
                                rej()
                            }
                        })
                        .catch(err => console.log(err))
                    })
                    .then(() => {
                        this.props.forceRender()
                        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
                        if (cookie) {
                            //If a cookie exists then we redirect
                            this.setState({
                                test: true
                            })
                        }
                    })
                    
                } else {
                    //set error message
                    //delete cookie
                    console.log('error')
                    this.setState({errorMsg: data.Error, hidden: true})
                }
            })
        } else {
            this.setState({errorMsg: 'Please ensure both fields are entered correctly.', hidden: true})
        }
    }
    render() {
        const {hidden, test, email, password, loginAlert, invalidLogin, errorMsg} = this.state;
        return (
            <React.Fragment>
                
                {test && !invalidLogin ? <Redirect to="/btnPage" /> : null}
                <h1>Sign In</h1>
                <span className="alert">{errorMsg}</span>
                <label>Email:</label>
                <input 
                id="email"
                value={email} 
                onChange={(e) => this.handleChange(e)}
                className="input" />
                <label>Password:</label>
                <input 
                id="password"
                value={password} 
                onChange={(e) => this.handleChange(e)}
                className="input" />
                <div className="btnContain">
                    <div className="btnContainCol">
                        <button 
                        onClick={this.handleSubmit}
                        className="btn login"
                        >
                            <div id={hidden ? "hide" : null} className="lds-defaultTwo left">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div>
                            <span id={hidden ? null : "hide"} className="loginTxt">LOGIN</span>
                        </button>
                        <div className="loginAlert">{loginAlert}</div>
                    </div>
                    <button className="btn signup">
                        <span className="signTxt"> SIGNUP </span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

export default connect((state) => ({

}))(Login);