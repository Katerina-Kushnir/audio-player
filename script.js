const audioPlay = document.querySelector('.audio-play');
const audioName = document.querySelector('.audio-name');
const audioSinger = document.querySelector('.audio-singer');
const audioBg = document.querySelector('.audio-bg');

const currTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');
const seekAudio = document.querySelector('.seek-audio');

const volumeAudio = document.querySelector('.volume-audio');
const volumeOff = document.querySelector('.fa-volume-off');
const volumeUp = document.querySelector('.fa-volume-up');

const audioRandom = document.querySelector('.audio-random');
const audioPrev = document.querySelector('.audio-prev');
const audioNext = document.querySelector('.audio-next');
const audioPlayPause = document.querySelector('.audio-play-pause');
const audioRepeat = document.querySelector('.audio-repeat');

const wave = document.querySelector('.wave');
const randomIcon = document.querySelector('.fa-random');

const currentAudio = document.createElement('audio');

let audioIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img: 'img/lana_del_rey.jpg',
        name: 'Summertime Sadness',
        singer: 'Lana Del Rey',
        music: 'audio/Lana Del Rey - Summertime Sadness.mp3'
    },    
    {
        img: 'img/Foushee_Deep_End.jpg',
        name: 'Deep End',
        singer: 'Foushee',
        music: 'audio/Foushee - Deep End.mp3'
    },
    {
        img: 'img/take_yoy_dancing.jpg',
        name: 'Take You Dancing',
        singer: 'Jason Derulo',
        music: 'audio/Jason Derulo - Take You Dancing.mp3'
    },
    {
        img: 'img/carlas_dreams.jpg',
        name: 'Sub Pielea Mea',
        singer: "Carla's Dreams ",
        music: "audio/Carla's Dreams - Sub Pielea Mea.mp3"
    },

    {
        img: 'img/Nippandab_Balenciaga.jpg',
        name: 'Balenciaga',
        singer: 'Nippandab',
        music: 'audio/Nippandab - Balenciaga.mp3'
    },
    {
        img: 'img/Batuque.jpg',
        name: 'Batuque (Jeremy Sole & Atropolis Remix)',
        singer: 'Dom La Nena',
        music: 'audio/Dom La Nena - Batuque (Jeremy Sole & Atropolis Remix).mp3'
    },
    {
        img: 'img/Give_Us_A_Little_Love.jpg',
        name: 'Give Us A Little Love',
        singer: 'Fallulah, Fridolin Nordso',
        music: 'audio/Fallulah, Fridolin Nordso - Give Us A Little Love.mp3'
    }
];

loaderTrack(audioIndex);

function loaderTrack(audioIndex) {
    clearInterval(updateTimer);
    reset();

    currentAudio.src = musicList[audioIndex].music;
    currentAudio.load();

    audioBg.style.backgroundImage = "url(" + musicList[audioIndex].img + ")";
    audioName.textContent = musicList[audioIndex].name;
    audioSinger.textContent = musicList[audioIndex].singer;
    audioPlay.textContent = "Playing music " + (audioIndex + 1) + " of " + musicList.length;

    updateTimer = setInterval(setUpdate, 1000);

    currentAudio.addEventListener('ended', nextAudio);
    randomBgColor();
}

function randomBgColor() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];

    function populate(a) {
        for(let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x]
            a += y;
        }
        return a;
    }
    let color1 = populate('#');
    let color2 = populate('#');
    const angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + color1 + ',' + color2 + ')';
    document.body.style.background = gradient;
}

function reset() {
    currTime.textContent = '00:00';
    totalDuration.textContent = '00:00';
    seekAudio.value = 0;
}

function randomAudio() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatAudio() {
    let currentIndex = audioIndex;
    loaderTrack(currentIndex);
    playAudio();
}
function playPauseAudio() {
    isPlaying ? pauseAudio() : playAudio();
}
function playAudio() {
    currentAudio.play();
    isPlaying = true;
    audioBg.classList.add('rotate');
    wave.classList.add('loader');
    audioPlayPause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}
function pauseAudio() {
    currentAudio.pause();
    isPlaying = false;
    audioBg.classList.remove('rotate');
    wave.classList.remove('loader');
    audioPlayPause.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}
function nextAudio() {
    if(audioIndex < musicList.length - 1 && isRandom === false) {
        audioIndex += 1;
    } else if(audioIndex < musicList.length - 1 && isRandom === true) {
        let randomIndex = Number.parseInt(Math.random() * musicList.length);
        audioIndex = randomIndex;
    } else {
        audioIndex = 0;
    }
    loaderTrack(audioIndex);
    playAudio();
}
function prevAudio() {
    if(audioIndex > 0) {
        audioIndex -= 1;
    } else {
        audioIndex = musicList.length - 1;
    }
    loaderTrack(audioIndex);
    playAudio();
}
function seekTo() {
    let seekToValue = currentAudio.duration * (seekAudio.value / 100);
    currentAudio.currentTime = seekToValue;
}
function volumeOffAudio() {
    volumeAudio.value = 0;
    currentAudio.volume = 0;
    volumeOff.classList.add('not-volume');
    volumeUp.classList.remove('up-volume');
}
function volumeUpAudio() {
    volumeAudio.value = 100;
    currentAudio.volume = 1;
    volumeUp.classList.add('up-volume');
    volumeOff.classList.remove('not-volume');
}
function setVolume() {
    currentAudio.volume = volumeAudio.value / 100;
    volumeOff.classList.remove('not-volume');
    volumeUp.classList.remove('up-volume');
}

function setUpdate() {
    let seekPosition = 0;
    if(!isNaN(currentAudio.duration)) {
        seekPosition = currentAudio.currentTime * (100 / currentAudio.duration);
        seekAudio.value = seekPosition;

        let currentMinutes = Math.floor(currentAudio.currentTime / 60);
        let currentSeconds = Math.floor(currentAudio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentAudio.duration / 60);
        let durationSeconds = Math.floor(currentAudio.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = '0' + currentSeconds;}
        if(durationSeconds < 10) {durationSeconds = '0' + durationSeconds;}
        if(currentMinutes < 10) {currentMinutes = '0' + currentMinutes;}
        if(durationMinutes < 10) {durationMinutes = '0' + durationMinutes;}

        currTime.textContent = currentMinutes + ':' + currentSeconds;
        totalDuration.textContent = durationMinutes + ':' + durationSeconds;
    }
}