const { floor, max } = Math

/** @param {number} value */
const alwaysPositive = (value) => max(0, value)

/**
 * Calculates the remaining time until the match starts.
 * @param {Date} targetDate
 * @typedef {{ days: string, hours: string, minutes: string, seconds: string }} RemainingTime
 * @returns {RemainingTime} An object containing days, hours, minutes, and seconds remaining.
 */
function getRemainingTime(targetDate) {
  const currentDate = new Date()

  const diff = targetDate.getTime() - currentDate.getTime()

  const days = alwaysPositive(
    floor(diff / (1000 * 60 * 60 * 24))
  ).toString().padStart(2, '0')

  const hours = alwaysPositive(
    floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).toString().padStart(2, '0')

  const minutes = alwaysPositive(
    floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  ).toString().padStart(2, '0')

  const seconds = alwaysPositive(floor((diff % (1000 * 60)) / 1000)).toString().padStart(2, '0')

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

  const { days, hours, minutes, seconds } = getRemainingTime(new Date(1734825600000))

  if (Number(days) === 0) {
    timer.textContent = `${hours}:${minutes}:${seconds}`
  } else if (Number(days) === 0 && Number(hours) === 0) {
    timer.textContent = `${minutes}:${seconds}`
  } else {
    if (Number(days) > 1) {
      timer.textContent = `${days} dias ${hours}:${minutes}:${seconds}`
    } else (
      timer.textContent = `${days} día ${hours}:${minutes}:${seconds}`
    )
  }
}

const container = document.querySelector('.container')
const fireworks = new Fireworks.default(container)

fireworks.start()

// Update the timer every second
setInterval(updateTimer, 1000)

// Initial update
updateTimer()

