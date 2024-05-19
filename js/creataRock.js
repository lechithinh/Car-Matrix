import {GLTFLoader} from 'gltf'
import * as THREE from 'three'
import {numObstacle, obstacles,collidableObstacle, init_obstacle } from "./game.js";
import { car } from './createCar.js';
import { fuel } from './createFuels.js';
import { scene } from './createScene.js';

var rocks;
var collidable_obs;
var x, z, scale, rotate, delay;

const loader = new GLTFLoader();
// loader.load('resource/model/low_polygon_stylized_rock_free/scene.gltf',function(gltf){
//     scene.add(gltf.scene);
// }, undefined, function(error){
//     console.log(error);
// });

function onLoad(gltf){
    const model = gltf.scene;

    x = Math.random() * 600 - 300;
    z = Math.random() * 400 - 200;
    scale = Math.random() * 1 + 0.5;
    rotate = Math.random() * Math.PI * 2;
    delay = 2000 * Math.random();

    model.position.set(x,0,z)
    scene.add(model);

}
function createRocks(){
    for (var i =0;i<numObstacle;i++){
        loader.load('resource/model/low_polygon_stylized_rock_free/scene.gltf',onLoad);
    }
}

export {createRocks}