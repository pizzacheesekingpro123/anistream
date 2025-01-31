document.addEventListener("DOMContentLoaded", async function () {
    let params = new URLSearchParams(window.location.search);
    let animeTitle = params.get("title");

    if (animeTitle) {
        document.getElementById("anime-title").textContent = `Watching: ${animeTitle}`;

        try {
            let response = await fetch(`https://api.consumet.org/anime/zoro/${encodeURIComponent(animeTitle)}`);
            let data = await response.json();

            if (data && data.episodes.length > 0) {
                let episodeList = document.getElementById("episode-list");

                // Load first episode
                document.getElementById("video-frame").src = data.episodes[0].url;

                // Add episodes to sidebar
                data.episodes.forEach(episode => {
                    let epButton = document.createElement("button");
                    epButton.textContent = `Episode ${episode.number}`;
                    epButton.onclick = () => {
                        document.getElementById("video-frame").src = episode.url;
                    };
                    episodeList.appendChild(epButton);
                });

                // Fetch anime clips
                let clipsResponse = await fetch(`https://api.consumet.org/anime/zoro/${encodeURIComponent(animeTitle)}/clips`);
                let clipsData = await clipsResponse.json();

                if (clipsData.length > 0) {
                    let clipSection = document.createElement("h2");
                    clipSection.textContent = "Anime Clips";
                    episodeList.appendChild(clipSection);

                    clipsData.forEach(clip => {
                        let clipButton = document.createElement("button");
                        clipButton.textContent = clip.title;
                        clipButton.onclick = () => {
                            document.getElementById("video-frame").src = clip.url;
                        };
                        episodeList.appendChild(clipButton);
                    });
                }
            } else {
                document.getElementById("video-frame").src = "https://www.youtube.com/embed/error"; // Error placeholder
            }
        } catch (error) {
            console.log("Error loading videos:", error);
            document.getElementById("video-frame").src = "https://www.youtube.com/embed/error"; // Error placeholder
        }
    }
});
