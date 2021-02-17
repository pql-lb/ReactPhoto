import React from "react";
import { Redirect } from "react-router-dom";
import {testAPI, statusChange, login, loadFbApi, checkLoginState} from "../utils/helpers";


class Login extends React.Component {
    state = {
        email: '',
        password: '',
        submitRedirectFb: false,
        invalidLogin: false,
        errorMsg: ' ',
        hidden: true,
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = () => {
        let {email, password, invalidLogin} = this.state;
        if (email.length > 1 && password.length > 1) {
            this.setState({hidden: false})
            let obj = { 'email': email, 'password': password }
            fetch(`https://multer-test123.herokuapp.com/signin`, {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log('res',res)
                if (res.status === 200) {
                    this.setState({invalidLogin: false})
                    return res.json()
                } else {
                    this.setState({invalidLogin: true})
                    return res.json()
                }
            })
            .then(async (data) => {
                let error = data.Error;
                console.log(data, this.state.invalidLogin, error)
                if (this.state.invalidLogin === false && !error) {
                    let name = "token";
                    let now = new Date().getTime();
                    let expires = now + (1000*60)
                    //set cookie
                    document.cookie = name + "=" + data.token + ";expires=" + expires +";path=/"
                    let useCook = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
                    let useCooki = useCook[0].split('=')
                    //CHANGE THE NUMBER HERE
                    let useCookie = useCooki[1]
                    console.log('bearer', useCookie)
                    let formData = new FormData()
                    
                    let file1 = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png')
                    let file2 = await file1.blob()
                    let metadata = { type: 'image/jpeg' }
                    let img = new File([file2], "test.jpg", metadata)
                    formData.append('image', img)
                    console.log('formData', formData, img)

                    new Promise((res, rej) => {
                        fetch('https://multer-test123.herokuapp.com/test', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Authorization': `Bearer ${useCookie}`
                            }
                        })
                        .then(async (response) => {
                            console.log('here',response)
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
                        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
                        if (cookie) {
                            loadFbApi()
                            .then(() => {
                            let fire = checkLoginState.bind(this)
                            fire()
                            .then(async (response) => {
                                let fire2 = statusChange.bind(this)
                                fire2(response)
                                .then(access => {
                                console.log('a',access)
                                if (access) {
                                    testAPI()
                                    .then(() => {
                                        if(this.state.accessToken.length > 1) {
                                            setTimeout(() => {
                                                this.setState({submitRedirectFb: true, hidden: true})
                                            }, 1000)
                                        }
                                    })
                                    .catch(err => console.log('err with test call', err))
                                    }
                                })
                                .catch(err => console.log('err with status change', err))
                            })
                            .catch(err => console.log('err with check login', err))
                        })
                        }
                    })
                    
                } else {
                    //set error message
                    //delete cookie
                    console.log('error')
                    this.setState({errorMsg: data.Error})
                }
            })
        } else {
            this.setState({errorMsg: 'Please ensure both fields are entered correctly.'})
        }
    }
    render() {
        const {hidden, email, password, submitRedirectFb, invalidLogin, errorMsg} = this.state;
        return (
            <React.Fragment>
                {submitRedirectFb === true && invalidLogin === false ? <Redirect to="/dashboard" /> : null}
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
                    <button 
                    onClick={this.handleSubmit}
                    className="btn login"
                    >
                        <div id={hidden ? "hide" : null} className="lds-defaultTwo left">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                        <span id={hidden ? null : "hide"} className="loginTxt">LOGIN</span>
                    </button>
                    <button className="btn signup">
                        <span className="signTxt"> SIGNUP </span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;