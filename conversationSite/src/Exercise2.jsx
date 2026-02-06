import { useState } from 'react';
import List from './Components/List';
import Conversation from './Components/Conversation';

const Exercise2 = () => {
    const [displayConversation, setDisplayConversation] = useState(null);
    const [conversations] = useState([
        {
            with: "Laura", convo: [
                { text: "Hi", sender: "self" },
                { text: "You there?", sender: "self" },
                { text: "Yeah, hi, what's up?", sender: "other" }
            ]
        },
        {
            with: "Dad", convo: [
                { text: "Have you finished your school work yet?", sender: "other" },
                { text: "Yes.", sender: "self" },
                { text: "What do you mean, yes?", sender: "other" },
                { text: "??", sender: "self" }
            ]
        },
        {
            with: "Shoobert", convo: [
                { text: "Shoobert!!!", sender: "self" },
                { text: "Dude!!!!!!!!", sender: "other" },
                { text: "Shooooooooo BERT!", sender: "self" },
                { text: "You're my best friend", sender: "other" },
                { text: "No, *you're* my best friend", sender: "self" },
            ]
        }
    ]);

    const displayConvo = (name) => {
        setDisplayConversation(name);
    };

    const resetDisplay = () => {
        setDisplayConversation(null);
    }

    const activeConversation = displayConversation
        ? conversations.find(c => c.with === displayConversation)
        : null;

    return (
        <div className="app">
            {displayConversation === null ? (
                <List
                    contacts={conversations.map(c => c.with)}
                    selectContact={displayConvo}
                />
            ) : (
                <Conversation
                    convo={activeConversation.convo}
                    sender={displayConversation}
                    goBack={resetDisplay}
                />
            )}
        </div>
    );
};

export default Exercise2;