import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import './WalletPage.css';
import WalletInvite from "../../WalletInvite/WalletInvite";

class WalletPage extends Component {
    render() {
        const {auth, balance} = this.props;

        return (
            <Fragment>
                {/*<WalletInvite/>*/}

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">My Address</label>
                    <input type="text"
                           className="form-control"
                           placeholder="Address"
                           value={auth.address}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">My Balance (ETH)</label>
                    <input type="text"
                           className="form-control"
                           placeholder="Balance"
                           value={balance ? balance : '...'}/>
                </div>
                {auth.walletHash && <a className="btn btn-link" target="_blank"
                                       href={`http://beefree.me/bzz:/${auth.walletHash}`}>My wallet file</a>}
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
    auth: state.social.auth,
    balance: state.social.balance,
});

//export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
export default connect(mapStateToProps)(WalletPage);