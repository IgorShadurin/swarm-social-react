import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './WallPost.css';

class WallPost extends Component {
    render() {
        return (
            <div>
                WallPost here - {this.props.item}
            </div>
        );
    }
}

export default WallPost;