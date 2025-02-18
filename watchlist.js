function loadWatchlist() {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    let container = document.getElementById("watchlistContainer");

    if (watchlist.length === 0) {
        container.innerHTML = "<p class='no-movies-msg'>📭 لا توجد أفلام في قائمة المشاهدة.</p>";
        return;
    }

    let cartona = "";
    watchlist.forEach(movie => {
        cartona += `
<div class="card shadow-lg" style="width: 14rem; margin: 10px; border-radius: 15px; overflow: hidden; transition: transform 0.3s; height: 280px;">
    <img src="${movie.poster}" class="card-img-top" alt="${movie.title}" style="width: 100%; height: 150px; object-fit: cover; border-bottom: 5px solid #f8f9fa;">
    <div class="card-body" style="background-color: #f8f9fa; padding: 10px; height: 120px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h5 class="card-title" style="font-size: 1rem; color: #333; text-align: center; margin-bottom: 10px;">${movie.title}</h5>
        <button onclick="removeFromWatchlist(${movie.id})" class="noselect" style="width: 100px; height: 40px; display: flex; justify-content: center; align-items: center;">
            <span class="text">Delete</span>
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                </svg>
            </span>
        </button>
    </div>
</div>

<style>
    button {
        width: 150px;
        height: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        background: #e62222;
        border: none;
        border-radius: 5px;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.15);
        position: relative;
        transition: 200ms;
    }

    button, button span {
        transition: 200ms;
    }

    button .text {
        transform: translateX(1px);
        color: white;
        font-weight: bold;
    }

    button .icon {
        position: absolute;
        // border-left: 1px solid #c41b1b;
        transform: translateX(110px);
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button svg {
        width: 15px;
        fill: white;
    }

    button:hover {
        background: #ff3636;
    }

    button:hover .text {
        color: transparent;
    }

    button:hover .icon {
        width: 150px;
        border-left: none;
        transform: translateX(0);
    }

    button:focus {
        outline: none;
    }

    button:active .icon svg {
        transform: scale(0.8);
    }
</style>

        `;
    });

    container.innerHTML = cartona;
}

function removeFromWatchlist(movieId) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(movie => movie.id !== movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    loadWatchlist();
}

// Add hover effect for cards
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});

// Style the container to arrange cards horizontally
document.addEventListener('DOMContentLoaded', function () {
    let container = document.getElementById("watchlistContainer");
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.justifyContent = 'flex-start'; // or 'space-around' or 'center' depending on the alignment you prefer
});

loadWatchlist();
