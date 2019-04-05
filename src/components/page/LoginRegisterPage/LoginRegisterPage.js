import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import './LoginRegisterPage.css';

class LoginRegisterPage extends Component {
    constructor() {
        super();
        this.state = {
            onAuth: false,
            page: 'login'
        };
    }

    getNavClasses = (isActive) => {
        return `btn nav-item nav-link ${isActive ? 'active' : ''}`;
    };

    setPage(e, page) {
        e.preventDefault();
        this.setState({page});
    }

    render() {
        const {auth, redirect, onAuth} = this.props;
        if (auth.isAuthenticated) {
            return redirect;
        }

        let page = <Fragment>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Login</label>
                <input type="text" className="form-control"
                       aria-describedby="emailHelp" placeholder="Login"/>

            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="text" className="form-control"
                       placeholder="Password"/>
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
                    <input type="text" className="form-control"
                           aria-describedby="emailHelp" placeholder="Invite"/>

                </div>
                <div className="form-group">
                    <label>Your nickname</label>
                    <input type="text" className="form-control"
                           aria-describedby="emailHelp" placeholder="Your nickname"/>

                </div>

                <button type="submit" className="btn btn-primary">Create account</button>
            </Fragment>;
        }

        return (
            <Fragment>
                <div className="d-flex justify-content-center">
                    <form>
                        <nav className="nav nav-pills nav-justified">
                            <button className={this.getNavClasses(this.state.page === 'login')}
                                    onClick={(e) => this.setPage(e, 'login')}>Login
                            </button>
                            <button className={this.getNavClasses(this.state.page === 'registration')}
                                    onClick={(e) => this.setPage(e, 'registration')}>Registration
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
    user: state.social.user
});

export default connect(mapStateToProps)(LoginRegisterPage);