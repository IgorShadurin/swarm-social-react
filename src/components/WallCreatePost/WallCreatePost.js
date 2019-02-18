import React, {Component} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './WallCreatePost.css';
import avatar from '../../img/423.jpg'
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";


class WallCreatePost extends Component {
    constructor() {
        super();

        this.state = {
            text: '',
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

    render() {
        const {isWallPosting} = this.props;

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
                            <textarea name="" id="" cols="" rows="2" placeholder="Create a post..."
                                      onChange={this.onChange}
                                      value={this.state.text}/>
                        </div>
                        <div className="btns-wrap">
                            <div className="btns">
                                {/*<a href="">
                                    <i className="fas fa-images"/>
                                </a>*/}
                                {/*<a href="">
                                    <i className="fas fa-video"/>
                                </a>*/}
                                <button
                                    className="btn btn-primary"
                                    disabled={isWallPosting}
                                    onClick={() => this.onPost()}>
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isWallPosting: state.social.isWallPosting
});

export default connect(mapStateToProps, actions)(WallCreatePost);