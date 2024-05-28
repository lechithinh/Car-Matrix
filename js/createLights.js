/**
 *
 * LIGHTS
 * ------
 * Utilities for applying lights in scene
 */
import * as THREE from 'three'




function createLights() {

	// A hemisphere light is a gradient colored light;
	// the first parameter is the sky color, the second parameter is the ground color,
	// the third parameter is the intensity of the light
	var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	
	
	// scene.add(sphereLight);
	// A directional light shines from a specific direction.
	// It acts like the sun, that means that all the rays produced are parallel.
	// var shadowLight = new THREE.DirectionalLight(0xffffff, .9);
	var shadowLight = new THREE.DirectionalLight(0xffffff, .9);


	
	// Set the direction of the light
	shadowLight.position.set(150, 550, 550);
	

	// shadowLight.position.set(100, 100, 100);

	// Allow shadow casting
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -4000;
	shadowLight.shadow.camera.right = 4000;
	shadowLight.shadow.camera.top = 4000;
	shadowLight.shadow.camera.bottom = -2000;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 2000;

	// define the resolution of the shadow; the higher the better,
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 4096;
	shadowLight.shadow.mapSize.height = 4096;

	// to activate the lights, just add them to the scene

	var nightLight = new THREE.DirectionalLight(0x3333ff, 10);
	nightLight.position.set(150, 350, 350);

	nightLight.visible = false; // Hide night light initially

    return {hemisphereLight, shadowLight, nightLight}
}

export {createLights}