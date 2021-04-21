import React from 'react';
import { FileDrop } from 'react-file-drop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faClipboard } from '@fortawesome/free-solid-svg-icons';

class DragDrop extends React.Component {
    state = {
        fileUpload: false
    }
    handleOpen = () => {
        this.setState((prev) => ({
            fileUpload: !prev.fileUpload
        }))
    }
    handleDrop = (files, event) => {
        console.log(files[0].type === 'image/jpeg')
        if ((files[0].type === 'image/jpeg')) {
            this.props.setImg(files[0])
        } else {
            //SET AN ALERT HERE
        }
    }
    fileInputRef = React.createRef();
    render() {
        const {hovered, preview, file} = this.props;
        const {fileUpload} = this.state;
        console.log(String(file.name).length > 12 )
        return (
            <React.Fragment>
                {!fileUpload && 
                <React.Fragment>
                <button 
                onClick={this.handleOpen}
                className="fileBox"><span style={{display: 'flex'}}>
                File upload
                {(file ? <FontAwesomeIcon style={{marginLeft: '5px', color: 'white', marginRight: '5px' }} icon={faCheckCircle} /> : <FontAwesomeIcon style={{marginLeft: '5px', color: 'white', marginRight: '5px' }} icon={faTimesCircle} />)}
                </span>
                </button>
                </React.Fragment>
                }
                {fileUpload && 
                    <React.Fragment>
                        <div className="overlayDrag">
                            <button 
                            onClick={this.handleOpen}
                            className="closeD"
                            >Close</button>
                            <div className="leftD">

                                <div className="dropzone">
                                    <h1 style={{fontWeight: 300}}>Drag Files Here</h1>
                                    <FontAwesomeIcon 
                                    style={{position: 'absolute', marginLeft: '140px', color: 'rgb(123, 66, 255, 0.6)', fontSize: '50px', marginTop: '190px'}}
                                    icon={faClipboard} />
                                    <FileDrop 
                                    onTargetClick={() => this.fileInputRef.current.click()}
                                    onDrop={(files, event) => this.handleDrop(files, event)} />
                                </div>
                            <input type="file" id="file" style={{display: "none"}} ref={this.fileInputRef} onChange={this.props.handleChangeImg} /> 

                            </div>
                            <div className="rightD">
                                <h1>Uploaded</h1>
                                {file &&
                                <div className="row">
                                    <div className="left">
                                        <img src={preview} />
                                    </div>
                                    <div className="rF">
                                        <div className="right">
                                            <span>{(String(file.name).length < 12) ? file.name : String(file.name).substring(0, 12) + '....'}</span>
                                            <span>{file.size}mb</span>
                                            <span
                                            onClick={this.props.clearImg}
                                            >X</span>
                                        </div>
                                        <div className="line"></div>
                                    </div>
                                </div>
                                }
                            </div>

                        </div>

                   </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default DragDrop;