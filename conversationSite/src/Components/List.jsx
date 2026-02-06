import React from 'react';
import Contact from './Contact';

const List = (props) => {
    return (
        <div className="contact-list">
            <h2>Contacts</h2>
            {props.contacts.map((name, index) => {
                return (
                    <Contact
                        key={index}
                        name={name}
                        selectContact={props.selectContact}
                    />
                )
            })}
        </div>
    );
};

export default List;