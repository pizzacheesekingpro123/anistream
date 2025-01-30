document.addEventListener("DOMContentLoaded", async function () {
    let params = new URLSearchParams(window.location.search);
    let animeTitle = params.get("title");

    if (animeTitle) {
        document.getElementById("anime-title").textContent = `Watching: ${animeTitle}`;

        try {
            // Fetch anime episodes from Zoro.to API (or alternative)
            let response = await fetch(`https://api.consumet.org/anime/zoro/${encodeURIComponent(animeTitle)}`);
            let data = await response.json();

            if (data && data.episodes.length > 0) {
                let episodeList = document.getElementById("episode-list");

                // Load first episode by default
                document.getElementById("video-frame").src = data.episodes[0].url;

                // Add all episodes to the sidebar
                data.episodes.forEach(episode => {
                    let epButton = document.createElement("button");
                    epButton.textContent = `Episode ${episode.number}`;
                    epButton.onclick = () => {
                        document.getElementById("video-frame").src = episode.url;
                    };
                    episodeList.appendChild(epButton);
                });
            } else {
                document.getElementById("video-frame").src = "https://www.youtube.com/embed/error"; // Error placeholder
            }
        } catch (error) {
            console.log("Error loading episodes:", error);
            document.getElementById("video-frame").src = "https://www.youtube.com/embed/error"; // Error placeholder
        }
    }
});
