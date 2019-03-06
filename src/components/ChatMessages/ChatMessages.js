import React, {Component} from 'react';
import './ChatMessages.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";

class ChatMessages extends Component {


    render() {
        const messages = [
            {
                user: 1,
                text: "Message 1 from 1"
            },
            {
                user: 1,
                text: "Message 2 from 1"
            },
            {
                user: 2,
                text: "Message 3 from 2"
            },
            {
                user: 2,
                text: "Message 4 from 2"
            },
            {
                user: 3,
                text: "Message 5 from 3"
            },
        ];
        const messageList = messages.map((item, index) => (
            (
                <div key={index} className="ChatMessages-message">
                    {item.text}
                </div>
            )
        ));

        return (
            <div className="ChatMessages-list">
                {messageList}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.social.user,
});

export default connect(mapStateToProps, actions)(ChatMessages);