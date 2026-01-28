const Renderer = function () {

    const renderPosts = function (posts) {
        const $postsContainer = $("#posts");
        $postsContainer.empty();

        for (let post of posts) {
            let postHTML = `
                <div class="post" data-id="${post.id}">
                    <div class="post-text">${post.text}</div>
                    <div class="comments">
                        </div>
                    <input type="text" placeholder="Got something to say?" class="comment-input">
                    <button class="comment-button">Comment</button>
                    <div class="delete">Delete Post</div>
                </div>
            `;

            const $postElement = $(postHTML);

            for (let comment of post.comments) {
                let commentHTML = `
                    <div class="comment" data-id="${comment.id}">
                        <span class="delete-comment">X</span>
                        ${comment.text}
                    </div>
                `;
                $postElement.find(".comments").append(commentHTML);
            }

            $postsContainer.append($postElement);
        }
    };

    return {
        renderPosts
    };
};