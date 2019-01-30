import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Wall.css';
import {connect} from "react-redux";
import {createWallPost} from "../../store/social/actions";
import PropTypes from "prop-types";
import WallCreatePost from "../WallCreatePost";
import WallPost from "../WallPost";

class Wall extends Component {

    render() {
        let posts = <p>Wall is empty</p>;
        if (this.props.wallPosts.length) {
            posts = this.props.wallPosts.map((item, index) => <WallPost key={index} item={item}/>);
        }

        return (
            <Fragment>
                <WallCreatePost/>
                <button onClick={this.props.createWallPost}>Create wall post</button>

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
};

const mapStateToProps = state => ({
    wallPosts: state.social.wallPosts
});

const mapDispatchToProps = dispatch => ({
    createWallPost: () => dispatch(createWallPost()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
//export default connect()(Wall);
