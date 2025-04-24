// Load camera feed
const video = document.getElementById("camera");
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.error("Camera access error:", err);
    });
}

const moodPlaylists = {
  happy: ["Happy Song 1", "Happy Song 2", "Happy Song 3"],
  sad: ["Sad Song 1", "Sad Song 2", "Sad Song 3"],
  angry: ["Angry Song 1", "Angry Song 2", "Angry Song 3"],
  neutral: ["Neutral Song 1", "Neutral Song 2", "Neutral Song 3"],
  surprise: ["Surprise Song 1", "Surprise Song 2", "Surprise Song 3"],
};

function selectMood(button, mood) {
  // Highlight active mood button
  document.querySelectorAll(".mood-buttons button").forEach((btn) => {
    btn.classList.remove("active");
  });
  button.classList.add("active");

  // Load playlist
  const playlistDiv = document.getElementById("playlist");
  playlistDiv.innerHTML = "";
  moodPlaylists[mood].forEach((song, index) => {
    const songDiv = document.createElement("div");
    songDiv.className = "song";
    songDiv.textContent = `${index + 1}. ${mood} Song ${index + 1}`;
    playlistDiv.appendChild(songDiv);
  });

  // Update the displayed dominant emotion
  document.getElementById(
    "dominant-emotion"
  ).textContent = `Dominant Emotion: ${mood}`;
}

// Initialize with happy mood
window.addEventListener("DOMContentLoaded", () => {
  const happyButton = document.querySelector('[data-mood="happy"]');
  if (happyButton) {
    selectMood(happyButton, "happy");
  }
});

// Add click event for capture button
document.querySelector(".capture-btn").addEventListener("click", () => {
  // In a real app, this would analyze the facial expression
  // For now, just show a message
  document.getElementById("dominant-emotion").textContent =
    "Dominant Emotion: Analyzing...";

  // Simulate analysis completion after 1 second
  setTimeout(() => {
    const moods = ["happy", "sad", "angry", "neutral", "surprise"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    // Update display and select the corresponding mood button
    document.getElementById(
      "dominant-emotion"
    ).textContent = `Dominant Emotion: ${randomMood}`;
    const moodButton = document.querySelector(`[data-mood="${randomMood}"]`);
    if (moodButton) {
      selectMood(moodButton, randomMood);
    }
  }, 1000);
});
