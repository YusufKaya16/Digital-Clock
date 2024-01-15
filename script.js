const display = document.getElementById('display');
const hour = display.querySelector('#hour');
const minute = display.querySelector('#minute');
const second = display.querySelector('#second');
const modeSection = document.getElementById('mode-section');
const mode = modeSection.querySelector('#mode');
const startBtn = modeSection.querySelector('#start');
const stopBtn = modeSection.querySelector('#stop');
const resetBtn = modeSection.querySelector('#reset');
const inputArea = modeSection.querySelector('#input-area');

const inputHour = modeSection.querySelector('#hour-input');
const inputMinute = modeSection.querySelector('#minute-input');
const inputSecond = modeSection.querySelector('#second-input');

// setInterVal return values
let clockID;
let timerID;
let countID;

let startBtnState = 0;

allEvents();

function allEvents() {

    document.addEventListener('DOMContentLoaded', showClock);
    mode.addEventListener('change', modeSelection);
    startBtn.addEventListener('click', startOperation);
    stopBtn.addEventListener('click', stopOperation);
    resetBtn.addEventListener('click', resetOperation);
    inputHour.addEventListener('change', inputHourReset);
    inputMinute.addEventListener('change', inputMinuteReset);
    inputSecond.addEventListener('change', inputSecondReset);

}

function modeSelection(event) {

    const selectedMode = event.target.value;
    startBtnState = 0;

    if (selectedMode === 'clock') {
        mode.dataset.mode = selectedMode;
        clearInterval(timerID);
        clearInterval(countID);
        startBtn.classList.remove('buttonChangeClass');
        stopBtn.classList.remove('buttonChangeClass');
        resetBtn.classList.remove('buttonChangeClass');
        inputArea.classList.remove('inputChangeClass');
        showClock();
    }

    if (selectedMode === 'timer') {
        mode.dataset.mode = selectedMode;
        hour.textContent = 0;
        minute.textContent = 0;
        second.textContent = 0;
        clearInterval(clockID);
        clearInterval(countID);
        startBtn.classList.add('buttonChangeClass');
        stopBtn.classList.add('buttonChangeClass');
        resetBtn.classList.add('buttonChangeClass');
        inputArea.classList.remove('inputChangeClass');
    }

    if (selectedMode === 'countdown') {
        mode.dataset.mode = selectedMode;
        hour.textContent = inputHour.value;
        minute.textContent = inputMinute.value;
        second.textContent = inputSecond.value;
        clearInterval(clockID);
        clearInterval(timerID);
        inputArea.classList.add('inputChangeClass');
        startBtn.classList.add('buttonChangeClass');
        stopBtn.classList.add('buttonChangeClass');
        resetBtn.classList.add('buttonChangeClass');
    }
}

function showClock() {

    clockID = setInterval(() => {
        const clock = new Date();
        hour.textContent = clock.getHours();
        minute.textContent = clock.getMinutes();
        second.textContent = clock.getSeconds();
    }, 1000);

}

function datasetVeri(hour, minute, second) {
    mode.dataset.hour = hour;
    mode.dataset.minute = minute;
    mode.dataset.second = second;
}

function timerShow(saat, dakika, saniye) {

    hour.textContent = saat;
    minute.textContent = dakika;
    second.textContent = saniye;

    timerID = setInterval(() => {
        second.textContent = parseInt(second.textContent) + 1;
        if (second.textContent === '60') {
            minute.textContent = parseInt(minute.textContent) + 1;
            second.textContent = '0';
            if (minute.textContent === '60') {
                hour.textContent = parseInt(hour.textContent) + 1;
                minute.textContent = '0';
                if (hour.textContent === '24') {
                    hour.textContent = '00';
                    if (hour.textContent === '25') {
                        hour.textContent = '1';
                    }
                }
            }
        }
        datasetVeri(hour.textContent, minute.textContent, second.textContent);
    }, 1000);

}

function timerReset() {
    hour.textContent = 0;
    minute.textContent = 0;
    second.textContent = 0;
    mode.dataset.hour = 0;
    mode.dataset.minute = 0;
    mode.dataset.second = 0;
}

