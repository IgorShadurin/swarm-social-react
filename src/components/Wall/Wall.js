import React, {Component, Fragment} from 'react';
import './Wall.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import PropTypes from "prop-types";
import WallCreatePost from "../WallCreatePost";
import WallPost from "../WallPost";

class Wall extends Component {
    onShowMore = (e) => {
        e.preventDefault();
        console.log('Show more here');
    };

    render() {
        const {wallPosts, user, isInit} = this.props;
        //let posts = <p>Wall is empty</p>;
        let posts = '';
        if (wallPosts.length) {
            posts = wallPosts.map((item, index) => <WallPost key={index} item={item}/>);
        }

        return (
            <Fragment>
                <div className="container">
                    <WallCreatePost/>

                    <div className="row">
                        <div className="col-md-2"/>
                        <div className="col-md-10">
                            <div className="posts-wrap">
                                {posts}
                            </div>
                            {isInit && user && user.last_post_id > 10 && <div className="more-btn">
                                <button disabled={true} className="btn btn-beefree" onClick={this.onShowMore}>Show
                                    more
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Wall.propTypes = {
    wallPosts: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string
    })).isRequired,
    getPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    wallPosts: state.social.wallPosts,
    user: state.social.user,
    isInit: state.social.isInit
});

export default connect(mapStateToProps, actions)(Wall);
