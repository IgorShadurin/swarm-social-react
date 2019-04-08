import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import * as actions from "../../../store/social/actions";
import './LoginRegisterPage.css';

class LoginRegisterPage extends Component {
    constructor(props) {
        super();
        this.state = {
            onAuth: false,
            page: 'registration',
            password: '',
            invite: props.auth.hash,
            username: ''
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.dataset.field]: e.target.value
        });
    };

    onCreateAccount = (e) => {
        e.preventDefault();
        const {registerUser, isRegistration} = this.props;

        if (isRegistration) {
            alert('Registration in progress. Please, wait.');

            return;
        }

        registerUser(this.state.invite, this.state.username);
    };

    getNavClasses = (isActive) => {
        return `btn nav-item nav-link ${isActive ? 'active' : ''}`;
    };

    setPage(e, page) {
        e.preventDefault();
        this.setState({page});
    }

    render() {
        const {auth, redirect, onAuth, isRegistration} = this.props;
        if (auth.isAuthenticated) {
            return redirect;
        }

        let page = <Fragment>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text"
                       className="form-control"
                       aria-describedby="emailHelp"
                       placeholder="Username"
                       onChange={this.onChange}
                       data-field="username"
                       value={this.state.username}
                />

            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="text"
                       className="form-control"
                       placeholder="Password"
                       onChange={this.onChange}
                       data-field="password"
                       value={this.state.password}/>
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
            <button className="btn btn-link"
                    onClick={() => auth.authenticate().then(onAuth)}>
                Skip (go to Demo)
            </button>
        </Fragment>;
        if (this.state.page === 'registration') {
            page = <Fragment>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Invite</label>
                    <input
                        disabled={isRegistration}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Invite"
                        onChange={this.onChange}
                        data-field="invite"
                        value={this.state.invite}
                    />

                </div>
                <div className="form-group">
                    <label>Your username</label>
                    <input
                        disabled={isRegistration}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Your username"
                        onChange={this.onChange}
                        data-field="username"
                        value={this.state.username}/>

                </div>

                {isRegistration ? (<button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                        &nbsp;Creating account...
                    </button>) :
                    (<button type="submit" className="btn btn-primary" onClick={this.onCreateAccount}>
                        Create account
                    </button>)}
            </Fragment>;
        }

        return (
            <Fragment>
                <div className="d-flex justify-content-center">
                    <form>
                        <nav className="nav nav-pills nav-justified">
                            <button
                                disabled={isRegistration}
                                className={this.getNavClasses(this.state.page === 'login')}
                                onClick={(e) => this.setPage(e, 'login')}>
                                Login
                            </button>
                            <button
                                disabled={isRegistration}
                                className={this.getNavClasses(this.state.page === 'registration')}
                                onClick={(e) => this.setPage(e, 'registration')}>
                                Registration
                            </button>
                        </nav>
                        <br/>
                        {page}
                    </form>
                </div>
            </Fragment>
        );
    }
}

/*UserPage.propTypes = {
    user: PropTypes.shape({
        first_name: PropTypes.string
    }),
    getUser: PropTypes.func.isRequired,
};*/

const mapStateToProps = state => ({
    user: state.social.user,
    isRegistration: state.social.isRegistration
});

export default connect(mapStateToProps, actions)(LoginRegisterPage);