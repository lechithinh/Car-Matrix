import * as THREE from 'three'
import {numObstacle, obstacles,collidableObstacle, init_obstacle } from "./game.js";
import { car } from './createCar.js';
import { fuel } from './createFuels.js';
import { createCylinder } from './createObjects.js';
import { createFence, createBox } from './createObjects.js';
import { Colors } from './color.js';
import { fence_idx, tree_idx } from './createLevel.js';
import { scene } from './createScene.js';
import { startGrowth, startShrink } from './addAnimation.js';
import { createBoxes } from './createWoodenBox.js';





var fences;
var collidable_obs;
function Cone() {

    this.mesh = new THREE.Object3D();
    var texturepath = 'resource/texture/traffic_cone.jpg';
    // console.log("path: ",texturepath)
    // var fence =  createCylinder( 1, 30, 30, 4, Colors.green, 0, 90, 0 );
    var fence = createFence(30, 60, 10, 1, 10,Colors.white, 0, 10, 0, false, texturepath)
    var box = createBox(45, 1,45,Colors.red,0, 0, 0,false)

    this.mesh.add( fence );
    this.mesh.add(box)
    this.collidable = box;
}

/**
 * Creates fence according to specifications
 */

function createNewCone(x, z, scale, rotation) {
    var fence = new Cone();
    // console.log('Hiiii', obstacles[fence_idx]);
    fences.push(fence);
    scene.add(fence.mesh);
    fence.mesh.position.set( x, 0, z );
    fence.mesh.scale.set( scale, scale, scale );
    fence.mesh.rotation.y = rotation;
    return fence;
}

function createCones() { // TODO: find a home
    collidable_obs = [];
    fences = [];
    var x, z, scale, rotate, delay;
    var percentage = numObstacle / 4;
    for (var i = 0; i < numObstacle; i++) {
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
        
        // the rule that specify no fence is in the surrounding area under 100 unit with car and fuel
        var treePosition = new THREE.Vector3( x, 0, z );
        if (treePosition.distanceTo(car.mesh.position) < car.berth ||
                treePosition.distanceTo(fuel.mesh.position) < fuel.berth) {
            continue;
        }
        var fence = createNewCone(x, z, 0.01, rotate);

        setTimeout(function(object, scale) {
            startGrowth(object, 50, 10, scale);
        }.bind(this, fence.mesh, scale), delay);

        collidable_obs.push(fence.collidable);
    }
    obstacles.push(fences);
    collidableObstacle.push(collidable_obs);
}

function endCones() {
    var temp = obstacles[fence_idx];
    for (let fence of  temp) {
        var scale = fence.mesh.scale.x;
        var delay = delay = 2000 * Math.random();
        setTimeout(function(object, scale) {
            startShrink(object, 25, -10, scale);
        }.bind(this, fence.mesh, scale), delay);
    }
    // init_obstacle();

}

export {createCones,endCones}