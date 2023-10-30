const textArea = document.querySelector("#text-area");
const answerArea = document.querySelector("#origin-text");
const theTimer = document.querySelector(".timer");
const textWrapper = document.querySelector(".text-wrapper");
const resetButton = document.querySelector("#reset");

const ANSWER_SHEET = [
  "Muitas vezes coisas boas não são ditas por ter medo de falar, e o que devemos aprender é que devemos apreciar as pessoas enquanto ainda vivem.",
  "Dizem que ele é o herói que Gotham merece, mas não é o que ela precisa agora. Vamos caçá-lo porque ele aguenta, porque ele não é um herói. É um guardião silencioso. Um Cavaleiro das Trevas!",
  "Frente ao inegável fato de que a existência humana é louca, casual e sem finalidade, um em cada oito deles fica piradinho! E quem pode culpá-los? Num mundo psicótico como este qualquer outra reação seria loucura!",
];

let timer = [0, 0, 0, 0];
let interval;
let timerRunning = false;

function spellCheck() {
  const typedText = textArea.value;
  const answerText = answerArea.innerText;

  if (typedText === answerText) {
    clearInterval(interval);
    textWrapper.style.borderColor = "#429890";
  } else {
    textWrapper.style.borderColor = "#E95D0F";
  }
}

function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

function runTimer() {
  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

function start() {
  let textEnteredLength = textArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

async function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;

  textArea.value = "";
  theTimer.innerHTML = "00:00:00";
  textWrapper.style.borderColor = "grey";

  const answerSheetValue = await getAnwerSheet();
  answerArea.innerText = answerSheetValue;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

textArea.addEventListener("keyup", spellCheck, false);
textArea.addEventListener("keypress", start, false);
resetButton.addEventListener("click", reset, false);

async function getAnwerSheet() {
  const defer = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ANSWER_SHEET[getRandomInt(3)]);
    }, 2000);
  });

  return defer.then((data) => {
    return data;
  });
}

window.addEventListener("load", async (event) => {
  const answerSheetValue = await getAnwerSheet();
  answerArea.innerText = answerSheetValue;
});
