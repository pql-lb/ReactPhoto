import React from 'react';

//NOT AUTHORIZED ERROR PAGE
class ErrorPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="flexError">
                    <h1>You do not appear to be signed in, please sign in.</h1>
                    <a href="https://lbaker15.github.io/ReactPhoto/">Sign in here</a>
                </div>
            </React.Fragment>
        )
    }
}

export default ErrorPage;