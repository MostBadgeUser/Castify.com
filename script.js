// Firebase конфигурация
const firebaseConfig = {
    apiKey: "AIzaSyCT0puD2gqEj4EYoeC5HtXYI95InuX4z9Q",
    authDomain: "castify-5c0b6.firebaseapp.com",
    projectId: "castify-5c0b6",
    storageBucket: "castify-5c0b6.appspot.com",
    messagingSenderId: "897995118693",
    appId: "1:897995118693:web:708006eb85fdd77ab5ce8c",
    measurementId: "G-MJ0N5LRT04"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Проверка состояния авторизации и извлечение данных пользователя
auth.onAuthStateChanged(async (user) => {
    const userActions = document.querySelector('.user-actions');
    userActions.innerHTML = ''; // Очистка контейнера

    if (user) {
        // Проверка, авторизован ли пользователь
        try {
            // Получение данных пользователя из Firestore
            const userDoc = await db.collection("users").doc(user.uid).get();

            if (userDoc.exists) {
                const userData = userDoc.data();

                // Отображение никнейма и иконки профиля
                const usernameSpan = document.createElement('span');
                usernameSpan.innerText = userData.nickname || "No Username";

                const profileIcon = document.createElement('img');
                profileIcon.src = userData.photoURL || "https://via.placeholder.com/50";
                profileIcon.alt = "Profile Picture";
                profileIcon.style.width = "40px";
                profileIcon.style.height = "40px";
                profileIcon.style.borderRadius = "50%";
                profileIcon.style.marginLeft = "10px";

                // Добавление элементов в шапку
                userActions.appendChild(usernameSpan);
                userActions.appendChild(profileIcon);
            } else {
                console.error("User document does not exist.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        // Если пользователь не авторизован, показываем кнопку "Login/Register"
        const loginButton = document.createElement('button');
        loginButton.id = "login-register-btn";
        loginButton.innerText = "Login/Register";
        loginButton.onclick = () => {
            window.location.href = "https://mostbadgeuser.github.io/Castify_CreateAccount.com";
        };
        userActions.appendChild(loginButton);
    }
});

// Функция для отображения каналов
async function displayChannels() {
    const channelsContainer = document.getElementById('channels-container');
    channelsContainer.innerHTML = '<p>Loading channels...</p>'; // Сообщение при загрузке

    try {
        // Получение данных из коллекции "users"
        const querySnapshot = await db.collection("users").get();

        // Проверка на пустую коллекцию
        if (querySnapshot.empty) {
            channelsContainer.innerHTML = "<p>No channels found in Firestore.</p>";
            return;
        }

        // Очистка контейнера
        channelsContainer.innerHTML = '';

        // Перебор документов в коллекции
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            // Создание карточки канала
            const channelCard = document.createElement('div');
            channelCard.classList.add('channel-card');

            // Добавление изображения профиля
            const img = document.createElement('img');
            img.src = userData.photoURL || "https://via.placeholder.com/150";
            img.alt = userData.nickname || "No Username";
            channelCard.appendChild(img);

            // Добавление имени пользователя
            const username = document.createElement('h3');
            username.innerText = userData.nickname || "Unknown User";
            channelCard.appendChild(username);

            // Добавление карточки канала в контейнер
            channelsContainer.appendChild(channelCard);
        });
    } catch (error) {
        console.error("Error loading channels:", error);
        channelsContainer.innerHTML = "<p>Error loading channels. Please try again later.</p>";
    }
}

// Вызов функции при загрузке страницы
window.onload = () => {
    displayChannels();
};