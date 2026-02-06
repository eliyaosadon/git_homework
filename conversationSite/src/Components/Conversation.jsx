import React from 'react';

const Conversation = (props) => {
    return (
        <div className="conversation">
            <button className="back" onClick={props.goBack}>Back</button>

            <h2>Conversation with {props.sender}</h2>

            <div className="messages">
                {props.convo.map((msg, index) => {
                    return (
                        <div key={index}>
                            <span className="sender">
                                {msg.sender === "self" ? "Me" : props.sender}:
                            </span>
                            "{msg.text}"
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Conversation;