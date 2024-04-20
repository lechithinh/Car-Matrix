
/**
 *
 * MECHANICS
 * ---------
 * Handles controls, game loop, and object collisions
 */

function loop() {
    // handle car movement and collisions
    car.update();

    // handle all growth animations
    animateGrow();
    animateShrink();

	// render the scene
	renderer.render(scene, camera);
	scene.rotation.y += 0.0025

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
            var directionVector = child.position.sub( globalVertex );

            var ray = new THREE.Raycaster( childPosition, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects( collidableMeshList );
            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
                return true;
            }
        }
    }
    return false;
}

function checkCollisions() {

    // mark victory and advance level
    if (objectInBound(car.collidable, collidableFuels)) {
        endLevel();
    }
}

function objectInBound(object, objectList) { // TODO: annotate
    o = get_xywh(object);
    for (let target of objectList) {
        t = get_xywh(target);
        if ( (Math.abs(o.x - t.x) * 2 < t.w + o.w) && (Math.abs(o.y - t.y) * 2 < t.h + o.h)) {
            console.log(o)
            return true;
        }
    }
    return false;
}

function get_xywh(object) {  // TODO: annotate
    var p = object.geometry.parameters;
    var globalPosition = new THREE.Vector3( 0., 0., 0. );
    object.getWorldPosition(globalPosition);
    var x = globalPosition.x;
    var y = globalPosition.z;
    var w = p.width;
    if (p.hasOwnProperty('radiusBottom')) {
        w = Math.max(p.radiusTop, p.radiusBottom); // should be multiplied by 2?
    }
    var h = p.height;
    return {'x': x, 'y': y, 'w': w, 'h': h};
}