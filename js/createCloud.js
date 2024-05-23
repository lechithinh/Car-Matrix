import * as THREE from 'three'
import { camera, createScene, scene } from './createScene.js'
function createCloud(cloudColor) {
    const cloudGroup = new THREE.Group();

    // Define parameters for cloud generation
    const numSpheres = 50; // Increase number of spheres
    const minRadius = 5; // Increase minimum radius
    const maxRadius = 15; // Increase maximum radius
    const maxYPosition = 10; // Increase maximum Y position
    const minYPosition = -10; // Decrease minimum Y position
    const minZPosition = -30; // Decrease minimum Z position
    const maxZPosition = 30; // Increase maximum Z position

    // Create spheres and add them to the cloud group
    for (let i = 0; i < numSpheres; i++) {
        const radius = Math.random() * (maxRadius - minRadius) + minRadius;
        const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32); // Increase segments for smoother surface
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: cloudColor, transparent: true, opacity: 0.8 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;

        // Ensure spheres are mainly distributed horizontally
        const x = Math.random() * (maxRadius * 2) - maxRadius + 400;
        const y = Math.random() * (maxYPosition - minYPosition) + minYPosition + 350;
        const z = Math.random() * (maxZPosition - minZPosition) + minZPosition + 300;

        sphere.position.set(x, y, z);

        cloudGroup.add(sphere);
    }

    return cloudGroup;
}

function createGroupOfCloud(gridSize, cloudDistance, cloudColor){
    
    const clouds = [];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cloud = createCloud(cloudColor);
            cloud.position.x = (i - gridSize / 2) * cloudDistance; // Center the grid
            cloud.position.y = Math.random() * 20 - 10; // Randomize Y position
            cloud.position.z = (j - gridSize / 2) * cloudDistance; // Center the grid
            clouds.push(cloud);
        }
    }

    return clouds;
}

export {createCloud, createGroupOfCloud}