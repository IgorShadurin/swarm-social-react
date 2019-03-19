import React, {Component} from 'react';
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
        const foundPreviews = previews.filter(preview => preview.file_id == item.file_id);

        if (foundPreviews.length === 0) {
            getImagePreviewUrl(item.file_id);
        }
    }

    render() {
        const {item, previews} = this.props;
        console.log(this.props);
        const foundPreviews = previews.filter(preview => preview.file_id == item.file_id);
        if (foundPreviews.length > 0) {
            return <div><img className="WallPost-attachment WallPost-attachment-image" src={foundPreviews[0].preview}
                             alt="Preview"/></div>;
        } else {
            return <span/>;
        }
    }
}

class WallPost extends Component {
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

    onEditPost = (e, id) => {
        e.preventDefault();
        console.log(id);
    };

    onPostClick = (e) => {
        console.log('post click');

    };

    onUserClick = (e) => {
        console.log('user click');
    };

    render() {
        const {user, item, getImagePreviewUrl, previews} = this.props;
        const fullName = User.getFullName(user);
        const avatar = User.getAvatar(user);
        const itemDate = item.created_at ? new Date(item.created_at) : null;

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
                                        <i className="far fa-edit cursor-pointer"
                                           onClick={(e) => this.onEditPost(e, item.id)}/>&nbsp;
                                        <i className="far fa-times-circle cursor-pointer"
                                           onClick={(e) => this.onDeletePost(e, item.id)}/>

                                    </div>
                                </div>
                            </div>
                            <div className="post-content">
                                {item.description.split('\n').map((item, i) => {
                                    return <p key={i}>{item}</p>;
                                })}
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
                                        <i className="fas fa-thumbs-up"/> <span>0</span>
                                    </span>
                                    <span className="dislike cursor-pointer"
                                          onClick={(e) => this.onDislike(e, item.id)}>
                                        <i className="fas fa-thumbs-down"/> <span>0</span>
                                    </span>
                                </div>
                                <div className="share-wrap cursor-pointer">
                                    <span onClick={(e) => this.onShare(e, item.id)}>
                                        Share <i className="fas fa-retweet"/>
                                    </span>
                                </div>
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
});

export default connect(mapStateToProps, actions)(WallPost);