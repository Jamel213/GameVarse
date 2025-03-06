document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buyBtn");

    buyButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const gameCard = event.target.closest(".game-card");
            const gameTitle = gameCard.querySelector("h3").innerText;
            const gameImage = gameCard.querySelector("img").src;

            const game = {
                title: gameTitle,
                image: gameImage,
                status: "Not Installed",
                lastPlayed: "Never",
                size: "Unknown",
                purchaseDate: new Date().toISOString().split('T')[0]
            };

            let libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || [];

            const exists = libraryGames.some(g => g.title === game.title);
            if (!exists) {
                libraryGames.push(game);
                localStorage.setItem("libraryGames", JSON.stringify(libraryGames));
                alert(`${gameTitle} has been added to your library!`);
            } else {
                alert(`${gameTitle} is already in your library!`);
            }
        });
    });


    if (document.querySelector(".library")) {
        const gameList = document.querySelector(".game-list");
        gameList.innerHTML = "";

        let libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || [];

        libraryGames.forEach(game => {
            const gameCard = document.createElement("div");
            gameCard.classList.add("game-card");
            gameCard.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <h3>${game.title}</h3>
                <div class="game-details">
                    <p><strong>Status:</strong> ${game.status}</p>
                    <p><strong>Last Played:</strong> ${game.lastPlayed}</p>
                    <p><strong>Size:</strong> ${game.size}</p>
                    <p><strong>Purchase Date:</strong> ${game.purchaseDate}</p>
                </div>
                <button class="installBtn">Install</button>
                <button class="removeBtn">Remove</button>
            `;


            gameCard.querySelector(".removeBtn").addEventListener("click", () => {
                removeGameFromLibrary(game.title);
                gameCard.remove();
            });

            gameList.appendChild(gameCard);
        });
    }


    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');


    if (avatarPreview) {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            avatarPreview.src = savedAvatar;
        }
    }

    if (avatarUpload) {
        avatarUpload.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageData = e.target.result;
                    avatarPreview.src = imageData;

                    localStorage.setItem('userAvatar', imageData);
                    console.log('Image saved to localStorage');
                }
                reader.readAsDataURL(file);
            }
        });
    }
});


function removeGameFromLibrary(gameTitle) {
    let libraryGames = JSON.parse(localStorage.getItem("libraryGames")) || [];
    libraryGames = libraryGames.filter(game => game.title !== gameTitle);
    localStorage.setItem("libraryGames", JSON.stringify(libraryGames));
}




document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = 'Light Mode';
    }


    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');


        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Dark Mode';
        }
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });


    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });


    document.addEventListener('click', function (e) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('show');
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;


    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
    }


    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');


        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            themeToggle.textContent = 'Light Mode';
        } else {
            localStorage.setItem('darkMode', null);
            themeToggle.textContent = 'Dark Mode';
        }
    });


    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');


    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        avatarPreview.src = savedAvatar;
    }


    avatarUpload.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageData = e.target.result;
                avatarPreview.src = imageData;

                localStorage.setItem('userAvatar', imageData);
                console.log('Image saved to localStorage');
            }
            reader.readAsDataURL(file);
        }
    });
});
