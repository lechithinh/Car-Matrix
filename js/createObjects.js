import * as THREE from 'three'

function createBox(dx, dy, dz, color, x, y, z, notFlatShading,texture_path) {
    var geom = new THREE.BoxGeometry(dx, dy, dz);
    // console.log(texture_path)
    if(texture_path){
        console.log("hi")
        var texture = new THREE.TextureLoader().load(texture_path);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 1 );
        var mat = new THREE.MeshPhongMaterial({color:color, flatShading: notFlatShading != true, map: texture});
    }
    else {
        var mat = new THREE.MeshPhongMaterial({color:color, flatShading: notFlatShading != true});
    }
    var box = new THREE.Mesh(geom, mat);
    box.castShadow = true;
    box.receiveShadow = true;
    box.position.set( x, y, z );
    return box;
}

function createCylinder(radiusTop, radiusBottom, height, radialSegments, color,x, y, z,notFlatShading, open, texture_path) {
    var geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments,30,open );
    if(texture_path){
        var texture = new THREE.TextureLoader().load(texture_path);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 1, 1 );
        var mat = new THREE.MeshPhongMaterial({color:color, flatShading: notFlatShading != true, map: texture});
    }
    else{
        var mat = new THREE.MeshPhongMaterial({color:color, flatShading: true});
    }
    var cylinder = new THREE.Mesh(geom, mat);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    cylinder.position.set( x, y, z );
    return cylinder;
}

//Cylinder with rotation specific to car
function createTire(radiusTop, radiusBottom, height, radialSegments, color, x, y, z, open, texture_path) {
    var cylinder = createCylinder(radiusTop, radiusBottom, height, radialSegments, color, x, y, z,false,open,texture_path);
    cylinder.rotation.x = Math.PI / 2;  // hardcoded for tires in the car below
    return cylinder;
}

export {createBox,createCylinder, createTire}