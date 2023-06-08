const textarea = document.querySelector("textarea"),
  voiceList = document.querySelector("select"),
  speechBtn = document.querySelector("button");

let synth = speechSynthesis,
  isSpeaking = true;


function voices() {
  for (let voice of synth.getVoices()) {
    //selecting "Google US English" voice as default
    let selected = voice.name === "Google US English" ? "selected" : "";
    //creating an option tag with passing voice name and voice language
    let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option); //inserting options
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    //if the available device voice name is equal to the user selected voice
    // then set the speech voice to user selected voice

    if (voice.name === voiceList.value) {
      utternance.voice = voice;
    }
  }
  speechSynthesis.speak(utternance); // speak the speech/utternance
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    if (!synth.speaking) {
      // if an utternance/speech is not currently in the process of speech
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      // if isSpeaking is true then change its value to false and resume
      //else change its value to true and pause the speech
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Convert to speech";
        } else {
        }
      }, 500);
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume Speech";
      }
    } else {
      speechBtn.innerText = "Convert to Speech";
    }
  }
});
