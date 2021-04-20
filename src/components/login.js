import React from "react";
import { Redirect } from "react-router-dom";
import {testAPI, statusChange, login, loadFbApi, checkLoginState} from "../utils/helpers";
import { connect } from 'react-redux';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        name: '',
        instaPass: '',
        instaUser: '',
        emailBlur: null,
        passwordBlur: null,
        invalidLogin: false,
        instaUserBlur: null, instaPassBlur: null, nameBlur: null,
        errorMsg: ' ',
        hidden: true,
        loginAlert: '',
        signUp: false
    }
    handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleBlur = (e) => {
        if (e.target.id === 'instaUser' | e.target.id === 'instaPass') {
            if (e.target.value < 2) {
                let string = e.target.id + "Blur"
                this.setState({
                    [string]: true
                })
            } else {
                let string = e.target.id + "Blur"
                this.setState({
                    [string]: false
                })
            }
        } else if (this.state[e.target.id].length < 4) {
            let string = e.target.id + "Blur"
            this.setState({
                [string]: true
            })
        } else {
            let string = e.target.id + "Blur"
            this.setState({
                [string]: false
            })
        }
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
                                    setTimeout(() => this.setState({errorMsg: ' '}), 5000)
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
                    setTimeout(() => this.setState({errorMsg: ' '}), 5000)
                }
            })
        } else {
            this.setState({errorMsg: 'Please ensure both fields are entered correctly.', hidden: true})
            setTimeout(() => this.setState({errorMsg: ' '}), 5000)
        }
    }
    signUp = () => {
        this.setState((prev) => ({
            signUp: !prev.signUp
        }))
    }
    handleSignUp = () => {
        const {instaUserBlur, instaPassBlur, nameBlur, emailBlur, passwordBlur, name, email, password, instaUser, instaPass} = this.state;
        if (email.length > 3 && password.length > 3 && name.length > 3 && instaUser !== null && instaPass !== null) {
            //Show loader
            this.setState({hidden: false, loginAlert: 'Processing...'})
            let obj = {name, password, email, 'instaUsername': instaUser, 'instaPassword': instaPass}
            fetch(`https://multer-test123.herokuapp.com/signup`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (!data.Error) {
                    this.setState({errorMsg: 'User successfully created.', hidden: true, loginAlert: ''})
                    //refresh page
                } else {
                    this.setState({errorMsg: data.Error, hidden: true, loginAlert: ''})
                }
            })
        } else {
            if (instaPassBlur === null | instaUserBlur === null | nameBlur === null | passwordBlur === null | emailBlur === null) {
                this.setState({errorMsg: 'Please ensure all fields have been completed.'})
                setTimeout(() => this.setState({errorMsg: ''}), 5000)
            } else if (email.length < 4) {
                this.setState({errorMsg: 'Email must be more than 4 characters long.'})
                setTimeout(() => this.setState({errorMsg: ''}), 5000)
            } else if (password.length < 4) {
                this.setState({errorMsg: 'Password must be more than 4 characters long.'})
                setTimeout(() => this.setState({errorMsg: ''}), 5000)
            } else if (name.length < 4) {
                this.setState({errorMsg: 'Name must be more than 4 characters long.'})
                setTimeout(() => this.setState({errorMsg: ''}), 5000)
            }
        }

    }
    render() {
        console.log(this.state)
        const {emailBlur, instaUser, instaPass, signUp, passwordBlur, nameBlur, instaUserBlur, instaPassBlur, name, hidden, test, email, password, loginAlert, invalidLogin, errorMsg} = this.state;
        return (
            <React.Fragment>
                <div style={signUp ? {height: '105vh', paddingBottom: 30, marginTop: -85} : null} className="rowMine">
                {test && !invalidLogin ? <Redirect to="/btnPage" /> : null}
                
                {!signUp && (
                <React.Fragment>
                <h1>Sign In</h1>
                <span className="alert">{errorMsg}</span>
                <label>Email:</label>
                <input 
                id="email"
                style={emailBlur ? {borderBottom: '1px solid red'} : emailBlur === null ? {borderBottom: '1px solid rgb(50, 15, 107)'} : {borderBottom: '1px solid green'}} 
                value={email}
                onBlur={(e) => this.handleBlur(e)}
                onChange={(e) => this.handleChange(e)}
                className="input" />
                <label>Password:</label>
                <input 
                id="password"
                style={passwordBlur ? {borderBottom: '1px solid red'} : passwordBlur === null ? {borderBottom: '1px solid rgb(50, 15, 107)'} : {borderBottom: '1px solid green'}} 
                onBlur={(e) => this.handleBlur(e)}
                value={password} 
                onChange={(e) => this.handleChange(e)}
                type="password"
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
                        <span className="signTxt" onClick={this.signUp}> SIGNUP </span>
                    </button>
                </div>
                </React.Fragment>
            )}

            {signUp && (
                <React.Fragment>
                <h1>Sign Up</h1>
                <span style={errorMsg.length < 2 ? {display: 'none'} : {display: 'block'}} className="alert">{errorMsg}</span>
                <label>Full Name:</label>
                <input onBlur={(e) => this.handleBlur(e)} style={nameBlur ? {borderBottom: '1px solid red'} : nameBlur === null ? {borderBottom: '1px solid rgb(50, 15, 107)'} : {borderBottom: '1px solid green'}}  id="name" value={name} onChange={(e) => this.handleChange(e)} />
                <label>Email:</label>
                <input 
                id="email"
                style={emailBlur ? {borderBottom: '1px solid red'} : emailBlur === null ? {borderBottom: '1px solid rgb(50, 15, 107)'} : {borderBottom: '1px solid green'}} 
                value={email}
                onBlur={(e) => this.handleBlur(e)}
                onChange={(e) => this.handleChange(e)}
                className="input" />
                <label>Password:</label>
                <input 
                id="password"
                style={passwordBlur ? {borderBottom: '1px solid red'} : passwordBlur === null ? {borderBottom: '1px solid rgb(50, 15, 107)'} : {borderBottom: '1px solid green'}} 
                onBlur={(e) => this.handleBlur(e)}
                value={password} 
                onChange={(e) => this.handleChange(e)}
                type="password"
                className="input" />
                <label>Instagram username:</label>
                <input onBlur={(e) => this.handleBlur(e)} style={instaUserBlur ? {borderBottom: '1px solid red'} : instaUserBlur === null ? {borderBottom: '1px solid rgb(50, 15, 107)'} : {borderBottom: '1px solid green'}}  id="instaUser" value={instaUser} onChange={(e) => this.handleChange(e)} />
                <label>Instagram password:</label>
                <input onBlur={(e) => this.handleBlur(e)} style={instaPassBlur ? {borderBottom: '1px solid red'} : instaPassBlur === null ? {borderBottom: '1px solid rgb(50, 15, 107)'} : {borderBottom: '1px solid green'}}  id="instaPass" value={instaPass} onChange={(e) => this.handleChange(e)} />


                <div className="btnContain">
                    <div className="btnContainCol">
                        <button 
                        onClick={this.handleSignUp}
                        className="btn login"
                        >
                            <div id={hidden ? "hide" : null} className="lds-defaultTwo left">
                            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                            </div>
                            <span id={hidden ? null : "hide"} className="loginTxt">SIGNUP</span>
                        </button>
                        <div className="loginAlert">{loginAlert}</div>
                    </div>
                    <button className="btn signup">
                        <span className="signTxt" onClick={this.signUp}> SIGNIN </span>
                    </button>
                </div>
                </React.Fragment>
            )}
            </div>
            </React.Fragment>
    
        )
    }
}

export default connect((state) => ({

}))(Login);