import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Wall.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";

import PropTypes from "prop-types";
import WallCreatePost from "../WallCreatePost";
import WallPost from "../WallPost";

class Wall extends Component {

    render() {
        //console.log(this.props);
        let posts = <p>Wall is empty</p>;
        if (this.props.wallPosts.length) {
            posts = this.props.wallPosts.map((item, index) => <WallPost key={index} item={item}/>);
        }

        return (
            <Fragment>
                <WallCreatePost/>
                <button onClick={this.props.createWallPost}>Create wall post</button>
                <button
                    onClick={() => this.props.loadWallPost(2, 'bba12829ba38e978bff9de0f07177fd8f1e124cbdcfb6b3303221dad74a9a5b4')}>Load
                    wall post
                </button>

                {posts}
            </Fragment>
        );
    }
}

Wall.propTypes = {
    wallPosts: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string
    })).isRequired,
    createWallPost: PropTypes.func.isRequired,
    loadWallPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    wallPosts: state.social.wallPosts
});

/*const mapDispatchToProps = dispatch => ({
    createWallPost: () => dispatch(createWallPost()),
});*/

export default connect(mapStateToProps, actions)(Wall);