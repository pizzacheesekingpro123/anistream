document.addEventListener("DOMContentLoaded", async function () {
    let params = new URLSearchParams(window.location.search);
    let animeId = params.get("id");

    if (animeId) {
        try {
            let response = await fetch(`https://api.consumet.org/anime/zoro/info/${encodeURIComponent(animeId)}`);
            let data = await response.json();

            document.getElementById("anime-title").textContent = `Watching: ${data.title}`;
            
            let episodeList = document.getElementById("episode-list");
            let firstEpisode = data.episodes[0].id;

            // Load first episode by default
            loadEpisode(firstEpisode);

            // Add episodes to sidebar
            data.episodes.forEach(episode => {
                let epButton = document.createElement("button");
                epButton.textContent = `Episode ${episode.number}`;
                epButton.onclick = () => loadEpisode(episode.id);
                episodeList.appendChild(epButton);
            });

        } catch (error) {
            console.log("Error loading anime:", error);
        }
    }
});

async function loadEpisode(episodeId) {
    let videoFrame = document.getElementById("video-frame");
    
    try {
        let response = await fetch(`https://api.consumet.org/anime/zoro/watch/${encodeURIComponent(episodeId)}`);
        let data = await response.json();

        videoFrame.src = data.sources[0].url;  // Load first available source
    } catch (error) {
        console.log("Error loading episode:", error);
        videoFrame.src = "https://www.youtube.com/embed/error";  // Error placeholder
    }
}
