import { useState, useEffect } from 'react';
import TweetForm from './components/TweetForm';
import TweetList from './components/TweetList';
import { getTweets, createTweet } from './lib/api';
import './index.css';

function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userName = "Eliya";

  useEffect(() => {
    loadTweets();
  }, []);

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

  const addTweet = async (content) => {
    setIsSubmitting(true);
    setError(null);

    const newTweet = {
      content: content,
      userName: userName,
      date: new Date().toISOString()
    };

    const { data, error } = await createTweet(newTweet);

    if (error) {
      setError('Failed to post tweet. Please try again.');
      console.error(error);
    } else {
      setTweets([data, ...tweets]);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Tweeter</h1>
          <p>What's happening?</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <TweetForm
          onSubmit={addTweet}
          userName={userName}
          isSubmitting={isSubmitting}
        />

        <TweetList tweets={tweets} loading={loading} />
      </div>
    </div>
  );
}

export default App;
