/**
 * Template for Car with "advanced motion" (i.e., acceleration and deceleration,
 * rotation speed as a function of speed)
 */
import * as THREE from 'three';
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import {Colors} from './color.js';
import { createBox, createTire } from './createObjects.js';
import { scene } from "./createScene.js";
import { objectInBound } from './createLoop.js';
import { collidableObstacle } from './game.js';

// Color for car
// console.log(Colors.blue)
// console.log(Colors);
var bodyColor = Colors.brown;
var roofColor = Colors.brown;
var bumperColor = Colors.brownDark;
var grateColor = Colors.brownDark;
var doorColor = Colors.brown;
var handleColor = Colors.brownDark;

var car; 
function Car() {

    var direction = new THREE.Vector3(1., 0., 0.);
    var maxSpeed = 10.;
    var acceleration = 0.25;
    var currentSpeed = 0;
    var steeringAngle = Math.PI / 24;

    var movement = {
        'forward': false,
        'left': false,
        'right': false,
        'backward': false
    }

	this.mesh = new THREE.Object3D();
    this.berth = 100; // berth for new collidables (e.g., if berth is 100, no
                      // tree will be initialized with 100 units)

    var body = createBox( 80, 30, 50, bodyColor, 0, 0, 0 );
	var roof = createBox( 60, 30, 45, roofColor, 0, 30, 0);
	var bumper = createBox( 90, 10, 45, bumperColor, 0, -10, 0 );
	var headLightLeft = createBox( 5, 5, 5, Colors.white, 40, 5, 15 );
	var headLightRight = createBox( 5, 5, 5, Colors.white, 40, 5, -15 );
	var tailLightLeft = createBox( 5, 5, 10, Colors.red, -40, 5, 21)
	var tailLightRight = createBox( 5, 5, 10, Colors.red, -40, 5, -21)
	var grate = createBox( 5, 5, 15, grateColor, 40, 5, 0 );
	var windshield = createBox( 3, 20, 35, Colors.blue, 30, 25, 0, true );
    var rearshield = createBox( 3, 20, 35, Colors.blue, -30, 25, 0, true );
    var leftWindow = createBox( 40, 20, 3, Colors.blue, 0, 25, 22, true );
    var rightWindow = createBox( 40, 20, 3, Colors.blue, 0, 25, -22, true );
    var leftDoor = createBox( 30, 30, 3, doorColor, 10, 0, 25 );
    var rightDoor = createBox( 30, 30, 3, doorColor, 10, 0, -25 );
    var leftHandle = createBox( 10, 3, 3, handleColor, 5, 8, 27 );
    var rightHandle = createBox( 10, 3, 3, handleColor, 5, 8, -27 );
    var frontLeftTire = createTire( 10, 10, 10, 32, Colors.brownDark, 20, -12, 15 );
    var frontRightTire = createTire( 10, 10, 10, 32, Colors.brownDark, 20, -12, -15 );
    var backLeftTire = createTire( 10, 10, 10, 32, Colors.brownDark, -20, -12, 15 );
    var backRightTire = createTire( 10, 10, 10, 32, Colors.brownDark, -20, -12, -15 );

	this.mesh.add(body);
	this.mesh.add(roof);
	this.mesh.add(bumper);
	this.mesh.add(headLightLeft);
	this.mesh.add(headLightRight);
	this.mesh.add(tailLightLeft);
	this.mesh.add(tailLightRight);
    this.mesh.add(grate);
    this.mesh.add(windshield);
    this.mesh.add(rearshield);
    this.mesh.add(leftWindow);
    this.mesh.add(rightWindow);
    this.mesh.add(leftDoor);
    this.mesh.add(rightDoor);
    this.mesh.add(leftHandle);
    this.mesh.add(rightHandle);
    this.mesh.add(frontLeftTire);
    this.mesh.add(frontRightTire);
    this.mesh.add(backLeftTire);
    this.mesh.add(backRightTire);

	var headLightLeftLight = new THREE.PointLight( 0xffcc00, 1000, 100 );
    headLightLeftLight.position.set( 50, 5, 15 );
    this.mesh.add( headLightLeftLight );

    var headLightRightLight = new THREE.PointLight( 0xffcc00, 1000, 100 );
    headLightRightLight.position.set( 50, 5, -15 );
    this.mesh.add( headLightRightLight );

    function computeR(radians) {
        var M = new THREE.Matrix3();
        M.set(Math.cos(radians), 0, -Math.sin(radians),
              0,                 1,                  0,
              Math.sin(radians), 0,  Math.cos(radians));
        return M;
    }

    this.update = function() {
        var sign, R, currentAngle;
        var is_moving = currentSpeed != 0;
        var is_turning = movement.left || movement.right;
        this.mesh.position.addScaledVector(direction, currentSpeed);
        this.mesh.updateMatrixWorld();

        // disallow travel through trees
        if (objectInBound(this.collidable, collidableObstacle) && is_moving) {
            while (objectInBound(this.collidable, collidableObstacle)) {
                this.mesh.position.addScaledVector(direction, -currentSpeed);
                this.mesh.updateMatrixWorld();
            }
            currentSpeed = 0;
            is_moving = false;
        }

        // update speed according to acceleration
        if (movement.forward) {
            currentSpeed = Math.min(maxSpeed, currentSpeed + acceleration);
        } else if (movement.backward) {
            currentSpeed = Math.max(-maxSpeed, currentSpeed - acceleration);
        }

        // update current position based on speed
        if (is_moving) {
            sign = currentSpeed / Math.abs(currentSpeed);
            currentSpeed = Math.abs(currentSpeed) - acceleration / 1.5;
            currentSpeed *= sign;

            // update and apply rotation based on speed
            if (is_turning) {
                currentAngle = movement.left ? -steeringAngle : steeringAngle;
                currentAngle *= currentSpeed / maxSpeed;
                R = computeR(currentAngle);
                direction = direction.applyMatrix3(R);
                this.mesh.rotation.y -= currentAngle;
            }
        }
    }

    this.moveForward = function() { movement.forward = true; }
    this.stopForward = function() { movement.forward = false; }

    this.turnLeft = function() { movement.left = true; }
    this.stopLeft = function() { movement.left = false; }

    this.turnRight = function() { movement.right = true; }
    this.stopRight = function() { movement.right = false; }

    this.moveBackward = function() { movement.backward = true; }
    this.stopBackward = function() { movement.backward = false; }

    this.collidable = body;

    this.reset = function() {
        car.mesh.position.set( -300, 25, -150);
        direction = new THREE.Vector3(1., 0., 0.);
        currentSpeed = 0;
        movement['forward'] = movement['backward'] = false
        movement['left'] = movement['right'] = false
        car.mesh.rotation.y = 0;
    }
}

/**
 * Create car with hard-coded start location
 */
function createCar() {
    car = new Car();
    // return car
    scene.add(car.mesh)
}

export {createCar,car}