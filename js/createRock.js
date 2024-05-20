import {GLTFLoader} from 'gltf'
import * as THREE from 'three'
import {numObstacle, obstacles,collidableObstacle, init_obstacle } from "./game.js";
import { car } from './createCar.js';
import { fuel } from './createFuels.js';
import { scene } from './createScene.js';
import {rock_idx} from './createLevel.js';
import { startGrowth,startShrink } from './addAnimation.js';
var rocks;
var collidable_obs;
var x, z, scale, rotate, delay;
var i;
var percentage = numObstacle / 4;

const loader = new GLTFLoader();
// loader.load('resource/model/low_polygon_stylized_rock_free/scene.gltf',function(gltf){
//     scene.add(gltf.scene);
// }, undefined, function(error){
//     console.log(error);
// });

function onLoad(gltf){
    const model = gltf.scene;
    if (i <= percentage){
        x = Math.random() * 2000 - 300;
        z = Math.random() * 1700 - 200;
    }else if(i > percentage && i <= 2 * percentage){
        x = -(Math.random() * 2000 - 300);
        z = -(Math.random() * 1700 - 200);
    }else if ((i > 2 * percentage) && (i <= 3 * percentage)){
        x = (Math.random() * 2000 - 300);
        z = -(Math.random() * 1700 - 200);
    }else if ((i > 3 * percentage) && (i <= 4 * percentage)){
        x = -(Math.random() * 2000 - 300);
        z = (Math.random() * 1700 - 200);
    }else{
        x = (Math.random() * 2000 - 300);
        z = (Math.random() * 1700 - 200);
    }
    // console.log(x,z);
    scale = Math.random() * 1 + 0.5;
    rotate = Math.random() * Math.PI * 2;
    delay = 2000 * Math.random();
    var rockPosition = new THREE.Vector3( x, 0, z );
    if (rockPosition.distanceTo(car.mesh.position) < car.berth ||
    rockPosition.distanceTo(fuel.mesh.position) < fuel.berth) {
        return;
    }

    model.position.set(x,0,z);
    model.scale.set(scale,scale,scale);
    model.rotation.y = rotate;

    gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
    })
    scene.add(model);
    rocks.push(gltf);
    console.log(rocks.length);

}

function loadModel(url){
    return new Promise((resolve) => {
        new GLTFLoader().load(url, resolve);
    });
}
let boundingBox;
async function createRocks(){
    collidable_obs = [];
    rocks = [];
    
    for (i =0;i<numObstacle;i++){
        // var rock = loader.load('resource/model/low_polygon_stylized_rock_free/scene.gltf',onLoad);

        var rock = await loadModel('resource/model/low_polygon_stylized_rock_free/scene.gltf').then((result) =>{
            rocks.push(result);
            const model = result.scene;
            
            if (i <= percentage){
                x = Math.random() * 2000 - 300;
                z = Math.random() * 1700 - 200;
            }else if(i > percentage && i <= 2 * percentage){
                x = -(Math.random() * 2000 - 300);
                z = -(Math.random() * 1700 - 200);
            }else if ((i > 2 * percentage) && (i <= 3 * percentage)){
                x = (Math.random() * 2000 - 300);
                z = -(Math.random() * 1700 - 200);
            }else if ((i > 3 * percentage) && (i <= 4 * percentage)){
                x = -(Math.random() * 2000 - 300);
                z = (Math.random() * 1700 - 200);
            }else{
                x = (Math.random() * 2000 - 300);
                z = (Math.random() * 1700 - 200);
            }
            // console.log(x,z);
            scale = Math.random() * 1 + 0.5;
            rotate = Math.random() * Math.PI * 2;
            delay = 2000 * Math.random();
            var rockPosition = new THREE.Vector3( x, 0, z );
            if (rockPosition.distanceTo(car.mesh.position) < car.berth ||
            rockPosition.distanceTo(fuel.mesh.position) < fuel.berth) {
                return;
            }
            
            model.position.set(x,0,z);
            model.scale.set(scale,scale,scale);
            model.rotation.y = rotate;

        
            model.traverse(function(child) {
                if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // child.geometry.computeBoundingBox();
                // if (!boundingBox) {
                //     boundingBox = child.geometry.boundingBox.clone();
                // } else {
                //     boundingBox.union(child.geometry.boundingBox);
                // }
                }
            })
            scene.add(model);

            setTimeout(function(object, scale) {
                startGrowth(object, 50, 10, scale);
            }.bind(this, model, scale), delay);

            const lower_bound = new THREE.Vector3(x,0,z);
            const box = new THREE.Box3(lower_bound).setFromObject( result.scene ); 
            const size = box.getSize(new THREE.Vector3());
            // const center = box.getCenter(new THREE.Vector3());

            // console.log(size);
            // console.log(size.z);

            // console.log(center);
            collidable_obs.push([size,x,z])

            // var helper = new THREE.BoxHelper(result.scene, 0xff0000);
            // helper.update();
            // // If you want a visible bounding box
            // scene.add(helper);
            // If you just want the numbers
            // console.log(helper.box.min);
            // console.log(helper.box.max);
                    });
    }

    // console.log("f",rocks.length);
    obstacles.push(rocks);
    collidableObstacle.push(collidable_obs);
    // console.log("here ",collidableObstacle[0]);

}
function endRocks(){
    var temp = obstacles[rock_idx];
    for (let rock of temp ) {
        const model = rock.scene;

        var scale = model.scale.x;
        var delay = delay = 2000 * Math.random();
        setTimeout(function(object, scale) {
            startShrink(object, 25, -10, scale);
        }.bind(this, model, scale), delay);
    }
}


export {createRocks, endRocks}