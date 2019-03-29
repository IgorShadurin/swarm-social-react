import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import './WalletPage.css';
import WalletInvite from "../../WalletInvite/WalletInvite";

class WalletPage extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-l-bar-wrap">

                                        <WalletInvite/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">


                    </div>
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

//export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
export default connect(mapStateToProps)(WalletPage);