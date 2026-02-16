import { createContext, useContext, useState, useEffect } from 'react';
import { getTweets, createTweet } from '../lib/api';

const TweetsContext = createContext();

export const useTweets = () => {
    const context = useContext(TweetsContext);
    if (!context) {
        throw new Error('useTweets must be used within TweetsProvider');
    }
    return context;
};

export const TweetsProvider = ({ children, userName }) => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadTweets = async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await getTweets();

        if (error) {
            setError('Failed to load tweets. Please try again.');
            console.error(error);
        } else {
            setTweets(data || []);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadTweets();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getTweets().then(({ data, error }) => {
                if (!error && data) {
                    setTweets(data);
                }
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const addTweet = async (content) => {
        setIsSubmitting(true);
        setError(null);

        const newTweet = {
            content: content,
            userName: userName,
            date: new Date().toISOString()
        };

        const optimisticTweet = {
            ...newTweet,
            id: Date.now().toString()
        };
        setTweets([optimisticTweet, ...tweets]);

        const { data, error } = await createTweet(newTweet);

        if (error) {
            setTweets(tweets.filter(t => t.id !== optimisticTweet.id));
            setError('Failed to post tweet. Please try again.');
            console.error(error);
        } else {
            setTweets(prevTweets =>
                prevTweets.map(t => t.id === optimisticTweet.id ? data : t)
            );
        }

        setIsSubmitting(false);
    };

    const clearError = () => setError(null);

    const value = {
        tweets,
        loading,
        error,
        isSubmitting,
        addTweet,
        clearError,
        refreshTweets: loadTweets
    };

    return (
        <TweetsContext.Provider value={value}>
            {children}
        </TweetsContext.Provider>
    );
};
