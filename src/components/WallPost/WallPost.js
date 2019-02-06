import React, {Component} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './WallPost.css';
import {connect} from "react-redux";
//import {createWallPost} from "../../store/social/actions";
import PropTypes from "prop-types";

class WallPost extends Component {
    render() {
        return (
            <div>
                WallPost here - {this.props.item.description}
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

/*const mapStateToProps = state => ({
    item: this.props.item
});

const mapDispatchToProps = dispatch => ({
    createWallPost: () => dispatch(createWallPost()),
});*/

//export default connect(mapStateToProps, mapDispatchToProps)(WallPost);
export default connect()(WallPost);
