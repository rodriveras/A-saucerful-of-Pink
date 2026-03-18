/**
 * PINK FLOYD TRIBUTE MUSIC PLAYER APP
 * 
 * NOTA IMPORTANTÍSIMA SOBRE GOOGLE DRIVE:
 * La API web (nombres de carpetas, lectura automática, etc.) no permite listar 
 * el contenido de una carpeta de Google Drive mediante una URL pública si no usamos 
 * la Google Drive API y un Backend/API Key por motivos de CORS (Cross-Origin Resource Sharing).
 * 
 * SOLUCIÓN:
 * He creado una estructura de "bases de datos" estática abajo en JS donde el 
 * propietario deberá colocar los Enlaces Directos (y/o IDs) reales de las canciones e 
 * imágenes de portada alojadas en Google Drive o de cualquier otra URL.
 * 
 * Un enlace directo de Drive se ve así:
 * https://drive.google.com/uc?export=view&id=TU_ID_AQUI
 * O
 * https://drive.usercontent.google.com/download?id=TU_ID_AQUI
 */

const MUSIC_DATA = [
    {
        id: "cd1",
        title: "A Saucerful of Pink - CD 1",
        description: "A Tribute to Pink Floyd (1995)",
        // Path mapped directly from GitHub
        coverArt: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/AlbumArt_%7BDB17DE9C-362C-415B-AD8C-409C4D3109F7%7D_Large.jpg",
        tracks: [
            { title: "Set Controls For The Heart Of The Sun", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/01%20-%20Set%20Controls%20For%20The%20Heart%20Of%20The%20Sun%20(Psychic%20Tv).mp3" },
            { title: "Another Brick In The Wall", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/02%20-%20Another%20Brick%20In%20The%20Wall,%20Parts%201%20&%202%20(Controlled%20Blee.mp3" },
            { title: "One Of These Days", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/03%20-%20One%20Of%20These%20Days%20(Spahn%20Ranch).mp3" },
            { title: "Wots...uh The Deal", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/04%20-%20Wots...uh%20The%20Deal%20(Sky%20Cries%20Mary).mp3" },
            { title: "Interstellar Overdrive", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/05%20-%20Interstellar%20Overdrive%20(Spiral%20Realms).mp3" },
            { title: "Learning To Fly", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/06%20-%20Learning%20To%20Fly%20(Leaether%20Strip).mp3" },
            { title: "To Roger Waters, Wherever You Are", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/07%20-%20To%20Roger%20Waters,%20Wherever%20You%20Are%20(Ron%20Geesin).mp3" },
            { title: "Jugband Blues", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/08%20-%20Jugband%20Blues%20(Eden).mp3" },
            { title: "On The Run", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/09%20-%20On%20The%20Run%20(Din).mp3" }
        ]
    },
    {
        id: "cd2",
        title: "A Saucerful of Pink - CD 2",
        description: "A Tribute to Pink Floyd (1995)",
        coverArt: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/AlbumArt_%7BB5020207-474E-4720-9DE4-332E18DA9900%7D_Large.jpg",
        tracks: [
            { title: "Echoes", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/01%20-%20Echoes%20(Alien%20Sex%20Fiend).mp3" },
            { title: "Hey You", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/02%20-%20Hey%20You%20(Furnace).mp3" },
            { title: "Careful With That Axe, Eugene", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/03%20-%20Careful%20With%20That%20Axe,%20Eugene%20(Nik%20Turner).mp3" },
            { title: "Lucifer Sam", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/04%20-%20Lucifer%20Sam%20(The%20Electric%20Hellfire%20Club).mp3" },
            { title: "Pigs On The Wing", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/05%20-%20Pigs%20On%20The%20Wing%20(Helios%20Creed).mp3" },
            { title: "Let There Be More Light", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/06%20-%20Let%20There%20Be%20More%20Light%20(Pressurehed).mp3" },
            { title: "Young Lust", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/07%20-%20Young%20Lust%20(Penal%20Colony).mp3" },
            { title: "A Saucerful Of Secrets", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/08%20-%20A%20Saucerful%20Of%20Secrets%20(Exp).mp3" },
            { title: "Point Me At The Sky", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/09%20-%20Point%20Me%20At%20The%20Sky%20(Melting%20Euphoria).mp3" },
            { title: "The Nile Song", url: "https://raw.githubusercontent.com/rodriveras/Tributo-a-Pink-Floyd/main/10%20-%20The%20Nile%20Song%20(Farflung).mp3" }
        ]
    }
];

// STATE VARIABLES
let currentAlbumIndex = -1;
let currentTrackIndex = 0;
let isPlaying = false;

// DOM Elements
const albumSelectionContainer = document.getElementById("album-selection");
const playlistSection = document.getElementById("playlist-section");
const trackListContainer = document.getElementById("track-list");
const playlistTitle = document.getElementById("playlist-title");
const backBtn = document.getElementById("back-btn");

const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseIcon = playPauseBtn.querySelector("i");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const nowPlayingCover = document.getElementById("now-playing-cover");
const nowPlayingTitle = document.getElementById("now-playing-title");
const nowPlayingAlbum = document.getElementById("now-playing-album");

const progressBarBg = document.getElementById("progress-bar-bg");
const progressBarFill = document.getElementById("progress-bar-fill");
const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");

const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");

const errorToast = document.getElementById("error-toast");

// =======================
// INITIALIZATION
// =======================
function init() {
    renderAlbums();
    setupEventListeners();
}

function renderAlbums() {
    albumSelectionContainer.innerHTML = "";
    MUSIC_DATA.forEach((album, index) => {
        const card = document.createElement("div");
        card.className = "album-card";
        card.innerHTML = `
            <img src="${album.coverArt}" alt="${album.title} Cover">
            <h3>${album.title}</h3>
            <p>${album.description || album.tracks.length + ' Canciones'}</p>
        `;
        card.addEventListener("click", () => openAlbum(index));
        albumSelectionContainer.appendChild(card);
    });
}

// =======================
// VIEW NAVIGATION
// =======================
function openAlbum(index) {
    const album = MUSIC_DATA[index];
    playlistTitle.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <span>${album.title}</span>
            <button id="play-full-album-btn" style="background: var(--accent-color); color: #fff; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; font-weight: bold; font-size: 0.9rem; letter-spacing: 0.5px; transition: 0.2s;">
                <i class="fa-solid fa-play"></i> Reproducir
            </button>
        </div>
    `;

    setTimeout(() => {
        document.getElementById("play-full-album-btn").addEventListener("click", () => {
            loadAndPlay(index, 0);
        });
    }, 0);

    // Render Tracks
    trackListContainer.innerHTML = "";
    album.tracks.forEach((track, trackIndex) => {
        const item = document.createElement("div");
        item.className = "track-item";

        // Check if viewing album that is currently playing and mark active
        if (currentAlbumIndex === index && currentTrackIndex === trackIndex) {
            item.classList.add("active");
        }

        item.innerHTML = `
            <div class="track-details">
                <span class="track-number">${trackIndex + 1}</span>
                <span class="track-title">${track.title}</span>
            </div>
            <i class="fa-solid fa-play" style="color: var(--text-secondary); font-size: 0.8rem;"></i>
        `;
        item.addEventListener("click", () => loadAndPlay(index, trackIndex));
        trackListContainer.appendChild(item);
    });

    // Toggle views
    albumSelectionContainer.classList.add("hidden");
    playlistSection.classList.remove("hidden");
}

function goBackToAlbums() {
    playlistSection.classList.add("hidden");
    albumSelectionContainer.classList.remove("hidden");
}

// =======================
// PLAYER LOGIC
// =======================
function loadAndPlay(albumIndex, trackIndex) {
    const album = MUSIC_DATA[albumIndex];
    if (!album || !album.tracks[trackIndex]) return;

    const track = album.tracks[trackIndex];
    currentAlbumIndex = albumIndex;
    currentTrackIndex = trackIndex;

    audioPlayer.src = track.url;
    audioPlayer.load();

    // Update UI info
    nowPlayingCover.src = album.coverArt;
    nowPlayingTitle.textContent = track.title;
    nowPlayingAlbum.textContent = album.title;

    // Refresh playlist view if open to show active state
    if (!playlistSection.classList.contains("hidden")) {
        // Find if this album is open, then just re-render internal list
        openAlbum(albumIndex);
    }

    playAudio();
}

function togglePlayPause() {
    if (audioPlayer.src === "" || !audioPlayer.src) return; // No track loaded

    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    audioPlayer.play().then(() => {
        isPlaying = true;
        updatePlayPauseUI();
    }).catch(err => {
        console.error("No se pudo reproducir el archivo.", err);
        showErrorToast();
        pauseAudio();
    });
}

function pauseAudio() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayPauseUI();
}

function playNext() {
    if (currentAlbumIndex === -1) return;
    const album = MUSIC_DATA[currentAlbumIndex];
    let nextIndex = currentTrackIndex + 1;

    // Continuous loop within the album
    if (nextIndex >= album.tracks.length) {
        nextIndex = 0;
    }

    loadAndPlay(currentAlbumIndex, nextIndex);
}

function playPrevious() {
    if (currentAlbumIndex === -1) return;
    let prevIndex = currentTrackIndex - 1;
    const album = MUSIC_DATA[currentAlbumIndex];

    // Only go to previous if we're near start of song
    if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
        playAudio();
    } else {
        if (prevIndex < 0) {
            prevIndex = album.tracks.length - 1; // loop back to the end
        }
        loadAndPlay(currentAlbumIndex, prevIndex);
    }
}

// =======================
// UI UPDATES
// =======================
function updatePlayPauseUI() {
    if (isPlaying) {
        playPauseIcon.classList.remove("fa-play");
        playPauseIcon.classList.add("fa-pause");
    } else {
        playPauseIcon.classList.remove("fa-pause");
        playPauseIcon.classList.add("fa-play");
    }
}

function updateProgressBar() {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;

    if (duration > 0) {
        const percent = (currentTime / duration) * 100;
        progressBarFill.style.width = percent + "%";

        currentTimeDisplay.textContent = formatTime(currentTime);
        totalTimeDisplay.textContent = formatTime(duration);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function setProgress(e) {
    if (audioPlayer.src === "") return;

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
}

function setVolume() {
    audioPlayer.volume = volumeSlider.value;

    if (audioPlayer.volume === 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } else if (audioPlayer.volume < 0.5) {
        volumeIcon.className = "fa-solid fa-volume-low";
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }
}

function toggleMute() {
    if (audioPlayer.volume > 0) {
        volumeSlider.value = 0;
    } else {
        volumeSlider.value = 1;
    }
    setVolume();
}

function showErrorToast() {
    errorToast.classList.remove("hidden");
    setTimeout(() => {
        errorToast.classList.add("hidden");
    }, 4000);
}

// =======================
// EVENT LISTENERS
// =======================
function setupEventListeners() {
    backBtn.addEventListener("click", goBackToAlbums);

    playPauseBtn.addEventListener("click", togglePlayPause);
    nextBtn.addEventListener("click", playNext);
    prevBtn.addEventListener("click", playPrevious);

    audioPlayer.addEventListener("timeupdate", updateProgressBar);
    audioPlayer.addEventListener("ended", playNext);

    audioPlayer.addEventListener("loadedmetadata", () => {
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    });

    progressBarBg.addEventListener("click", setProgress);
    volumeSlider.addEventListener("input", setVolume);
    volumeIcon.addEventListener("click", toggleMute);
}

// Start
document.addEventListener("DOMContentLoaded", init);
