// Function to check if the user exists and password matches
function isValidUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username && user.password === password);
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isValidUser(username, password)) {
        // Set the current user in localStorage and redirect to the welcome page
        localStorage.setItem('currentUser', username);
        alert('Login successful! Redirecting...');
        window.location.href = 'https://mostbadgeuser.github.io/Castify_Welcome.com/';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});