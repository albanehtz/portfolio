document.querySelectorAll(".video-card").forEach(card => {

    card.addEventListener("click", () => {

        window.open(
            "https://www.youtube.com/watch?v=1-jNk687LCA",
            "_blank",
            "noopener,noreferrer"
        );

    });

});