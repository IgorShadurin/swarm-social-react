import React, {Component} from 'react';
import './WallUploadStatus.css';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/social/actions";

/*export class UploadStatus {
    constructor(id, progressPercent, name, preview = null, isComplete = false) {
        this.id = id;
        this.progressPercent = progressPercent;
        this.name = name;
        this.preview = preview;
        this.isComplete = isComplete;
    }
}*/

class WallUploadStatus extends Component {
    render() {
        const {item} = this.props;
        console.log(item);
        console.log(this.props);
        console.log(this.props.item);
        let result = null;
        if (item.isComplete) {
            // show preview
            result = <div>Complete!</div>;
        } else {
            result = <div>Progress bar here {item.progressPercent}. {item.name}</div>
        }

        return (
            <div className="WallUploadStatus">
                {result}
            </div>
        );
    }
}

/*WallUploadPost.propTypes = {
    item: PropTypes.shape({
        text: PropTypes.string
    }),
};*/

const mapStateToProps = state => ({
    user: state.social.user
});

export default connect(mapStateToProps, actions)(WallUploadStatus);