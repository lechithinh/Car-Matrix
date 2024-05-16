import { car } from "./createCar.js"
import { endFuels } from "./createFuels.js"
import { selected_obstacle, create_obstacle, createLevel } from "./createLevel.js"
import { ground } from "./createGround.js";
function endLevel() {
    endFuels();
    // endTrees();
    // endBoxes();

    for( const obs of selected_obstacle){
        console.log(obs)
        create_obstacle[obs](false);
    }
    updateStatus();
    stopTimer();

    setTimeout(createLevel, 2000);
}

function resetGame() {
    car.reset();

    // added in step 1
    resetTimer();

    // added in step 2
    fuelLeft = 100;

    // added in step 3
    if (score > record) {
        record = score;
        window.localStorage.setItem('record', record);
    }
    score = 0;

    updateScoreDisplay();
    updateRecordDisplay();
}

/**
 *
 * STEP 1
 * ------
 * Create timer.
 * Make sure to update resetGame above.
 */

var time = 15;
var timer;

function startTimer() {
    time += 10;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    time -= 1;
    updateTimeDisplay();

    // Added in step 2
    fuelLeft -= 5;
    updateFuelDisplay();

    if (time <= 0 || fuelLeft <= 0) {
        alert('Game over');
        resetGame();
    }
}

function resetTimer() {
    stopTimer();
    startTimer();
}

function stopTimer() {
    clearInterval(timer);
}

/********** End step 1 **********/

/**
 *
 * STEP 2
 * ------
 * Add fuel.
 * Make sure to update resetGame above.
 */

var fuelLeft;

function updateStatus() {
    fuelLeft = Math.min(100, fuelLeft + 25);
    updateFuelDisplay();

    // added in step 3
    score += 1;
    updateScoreDisplay();
}

/********** End step 2 **********/

/**
 *
 * STEP 3
 * ------
 * Add score and record!
 * Make sure to update resetGame above.
 */

var score;
var record = window.localStorage.getItem('record', 0);

/********** End step 3 **********/

function updateTimeDisplay() {
    document.getElementById('time').innerHTML = time;
}

function updateFuelDisplay() {
    document.getElementById('fuel').style.width = fuelLeft.toString() + '%';
}

function updateScoreDisplay() {
    document.getElementById('score').innerHTML = score;
}

function updateRecordDisplay() {
    document.getElementById('record').innerHTML = record;
}


export{startTimer,resetGame,endLevel}