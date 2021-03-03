import React from 'react';
import { connect } from 'react-redux';
import {testAPI, statusChange, login, loadFbApi, checkLoginState} from "../utils/helpers";

class Info extends React.Component {
    state = {
        impressions: new Array,
        reach: new Array,
    }
    componentDidMount() {
        let ac = this.props.access[0].split('?')[1]
        let obj = {'access_token': ac}
        let useCook = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
        let useCooki = useCook[0].split('=')
        let useCookie = useCooki[1]
        
        fetch('https://multer-test123.herokuapp.com/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${useCookie}`
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                impressions: data['TOKEN'].data[0].values,
                reach: data['TOKEN'].data[1].values,
            })
            this.props.setName(data['NAME'])
            setTimeout(() => {
                this.forceUpdate()
            }, 500)
        })
        .catch(err => console.log(err))


        fetch('https://multer-test123.herokuapp.com/recentPhotos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${useCookie}`
            },
            body: JSON.stringify(obj)
        }).then(res => res.json()).then(data => {
            console.log('INFO PHOTOS', data)
            this.props.setPhotos(data['OBJ'])
            this.props.setAvatar(data['OBJ'][0].url)
        })
    }
    render() {
        const {impressions,reach} = this.state;

        return (
            <React.Fragment>
                <div className="insights">
                <span style={{fontWeight: 500, fontSize: 20 + 'px'}}>Impressions in the last week:</span> 
                {impressions.length > 0 && (
                    <div className="flexMain">{impressions[0].value} views 
                    <span className="week">week ending {impressions[0].end_time}</span>
                    <span className="iBtn"><span className="left"></span><span className="right"></span></span>
                    </div>
                )}
                </div>
                <div className="insights">
                <span style={{fontWeight: 500, fontSize: 20 + 'px'}}>Reach in the last week:</span>
                {reach.length > 0 && (
                    <div className="flexMain">{reach[0].value} views 
                    <span className="week">week ending {reach[0].end_time}</span>
                    <span className="iBtn"><span className="left"></span><span className="right"></span></span>
                    </div>
                )}
                </div>
            </React.Fragment>
        )
    }
}

export default connect((state) => ({

}))(Info)