const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const targetDateInput = document.getElementById('target-date');
const messageDiv = document.getElementById('message');

// Elements to display the countdown
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let countdownInterval;
let paused = false;
let remainingTime; // To store remaining time in case of pause

// Start countdown on button click
startButton.addEventListener('click', () => {
    const targetDateValue = targetDateInput.value;

    if (!targetDateValue) {
        messageDiv.textContent = 'Please select a valid date and time.';
        return;
    }

    const targetDate = new Date(targetDateValue);

    // Clear any existing interval
    clearInterval(countdownInterval);

    // Hide the start button and show the pause button
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    messageDiv.textContent = '';

    // Start countdown
    countdownInterval = setInterval(() => {
        updateCountdown(targetDate);
    }, 1000);
});

// Function to handle pause/resume
pauseButton.addEventListener('click', () => {
    if (!paused) {
        // Pause the countdown
        clearInterval(countdownInterval);
        pauseButton.textContent = 'Resume';
        paused = true;
    } else {
        // Resume the countdown
        const targetDate = new Date(new Date().getTime() + remainingTime);

        countdownInterval = setInterval(() => {
            updateCountdown(targetDate);
        }, 1000);
        pauseButton.textContent = 'Pause';
        paused = false;
    }
});

// Function to update the countdown
function updateCountdown(targetDate) {
    const currentTime = new Date().getTime();
    const targetTime = targetDate.getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        messageDiv.textContent = 'Countdown completed!';
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        startButton.style.display = 'inline-block';
        pauseButton.style.display = 'none';
        return;
    }

    // Store the remaining time for pause/resume feature
    remainingTime = timeDifference;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}
