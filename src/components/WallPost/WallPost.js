import React, {Component, Fragment} from 'react';
import './WallPost.css';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import User from "../../Beefree/User";
import * as actions from "../../store/social/actions";
import date from "date-and-time";

class WallAttachmentImage extends Component {
    constructor(props) {
        super(props);
        const {item, getImagePreviewUrl, previews} = props;
        const foundPreviews = previews.filter(preview => Number(preview.file_id) === Number(item.file_id));

        if (foundPreviews.length === 0) {
            getImagePreviewUrl(item.file_id);
        }
    }

    render() {
        const {item, previews} = this.props;
        const foundPreviews = previews.filter(preview => Number(preview.file_id) === Number(item.file_id));
        if (foundPreviews.length > 0) {
            return <div><img className="WallPost-attachment WallPost-attachment-image" src={foundPreviews[0].preview}
                             alt="Preview"/></div>;
        } else {
            return <span/>;
        }
    }
}

class WallPost extends Component {
    constructor() {
        super();
        this.state = {
            isEdit: false,
            editPost: {}
        };
    }

    onLike = (e, id) => {
        e.preventDefault();
        //console.log(id);
        // todo move content type to consts
        this.props.doLike('post', id);
    };

    onDislike = (e, id) => {
        e.preventDefault();
        //console.log(id);
        // todo move content type to constsl
        this.props.doDislike('post', id);
    };

    onShare = (e, id) => {
        e.preventDefault();
        console.log(id);
    };

    onDeletePost = (e, id) => {
        e.preventDefault();
        const {deleteWallPost} = this.props;
        if (window.confirm('Really delete?')) {
            deleteWallPost(id);
        }
    };

    onEditPost = (e, item) => {
        e.preventDefault();
        this.setState({
            isEdit: !this.state.isEdit,
            editPost: item
        });
    };

    onPostClick = (e) => {
        console.log('post click');

    };

    onUserClick = (e) => {
        console.log('user click');
    };

    onChangePostText = (e) => {
        const editPost = {...this.state.editPost, description: e.target.value};
        this.setState({
            editPost
        });
    };

    onSavePost = () => {
        const {updateWallPost} = this.props;

        this.setState({
            isEdit: false
        });

        //console.log(this.state.editPost);
        updateWallPost(this.state.editPost.id, this.state.editPost);
    };

    render() {
        const {user, item, getImagePreviewUrl, previews, username} = this.props;
        //const fullName = User.getFullName(user);
        const fullName = User.getUsername(username);
        const avatar = User.getAvatar(user);
        const itemDate = item.created_at ? new Date(item.created_at) : null;
        const descriptionText = item.description.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="post-header">
                                <div className="l-side">
                                    <div className="avatar-wrap cursor-pointer" onClick={this.onUserClick}>
                                        <img src={avatar} alt=""/>
                                    </div>
                                    <div className="info-wrap">
                                        <p className="name cursor-pointer" onClick={this.onUserClick}>
                                            {fullName}
                                        </p>
                                        <p className="date cursor-pointer" onClick={this.onPostClick}>
                                            {itemDate ? date.format(itemDate, 'ddd MMM DD YYYY') : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="r-side">
                                    <div className="btns-wrap opacity-items">
                                        {/*<i className="far fa-edit cursor-pointer"
                                           onClick={(e) => this.onEditPost(e, item)}/>&nbsp;
                                        <i className="far fa-times-circle cursor-pointer"
                                           onClick={(e) => this.onDeletePost(e, item.id)}/>*/}

                                    </div>
                                </div>
                            </div>
                            <div className="post-content WallPost-post-content">
                                {!this.state.isEdit && descriptionText}
                                {this.state.isEdit &&
                                <Fragment>
                                    <div className="form-group">
                                    <textarea className="form-control WallPost-edit-area" rows="2"
                                              value={this.state.editPost.description} onChange={this.onChangePostText}/>
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.onSavePost}>
                                        Save
                                    </button>
                                </Fragment>}
                            </div>
                            <div className="WallPost-attachments">
                                {item.attachments && item.attachments.map((item, index) => {
                                    let result = null;
                                    if (item.type === 'image') {
                                        result = <WallAttachmentImage key={index} item={item}
                                                                      getImagePreviewUrl={getImagePreviewUrl}
                                                                      previews={previews}/>
                                    }

                                    return result;
                                })}
                            </div>
                            <div className="post-end">
                                <div className="likes-wrap">
                                    <span className="like cursor-pointer" onClick={(e) => this.onLike(e, item.id)}>
                                        <i className="fas fa-thumbs-up"/> {/*<span>0</span>*/} <span>+0.1 AR</span>
                                    </span>
                                </div>
                                {/*<div className="share-wrap cursor-pointer">
                                    <span onClick={(e) => this.onShare(e, item.id)}>
                                        Share <i className="fas fa-retweet"/>
                                    </span>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

WallPost.propTypes = {
    item: PropTypes.shape({
        text: PropTypes.string
    }),
    deleteWallPost: PropTypes.func.isRequired,
    doLike: PropTypes.func.isRequired,
    doDislike: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
    user: state.social.user,
    previews: state.social.previews,
    username: state.social.username,
});

export default connect(mapStateToProps, actions)(WallPost);
