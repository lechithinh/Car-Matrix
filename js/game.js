// Add npm i simplex-noise model
import {GLTFLoader} from 'gltf'
import { camera, createScene, scene } from './createScene.js'
import {createLights} from './createLights.js'
import {createGround} from './createGround.js'
import { createCar } from './createCar.js'
import {createLevel} from './createLevel.js'
import { createControls } from './createControls.js'
import { resetGame } from './addUpdateLogic.js'
import { loop } from './createLoop.js'
import { car } from './createCar.js'
import * as THREE from 'three'
import { ImprovedNoise } from 'improvenoise';


// import {cloud} from "./THREE_Cloud/Cloud.js"
// import { CloudShader } from './THREE.cloud/CloudShader.js';
// 
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
    // numObstacle = {}, 
    collidableObstacle = [],
    collidableFuels = [[]];


// function init_num_obstacle(level){
//     if(level == 'simple'){
//         numObstacle['tree'] = 5;
//     }
//     else if (level == 'medium'){
//         numObstacle['tree'] = 10;
//         numObstacle['box'] = 10;
//     }
// }

function init_obstacle(){
    collidableObstacle = [];
    obstacles= [];
    collidableFuels = [[]];
}

var isDay = true;   
function createCloud() {
    const cloudGroup = new THREE.Group();

    // Define parameters for cloud generation
    const numSpheres = 50; // Increase number of spheres
    const minRadius = 5; // Increase minimum radius
    const maxRadius = 15; // Increase maximum radius
    const maxYPosition = 10; // Increase maximum Y position
    const minYPosition = -10; // Decrease minimum Y position
    const minZPosition = -30; // Decrease minimum Z position
    const maxZPosition = 30; // Increase maximum Z position

    // Create spheres and add them to the cloud group
    for (let i = 0; i < numSpheres; i++) {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32); // Increase segments for smoother surface
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;

        // Ensure spheres are mainly distributed horizontally
        const x = Math.random() * (maxRadius * 2) - maxRadius + 400;
        const y = Math.random() * (maxYPosition - minYPosition) + minYPosition + 350;
        const z = Math.random() * (maxZPosition - minZPosition) + minZPosition + 300;

        sphere.position.set(x, y, z);

        cloudGroup.add(sphere);
    }

    return cloudGroup;
}

function createGroupOfCloud(gridSize, cloudDistance){
    
    const clouds = [];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cloud = createCloud();
            cloud.position.x = (i - gridSize / 2) * cloudDistance; // Center the grid
            cloud.position.y = Math.random() * 20 - 10; // Randomize Y position
            cloud.position.z = (j - gridSize / 2) * cloudDistance; // Center the grid
            clouds.push(cloud);
        }
    }

    scene.add(...clouds);
}


init_obstacle();



// Add cloud to the scene



function init() {
    
    


	createScene();
    


    var { hemisphereLight, shadowLight, nightLight} = createLights();
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(nightLight);
    hemisphereLight.visible = true;
    shadowLight.visible = true;
    nightLight.visible = false;
    var sun = getSphere("resource/texture/sun.jpg");
    var moon = getSphere("resource/texture/moon.jpg");
    shadowLight.add(sun);


        
    document.getElementById('toggleButton').addEventListener('click', function(){
        isDay = !isDay;

        console.log(isDay);
        var text = document.getElementsByClassName("display_text");
        
        if (isDay) {
            shadowLight.remove(moon);
            shadowLight.add(sun);
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
            shadowLight.remove(sun);
            
            nightLight.add(moon);

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

    
 
    createGroupOfCloud(5, 50);

    createGroupOfCloud(5, 100);
    
    


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
function getSphere(textureURL){
	const textureLoader =  new THREE.TextureLoader();
	const sunGeo = new THREE.SphereGeometry(26, 40, 40);
	const sunMaterial = new THREE.MeshBasicMaterial({
		map: textureLoader.load(textureURL)
	})
	const sunMesh = new THREE.Mesh(sunGeo, sunMaterial);

	return sunMesh;
}


console.log(window.level);
window.addEventListener('load', init, false);

export {collidableFuels, collidableObstacle, obstacles, init_obstacle}


