// Function to check the registration date and redirect if 13 days have passed
function checkRegistrationDate() {
    const registrationDate = localStorage.getItem('registrationDate');
    if (registrationDate) {
        const registeredOn = new Date(registrationDate);
        const currentDate = new Date();
        const timeDifference = currentDate - registeredOn;
        const daysSinceRegistration = timeDifference / (1000 * 3600 * 24);

        // Check if 13 days have passed
        if (daysSinceRegistration >= 13) {
            // Redirect to the specified URL
            window.location.href = 'https://mostbadgeuser.github.io/Castify1.com/';
        }
    }
}

// Call the function to check registration date when the page loads
window.onload = function() {
    checkLoginStatus(); // Your existing function to check login status
    checkRegistrationDate(); // Check the registration date
};

// Example registration function
function registerUser(username, email, password) {
    // Your Firebase registration logic here
    // After successful registration, save the registration date
    const registrationDate = new Date().toISOString(); // Current date in ISO format
    localStorage.setItem('registrationDate', registrationDate);
}