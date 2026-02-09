import { useEffect, useState } from "react";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data.slice(0, 10));
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 600);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            <h2>Posts</h2>

            <div
                className="posts-container"
                style={{
                    flexDirection: isSmallScreen ? "column" : "row"
                }}
            >
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
