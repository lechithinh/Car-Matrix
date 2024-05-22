import * as THREE from 'three'

import { obstacles,collidableObstacle, init_obstacle } from "./game.js";
import { car } from './createCar.js';
import { fuel } from './createFuels.js';
import { createBox } from './createObjects.js';
import { Colors } from './color.js';
import { box_idx,num_obstacle } from './createLevel.js';
import { scene } from './createScene.js';
import { startGrowth, startShrink } from './addAnimation.js';

var boxes;
var collidable_obs;
function WoodenBox(){
    this.mesh = new THREE.Object3D();
    var texturepath = 'resource/texture/box_texture.png';
    console.log("path: ",texturepath)
    var bottom = createBox(30,30,30,Colors.golden,0, 15, 0,false,texturepath);

    this.mesh.add(bottom);

    this.collidable = bottom;
}

function createWoodenBox(x, z, scale, rotation){
    var box = new WoodenBox();
    boxes.push(box);
    scene.add(box.mesh);
    box.mesh.position.set(x,0,z);
    box.mesh.scale.set( scale, scale, scale );
    box.mesh.rotation.y = rotation;
    return box;
}


function createBoxes() { // TODO: find a home
    collidable_obs = [];
    boxes = [];
    var x, z, scale, rotate, delay;
    var percentage = num_obstacle / 4;
    for (var i = 0; i < num_obstacle; i++) {
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

        scale = Math.random() * 1 + 0.5;
        rotate = Math.random() * Math.PI * 2;
        delay = 2000 * Math.random()

        var boxPosition = new THREE.Vector3( x, 0, z );
        if (boxPosition.distanceTo(car.mesh.position) < car.berth ||
        boxPosition.distanceTo(fuel.mesh.position) < fuel.berth) {
            continue;
        }
        var box = createWoodenBox(x, z, 0.01, rotate)

        setTimeout(function(object, scale) {
            startGrowth(object, 50, 10, scale);
        }.bind(this, box.mesh, scale), delay);

        // collidableObstacle[box_idx].push(box.collidable);
        collidable_obs.push(box.collidable);
    }
    obstacles.push(boxes);
    collidableObstacle.push(collidable_obs);
}

function endBoxes() {
    var temp = obstacles[box_idx];
    for (let box of temp) {
        var scale = box.mesh.scale.x;
        var delay = delay = 2000 * Math.random();
        setTimeout(function(object, scale) {
            startShrink(object, 25, -10, scale);
        }.bind(this, box.mesh, scale), delay);
    }
    // init_obstacle();
}

export {createBoxes,endBoxes}