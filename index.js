/**
 * Calculates the remaining time until the match starts.
 * @param {string | Date} [targetDate]
 * @typedef {{ days: string, hours: string, minutes: string, seconds: string }} RemainingTime
 * @returns {RemainingTime} An object containing days, hours, minutes, and seconds remaining.
 */
function getRemainingTime(targetDate) {

  if (!targetDate)
    throw new Error('No targetDate provided. Please provide a date string or Date object')

  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate

  if (isNaN(target.getTime())) {
    throw new Error('Invalid date format. Provide a valid Date object or date string')
  }

  const now = new Date()

  // @ts-ignore
  const diff = target - now

  if (diff <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    }
  }

  const days = (Math.floor(diff / (1000 * 60 * 60 * 24))).toString()
  const hours = (Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).toString().padStart(2, '0')
  const minutes = (Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0')
  const seconds = (Math.floor((diff % (1000 * 60)) / 1000)).toString().padStart(2, '0')

  return {
    days,
    hours,
    minutes,
    seconds
  }
}

/**
 * Updates the countdown timer display.
 */
function updateTimer() {
  /** @type {HTMLDivElement | null} */
  const timer = document.querySelector('#timer')
  if (!timer) throw new Error('Timer not defined or not exixts')

  const { days, hours, minutes, seconds } = getRemainingTime('2024-12-21T21:00:00')

  if (Number(days) === 0) {
    timer.textContent = `${hours}:${minutes}:${seconds}`
  } else if (Number(days) === 0 && Number(hours) === 0) {
    timer.textContent = `${minutes}:${seconds}`
  } else {
    timer.textContent = `${days} dias ${hours}:${minutes}:${seconds}`
  }
}

// Update the timer every second
setInterval(updateTimer, 1000)

// Initial update
updateTimer()

