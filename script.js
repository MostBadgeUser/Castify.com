// Include the Firebase SDKs for Authentication and Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTqZeTMNIAjBt9ArxAVG3HWL0zXiU9GnM",
    authDomain: "castify-d259d.firebaseapp.com",
    projectId: "castify-d259d",
    storageBucket: "castify-d259d.appspot.com",
    messagingSenderId: "809904193970",
    appId: "1:809904193970:web:af4a99b6e3b8738adc64ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check localStorage for user session
window.onload = function() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        alert('You are already logged in! Redirecting...');
        window.location.href = 'https://mostbadgeuser.github.io/Castify1.com/'; // Redirect URL
    }
};

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('username').value; // Using email as username
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('userEmail', email); // Store email in localStorage
        alert('Login successful! Redirecting...');
        window.location.href = 'https://mostbadgeuser.github.io/Castify1.com/'; // Redirect URL
    } catch (error) {
        alert('Invalid username or password. Please try again.');
        console.error('Login error:', error.message);
    }
});

// Handle register form submission
document.getElementById('registerBtn').addEventListener('click', async function() {
    const email = document.getElementById('newUsername').value; // Using email as username
    const password = document.getElementById('newPassword').value;
    const username = document.getElementById('newUsername').value; // Store the username

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user data to Firestore with username
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            username: username // Store the username in Firestore
        });

        localStorage.setItem('userEmail', email); // Store email in localStorage
        alert('Account created successfully! You can log in now.');
        document.getElementById('registerContainer').style.display = 'none'; // Hide register container
        document.getElementById('loginForm').style.display = 'block'; // Show login form
    } catch (error) {
        alert('Error creating account: ' + error.message);
        console.error('Registration error:', error.message);
    }
});

// Show register form
document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('registerContainer').style.display = 'block'; // Show register container
    document.getElementById('loginForm').style.display = 'none'; // Hide login form
});

// Cancel registration
document.getElementById('cancelRegister').addEventListener('click', function() {
    document.getElementById('registerContainer').style.display = 'none'; // Hide register container
    document.getElementById('loginForm').style.display = 'block'; // Show login form
});