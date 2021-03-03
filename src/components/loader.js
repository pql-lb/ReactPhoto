import React from 'react';
import dashboard from './dashboard';

class Loader extends React.Component {
    render() {
        const {conditions, overlay, scale, color, top, left} = this.props;

        if (!overlay) {
        return (
            <React.Fragment>
            {conditions === true &&
                <div style={{transform: `scale(${scale})`, marginLeft: left, marginTop: top}} className={`lds-defaultThree ${color}`}>
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            }
            </React.Fragment>
        )
        } else {
            return (
            <React.Fragment>
            {conditions === true &&
                <div className="dashboardBlurLoader">
                    <div className="dashboardLoader">
                        <div style={{transform: `scale(${scale})`, marginLeft: left, marginTop: top}} className={`lds-defaultThree ${color}`}>
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        </div>
                    </div>
                </div>
            }
            </React.Fragment>
            )
        }
    }
}

export default Loader;