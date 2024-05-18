/**
 *
 * LIGHTS
 * ------
 * Utilities for applying lights in scene
 */
import * as THREE from 'three'


function getSphere(){
	const textureLoader =  new THREE.TextureLoader();
	const sunGeo = new THREE.SphereGeometry(26, 40, 40);
	const sunMaterial = new THREE.MeshBasicMaterial({
		map: textureLoader.load("resource/texture/sun.jpg")
	})
	const sunMesh = new THREE.Mesh(sunGeo, sunMaterial);

	return sunMesh;
}


function createLights() {

	// A hemisphere light is a gradient colored light;
	// the first parameter is the sky color, the second parameter is the ground color,
	// the third parameter is the intensity of the light
	var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
	
	var sphereLight = getSphere();
	// scene.add(sphereLight);
	// A directional light shines from a specific direction.
	// It acts like the sun, that means that all the rays produced are parallel.
	var shadowLight = new THREE.DirectionalLight(0xffffff, .9);
	shadowLight.add(sphereLight);
	// Set the direction of the light
	shadowLight.position.set(150, 350, 350);
	// shadowLight.position.set(100, 300, 300);

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