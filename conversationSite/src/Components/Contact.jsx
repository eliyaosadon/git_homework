import React from 'react';

const Contact = (props) => {
    return (
        <div className="contact-card" onClick={() => props.selectContact(props.name)}>
            {props.name}
        </div>
    );
};

export default Contact;