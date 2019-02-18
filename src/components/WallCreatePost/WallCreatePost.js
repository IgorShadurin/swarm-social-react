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
            isPosting: false
        };
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    /*onPost = (e) => {
        const {createWallPost} = this.props;
        console.log(createWallPost);
    };*/

    render() {
        //{/*<button onClick={() => createWallPost({description: 'Lol, created'})}>Create wall post</button>*/}
        const {createWallPost} = this.props;
        console.log(createWallPost);

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
                                      value={this.state.value}/>
                        </div>
                        <div className="btns-wrap">
                            <div className="btns">
                                {/*<a href="">
                                    <i className="fas fa-images"/>
                                </a>*/}
                                {/*<a href="">
                                    <i className="fas fa-video"/>
                                </a>*/}
                                <button className="btn btn-primary"
                                        onClick={() => createWallPost({description: this.state.text})}>
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
    //wallPosts: state.social.wallPosts
});

//export default WallCreatePost;
export default connect(mapStateToProps, actions)(WallCreatePost);