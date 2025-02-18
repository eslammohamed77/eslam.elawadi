const apiKey = "d253c10fbd229287ee3e0caa338616c2";

//  دالة جلب الأفلام وعرضها في القسم المناسب
function fetchMovies(apiUrl, containerId) {
    toggleLoader(true);
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            toggleLoader(false);
            let movies = data.results;
            displayMovies(movies, containerId);
        })
        .catch(error => {
            toggleLoader(false);
            console.error("❌ خطأ في جلب البيانات:", error);
        });
}

//  دالة عرض الأفلام
function displayMovies(movies, containerId) {
    let cartona = "";
    if (movies.length === 0) {
        cartona = "<p>❌ لم يتم العثور على أي أفلام.</p>";
    } else {
        movies.forEach(movie => {
            let poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "placeholder.jpg";
            cartona += `
<div class="card" style="width: 18rem; margin: 10px;">
    <img src="${poster}" class="card-img-top" alt="${movie.title}">
    <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text"><strong>التقييم:</strong> ⭐ ${movie.vote_average.toFixed(1)}</p>
        <p class="card-text"><strong>تاريخ الإصدار:</strong> ${movie.release_date}</p>
        <p class="card-text">${movie.overview ? movie.overview.slice(0, 100) + "..." : "لا يوجد وصف متاح"}</p>
        <div class="buttons">
            <a href="movie-details.html?id=${movie.id}" class="btn btn-primary">عرض التفاصيل</a>
            <button onclick="addToWatchlist(${movie.id}, '${movie.title}', '${poster}')" class="btn btn-warning">+ أضف إلى المشاهدة</button>
        </div>
    </div>
</div>

<style>
    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px; /* إضافة مسافة صغيرة بين الزر والرابط */
    }

    .buttons .btn {
        flex: 1; /* يضمن أن الأزرار لها نفس الحجم */
        text-align: center;
    }
</style>

            `;
        });
    }
    document.getElementById(containerId).innerHTML = cartona;
}

//  تحميل الأفلام المختلفة عند فتح الصفحة
fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ar`, "moviesContainer");
fetchMovies(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ar`, "upcomingMovies");
fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=ar`, "trendingMovies");
fetchMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ar`, "nowPlayingMovies");

//  البحث عن الأفلام عند الضغط على زر البحث
document.getElementById("searchButton").addEventListener("click", function () {
    let query = document.getElementById("searchInput").value;
    if (query.trim() !== "") {
        searchMovies(query);
    }
});

//  دالة البحث عن الأفلام
function searchMovies(query) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ar&query=${encodeURIComponent(query)}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => displayMovies(data.results, "searchResults"))
        .catch(error => console.error("❌ خطأ في جلب بيانات البحث:", error));
}

//  دالة حفظ الأفلام في قائمة المشاهدة
function addToWatchlist(movieId, movieTitle, moviePoster) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!watchlist.some(movie => movie.id === movieId)) {
        watchlist.push({ id: movieId, title: movieTitle, poster: moviePoster });
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("✅ تمت إضافة الفيلم إلى قائمة المشاهدة!");
    } else {
        alert("⚠ الفيلم موجود بالفعل في القائمة!");
    }
}

//  دالة تشغيل مؤشر التحميل
function toggleLoader(show) {
    document.getElementById("loader").style.display = show ? "block" : "none";
}



function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.right === "0px") {
        sidebar.style.right = "-250px";
    } else {
        sidebar.style.right = "0px";
    }
}

