const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "jacinto",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army(Remix)",
    artist: "jacinto",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, disco queen",
    artist: "jacinto",
  },
  {
    name: "jacinto-4",
    displayName: "Front Raw (Remix)",
    artist: "jacinto",
  },
];

//Check if Playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

//Play or Pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSongs(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSongs(songs[songIndex]);
  playSong();
}

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSongs(songs[songIndex]);
  playSong();
}

//On Load- Select first song
loadSongs(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    //Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;

    //Delay Switiching duration event to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //Calculate display for Current
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;

    //Delay Switiching current event to avoid NaN
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

//Set Progress Bar
function setProgressBar(e) {
  //   const width = e.srcElement.clientWidth;
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
