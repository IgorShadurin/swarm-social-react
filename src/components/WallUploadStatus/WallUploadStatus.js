import React, {Component} from 'react';
import './WallUploadStatus.css';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../store/social/actions";

class WallUploadStatus extends Component {
    onCancelUploading = (id) => {
        console.log('cancel uploading: ' + id);
    };

    render() {
        const {item} = this.props;
        let result = null;
        const style = {
            width: `${item.progressPercent}%`
        };
        const isComplete = item.isComplete;
        if (isComplete) {
            result = item.preview ? <div><img src={item.preview} alt="Preview"/></div> : <div>Complete!</div>;
        } else {
            result = <div>
                <span className="WallUploadStatus-name">
                    <i className="far fa-times-circle cursor-pointer"
                       onClick={() => this.onCancelUploading(item.id)}/> {item.name}
                </span>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         style={style} aria-valuenow={item.progressPercent}
                         aria-valuemin="0" aria-valuemax="100">
                        {item.progressPercent}%
                    </div>
                </div>
            </div>
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
    user: state.social.user,

});

export default connect(mapStateToProps, actions)(WallUploadStatus);