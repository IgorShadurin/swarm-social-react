import React, {Component} from 'react';
import './ImportData.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import User from "../../Beefree/User";

class ImportData extends Component {
    onUsernameClick = (e) => {
        e.preventDefault();
    };

    onImport = () => {
        alert('Not implemented');
    };

    render() {

        return (
            <div className="follows-block _block">
                <div className="header-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="block-name">
                                    <p>
                                        <i className="fas fa-user-check"/>
                                        Import data
                                    </p>
                                </div>
                            </div>
                            {/*<div className="col-md-4">
                                <div className="btn-wrap">
                                    <button className="btn btn-beefree" onClick={this.onBtnViewAll}>View all</button>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="items-wrap ImportData-buttons">

                                <button className="btn btn-outline-primary" onClick={this.onImport}>
                                    <i className="fab fa-instagram" aria-hidden="true"/> Instagram
                                </button>
                                <button className="btn btn-outline-primary" onClick={this.onImport}>
                                    <i className="fab fa-facebook" aria-hidden="true"/> Facebook
                                </button>

                                <button className="btn btn-outline-primary" onClick={this.onImport}>
                                    <i className="fab fa-google" aria-hidden="true"/> Google
                                </button>
                                <button className="btn btn-outline-primary" onClick={this.onImport}>
                                    <i className="fab fa-vk" aria-hidden="true"/> VK
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// todo move i_follow to state.social.i_follow
const mapStateToProps = state => ({
    user: state.social.user,
});

export default connect(mapStateToProps, actions)(ImportData);