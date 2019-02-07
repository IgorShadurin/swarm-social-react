import React, {Component} from 'react';
import './WallPost.css';
import {connect} from "react-redux";
import PropTypes from "prop-types";

class WallPost extends Component {
    render() {
        return (
            <div className="WallPost-item">
                {this.props.item.description.split('\n').map((item, i) => {
                    return <p key={i}>{item}</p>;
                })}
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

export default connect()(WallPost);
