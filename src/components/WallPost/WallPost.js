import React, {Component} from 'react';
import './WallPost.css';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import User from "../../Beefree/User";
import * as actions from "../../store/social/actions";

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

    render() {
        //console.log(this.props);
        const {user, item} = this.props;
        const fullName = User.getFullName(user);
        const avatar = User.getAvatar(user);

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="post-header">
                                <div className="l-side">
                                    <div className="avatar-wrap">
                                        <img src={avatar} alt=""/>
                                    </div>
                                    <div className="info-wrap">
                                        <a href="#">
                                            <p className="name">
                                                {fullName}
                                            </p>
                                            <p className="date">
                                                Yesterday - 13:55
                                            </p>
                                        </a>
                                    </div>
                                </div>
                                <div className="r-side">
                                    <div className="btns-wrap">
                                        <a href="#" onClick={(e) => this.onEditPost(e, item.id)}>
                                            <i className="far fa-edit"/>
                                        </a>
                                        <a href="#" onClick={(e) => this.onDeletePost(e, item.id)}>
                                            <i className="far fa-times-circle"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="post-content">
                                {item.description.split('\n').map((item, i) => {
                                    return <p key={i}>{item}</p>;
                                })}
                            </div>
                            <div className="post-end">
                                <div className="likes-wrap">
                                    <a className="like" href="#" onClick={(e) => this.onLike(e, item.id)}>
                                        <i className="fas fa-thumbs-up"/> <span>0</span>
                                    </a>
                                    <a className="dislike" href="#" onClick={(e) => this.onDislike(e, item.id)}>
                                        <i className="fas fa-thumbs-down"/> <span>0</span>
                                    </a>
                                </div>
                                <div className="share-wrap">
                                    <a href="#" onClick={(e) => this.onShare(e, item.id)}>
                                        Share <i className="fas fa-retweet"/>
                                    </a>
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
    user: state.social.user
});

export default connect(mapStateToProps, actions)(WallPost);