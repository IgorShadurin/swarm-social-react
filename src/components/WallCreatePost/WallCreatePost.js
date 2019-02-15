import React, {Component} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './WallCreatePost.css';
import avatar from '../../img/423.jpg'


class WallCreatePost extends Component {
    render() {
        return (
            <div className="row new-post">
                <div className="col-md-2">
                    <div className="avatar-wrap">
                        <img src={avatar} alt=""/>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="new-post-field">
                        <div className="input-field">
                                            <textarea name="" id="" cols="" rows="1"
                                                      placeholder="Create a post..."/>
                        </div>
                        <div className="btns-wrap">
                            <div className="btns">
                                <a href="">
                                    <i className="fas fa-images"/>
                                </a>
                                <a href="">
                                    <i className="fas fa-video"/>
                                </a>
                                <a href="" className="post">
                                    Post
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WallCreatePost;