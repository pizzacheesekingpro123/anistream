document.getElementById("search-bar").addEventListener("input", async function () {
    let query = this.value.trim();
    if (query.length < 3) return;

    let response = await fetch(`https://api.consumet.org/anime/zoro/${encodeURIComponent(query)}`);
    let data = await response.json();

    let animeContainer = document.getElementById("anime-container");
    animeContainer.innerHTML = "";

    if (data.results) {
        data.results.forEach(anime => {
            let animeCard = document.createElement("div");
            animeCard.classList.add("anime-card");
            animeCard.innerHTML = `
                <img src="${anime.image}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <button onclick="watchAnime('${anime.id}')">Watch Now</button>
            `;
            animeContainer.appendChild(animeCard);
        });
    }
});

function watchAnime(animeId) {
    window.location.href = `watch.html?id=${encodeURIComponent(animeId)}`;
}
