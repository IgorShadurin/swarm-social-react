import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Wall.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";

import PropTypes from "prop-types";
import WallCreatePost from "../WallCreatePost";
import WallPost from "../WallPost";
import avatar from '../../img/423.jpg'


class Wall extends Component {

    render() {
        const {createWallPost, wallPosts} = this.props;
        //console.log(this.props);
        let posts = <p>Wall is empty</p>;
        if (wallPosts.length) {
            posts = wallPosts.map((item) => <WallPost key={item.id} item={item}/>);
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
                            {false && <div className="more-btn">
                                <a href="">Show more</a>
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
    createWallPost: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    wallPosts: state.social.wallPosts
});

export default connect(mapStateToProps, actions)(Wall);