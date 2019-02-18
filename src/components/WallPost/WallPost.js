import React, {Component} from 'react';
import './WallPost.css';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import avatar from '../../img/423.jpg'
import User from "../../Beefree/User";

class WallPost extends Component {
    render() {
        const {user} = this.props;
        const fullName = User.getFullName(user);

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
                                        <a href="">
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
                                        <a href="">
                                            <i className="far fa-edit"/>
                                        </a>
                                        <a href="">
                                            <i className="far fa-eye"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="post-content">
                                {this.props.item.description.split('\n').map((item, i) => {
                                    return <p key={i}>{item}</p>;
                                })}
                            </div>
                            <div className="post-end">
                                <div className="likes-wrap">
                                    <a className="like" href="">
                                        <i className="fas fa-thumbs-up"/> <span>9</span>
                                    </a>
                                    <a className="dislike" href="">
                                        <i className="fas fa-thumbs-down"/> <span>0</span>
                                    </a>
                                </div>
                                <div className="share-wrap">
                                    <a href="">
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
    //createWallPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.social.user
});

export default connect(mapStateToProps)(WallPost);