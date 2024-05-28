
/**
 *
 * MECHANICS
 * ---------
 * Handles controls, game loop, and object collisions
 */
import * as THREE from 'three'

import { car } from "./createCar.js";
import { ground } from "./createGround.js";
import { scene } from "./createScene.js";
import { animateGrow, animateShrink } from './addAnimation.js';
import { renderer, camera } from './createScene.js';
import { collidableFuels, fireflies, fireflyCount, isDay} from './game.js';
import { endLevel } from './addUpdateLogic.js';
import { box_idx, selected_obstacle } from './createLevel.js';
import { collidableObstacle, clouds} from './game.js';

function loop() {
    // handle car movement and collisions
    
    
    var oldObjPos = new THREE.Vector3();
    car.mesh.getWorldPosition(oldObjPos);
    car.update();
    var newObjPos = new THREE.Vector3();
    car.mesh.getWorldPosition(newObjPos);

    var delta = newObjPos.clone().sub(oldObjPos);

    // handle all growth animations
    animateGrow();
    animateShrink();

    camera.lookAt(car.mesh.position)
    camera.position.add(delta);;
    
	// render the scene
	renderer.render(scene, camera);
	// scene.rotation.y += 0.0025
    // console.log(clouds[0].children[0].material)
    var numCloud = clouds.length;
    for (let i = 0; i < numCloud; i++){
        const cloud = clouds[i];
        if (cloud.position.x >= 18000){
            cloud.position.x += 2;
        }else{
            cloud.position.x -=2;
        }
    }
    if (isDay === false){
        for (let i = 0; i < fireflyCount; i++) {
            const firefly = fireflies[i];
            firefly.mesh.position.x += 2;
            firefly.mesh.position.y += 1;
    
            // Nếu đom đóm đi quá xa, đổi hướng
            // if (firefly.mesh.position.x >= 100  && firefly.mesh.position.y >= 100) {
            //   firefly.mesh.position.x -= 2;
            // //   firefly.mesh.position.z -= 3;
            //   firefly.light.position.x -= 2;
            // //   firefly.light.position.z -= 3
            // }else if(firefly.mesh.position.x < 100 && firefly.mesh.position.y < 100){
            //     firefly.mesh.position.x += 2;
            //     firefly.light.position.x += 2;
            // }
            // else if(firefly.mesh.position.y >= 100 && firefly.mesh.position.x >= 100){
            //     // firefly.mesh.position.x += 2;
            //     firefly.mesh.position.y -= 3;
            //     // firefly.light.position.x += 2;
            //     firefly.light.position.y -= 3
            // }else if(firefly.mesh.position.y < 100 && firefly.mesh.position.x < 100){
            //     firefly.mesh.position.y += 3;
            //     firefly.light.position.y += 3
            // }
          }
    }


    // check global collisions
    checkCollisions();


	// call the loop function again
    
	requestAnimationFrame(loop);


}



// https://stackoverflow.com/a/11480717/4855984 (doesn't work)
function objectCollidedWith(object, collidableMeshList) {  // TODO: place elsewhere, dysfunctional
    for (let child of object.children) {
        var childPosition = child.position.clone();
        for (var vertexIndex = 0; vertexIndex < child.geometry.vertices.length; vertexIndex++) {
            var localVertex = child.geometry.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4(child.matrix);
            var directionVector = child.position.sub(globalVertex);

            var ray = new THREE.Raycaster(childPosition, directionVector.clone().normalize());
            var collisionResults = ray.intersectObjects(collidableMeshList);
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                return true;
            }
        }
    }
    return false;
}

function checkCollisions() {

    // mark victory and advance level
    var [isCrash, check] = objectInBound(car.collidable, collidableFuels)
    if (isCrash) {
        var audio = new Audio("../effects/win-3-183975.mp3");
        audio.play();
        
        endLevel();
    }
}

function objectInBound(object, objectList, flag=false) { // TODO: annotate
    var o = get_xywh(object);
    for (let [idx, object] of objectList.entries()) {
        for (let target of object) {
            if (objectList == collidableObstacle && selected_obstacle[idx] == 'Rock'){
                // console.log(target);
                var t = get_xywh_model(target);
            }
    
            else{
                var t = get_xywh(target);
            } 

            if ((Math.abs(o.x - t.x) * 2 < t.w + o.w) && (Math.abs(o.y - t.y) * 2 < t.h + o.h)) {
                // console.log(o)
                if(idx === box_idx){
                    return [true, target]
                }else{
                    return [true, null];
                }
                
            }
        }
    }
    return [false, null];
}
function get_xywh_model(model){
    // model is an arr
    // var globalPosition = new THREE
    var x = model[1];
    var y = model[2];
    var w = model[0].x;
    w = w - w *0.4; 
    var h = model[0].z;
    h = h - h*0.3;
    return { 'x': x, 'y': y, 'w': w, 'h': h };
}
function get_xywh(object) {  // TODO: annotate
    var p = object.geometry.parameters;
    var globalPosition = new THREE.Vector3(0., 0., 0.);
    object.getWorldPosition(globalPosition);
    var x = globalPosition.x;
    var y = globalPosition.z;
    var w = p.width;
    if (p.hasOwnProperty('radiusBottom')) {
        w = Math.max(p.radiusTop, p.radiusBottom); // should be multiplied by 2?
    }
    var h = p.height;
    return { 'x': x, 'y': y, 'w': w, 'h': h };
}

export { loop, objectInBound, get_xywh }