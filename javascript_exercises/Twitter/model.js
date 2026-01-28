const Tweeter = function () {
    const posts = [
        {
            text: "First post!",
            id: "p1",
            comments: [
                { id: "c1", text: "First comment on first post!" },
                { id: "c2", text: "Second comment on first post!!" },
                { id: "c3", text: "Third comment on first post!!!" }
            ]
        },
        {
            text: "Aw man, I wanted to be first",
            id: "p2",
            comments: [
                { id: "c4", text: "Don't worry second poster, you'll be first one day." },
                { id: "c5", text: "Yeah, believe in yourself!" },
                { id: "c6", text: "Haha second place what a joke." }
            ]
        }
    ];

    let postIdCounter = 2;
    let commentIdCounter = 6;

    const getPosts = function () {
        return posts;
    };

    const addPost = function (text) {
        postIdCounter++;
        const newPost = {
            text: text,
            id: "p" + postIdCounter,
            comments: []
        };
        posts.push(newPost);
    };

    const removePost = function (postId) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === postId) {
                posts.splice(i, 1);
                return;
            }
        }
    };

    const addComment = function (postId, text) {
        commentIdCounter++;
        const newComment = {
            id: "c" + commentIdCounter,
            text: text
        };

        for (let post of posts) {
            if (post.id === postId) {
                post.comments.push(newComment);
            }
        }
    };

    const removeComment = function (postId, commentId) {
        for (let post of posts) {
            if (post.id === postId) {
                for (let i = 0; i < post.comments.length; i++) {
                    if (post.comments[i].id === commentId) {
                        post.comments.splice(i, 1);
                        return;
                    }
                }
            }
        }
    };

    return {
        getPosts,
        addPost,
        removePost,
        addComment,
        removeComment
    };
};