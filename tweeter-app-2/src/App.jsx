import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { getTweets, createTweet } from './lib/api';
import './index.css';

function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(savedUserName);
    } else {
      setUserName('User');
      localStorage.setItem('userName', 'User');
    }
  }, []);

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

  const updateUserName = (newUserName) => {
    setUserName(newUserName);
    localStorage.setItem('userName', newUserName);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />

        <div className="container">
          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError(null)}>✕</button>
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tweets={tweets}
                  loading={loading}
                  isSubmitting={isSubmitting}
                  onAddTweet={addTweet}
                  userName={userName}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  userName={userName}
                  onUpdateUserName={updateUserName}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
