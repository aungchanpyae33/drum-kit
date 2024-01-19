const name2 = [
  "beat",
  "phone",
  "edm",
  "flute",
  "car",
  "lincoin",
  "guiter",
  "trash",
];

let words = "";
// generate html
for (let i = 1; i < name2.length + 1; i++) {
  const audioElement = document.createElement("audio");
  audioElement.src = `/sounds/sound_${i}.wav`;

  const buttonElement = document.createElement("button");
  buttonElement.className = `play${i}`;
  buttonElement.textContent = name2[i - 1];

  const buttonLoopStop = document.createElement("button");
  buttonLoopStop.textContent = "loop";
  buttonLoopStop.className = `loop${i}`;

  const soundContainer = document.createElement("div");
  soundContainer.className = "sound-container";

  soundContainer.append(audioElement, buttonElement, buttonLoopStop);

  document.querySelector(".button-container").appendChild(soundContainer);

  // click event in container to avoid multiple click event
  document.querySelector(".container").addEventListener("click", (e) => {
    const targetElement = e.target;
    console.log(targetElement);
    if (targetElement.classList.contains(`play${i}`)) {
      console.log("hi");
      audioElement.play();
    } else if (targetElement.classList.contains(`loop${i}`)) {
      loop(targetElement, audioElement);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === name2[i - 1][0]) {
      audioElement.play();
    }
  });
  // make another ele to use in loop function;
  // hotkeys is a specail key event package;
  hotkeys(`shift+${name2[i - 1][0]}`, function () {
    const ele = document.querySelector(`.loop${i}`);
    loop(ele, audioElement);
  });
}

function loop(targetElement, audioElement) {
  if (targetElement.textContent === "loop") {
    audioElement.play();
    audioElement.loop = true;
    targetElement.textContent = "stopLoop";
  } else {
    audioElement.pause();
    // reset from loops
    audioElement.currentTime = 0;
    audioElement.loop = false;
    targetElement.textContent = "loop";
  }
}
