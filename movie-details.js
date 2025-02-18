document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");
    const apiKey = "d253c10fbd229287ee3e0caa338616c2";

    if (movieId) {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ar`)
            .then(response => response.json())
            .then(movie => {
                const movieDetails = document.getElementById("movieDetails");
                movieDetails.innerHTML = `
                    <div class="col-md-6">
                        <div class="card shadow-sm text-center">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                                    class="card-img-top mt-5" 
                                    alt="${movie.title}" 
                                    style="width: 60%; margin: auto; height: auto; border-radius: 10px;">
                            <div class="card-body">
                                <h3 class="card-title text-primary">${movie.title}</h3>
                                <p class="text-muted"><strong>تاريخ الإصدار:</strong> ${movie.release_date}</p>
                                <p class="text-warning"><strong>⭐ التقييم:</strong> ${movie.vote_average.toFixed(1)}</p>
                                <p class="card-text">${movie.overview}</p>
                                <a href="index.html" class="btn btn-secondary">العودة إلى القائمة</a>
                            </div>
                        </div>
                    </div>
                `;
            })
            .catch(error => console.error("حدث خطأ أثناء جلب تفاصيل الفيلم:", error));
    }
});
