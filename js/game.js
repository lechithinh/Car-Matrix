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
import { createGroupOfCloud, createCloud } from './createCloud.js'
// import { createFireFly } from './createFireFly.js'

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
var fireflyCount = 300;
var fireflies =   [];
var clouds;

function createFireFly(isDay){
    // Đảm bảo fireflies là một mảng
    fireflyCount = 20;
    var firefly;
    var light;
    if(isDay !== true){
        const geometry = new THREE.SphereGeometry(2, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

        for (let i = 0; i < fireflyCount; i++) {
        firefly = new THREE.Mesh(geometry, material);
        
        // Đặt vị trí ngẫu nhiên cho mỗi đom đóm
        firefly.position.set(
            (Math.random()*100 - 0.5) * 10,
            (Math.random()*50 - 0.5) * 10,
            (Math.random()*300 - 0.5) * 10
        );
        
        // Tạo ánh sáng cho mỗi đom đóm
        light = new THREE.PointLight(0xffff00, 1000, 100);
        light.position.copy(firefly.position);
        //   light.castShadow = true;
        
        // Thêm ánh sáng vào scene và đom đóm vào mảng quản lý

        
        fireflies.push({ mesh: firefly, light: light, direction: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
        )});
        
        scene.add(fireflies[i].mesh);
        scene.add(fireflies[i].light);
        
        }
    }else{
        // console.log(fireflies)
        for(let i = 0; i < fireflyCount; i++){
            
    
            scene.remove(fireflies[i].mesh);
        
            scene.remove(fireflies[i].light);
            
        }
        fireflies = [];
    }
// Tạo hình cầu cho đom đóm

}


init_obstacle();



// Add cloud to the scene


function init() {
    
    


	createScene();
    


    var { hemisphereLight, shadowLight, nightLight} = createLights();
    // var helper = new THREE.CameraHelper(shadowLight.shadow.camera);
    // scene.add(helper);
    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(nightLight);
    hemisphereLight.visible = true;
    shadowLight.visible = true;
    nightLight.visible = false;
    var sun = getSphere("resource/texture/sun.jpg");
    var moon = getSphere("resource/texture/moon.jpg");
    shadowLight.add(sun);

    clouds = createGroupOfCloud(5, 50, 0xffffff);
    scene.add(...clouds);
    document.getElementById('toggleButton').addEventListener('click', function(){
        isDay = !isDay;
        
        // console.log(isDay);
        var text = document.getElementsByClassName("display_text");
        
        
        if (isDay) {
            // console.log(clouds[0].material)

            // scene.remove(...clouds)
            // clouds = createGroupOfCloud(5, 50, 0xffffff);
            // scene.add(...clouds);
            shadowLight.remove(moon);
            shadowLight.add(sun);
            createFireFly(isDay);

            
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
            createFireFly(isDay);
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

    
 

    

    // createGroupOfCloud(5, 100);

    //Create domdom
    

    
    


    


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

export {collidableFuels, collidableObstacle, obstacles, init_obstacle, fireflies, fireflyCount, clouds, isDay}


