async function getUserById(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (!response.ok) {
      throw new Error('User not found');
    }

    const user = await response.json();
    console.log(`Found user: ${user.name} (${user.email})`);
    return user;

  } catch (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
}

getUserById(1).then(data => console.log('Test 1 Result:', data ? 'Success' : 'Failed'));
getUserById(999).then(data => console.log('Test 2 Result:', data));