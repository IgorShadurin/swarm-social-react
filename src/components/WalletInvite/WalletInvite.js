import React, {Component} from 'react';
import './WalletInvite.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";

class WalletInvite extends Component {

    onCreateInvite = () => {
        const {createInvite} = this.props;
        createInvite();
    };

    render() {

        return (
            <div className="follows-block _block">
                <div className="header-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="block-name">
                                    <p>
                                        <i className="fas fa-users"/>
                                        Invites
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="btn-wrap">
                                    <button className="btn btn-beefree" onClick={this.onCreateInvite}>Create invite
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="items-wrap">


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.social.user,
});

export default connect(mapStateToProps, actions)(WalletInvite);