// VIDEO POPUP FUNCTIONALITY
function openPopup(videoSrc) {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");
    popup.style.display = "flex";
    popupVideo.src = videoSrc;
}

function closePopup() {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");
    popup.style.display = "none";
    popupVideo.pause();
    popupVideo.src = "";
}

// LOADING SCREEN FUNCTIONALITY
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const backgroundVideos = document.querySelectorAll('.highlight-video');

    // Initially pause all background videos
    backgroundVideos.forEach(video => video.pause());

    // Set timeout to match your loading GIF duration (4 seconds)
    setTimeout(() => {
        // Hide the loading screen
        loadingScreen.style.display = 'none';

        // Remove blur effect from main content
        mainContent.classList.remove('blurred');

        // Play all background videos
        backgroundVideos.forEach(video => {
            video.play().catch(e => console.log('Autoplay failed:', e));
        });

    }, 4000); // Adjust this time if your loading animation is longer/shorter
});
