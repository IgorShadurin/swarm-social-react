import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Navigation.css';
import {Link} from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <nav className="Navigation navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="./">
                    <strong>beefree</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03"
                        aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                        {/*<li className="nav-item active">
                            <Link className="nav-link" to="./">Home <span className="sr-only">(current)</span></Link>
                        </li>*/}
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
                            <Link className="nav-link" to="./settings">
                                <FontAwesomeIcon icon="cog"/>
                            </Link>
                        </li>
                    </ul>
                    {/*<form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               aria-label="Search"/>
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                    </form>*/}
                </div>
            </nav>
        );
    }
}

export default Navigation;