/**
 * Calculates the remaining time until the match starts.
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }} An object containing days, hours, minutes, and seconds remaining.
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
  
    console.log({ dif, now, matchTime, days, hours, minutes, seconds })
    
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
    /** @type {HTMLDivElement} */
    const timer = document.getElementById('timer');
    const { days, hours, minutes, seconds } = getRemainingTime();

    const formatedDays = hours.toString()
    const formatedHours = hours.toString().padStart(2, '0')
    const formatedMinutes = minutes.toString().padStart(2, '0')
    const formatedSeconds = seconds.toString().padStart(2, '0')

    console.log({ formatedDays, formatedHours, formatedMinutes, formatedSeconds })
    
    if (Number(formatedDays) === 0) {
        timer.textContent = `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
    }
    
    if (Number(formatedDays) === 0 && Number(formatedHours) === 0) {
        timer.textContent = `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
    }
    
    timer.textContent = `${formatedDays} dias ${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
    
}

// Update the timer every second
setInterval(updateTimer, 1000);

// Initial update
updateTimer();

