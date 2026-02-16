import TweetForm from '../components/TweetForm';
import TweetList from '../components/TweetList';

function Home({ tweets, loading, isSubmitting, onAddTweet, userName }) {
    return (
        <>
            <header className="header">
                <h1>What's happening?</h1>
            </header>

            <TweetForm
                onSubmit={onAddTweet}
                userName={userName}
                isSubmitting={isSubmitting}
            />

            <TweetList tweets={tweets} loading={loading} />
        </>
    );
}

export default Home;
