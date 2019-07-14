import React, {Component, Fragment, useEffect} from 'react';
import {Upload, Icon, message} from 'antd';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";

const {Dragger} = Upload;

class KeyUpload extends Component {
    handleKeyUpload = info => {
        const {setWallet} = this.props;
        console.log(info);
        const {status} = info.file;
        if (status === 'uploading') return;

        if (status === 'error') {
            console.log(info);
            return message.error(`${info.file.name} file upload failed.`);
        }

        const file = info.file.originFileObj;
        const filereader = new FileReader();

        filereader.addEventListener('loadend', async event => {
            try {
                const wallet = JSON.parse(event.target.result);
                await setWallet(wallet);
            } catch (e) {
                message.error(`Something went wrong please try again.`);
                console.log(e);
            }
        });

        filereader.readAsText(file);
    };

    fakeCustomRequest = ({_, onSuccess}) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    loadWallet = (isForce = false) => {
        const {setWallet} = this.props;
        const data = localStorage.getItem('wallet');
        if (data) {
            setWallet(JSON.parse(data));
        } else {
            if (!isForce) {
                alert('Storage is empty. Please, use file selector');
            }
        }
    };

    /* useEffect(() => {
         loadWallet(true);
     });*/

    render() {
        const {auth, redirect} = this.props;
        if (auth.isValid) {
            return redirect;
        }

        return (
            <Fragment>
                <Dragger
                    name="key-upload"
                    multiple={false}
                    onChange={this.handleKeyUpload}
                    customRequest={this.fakeCustomRequest} // this is a workaround, fake request which does nothing
                    accept="application/json"
                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox"/>
                    </p>
                    <p className="ant-upload-text">Drop a wallet keyfile to login</p>

                </Dragger>
                {/*<p className="ant-upload-text" onClick={_ => this.loadWallet(false)}>Load from localstorage</p>*/}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isWallPosting: state.social.isWallPosting,
    user: state.social.user,
    uploadStatus: state.social.uploadStatus,
});

export default connect(mapStateToProps, actions)(KeyUpload);
