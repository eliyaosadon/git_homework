async function getDashboardData() {
  try {
    console.log("Fetching dashboard data...");

    const [usersRes, postsRes, commentsRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/comments')
    ]);

    if (!usersRes.ok || !postsRes.ok || !commentsRes.ok) {
      throw new Error('One or more data sources failed to load');
    }
    const [users, posts, comments] = await Promise.all([
      usersRes.json(),
      postsRes.json(),
      commentsRes.json()
    ]);

    const commentsByPostId = comments.reduce((acc, comment) => {
      acc[comment.postId] = (acc[comment.postId] || 0) + 1;
      return acc;
    }, {});
    const usersWithStats = users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id);
        const totalUserComments = userPosts.reduce((sum, post) => {
            return sum + (commentsByPostId[post.id] || 0);
        }, 0);

        return {
            name: user.name,
            postCount: userPosts.length,
            commentCount: totalUserComments
        };
    });

    const topUsers = usersWithStats
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 3);

    const recentPosts = [...posts]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    const dashboard = {
      summary: {
        totalUsers: users.length,
        totalPosts: posts.length,
        totalComments: comments.length,
        avgPostsPerUser: (posts.length / users.length).toFixed(1),
        avgCommentsPerPost: (comments.length / posts.length).toFixed(1)
      },
      topUsers: topUsers,
      recentPosts: recentPosts
    };

    return dashboard;

  } catch (error) {
    console.error("Dashboard failed to load:", error);
    return null;
  }
}

getDashboardData().then(data => console.log(JSON.stringify(data, null, 2)));