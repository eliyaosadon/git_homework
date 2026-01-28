const tweeter = Tweeter();
const renderer = Renderer();

renderer.renderPosts(tweeter.getPosts());

$("#post").on("click", function () {
    const $input = $("#input");
    if ($input.val() !== "") {
        tweeter.addPost($input.val());
        $input.val("");
        renderer.renderPosts(tweeter.getPosts());
    }
});

$("#posts").on("click", ".delete", function () {
    const $post = $(this).closest(".post");
    const id = $post.data("id");

    tweeter.removePost(id);
    renderer.renderPosts(tweeter.getPosts());
});

$("#posts").on("click", ".comment-button", function () {
    const $post = $(this).closest(".post");
    const postId = $post.data("id");
    const $input = $post.find(".comment-input");
    const text = $input.val();

    if (text !== "") {
        tweeter.addComment(postId, text);
        renderer.renderPosts(tweeter.getPosts());
    }
});

$("#posts").on("click", ".delete-comment", function () {
    const $post = $(this).closest(".post");
    const postId = $post.data("id");

    const $comment = $(this).closest(".comment");
    const commentId = $comment.data("id");

    tweeter.removeComment(postId, commentId);
    renderer.renderPosts(tweeter.getPosts());
});