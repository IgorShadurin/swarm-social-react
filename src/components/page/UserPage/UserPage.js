import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux'
import './UserPage.css';
import UserFollowings from "../../UserFollowings";
import UserWallet from "../../UserWallet";
import Wall from "../../Wall";
import ImportData from "../../ImportData";

class UserPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.hash);
    }

    render() {
        console.log(this.props.match.params.hash);
        return (
            <Fragment>
                <div className="row">
                    <div className="col-lg-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-l-bar-wrap">

                                        {/*<ImportData/>*/}

                                        <UserFollowings/>

                                        {/*<UserWallet/>*/}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <Wall/>
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
export default connect(mapStateToProps)(UserPage);
