//lets select all required tags or elements

const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  mainAudio = wrapper.querySelector("#main-audio"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  progressBar = wrapper.querySelector(".progress-bar"),
  progressArea = wrapper.querySelector(".progress-area"),
  musicList = wrapper.querySelector(".music-list"),
  showMoreBtn = wrapper.querySelector("#more-music"),
  hideMusicBtn = musicList.querySelector("#close");

//load random music on page refresh
let musicIndex = Math.floor(Math.random() * allMusic.length + 1);

window.addEventListener("load", () => {
  loadMusic(musicIndex); //calling load music function once window object is called
  playingNow();
});

//load music function
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

//play music function
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

//pause music function
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

//next music function
function nextMusic() {
  //here we'll just increment index by 1
  musicIndex++;
  //if musicindex is greater than array length then musicIndex will be array length so the last song will play
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

//prev music function
function prevMusic() {
  //here we'll just decrement index by 1
  musicIndex--;
  //if musicindex is less than 1 then musicIndex will be 1 so the first song will play
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}
//play or music button evenet
playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  //if isMusicPaused is true then call pause Music else call playMusic
  isMusicPaused ? pauseMusic() : playMusic();
  playingNow();
});

//next music btn event
nextBtn.addEventListener("click", () => {
  nextMusic(); //calling next music function
});

//prev music btn event
prevBtn.addEventListener("click", () => {
  prevMusic();
});

//update progress bar width according to music current time
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; //getting current time
  const duration = e.target.duration; //getting total duration of time
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

  mainAudio.addEventListener("loadeddata", () => {
    //update song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);

    if (totalSec < 10) {
      //adding 0 if sec is less than 10
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  //update playing song current time
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  if (currentSec < 10) {
    //adding 0 if sec is less than 10
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//lets update playing song current time according to the progress bar width
progressArea.addEventListener("click", (e) => {
  let progressWidthval = progressArea.clientWidth; //getting width of progress bar
  let clickedOffsetX = e.offsetX; //getting offset x value
  let songDuration = mainAudio.duration; //getting song total duration

  mainAudio.currentTime = (clickedOffsetX / progressWidthval) * songDuration;
  playMusic();
});

//lets work on repeat, shuffle song according to the icon

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
  //first we get the innerText of the icon then we'll change accordingly
  let getText = repeatBtn.innerText; //getting innerText of icon
  //lets do different changes on different icon click using switch
  switch (getText) {
    case "repeat": //if this icon is repeat then change it to repeat_one
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one": //if this icon is repeat_one then change it to shuffle
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffle");
      break;
    case "shuffle": //if this icon is shuffle then change it to repeat
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

//above we just change the icon, now lets work on what to do
//after the song ended

mainAudio.addEventListener("ended", () => {
  //we'll do according to the icons means if user has set icon to loop song then we'll repeat
  //the current song and will do fyrther accordingly

  let getText = repeatBtn.innerText; //getting innertext of icon
  //lets do different changes on different icon click using switch

  switch (getText) {
    case "repeat": //if this icon is repeat then simply call the nextMusic function so the next song will be played
      nextMusic();
      break;
    case "repeat_one": //if this icon is repeat_one then we'll change the current playing song current time to 0 so song will play from beginning
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle": //if this icon is shuffle then change it to repeat
      //generating random index between the max range of array length
      let randIndex = Math.floor(Math.random() * allMusic.length + 1);
      do {
        randIndex = Math.floor(Math.random() * allMusic.length + 1);
      } while (musicIndex == randIndex); //this loop run until next random number wont be same of current music index
      musicIndex = randIndex; //passing random index to music index so that random music will play
      loadMusic(musicIndex); //calling loadMusic function
      playMusic(); //calling playMusic function
      playingNow();
      break;
  }
});

showMoreBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
  showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

//lets create li according to the array length
for (let i = 0; i < allMusic.length; i++) {
  //lets pass the song name, artist from the array to li
  let liTag = `<li li-index="${i + 1}">
  <div class="row">
  <span>${allMusic[i].name}</span>
  <p>${allMusic[i].artist}</p>
  </div>
  <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
  <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
  </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let audioDuration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      //adding 0 if sec is less than 10
      totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    //adding t duration attribute which we'll use below
    liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  });
}

//lets add onclick attribute in all li
const allLiTags = ulTag.querySelectorAll("li");
function playingNow() {
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration");
    //lets remove playing class from all other li expect the last one which is clicked
    if (allLiTags[j].classList.contains("playing")) {
      allLiTags[j].classList.remove("playing");
      //lets get that audio duration value and pass to .audio-duration innertext
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration; //passing t-duration value to audio-duration innertext
    }
    //if there is an li tag which li-index is equal to musicIndex
    //then this music is playing now and we'll style it
    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }

    //adding onclick attribute in all li ltags
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}
//lets play song on li click
function clicked(element) {
  //getting li index of particular clicked li tag
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //passing that liindex to musicindec
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}
