import React, {Component} from 'react';
import './Navigation.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import avatar from '../../img/423.jpg'
import User from "../../Beefree/User";
//import ObjectConstructor from "../../Beefree/ObjectConstructor";
//import logo from '../../img/logo.png'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Navigation extends Component {
    render() {
        const {user} = this.props;
        const fullName = User.getFullName(user);

        return (
            <nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Link className="nav-link" to="./">
                                <div className="logo-wrap">
                                    beefree
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="r-bar-wrap">
                                <div className="settings-wrap">
                                    <div className="msg _item new">
                                        <Link className="nav-link" to="./dialog">
                                            <i className="fas fa-comment"/>
                                        </Link>
                                    </div>
                                    <div className="wallet _item">
                                        <Link className="nav-link" to="./wallet">
                                            <i className="fas fa-wallet"/>
                                        </Link>
                                    </div>
                                    <div className="sett _item">
                                        <Link className="nav-link" to="./config">
                                            <i className="fas fa-cog"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="ac-info-wrap">
                                    <div className="info-wrap">
                                        <div className="name">
                                            <p>
                                                {user && fullName}
                                            </p>
                                        </div>
                                        <div className="balance">
                                            <p>
                                                ETH 2.6423
                                            </p>
                                        </div>
                                    </div>
                                    <div className="avatar-wrap">
                                        <div className="img-wrap">
                                            <img src={avatar} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    user: state.social.user
});

export default connect(mapStateToProps)(Navigation);