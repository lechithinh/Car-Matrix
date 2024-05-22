/**
 *
 * RENDER
 * ------
 * Initial setup for camera, renderer, fog
 *
 * Boilerplate for scene, camera, renderer, lights taken from
 * https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/
 */

import * as THREE from 'three'
import {OrbitControls} from 'orbit'
import { car } from './createCar.js'

// import scene  from './game.js';

var scene, camera, fieldOfView,  aspectRatio, nearPlane, farPlane, renderer, container;
var HEIGHT, WIDTH;	
    

function createScene() {
	// use them to set up the aspect ratio of the camera
	// and the size of the renderer.
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	scene = new THREE.Scene();

	// Add a fog effect to the scene; same color as the
	// background color used in the style sheet
	//scene.fog = new THREE.Fog(0xbadbe4, 500, 900);

	// Create the camera
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1;
	farPlane = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
		);
	
	

	// Set the position of the camera
	// console.log(car)
	camera.position.set( 0, 400, 400 );
    camera.lookAt(0, 0, 0);

	

	// Create the renderer
	renderer = new THREE.WebGLRenderer({
		// Allow transparency to show the gradient background
		// we defined in the CSS
		alpha: true,

		// Activate the anti-aliasing; this is less performant,
		// but, as our project is low-poly based, it should be fine :)
		antialias: true
	});

	const controls = new OrbitControls( camera, renderer.domElement );
	controls.update();

	

	// Define the size of the renderer; in this case,
	// it will fill the entire screen
	renderer.setSize(WIDTH, HEIGHT);

	// Enable shadow rendering
	renderer.shadowMap.enabled = true;

	// Add the DOM element of the renderer to the
	// container we created in the HTML
	container = document.getElementById('world');
	container.appendChild(renderer.domElement);

	// Listen to the screen: if the user resizes it
	// we have to update the camera and the renderer size
	window.addEventListener('resize', handleWindowResize);

}

function handleWindowResize() {
	// update height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}




export {createScene, scene, camera, renderer}