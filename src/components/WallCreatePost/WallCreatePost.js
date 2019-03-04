import React, {Component, Fragment} from 'react';
import './WallCreatePost.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import User from "../../Beefree/User";
import Image from "../../Beefree/Image";
import Video from "../../Beefree/Video";
import UploadStatus from '../WallUploadStatus'
import WallUploadStatus from "../WallUploadStatus/WallUploadStatus";

class WallCreatePost extends Component {
    constructor() {
        super();

        this.inputFile = React.createRef();
        this.state = {
            text: '',
            uploadList: [
                <WallUploadStatus key={1}
                                  item={{
                                      id: 111,
                                      progressPercent: 0,
                                      name: 'hello.jpg',
                                      preview: '',
                                      isComplete: false
                                  }}/>,
                <WallUploadStatus key={2}
                                  item={{
                                      id: 222,
                                      progressPercent: 10,
                                      name: 'hello 2.jpg',
                                      preview: '',
                                      isComplete: false
                                  }}/>,
                <WallUploadStatus key={3}
                                  item={{
                                      id: 333,
                                      progressPercent: 100,
                                      name: '333 hello.jpg',
                                      preview: '',
                                      isComplete: false
                                  }}/>,
            ]
        };
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    onPost = (e) => {
        const {createWallPost} = this.props;
        createWallPost({description: this.state.text});
        this.setState({
            text: ''
        });
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
                uploadUserFile(file, fileType);
                this.setState(prevState => ({
                    uploadList: [...prevState.uploadList, new UploadStatus('random', 0, file.name)]
                }));
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
        const {isWallPosting, user} = this.props;
        const {uploadList} = this.state;
        const avatar = User.getAvatar(user);

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
                                    <i className="fas fa-images cursor-pointer WallCreatePost-attach"
                                       onClick={this.attachImage}/>
                                    <i className="fas fa-video cursor-pointer WallCreatePost-attach"
                                       onClick={this.attachVideo}/>
                                    <button
                                        className="btn btn-primary"
                                        disabled={isWallPosting || this.state.text.length === 0}
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
                {/*<div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md-10">
                        {uploadList}
                    </div>
                </div>*/}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isWallPosting: state.social.isWallPosting,
    user: state.social.user
});

export default connect(mapStateToProps, actions)(WallCreatePost);