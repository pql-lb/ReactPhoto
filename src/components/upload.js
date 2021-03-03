import React from 'react';
import './inputForm.css';
import { connect } from 'react-redux';
import SideBar from './sidebar';
import ErrorPage from './errorPage';

class Upload extends React.Component {
    state = {
        file: '',
        time: '',
        date: '',
        alertMsg: '',
        message: '',
        hovered: false,
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleChangeImg = (e) => {
        if (e.target.files.length) {
            this.setState({
                preview: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0]
            })
        }
    }
    clearImg = () => {
        this.setState({
            preview: '',
            file: ''
        })
    }
    handleUpload = () => {
        const {file, time, date, preview, message} = this.state;
        //VALIDATION FOR IMAGE TYPE - MUST BE JPG
        let currentTime = new Date().getTime()
        console.log(file, time, date)
        if (file !== '' && time !== '' && date !== '' && message !== '') {
        //Find userId cookie to help generate the image name
        let userId = document.cookie.match(new RegExp('(^| )' + 'userId' + '=([^;]+)'))[0].split('=')[1];
        const iName = String(userId + "_" + file.name)
        const formData = new FormData();
        formData.append('image', file, iName)
        //Work on the scheduled date
        let date2 = String(date);
        let time2 = String(time);
        let dat = date2.split('-')
        let year = Number(dat[0])
        let month = Number(dat[1]) - 1
        let day = Number(dat[2])
        let timePrior = time2.split(':')
        let hour = Number(timePrior[0])
        let mins = Number(timePrior[1])
        let datum = new Date(Date.UTC(year, month, day, hour, mins, 0, 0)).getTime();
        if (currentTime > datum) {
            this.setState({alertMsg: 'Scheduled date must be in the future.'})
        } else {
        formData.append('time', datum)
        formData.append('userId', userId)
        formData.append('message', message)
        //Gather token cookie 
        let useCook = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let useCooki = useCook[0].split('=')
        let useCookie = useCooki[1]
        //Make call
        setTimeout(() => {
        fetch('https://multer-test123.herokuapp.com/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${useCookie}`
            }
        })
        .then(res => res.json())
        .then(data => {
            let error = data.Error;
            if (!error) {
                this.setState({alertMsg: 'Image successfully uploaded!'})
            } else {
                this.setState({alertMsg: error})
            }
            console.log(data)
        })
        }, 2000)
    }
    } else {
        this.setState({alertMsg: 'Please ensure all fields are filled in correctly.'})
    }
    }
    refTwo = React.createRef();
    render() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let userId = document.cookie.match(new RegExp('(^| )' + 'userId' + '=([^;]+)'));
        let access = document.cookie.match(new RegExp('(^| )' + 'access' + '=([^;]+)'));
        
        if (cookie && userId) {
        const {file, time, date, preview, message, alertMsg, hovered} = this.state;
        return (
            <div className="entireWidth" ref={this.refTwo}>
                <div className="formHeaders">
                <h1>Schedule An Upload</h1>
                <h2>Some information about how it works here. Lorem ipsum is the standard language of the typing industry.</h2>
                </div>
                <div className="formFlex">
                <div className="inputForm" style={(alertMsg && preview) ? {height: "550px"} : {height: "500px"}}>
                    <div style={!alertMsg ? {display: "none"} : {display: "block"}} className="alert">{alertMsg}</div>

                    <label for="date">Date:</label>
                    <input type="date" id="date" value={date} onChange={this.handleChange} />
                    <label for="time">Time:</label>
                    <input type="time" id="time" value={time} onChange={this.handleChange} />
                    <label for="message">message:</label>
                    <input type="text" id="message" value={message} onChange={this.handleChange} />
                    

                    <label style={file !== '' ? {height: "120px"} : {height: "75px"}} className="fileBox" for="file">
                    {preview ? (
                        <React.Fragment>
                        <img src={preview} width="100" height="100" />
                        <button 
                        onClick={this.clearImg}
                        className="clearImg">Change image</button>
                        </React.Fragment>
                    ) : (
                        <div 
                        id={!hovered ? "shadow1" : "shadow2"}
                        onMouseEnter={() => this.setState({hovered: true})}
                        onMouseLeave={() => this.setState({hovered: false})}
                        className="uploadBtn">Please select an image</div>
                    )}
                    </label>
                    <input type="file" id="file" style={{display: "none"}} onChange={this.handleChangeImg} />
                    <button 
                    className="btnSubmit"
                    onClick={this.handleUpload}
                    >Upload</button>
                    <div className={!hovered ? "btnBlur" : "btnBlur2"}></div>
                </div>
                <SideBar parent={this.refTwo} />
                </div>
            </div>
        )
        } else {
            return <ErrorPage />
        }
    }
}

export default connect((state) => ({

}))(Upload);