import React from 'react';
import './scheduled.css';
import SideBar from './sidebar.js';
import Loader from './loader';
import { connect } from 'react-redux';
import ErrorPage from './errorPage';

class Schedule extends React.Component {
    state = {
        pastUrls: new Array,
        futureUrls: new Array,
        pastShowing: false,
        loading: true,
        btnDisabled: false,
        smallLoader: false
    }
    refOne = React.createRef()
    componentDidMount() {
        let useCook = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        if (useCook) {
        let useCooki = useCook[0].split('=')
        let useCookie = useCooki[1]
        let userId = localStorage.getItem('userId')
        let obj = {"userId": userId}
        setTimeout(() => {
        fetch('https://multer-test123.herokuapp.com/getScheduled', {
            headers: {
                'Authorization': `Bearer ${useCookie}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
            method: 'POST'
        })
        .then(res => res.json())
        .then(async res => {
            let data = res.Success;
            let arrayPast = new Array;
            let arrayFuture = new Array;
            await data.map(x => {
                let name = x.data; let time = x.time;
                let currentTime = new Date().getTime()

                let object = {name, time}
                return fetch(x.location)
                .then(res => res.blob())
                .then(data => {
                    let reader = new FileReader();
                    reader.readAsDataURL(data)
                    reader.onloadend = function() {
                        var base64data = reader.result;      
                        let newObject = {...object, "img": base64data}     
                        if (currentTime > time) {     
                            arrayPast.push(newObject)
                        } else {
                            arrayFuture.push(newObject)
                        }
                    }
                })
            })
            setTimeout(() => {
                this.setState({futureUrls: arrayFuture})
                this.setState({pastUrls: arrayPast})
                this.setState({loading: false})
                this.forceUpdate()
            }, 1000)
        })
        }, 500)
        }
    }
    timeConverter(UNIX_timestamp){
        var a = new Date(Number(UNIX_timestamp));
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();

        console.log('HOUR, MINS:', hour, Number(min) < 10)
        var longDate = date + ' ' + month + ' ' + year;
        let minSection = (Number(min) < 10) ? "0" + String(min) : min
        let shortDate = hour + ':' + minSection;
        return (
            <div className="timings">
            <span><span className="bold">Date:</span> <br></br> {longDate} </span> 
            <span><span className="bold">Time:</span> <br></br> {shortDate} </span>
            </div>
        )
      }
      toggle = () => {
          //set small loader and disable btn
          this.setState((prev) => ({
            btnDisabled: true,
            smallLoader: true
          }))
          setTimeout(() => {
          this.setState((prev) => ({
            pastShowing: !prev.pastShowing,
          }))
          }, 500)
          //remove small loader
          setTimeout(() => {
            this.setState((prev) => ({
                btnDisabled: false,
                smallLoader: false
            }))
          }, 1000)
      }
    render() {
        let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let userId = document.cookie.match(new RegExp('(^| )' + 'userId' + '=([^;]+)'));
        let access = document.cookie.match(new RegExp('(^| )' + 'access' + '=([^;]+)'));
        
        if (cookie && userId) {
        const {pastUrls, smallLoader, futureUrls, btnDisabled, pastShowing, loading} = this.state;
        return (
            <React.Fragment>
            <div class="widthTotal" ref={this.refOne}>
            
            <div className="scheduled">
                <h1>Scheduled posts</h1>
                <Loader top={50 + "px"} left={-150 + "px"} color="fontD" scale={2} conditions={loading === true} overlay={false} />
                {!loading &&
                <div className="btns">
                    {!smallLoader ?
                        <button 
                        disbaled={btnDisabled ? true : false}
                        onClick={this.toggle}
                        >{pastShowing ? "View Scheduled Posts" : "View Past Posts"}</button>
                        
                        : <div className="loadingBtnText">Loading...</div>
                    }
                </div>
                }
                
                
                <div className="flex">
                {pastShowing === true && loading === false && pastUrls.length !== 0 && (
                    pastUrls.map((x, i) => {
                        if (i === pastUrls.length - 1) {
                            console.log('PAST URL MAP here')
                        }
                      return (
                          <div key={i} className="item">
                              {/* <img style={{width: 180, height: 180}} src={x.img} /> */}
                              <div style={{backgroundImage: "url(" + x.img + ")"}} class="img"></div>
                              {this.timeConverter(x.time)}
                          </div>
                      )
                    })
                )}
                {pastShowing === true && loading === false && pastUrls.length === 0 && (
                    <div className="noDisplay">There are no past posts to display.</div>
                )}
                {pastShowing === false && loading === false && futureUrls.length === 0 && (
                    <div className="noDisplay">There are no scheduled posts to display.</div>
                )}

                {pastShowing === false && loading === false && futureUrls.length !== 0 && (
                    futureUrls.map((x, i) => {
                      return (
                          <div key={i} id={i%3 === 0 ? i%2 === 0 ? 'purple' : 'yellow' : 'blue'} className="item">
                              <img style={{width: 180, height: 180}} src={x.img} />
                              {this.timeConverter(x.time)}
                          </div>
                      )
                    })
                )}
                </div>
                <SideBar parent={this.refOne} />
            </div>
            </div>
            </React.Fragment>
        )
    } else {
        return <ErrorPage />
    }
    }
}

export default connect((state) => ({
    
}))(Schedule);