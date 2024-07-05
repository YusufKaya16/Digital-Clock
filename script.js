const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const second = document.querySelector("#second");
const modeSelect = document.querySelector("#mode");
const inputArea = document.querySelector("#input-area");
const buttonGroup = document.querySelector("#button-group");
const allButtons = [...buttonGroup.children];
const hourInput = document.querySelector("#hour-input");
const minuteInput = document.querySelector("#minute-input");
const secondInput = document.querySelector("#second-input");
const allInputs = [...document.querySelectorAll(".number-in")];


const clock = () => {
  const time = new Date();
  hour.innerHTML =
    time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  minute.innerHTML =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  second.innerHTML =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
};

const clearValues = () => {
  hour.innerHTML = "00";
  minute.innerHTML = "00";
  second.innerHTML = "00";
};

const clearInputs = () => {
    hourInput.value = "";
    minuteInput.value = "";
    secondInput.value = "";
}

let timing;
let timerVar;
let countdownVar;
let x = 0;

let tempHour = 0;
let tempMin = 0;
let tempSec = 0;

window.addEventListener("load", ()=>{
    timing = setInterval(clock, 1000);
});

// Mode selecting
modeSelect.addEventListener("change", (event) => {
  const mode = event.target.value;
  clearInputs();

  if (mode === "clock") {
    inputArea.classList.remove("inputChangeClass");
    buttonGroup.classList.remove("buttonChangeClass");
    timing = setInterval(clock, 1000);
    clearInterval(timing);
    clearInterval(countdownVar);

  } else if (mode === "timer") {
    buttonGroup.classList.add("buttonChangeClass");
    inputArea.classList.remove("inputChangeClass");
    clearValues();
    clearInterval(timing);
    clearInterval(countdownVar);

  } else {
    clearValues();
    clearInterval(timing);
    clearInterval(timerVar);
    inputArea.classList.add("inputChangeClass");
    buttonGroup.classList.add("buttonChangeClass");
  }
});

const setValues = (hourVal, minuteVal, secondVal)=>{
  hour.innerHTML = (hourVal < 10) && (hourVal !== "00") ? "0" + hourVal : hourVal;
  minute.innerHTML = (minuteVal < 10) && (minuteVal !== "00") ? "0" + minuteVal : minuteVal;
  second.innerHTML = (secondVal < 10) && (secondVal !== "00") ? "0" + secondVal : secondVal;
}

const getInnerHTML = ()=> ([hour.innerHTML, minute.innerHTML, second.innerHTML]);

for (let button of allButtons) {
  button.addEventListener("click", (event) => {
    let buttonType = event.target.dataset.buttontype;

    if(buttonType === "start"){
      if(modeSelect.value === "countdown"){
        setValues(tempHour, tempMin, tempSec);
        countdownVar = setInterval(countdownStart, 1000);
      }
      else{
        timerVar = setInterval(timerStart, 1000);
      }
    }
    
    else if(buttonType === "stop"){
      if(modeSelect.value === "countdown"){
        [tempHour, tempMin, tempSec] = getInnerHTML();
        clearInterval(countdownVar);
      }
      else{
        [hourCounter, minCounter, secCounter] = getInnerHTML();
        clearInterval(timerVar);
      }
    }
    
    else{
      if(modeSelect.value === "countdown"){
        tempHour = hourInput.value;
        tempMin = minuteInput.value;
        tempSec = secondInput.value;
        setValues(tempHour, tempMin, tempSec);
      }
      else{
        secCounter = 0;
        minCounter = 0;
        hourCounter = 0;
        clearValues();
        clearInterval(timerVar);
      }
    }

  });
}

for(let input of allInputs){
  input.addEventListener('change', (event) =>{
    if(event.target.id === "hour-input"){
      tempHour = hourInput.value;
    }
    else if(event.target.id === "minute-input"){
      tempMin = minuteInput.value;
    }
    else{
      tempSec = secondInput.value;
    }
  })
}

const countdownStart = () => {
    
    if(hour.innerHTML === "00" && minute.innerHTML === "00" && second.innerHTML == "00"){
        clearInterval(countdownVar);
    }

    else{

        if(second.innerHTML === "00"){
            second.innerHTML = "60";
            
            if(minute.innerHTML === "00" &&hour.innerHTML !== "00"){
                minute.innerHTML = "59";
                hour.innerHTML = Number(hour.innerHTML) <= 10 ? "0" + (hour.innerHTML - 1) : hour.innerHTML - 1;
            }
            else{
              minute.innerHTML = (Number(minute.innerHTML) <= 10) ? "0" + (minute.innerHTML - 1) : minute.innerHTML - 1;
            }
        }
        second.innerHTML = Number(second.innerHTML) <= 10 ? "0" + (second.innerHTML - 1) : second.innerHTML - 1;
    }
};

let secCounter = 0;
let minCounter = 0;
let hourCounter = 0;

const timerStart = ()=>{
  ++secCounter;
  second.innerHTML = Number(second.innerHTML) < 9 ? "0" + secCounter : secCounter;
  if(second.innerHTML === "60"){
    secCounter = 0;
    ++minCounter;
    minute.innerHTML = Number(minute.innerHTML) < 9 ? "0" + minCounter : minCounter;
    if(minute.innerHTML === "60"){
      minCounter = 0;
      ++hourCounter;
      hour.innerHTML = Number(hour.innerHTML) < 9 ? "0" + hourCounter : hourCounter;
      }
    }
}