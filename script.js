console.log("Colorfull stopper");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const historyBtn = document.querySelector(".history");
const infoParagraphEl = document.querySelector('.info')
const modalShadowEl = document.querySelector('.modal-shadow')

const stopwatchParagraphEl = document.querySelector(".stopwatch");
const timeParagraphEl = document.querySelector(".time");

const timeListEl = document.querySelector('.time-list')

let intervalCounter = null;
let seconds = 0;
let archiwumArr = [];

const startBtnHandler = () => {
  clearInterval(intervalCounter);
  timeParagraphEl.setAttribute("style", "visibility: hidden");
  intervalCounter = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    if (minutes <= 9 && seconds <= 9)
      stopwatchParagraphEl.textContent = `0${minutes}:0${seconds}`;
    if (minutes <= 9 && seconds >= 10)
      stopwatchParagraphEl.textContent = `0${minutes}:${seconds}`;
    if (minutes >= 10 && seconds <= 9)
      stopwatchParagraphEl.textContent = `${minutes}:0${seconds}`;
    if (minutes >= 10 && seconds >= 10)
      stopwatchParagraphEl.textContent = `${minutes}:${seconds}`;
  }, 500);
};

pauseBtnHandler = () => {
  clearInterval(intervalCounter);
};

const clearStuff = () => {
  clearInterval(intervalCounter);
  stopwatchParagraphEl.textContent = "00:00";
  timeListEl.textContent = ''
  seconds = 0;
};

stopBtnHandler = () => {
  const pausedTime = stopwatchParagraphEl.textContent;
  archiwumArr.push(pausedTime);
  if (pausedTime !== "00:00") {
    timeParagraphEl.textContent = `Ostatni czas: ${pausedTime}`;
    timeParagraphEl.setAttribute("style", "visibility: visible");
  }
  clearStuff();
};

resetBtnHandler = () => {
  clearStuff();
  timeParagraphEl.setAttribute("style", "visibility: hidden");
  archiwumArr = [];
};

archiwumShowHandler = () => {
  timeListEl.textContent = ''
  archiwumArr.forEach((el, index) => {
    const liItem = document.createElement('li')
    liItem.innerHTML = `Wynik nr ${index+1}: <span>${el}<span>`
    timeListEl.append(liItem)
  })
}

showInfoHandler = () =>{
  modalShadowEl.setAttribute('style', 'visibility: visible')
  modalShadowEl.classList.add('modal-animation')

  const closeModalBtnEl = document.querySelector('.close')
  closeModalBtnEl.addEventListener('click', closeInfoHandler)
}

closeInfoHandler = () => {
  modalShadowEl.setAttribute('style', 'visibility: hidden')
  modalShadowEl.classList.remove('modal-animation')
}

startBtn.addEventListener("click", startBtnHandler);
pauseBtn.addEventListener("click", pauseBtnHandler);
stopBtn.addEventListener("click", stopBtnHandler);
resetBtn.addEventListener("click", resetBtnHandler);
historyBtn.addEventListener("click", archiwumShowHandler);
infoParagraphEl.addEventListener('click', showInfoHandler)
window.addEventListener('click', e => e.target === modalShadowEl ? closeInfoHandler() : false)