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
	var shadowLight = new THREE.DirectionalLight(0xffffff, .9);
	
	// Set the direction of the light
	shadowLight.position.set(150, 350, 350);
	// shadowLight.position.set(100, 100, 100);

	// Allow shadow casting
	shadowLight.castShadow = true;

	// define the visible area of the projected shadow
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;

	// define the resolution of the shadow; the higher the better,
	// but also the more expensive and less performant
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	// to activate the lights, just add them to the scene

	var nightLight = new THREE.DirectionalLight(0x0000ff, 0.5);
	nightLight.position.set(1, 1, 1).normalize();

	nightLight.visible = false; // Hide night light initially

    return {hemisphereLight, shadowLight, nightLight}
}

export {createLights}