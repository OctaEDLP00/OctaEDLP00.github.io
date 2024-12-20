/**
 * Calculates the remaining time until the match starts.
 * @typedef {{ days: string, hours: string, minutes: string, seconds: string }} RemainingTime
 * @returns {RemainingTime} An object containing days, hours, minutes, and seconds remaining.
 */
function getRemainingTime() {
  const now = new Date();
  const matchTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);
  if (now > matchTime) matchTime.setDate(matchTime.getDate() + 1);

  // @ts-ignore
  const diff = matchTime - now;

  const days = (Math.floor(diff / (1000 * 60 * 60 * 24))).toString();
  const hours = (Math.floor((diff / (1000 * 60 * 60)) % 24)).toString().padStart(2, '0');
  const minutes = (Math.floor((diff / (1000 * 60)) % 60)).toString().padStart(2, '0');
  const seconds = (Math.floor((diff / 1000) % 60)).toString().padStart(2, '0');

  return {
    days,
    hours,
    minutes,
    seconds
  };
}

/**
 * Updates the countdown timer display.
 */
function updateTimer() {
  /** @type {HTMLDivElement | null} */
  const timer = document.querySelector('#timer');
  if (!timer) throw new Error('Timer not defined or not exixts');

  const { days, hours, minutes, seconds } = getRemainingTime();


  if (Number(days) === 0) {
    timer.textContent = `${hours}:${minutes}:${seconds}`;
  } else if (Number(days) === 0 && Number(hours) === 0) {
    timer.textContent = `${minutes}:${seconds}`;
  } else {
    timer.textContent = `${days} dias ${hours}:${minutes}:${seconds}`;
  }
}

// Update the timer every second
setInterval(updateTimer, 1000);

// Initial update
updateTimer();

