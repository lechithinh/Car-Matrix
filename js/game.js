// import * as  THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from 'gltf'
import { createScene, scene } from './createScene.js'
import {createLights} from './createLights.js'
import {createGround} from './createGround.js'
import { createCar } from './createCar.js'
import {createLevel} from './createLevel.js'
import { createControls } from './createControls.js'
import { resetGame } from './addUpdateLogic.js'
import { loop } from './createLoop.js'
import { car } from './createCar.js'
import * as THREE from 'three'
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


var obstacles = [], 
    numObstacle = 10, 
    collidableObstacle = [],
    collidableFuels = [[]];


function init_obstacle(){
    collidableObstacle = [];
    obstacles= [];
    collidableFuels = [[]];
}

var isDay = true;

init_obstacle();


function init() {
    



	createScene();

    var { hemisphereLight, shadowLight, nightLight} = createLights();
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(nightLight);
    hemisphereLight.visible = true;
    shadowLight.visible = true;
    nightLight.visible = false;


    
    document.getElementById('toggleButton').addEventListener('click', function(){
        isDay = !isDay;

        console.log(isDay);
        var text = document.getElementsByClassName("display_text");
        
        if (isDay) {
            // scene.background = new THREE.Color(0x87CEEB); // Light blue for day
            hemisphereLight.visible = false;
            shadowLight.visible = true;
            nightLight.visible = false;
            car.mesh.children[20].intensity = 0;
            car.mesh.children[20].distance = 0;
            car.mesh.children[21].intensity = 0;
            car.mesh.children[21].distance = 0;
            
            scene.background = new THREE.Color(0xbadbe4);
            for (let i = 0; i < text.length; i++) {
                text[i].style.color = 'black';
            }
        } else {
            // scene.background = new THREE.Color(0x000033); // Dark color for night
            hemisphereLight.visible = false;
            shadowLight.visible = false;
            nightLight.visible = true;
            car.mesh.children[20].intensity = 1000;
            car.mesh.children[20].distance = 100;
            car.mesh.children[21].intensity = 1000;
            car.mesh.children[21].distance = 100;
            var path = "images/dark3";

            var format = ".jpg";
            var urls = [
                path  + format, path  + format,
                path  + format, path  + format,
                path  + format, path  + format
            ]

            var reflectionCube = new THREE.CubeTextureLoader().load(urls);
            reflectionCube.format = THREE.RGBAFormat;
            scene.background = reflectionCube;
            

            // khi trời tối, đổi mầu chữ của bảng th tin
            for (let i = 0; i < text.length; i++) {
                text[i].style.color = '#ffa633';
            }

        }
    });



    // document.getElementById('toggleButton').addEventListener('click', function(){
    //     var { hemisphereLight, shadowLight } = createLights();
    //     scene.add(hemisphereLight);
    //     hemisphereLight.visible = false;
    //     scene.add(shadowLight);
    // })
    // var ground = createGround();
    createGround(); 
    //scene.add(ground);


    createCar();

    createLevel();

    createControls();

    resetGame();

	// start a loop that will update the objects' positions
	loop();
    // var isDay = document.getElementById('toggleButton').addEventListener('click', toggleDayNight);

}



window.addEventListener('load', init, false);

export {collidableFuels, numObstacle, collidableObstacle, obstacles, init_obstacle}


