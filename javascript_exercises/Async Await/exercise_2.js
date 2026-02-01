async function getUserWithPosts(userId) {
  try {
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!userRes.ok) {
      throw new Error(`User fetch failed: ${userRes.statusText}`);
    }
    
    const user = await userRes.json();

    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    
    if (!postsRes.ok) {
      throw new Error(`Posts fetch failed: ${postsRes.statusText}`);
    }

    const posts = await postsRes.json();

    return {
      user: user,
      posts: posts
    };

  } catch (error) {
    console.error('Operation failed:', error.message);
    return null; 
  }
}

getUserWithPosts(1).then(data => {
    if (data) console.log(`User ${data.user.name} has ${data.posts.length} posts.`);
});