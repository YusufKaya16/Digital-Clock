const digits = document.querySelectorAll(".digit");
const modeSelector = document.querySelector(".form-select");
const buttons = document.querySelectorAll(".btn");
const buttonGroup = document.querySelector("#button-group");
const inputGroup = document.querySelector("#input-area");
const hourInput = document.querySelector("#hour-input");
const minuteInput = document.querySelector("#minute-input");
const secondInput = document.querySelector("#second-input");

// global variables
let timing;

// all events
(function addEvents() {
  buttons.forEach((button) => {
    button.addEventListener("click", handleButton);
  });

  modeSelector.addEventListener("change", handleMode);

  hourInput.addEventListener("input", handleInputChange);
  minuteInput.addEventListener("input", handleInputChange);
  secondInput.addEventListener("input", handleInputChange);

  window.addEventListener("DOMContentLoaded", () => {
    timing = setInterval(clock, 1000);
  });
})();

// handle input change event
const handleInputChange = (event) => {
  const input = event.target.name;
  const value = event.target.value;
  if (input === "hour") {
    digits[0].textContent =
      value < 9 ? String(value).padStart(2, "0") : String(value);
  } else if (input === "minute") {
    digits[1].textContent =
      value < 9 ? String(value).padStart(2, "0") : String(value);
  } else {
    digits[2].textContent =
      value < 9 ? String(value).padStart(2, "0") : String(value);
  }
};

// handle event button
const handleButton = (event) => {
  const btnType = event.target.dataset.buttontype;
  const mode = modeSelector.value;

  if (mode === "timer") {
    if (btnType === "start") {
      timing = setInterval(timerHandle, 1000);
    } else if (btnType === "stop") {
      clearInterval(timing);
    } else {
      clearInterval(timing);
      resetDigits();
    }
  } else if (mode === "countdown") {
    if (btnType === "start") {
      countdownHandle();
    } else if (btnType === "stop") {
      clearInterval(timing);
    } else {
      clearInterval(timing);
      resetDigits();
      resetInput();
    }
  }
};

// handle event mode
const handleMode = (event) => {
  const mode = event.target.value;
  resetDigits();
  clearInterval(timing);

  if (mode === "clock") {
    buttonGroup.classList.remove("buttonsVisible");
    inputGroup.classList.remove("inputsVisible");
    timing = setInterval(clock, 1000);
  } else if (mode === "timer") {
    buttonGroup.classList.add("buttonsVisible");
    inputGroup.classList.remove("inputsVisible");
    clearInterval(timing);
  } else {
    buttonGroup.classList.add("buttonsVisible");
    inputGroup.classList.add("inputsVisible");
    clearInterval(timing);
  }
};

const clock = () => {
  // Date object works according to the system time of a browser
  const clk = new Date(Date.now());
  setDisplay(clk.getHours(), clk.getMinutes(), clk.getSeconds());
};

const setDisplay = (hour, minute, second) => {
  digits[0].textContent = hour < 9 ? `0${hour}` : hour;
  digits[1].textContent = minute < 9 ? `0${minute}` : minute;
  digits[2].textContent = second < 9 ? `0${second}` : second;
};

const resetDigits = () => {
  digits.forEach((digit) => (digit.textContent = "00"));
};

const resetInput = () => {
  hourInput.value = "";
  minuteInput.value = "";
  secondInput.value = "";
};

const timerHandle = () => {
  digits[2].textContent =
    Number(digits[2].textContent) < 9
      ? String(Number(digits[2].textContent) + 1).padStart(2, "0")
      : String(Number(digits[2].textContent) + 1);

  if (Number(digits[2].textContent) > 59) {
    digits[2].textContent = "00";
    digits[1].textContent =
      Number(digits[1].textContent) < 9
        ? String(Number(digits[1].textContent) + 1).padStart(2, "0")
        : String(Number(digits[1].textContent) + 1);
  }

  if (Number(digits[1].textContent) > 59) {
    digits[1].textContent = "00";
    digits[0].textContent =
      Number(digits[0].textContent) < 9
        ? String(Number(digits[0].textContent) + 1).padStart(2, "0")
        : String(Number(digits[0].textContent) + 1);
  }
};

const countdownHandle = () => {
  clearInterval(timing);

  let totalSeconds =
    parseInt(hourInput.value) * 3600 +
      parseInt(minuteInput.value) * 60 +
      parseInt(secondInput.value) || 0;

  if (totalSeconds <= 0) {
    alert("Lütfen saat, dakika ve saniye bilgisi girin!");
    clearInterval(timing);
    return;
  }

  function updateTimer() {
    const hrs = String(Math.floor(totalSeconds / 3600));
    const mins = String(Math.floor((totalSeconds % 3600) / 60));
    const secs = String(totalSeconds % 60);

    digits[0].textContent = hrs.padStart(2, "0");
    digits[1].textContent = mins.padStart(2, "0");
    digits[2].textContent = secs.padStart(2, "0");

    if (totalSeconds <= 0) {
      clearInterval(timing);
      resetDigits();
      resetInput();
      alert("Geri sayım bitti!!");
    }
    totalSeconds--;
  }

  updateTimer();
  timing = setInterval(updateTimer, 1000);
};
