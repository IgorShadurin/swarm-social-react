import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Navigation.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import logo from '../../img/logo.png'
import avatar from '../../img/423.jpg'
import ObjectConstructor from "../../Beefree/ObjectConstructor";
import User from "../../Beefree/User";

class Navigation extends Component {
    render() {
        /*<nav className="Navigation navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="./">
                    <strong>beefree</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03"
                        aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="./dialog">
                                <FontAwesomeIcon icon="comment"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="./wallet">
                                <FontAwesomeIcon icon="wallet"/>

                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="./config">
                                <FontAwesomeIcon icon="cog"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>*/
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
                                            <i className="fas fa-comment"></i>
                                        </Link>
                                    </div>
                                    <div className="wallet _item">
                                        <Link className="nav-link" to="./wallet">
                                            <i className="fas fa-wallet"></i>
                                        </Link>
                                    </div>
                                    <div className="sett _item">
                                        <Link className="nav-link" to="./config">
                                            <i className="fas fa-cog"></i>
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

//export default Navigation;
const mapStateToProps = state => ({
    user: state.social.user
});

export default connect(mapStateToProps)(Navigation);