let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.querySelector('.display');
const lapsContainer = document.querySelector('.laps ul');

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    display.innerText = '00:00:00.00';
    lapsContainer.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.innerText = lapTime;
        lapsContainer.appendChild(lapItem);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.innerText = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return ` ${hours}:${minutes}:${seconds}.${milliseconds} `;
}