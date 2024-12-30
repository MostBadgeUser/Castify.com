// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT0puD2gqEj4EYoeC5HtXYI95InuX4z9Q",
  authDomain: "castify-5c0b6.firebaseapp.com",
  projectId: "castify-5c0b6",
  storageBucket: "castify-5c0b6.appspot.com",
  messagingSenderId: "897995118693",
  appId: "1:897995118693:web:708006eb85fdd77ab5ce8c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let currentUser = null;

// Set logo image
document.getElementById("logo-img").src = "https://i.ibb.co/nCqS9g0/rushfordclean-1.png";

// Set notification icon
document.getElementById("notification-icon").src = "https://cdn.pixabay.com/photo/2020/10/31/06/28/youtube-bell-icon-5700370_1280.png";

// Background image API
async function fetchBackgroundImage() {
  try {
    const response = await fetch("https://source.unsplash.com/random/1920x1080/?nature,landscape");
    document.body.style.backgroundImage = `url(${response.url})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  } catch (error) {
    console.error("Error fetching background image:", error);
  }
}

// Geolocation-based ads
function fetchLocationAds() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Mock API for ads
      const adAPI = `https://mock-ad-server.com/api?lat=${latitude}&lon=${longitude}`;
      const response = await fetch(adAPI);
      const ads = await response.json();

      document.getElementById("left-ad").textContent = ads.leftAd || "Advertisement 1";
      document.getElementById("right-ad").textContent = ads.rightAd || "Advertisement 2";

      document.getElementById("left-ad").classList.remove("hidden");
      document.getElementById("right-ad").classList.remove("hidden");
    });
  }
}

// Check user session
function checkUserSession() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = user;
      document.getElementById("login-button").classList.add("hidden");
      document.getElementById("user-profile").classList.remove("hidden");
      document.getElementById("username-display").textContent = user.displayName || user.email;
    } else {
      currentUser = null;
      document.getElementById("login-button").classList.remove("hidden");
      document.getElementById("user-profile").classList.add("hidden");
    }
  });
}

// Notifications logic
let notificationCount = 0;

function addNotification(message) {
  notificationCount++;
  const notificationCounter = document.getElementById("notification-count");
  notificationCounter.textContent = notificationCount;
  notificationCounter.classList.remove("hidden");
  console.log("New notification:", message);
}

// On page load
fetchBackgroundImage();
fetchLocationAds();
checkUserSession();

// Simulate notifications
setTimeout(() => addNotification("New video uploaded!"), 5000);
setTimeout(() => addNotification("Someone mentioned you!"), 10000);