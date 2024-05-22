import * as THREE from 'three'
import { obstacles,collidableObstacle, init_obstacle } from "./game.js";
import { car } from './createCar.js';
import { fuel } from './createFuels.js';
import { createTire } from './createObjects.js';
import { Colors } from './color.js';
import { tire_idx } from './createLevel.js';
import { scene } from './createScene.js';
import { startGrowth, startShrink } from './addAnimation.js';


var tires;
var collidable_obs;
function Tire(){
    this.mesh = new THREE.Object3D();
    var texturepath = 'resource/texture/tire_texture.png';
    console.log("path: ",texturepath)
    var bottom = createTire(20,20,20,32,Colors.golden,0, 20, 0,true,texturepath);
    // var frontRightTire = createTire( 10, 10, 10, 32, Colors.brownDark, 20, -12, -15 );

    this.mesh.add(bottom);

    this.collidable = bottom;
}

function createTireObstacle(x, z, scale, rotation){
    var tire = new Tire();
    tires.push(tire);
    scene.add(tire.mesh);
    tire.mesh.position.set(x,0,z);
    tire.mesh.scale.set( scale, scale, scale );
    tire.mesh.rotation.y = rotation;
    return tire;
}

function createTires() { // TODO: find a home
    collidable_obs = [];
    tires = [];
    var x, z, scale, rotate, delay;
    for (var i = 0; i < numObstacle; i++) {
        x = Math.random() * 600 - 300;
        z = Math.random() * 400 - 200;
        scale = Math.random() * 1 + 0.5;
        rotate = Math.random() * Math.PI * 2;
        delay = 2000 * Math.random()

        var tirePosition = new THREE.Vector3( x, 0, z );
        if (tirePosition.distanceTo(car.mesh.position) < car.berth ||
        tirePosition.distanceTo(fuel.mesh.position) < fuel.berth) {
            continue;
        }
        var tire = createTireObstacle(x, z, 0.01, rotate)

        setTimeout(function(object, scale) {
            startGrowth(object, 50, 10, scale);
        }.bind(this, tire.mesh, scale), delay);

        // collidableObstacle[tire_idx].push(tire.collidable);
        collidable_obs.push(tire.collidable);
    }
    obstacles.push(tires);
    collidableObstacle.push(collidable_obs);
}

function endTires() {
    var temp = obstacles[tire_idx];
    for (let tire of temp) {
        var scale = tire.mesh.scale.x;
        var delay = delay = 2000 * Math.random();
        setTimeout(function(object, scale) {
            startShrink(object, 25, -10, scale);
        }.bind(this, tire.mesh, scale), delay);
    }
    // init_obstacle();
}

export {createTires, endTires}