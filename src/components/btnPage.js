import React from "react";

class BtnPage extends React.Component {
    state = {}
    componentDidMount()  {
        //REQUEST HERE FOR USERS NAME
    }
    render() {
        const {name} = this.state;
        return (
            <React.Fragment>
                <div class="btnPage">
                    <span className="btnPageName">Welcome {name}</span>
                    <span className="btnPageInfo">Please authorize your login with facebook by clicking the button below.  Enter information here about privacy policy, needs to be longer. </span>
                    <a 
                    className="btnPageLink" 
                    href="https://multer-test123.herokuapp.com/fbAuth"
                    >
                        Continue With Facebook
                    </a>
                </div>
            </React.Fragment>
        )
    }
}

export default BtnPage;