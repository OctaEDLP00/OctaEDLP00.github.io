/**
 * Calculates the remaining time until the match starts.
 * @returns {Object} An object containing days, hours, minutes, and seconds remaining.
 */
function getRemainingTime() {
    const now = new Date();
    const matchTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);
    
    if (now > matchTime) {
        matchTime.setDate(matchTime.getDate() + 1);
    }
    
    const diff = matchTime - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
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
    const timer = document.getElementById('timer');
    const time = getRemainingTime();
    
    timer.textContent = `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
}

// Update the timer every second
setInterval(updateTimer, 1000);

// Initial update
updateTimer();

