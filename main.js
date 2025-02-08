const second = document.querySelector('.second');
const text = document.querySelector('.text');
const start = document.querySelector('.button-start');
const stop = document.querySelector('.button-stop');
const reset = document.querySelector('.button-reset');
const timeDisplay = document.querySelector('.time');

function StopWatch() {
  let sec = 0;
  let startTime = 0;
  let handleInterval = null;

  Object.defineProperties(this, {
    sec: {
      get: () => sec,
      set: (value) => (sec = value),
    },
    startTime: {
      get: () => startTime,
      set: (value) => (startTime = value),
    },
    handleInterval: {
      get: () => handleInterval,
      set: (value) => (handleInterval = value),
    },
  });
}

StopWatch.prototype.calcSec = function () {
  const elapsed = Date.now() - this.startTime;
  second.textContent = (elapsed / 1000).toFixed(3);
};

StopWatch.prototype.start = function () {
  if (this.handleInterval) {
    text.textContent = "Stopwatch has already started.";
    return;
  }
  text.textContent = "Started";
  this.startTime = Date.now();
  this.handleInterval = setInterval(() => this.calcSec(), 10);
};

StopWatch.prototype.stop = function () {
  if (!this.handleInterval) {
    text.textContent = "Stopwatch is not running.";
    return;
  }
  clearInterval(this.handleInterval);
  this.handleInterval = null;
  const elapsed = Date.now() - this.startTime;
  second.textContent = (elapsed / 1000).toFixed(3);
  text.textContent = "Stopped";
};

StopWatch.prototype.reset = function () {
  clearInterval(this.handleInterval);
  this.handleInterval = null;
  this.sec = 0;
  this.startTime = 0;
  second.textContent = "0";
  text.textContent = "Reset";
};

StopWatch.prototype.clock = function () {
  setInterval(() => {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString();
  }, 1000);
};

const sw = new StopWatch();
sw.clock();

start.addEventListener('click', () => sw.start());
stop.addEventListener('click', () => sw.stop());
reset.addEventListener('click', () => sw.reset());
