import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import * as actions from "../../../store/social/actions";
import './LoginRegisterPage.css';

class LoginRegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onAuth: false,
            page: props.invite ? 'registration' : 'login',
            password: '',
            invite: props.invite,
            username: ''
        };
    }

    onLogin = (e) => {
        e.preventDefault();
        const {login} = this.props;
        if (!this.state.username || !this.state.password) {
            alert('Empty login or password');
        }

        login(this.state.username, this.state.password);
    };

    onChangeUsername = (e) => {
        let username = e.target.value.trim().toLowerCase();
        let allowedChars = [...'zaqxswcdevfrbgtnhymjukliop0987654321.-'];
        username = [...username].filter(item => allowedChars.filter(allowed => allowed === item).length > 0).join('');
        if (username.length > 20) {
            username = username.substring(0, 20);
        }

        this.setState({username});
    };

    onChange = (e) => {
        this.setState({
            [e.target.dataset.field]: e.target.value
        });
    };

    onCreateAccount = (e) => {
        e.preventDefault();
        const {registerUser, isRegistration} = this.props;

        if (!this.state.invite || !this.state.username || !this.state.password) {
            alert('Please, enter invite, username and password');
            return;
        }

        if (isRegistration) {
            alert('Registration in progress. Please, wait.');

            return;
        }

        registerUser(this.state.invite, this.state.username, this.state.password);
    };

    getNavClasses = (isActive) => {
        return `btn nav-item nav-link ${isActive ? 'active' : ''}`;
    };

    setPage(e, page) {
        e.preventDefault();
        this.setState({page});
    }

    render() {
        const {auth, redirect, isRegistration, isLogin, loginError, registrationError} = this.props;
        if (auth.isValid) {
            return redirect;
        }

        let page = <Fragment>
            {loginError && <div className="alert alert-danger" role="alert">
                {loginError}
            </div>}

            <div className="form-group">
                <label>Username</label>
                <input type="text"
                       disabled={isLogin}
                       className="form-control"
                       placeholder="Username"
                       onChange={this.onChangeUsername}
                       data-field="username"
                       value={this.state.username}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password"
                       disabled={isLogin}
                       className="form-control"
                       placeholder="Password"
                       onChange={this.onChange}
                       data-field="password"
                       value={this.state.password}/>
            </div>

            {isLogin ? (
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                        &nbsp;Login...
                    </button>
                ) :
                (
                    <button type="submit" className="btn btn-primary" onClick={this.onLogin}>Login</button>
                )
            }

            {/*<button className="btn btn-link"
                    onClick={() => auth.authenticate().then(onAuth)}>
                Skip (go to Demo)
            </button>*/}
        </Fragment>;
        if (this.state.page === 'registration') {
            page = <Fragment>
                {registrationError && <div className="alert alert-danger" role="alert">
                    {registrationError}
                </div>}

                <div className="form-group">
                    <label>Invite</label>
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
                        onChange={this.onChangeUsername}
                        data-field="username"
                        value={this.state.username}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        disabled={isRegistration}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.onChange}
                        data-field="password"
                        value={this.state.password}/>
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
                <div className="d-flex justify-content-center LoginRegisterPage-form">
                    <form className="col-sm-4">
                        <nav className="nav nav-pills nav-justified">
                            <button
                                disabled={isRegistration || isLogin}
                                className={this.getNavClasses(this.state.page === 'login')}
                                onClick={(e) => this.setPage(e, 'login')}>
                                Login
                            </button>
                            <button
                                disabled={isRegistration || isLogin}
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
    isRegistration: state.social.isRegistration,
    registrationError: state.social.registrationError,
    loginError: state.social.loginError,
    isLogin: state.social.isLogin,
    auth: state.social.auth
});

export default connect(mapStateToProps, actions)(LoginRegisterPage);