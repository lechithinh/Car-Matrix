// import * as  THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { createScene, scene } from './createScene.js'
import {createLights} from './createLights.js'
import {createGround} from './createGround.js'
import { createCar } from './createCar.js'
import {createLevel} from './createLevel.js'
import { createControls } from './createControls.js'
import { resetGame } from './addUpdateLogic.js'
import { loop } from './createLoop.js'

// var Colors = {
// 	red:0xf25346,
// 	white:0xd8d0d1,
// 	brown:0x59332e,
// 	pink:0xF5986E,
// 	brownDark:0x23190f,
// 	blue:0x68c3c0,
//     green:0x669900,
//     greenDark:0x496d01,
//     golden:0xff9900
// };


var obstacles, 
    numObstacle, 
    collidableObstacle,
    collidableFuels;

function init_obstacle(){
    collidableObstacle = [[]];
    collidableFuels = [];
    obstacles= [[]];
    numObstacle = 10

}
init_obstacle();

function init() {

	createScene();

	var { hemisphereLight, shadowLight } = createLights();
    scene.add(hemisphereLight);
    scene.add(shadowLight);

    // var ground = createGround();
    createGround(); 
    //scene.add(ground);

    // car = createCar();
    // scene.add(car.mesh);
    createCar();

    createLevel();

    createControls();

    resetGame();

	// start a loop that will update the objects' positions
	loop();
}


window.addEventListener('load', init, false);

export {collidableFuels, numObstacle, collidableObstacle, obstacles, init_obstacle}
