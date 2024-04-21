import { car } from "./createCar.js";

var left = 37;
var right = 39;
var up = 38;
var down = 40;

function createControls() {
    document.addEventListener(
        'keydown',
        function( ev ) {
            var key = ev.code;

            if (key === 'ArrowLeft') { // Use 'ArrowLeft' for the left arrow key
                car.turnLeft();
            }
            if (key === 'ArrowRight') { // Use 'ArrowRight' for the right arrow key
                car.turnRight();
            }
            if (key === 'ArrowUp') { // Use 'ArrowUp' for the up arrow key
                car.moveForward();
            }
            if (key === 'ArrowDown') { // Use 'ArrowDown' for the down arrow key
                car.moveBackward();
            }
        }
    );

    document.addEventListener(
        'keyup',
        function( ev ) {
            var key = ev.code;

            if (key === 'ArrowLeft') {
                car.stopLeft();
            }
            if (key === 'ArrowRight') {
                car.stopRight();
            }
            if (key === 'ArrowUp') {
                car.stopForward();
            }
            if (key === 'ArrowDown') {
                car.stopBackward();
            }
        }
    );
}


export {createControls}