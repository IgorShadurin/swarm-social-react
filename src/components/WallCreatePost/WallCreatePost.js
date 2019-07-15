import React, {Component, Fragment} from 'react';
import './WallCreatePost.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import User from "../../Beefree/User";
import Image from "../../Beefree/Image";
import Video from "../../Beefree/Video";
import WallUploadStatus from "../WallUploadStatus/WallUploadStatus";

class WallCreatePost extends Component {
    constructor() {
        super();

        this.inputFile = React.createRef();
        this.uploadingFileId = 1;
        this.state = {
            text: '',
        };
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    isPostButtonDisabled = () => {
        const {isWallPosting, uploadStatus} = this.props;

        const isWallReady = !isWallPosting;
        const isUploaded = uploadStatus.filter(item => item.isComplete).length === uploadStatus.length && uploadStatus.length > 0;
        const isTextExists = this.state.text.length > 0;

        return !(isWallReady && (isTextExists || isUploaded));
    };

    onPost = (e) => {
        const {createWallPost, uploadStatus} = this.props;
        const uploads = uploadStatus.filter(item => item.isComplete);
        //console.log(uploads);
        const attachments = uploads.map((item, index) => {
            // todo get type from item
            //return new PostAttachment(item, PostAttachment.getKeys());
            return {
                file_id: item.data.id,
                type: item.data.type,
                order: index
            };
        });
        //console.log(attachments);
        createWallPost(this.state.text, attachments);
        this.setState({
            text: ''
        });
        alert('Post sent! Wait 10-30 minutes to complete transaction');
    };

    onUserClick = () => {
        console.log('user click');
    };

    attachFile = (accept, fileType) => {
        const {uploadUserFile} = this.props;
        const input = this.inputFile.current;
        input.value = null;
        input.onchange = () => {
            const files = this.inputFile.current.files;
            if (!files || !files.length) {
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                uploadUserFile(this.uploadingFileId, file, fileType);
                this.uploadingFileId++;
            }
        };
        input.accept = accept;
        input.click();
    };

    attachVideo = () => {
        this.attachFile('video/*', Video);
    };

    attachImage = () => {
        this.attachFile('image/*', Image);
    };

    render() {
        const {user, uploadStatus} = this.props;
        const avatar = User.getAvatar(user);
        const uploadList = uploadStatus.map((item) => {
            return <WallUploadStatus key={item.internal_id}
                                     item={item}/>;
        });

        return (
            <Fragment>
                <div className="row new-post">
                    <div className="col-md-2">
                        <div className="avatar-wrap cursor-pointer" onClick={this.onUserClick}>
                            <img src={avatar} alt="Avatar"/>
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="new-post-field">
                            <div className="input-field">
                            <textarea rows="2" placeholder="Create a post..." onChange={this.onChange}
                                      value={this.state.text}/>
                            </div>
                            <div className="btns-wrap">
                                <div className="btns">
                                    {/*<i className="fas fa-images cursor-pointer WallCreatePost-attach"
                                       onClick={this.attachImage}/>
                                    <i className="fas fa-video cursor-pointer WallCreatePost-attach"
                                       onClick={this.attachVideo}/>*/}
                                    <button
                                        className="btn btn-primary"
                                        disabled={this.isPostButtonDisabled()}
                                        onClick={() => this.onPost()}>
                                        Post
                                    </button>
                                </div>
                                <input className="WallCreatePost-input" type="file" ref={this.inputFile}
                                       multiple={true}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md-10">
                        {uploadList}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isWallPosting: state.social.isWallPosting,
    user: state.social.user,
    uploadStatus: state.social.uploadStatus,
});

export default connect(mapStateToProps, actions)(WallCreatePost);