function countdownInit(saat, dakika, saniye) {

    hour.textContent = saat;
    minute.textContent = dakika;
    second.textContent = saniye;
    datasetVeri(hour.textContent, minute.textContent, second.textContent);

    // just second
    if (hour.textContent === '0' && minute.textContent === '0' && second.textContent !== '0') {
        countID = setInterval(() => {
            second.textContent = parseInt(second.textContent) - 1;
            if (second.textContent === '0') {
                clearInterval(countID);
            }
            datasetVeri(hour.textContent, minute.textContent, second.textContent);
        }, 1000);
    }

    //just minute
    else if (hour.textContent === '0' && minute.textContent !== '0' && second.textContent === '0') {

        countID = setInterval(() => {
            if (second.textContent === '0' && minute.textContent !== '0') {
                minute.textContent = parseInt(minute.textContent) - 1;
                second.textContent = '59';
            }
            else if (minute.textContent === '0' && second.textContent === '0') {
                clearInterval(countID);
            }
            else {
                second.textContent = parseInt(second.textContent) - 1;
            }
            datasetVeri(hour.textContent, minute.textContent, second.textContent);

        }, 1000);

    }

    //just hour - start stop !!! hata
    else if (hour.textContent !== '0' && minute.textContent === '0' && second.textContent === '0') {
        countID = setInterval(() => {
            if (hour.textContent !== '0' && minute.textContent === '0' && second.textContent === '0') {
                hour.textContent = parseInt(hour.textContent) - 1;
                minute.textContent = '59';
                second.textContent = '59';
            }
            else if (hour.textContent !== '0' && minute.textContent !== '0' && second.textContent === '0') {
                minute.textContent = parseInt(minute.textContent) - 1;
                second.textContent = '59';
            }
            else if (hour.textContent === '0' && minute.textContent === '0' && second.textContent === '0') {
                clearInterval(countID);
            }
            else {
                second.textContent = parseInt(second.textContent) - 1;
            }

            datasetVeri(hour.textContent, minute.textContent, second.textContent);

        }, 1000);
    }

    else {
        countID = setInterval(() => {
            if ((second.textContent === '0' && minute.textContent !== '0' && hour.textContent !== '0')) {
                minute.textContent = parseInt(minute.textContent) - 1;
                second.textContent = '59';
            }
            else if (second.textContent === '0' && minute.textContent === '0' && hour.textContent !== '0') {
                hour.textContent = parseInt(hour.textContent) - 1;
                minute.textContent = '59';
                second.textContent = '59';
            }
            else if (second.textContent === '0' && minute.textContent === '0' && hour.textContent === '0') {
                clearInterval(countID);
            }
            else {
                second.textContent = parseInt(second.textContent) - 1;
            }

            datasetVeri(hour.textContent, minute.textContent, second.textContent);

        }, 1000);
    }
}

function startOperation(event) {

    startBtnState += 1;

    if (mode.dataset.mode === 'timer') {
        if (startBtnState === 1) {
            timerShow(0, 0, 0);
        }
        else {
            timerShow(mode.dataset.hour, mode.dataset.minute, mode.dataset.second);
        }
    }

    if (mode.dataset.mode === 'countdown') {
        if (startBtnState === 1) {
            if (inputHour.value === "" || inputMinute.value === "" || inputSecond.value === "") {
                startBtnState = 0;
                return alert('Enter values for the countdown!');
            }
            mode.dataset.hour = inputHour.value;
            mode.dataset.minute = inputMinute.value;
            mode.dataset.second = inputSecond.value;
            countdownInit(mode.dataset.hour, mode.dataset.minute, mode.dataset.second);
        }

        else {
            if (inputHour.value === "" || inputMinute.value === "" || inputSecond.value === "") {
                startBtnState = 0;
                return alert('Enter values for the countdown!');
            }
            countdownInit(mode.dataset.hour, mode.dataset.minute, mode.dataset.second);
        }
    }

}
function stopOperation(event) {

    if (mode.dataset.mode === 'timer') {
        clearInterval(timerID);
    }

    if (mode.dataset.mode === 'countdown') {
        clearInterval(countID);
    }

}

function resetOperation(event) {
    if (mode.dataset.mode === 'timer') {
        timerReset();
    }

    if (mode.dataset.mode === 'countdown') {
        mode.dataset.hour = inputHour.value;
        mode.dataset.minute = inputMinute.value;
        mode.dataset.second = inputSecond.value;
        hour.textContent = mode.dataset.hour;
        minute.textContent = mode.dataset.minute;
        second.textContent = mode.dataset.second;

    }
}

function inputHourReset(event) {
    hour.textContent = inputHour.value;
    mode.dataset.hour = inputHour.value;
}
function inputMinuteReset(event) {
    minute.textContent = inputMinute.value;
    mode.dataset.minute = inputMinute.value;

}
function inputSecondReset(event) {
    second.textContent = inputSecond.value;
    mode.dataset.second = inputSecond.value;

}
