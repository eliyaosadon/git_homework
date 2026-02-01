// --- Exercise 1 ---
async function getUserById(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error('User not found');
        const user = await response.json();
        console.log(`✅ Ex 1: Found user: ${user.name} (${user.email})`);
        return user;
    } catch (error) {
        console.error('❌ Ex 1 Error:', error.message);
        return null;
    }
}

// --- Exercise 2 ---
async function getUserWithPosts(userId) {
    try {
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!userRes.ok) throw new Error(`User fetch failed`);
        const user = await userRes.json();

        const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!postsRes.ok) throw new Error(`Posts fetch failed`);
        const posts = await postsRes.json();

        return { user, posts };
    } catch (error) {
        console.error('❌ Ex 2 Error:', error.message);
        return null;
    }
}

// --- Exercise 3 ---
async function getDashboardData() {
    try {
        const [usersRes, postsRes, commentsRes] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/users'),
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/comments')
        ]);

        if (!usersRes.ok || !postsRes.ok || !commentsRes.ok) throw new Error('Data load failed');

        const [users, posts, comments] = await Promise.all([
            usersRes.json(), postsRes.json(), commentsRes.json()
        ]);

        const dashboard = {
            summary: { totalUsers: users.length, totalPosts: posts.length, totalComments: comments.length },
            topUsers: users.slice(0, 2).map(u => ({ name: u.name }))
        };
        return dashboard;
    } catch (error) {
        console.error("❌ Ex 3 Error:", error);
        return null;
    }
}

// --- TESTS ---
(async () => {
    console.log("%c--- STARTING TESTS ---", "color: blue; font-weight: bold; font-size: 14px");

    // Exercise 1
    console.log("...Running Exercise 1 (Valid User)...");
    await getUserById(1);

    console.log("...Running Exercise 1 (Invalid User)...");
    await getUserById(999);

    // Exercise 2
    console.log("\n...Running Exercise 2...");
    const data2 = await getUserWithPosts(1);
    if (data2) console.log(`✅ Ex 2: Fetched ${data2.user.name} and ${data2.posts.length} posts`);

    // Exercise 3
    console.log("\n...Running Exercise 3...");
    const data3 = await getDashboardData();
    if (data3) console.log("✅ Ex 3 Dashboard Data:", data3);

    console.log("%c--- COMPLETED ---", "color: blue; font-weight: bold; font-size: 14px");
})();