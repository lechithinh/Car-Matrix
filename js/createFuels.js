import * as THREE from 'three'
import { createBox } from './createObjects.js';
import { Colors } from './color.js';
import { createTire } from './createObjects.js';
import { scene } from './createScene.js';
import {collidableFuels} from './game.js'
import { startGrowth, startShrink } from './addAnimation.js';
import { ground } from './createGround.js';
import { get_xywh } from './createLoop.js';
import { get_car_pos } from './createCar.js';
var fuel;
function Fuel() {
    this.mesh = new THREE.Object3D();
    this.berth = 100;

    var slab = createBox( 50, 5, 50, Colors.brown, 0, 0, 0 );
    var body = createBox( 20, 100, 15, Colors.red, 0, 0, 0 );
    var leftArm = createBox( 3, 80, 10, Colors.red, 12.5, 0, 0 );
    var rightArm = createBox( 3, 80, 10, Colors.red, -12.5, 0, 0 );
    var frontWindow = createBox( 10, 10, 2, Colors.blue, 0, 35, 10 );
    var backWindow = createBox( 10, 10, 2, Colors.blue, 0, 35, -10 );
    var frontBox = createBox( 8, 8, 3, Colors.red, 0, 15, 10 );
    var backBox = createBox( 8, 8, 3, Colors.red, 0, 15, -10 );
    var head = createTire( 10, 10, 5, 32, Colors.red, 0, 60, 0 );
    var headHighlight = createTire( 6, 6, 8, 32, Colors.golden, 0, 60, 0 );

    var light = new THREE.PointLight( 0xffcc00, 1000, 100 );
    light.position.set( 0, 60, 0 );

    this.mesh.add( slab );
    this.mesh.add( body );
    this.mesh.add( leftArm );
    this.mesh.add( rightArm );
    this.mesh.add( frontWindow );
    this.mesh.add( backWindow );
    this.mesh.add( frontBox );
    this.mesh.add( backBox );
    this.mesh.add( head );
    this.mesh.add( headHighlight );
    this.mesh.add( light );

    this.collidable = slab;
}

function createFuel(x, z) {
    fuel = new Fuel();
    fuel.mesh.position.set( x, 0, z );
    scene.add(fuel.mesh);
    collidableFuels[0].push(fuel.collidable);
}


function createFuels() {
    var car_pos = get_car_pos();
    // var fuel_pos = get_xywh(fuel.collidable);
    var x = Math.random() * ground.geometry.parameters.width/8 - 300;
    var y = Math.random() * ground.geometry.parameters.depth/8 - 200;
    let point1 = new THREE.Vector2(car_pos.x,car_pos.y);
    console.log(x,y);
    console.log(car_pos.x,car_pos.y);
    let point2 = new THREE.Vector2(x,y);
    let distance = point1.distanceTo(point2);
    console.log(distance);
    while(distance < 1000){
        var new_x = Math.random() * ground.geometry.parameters.width/8 - 300;
        var new_y = Math.random() * ground.geometry.parameters.depth/8 - 200;

        point2.x = new_x;
        point2.y = new_y;
        distance = point1.distanceTo(point2);

    }

    // console.log(x,y);

    createFuel(x, y);
    startGrowth(fuel.mesh, 50, 10, 1);
}

function endFuels() {
    var scale = fuel.mesh.scale.x;
    startShrink( fuel.mesh, 25, -10, scale );
}

export {createFuels, endFuels, fuel}