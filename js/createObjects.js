import * as THREE from 'three'

function createBox(dx, dy, dz, color, x, y, z, notFlatShading,texture_path) {
    var geom = new THREE.BoxGeometry(dx, dy, dz);
    // console.log(texture_path)
    if(texture_path){
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



// Hàm tạo fence


function createFence(radius, height, radialSegments, heightSegments, thetaLength, color, x, y, z, notFlatShading, texture_path) {
    // Tạo geometry cho thanh ngang của hàng rào
    
    // Tạo vật liệu cho hàng rào
    var fenceMaterial;
    if (texture_path) {
        var texture = new THREE.TextureLoader().load(texture_path);
        texture.encoding = THREE.sRGBEncoding; // Đảm bảo chính xác encoding
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        fenceMaterial = new THREE.MeshPhongMaterial({ color: color, flatShading: notFlatShading !== true, map: texture });
    } else {
        fenceMaterial = new THREE.MeshPhongMaterial({ color: color, flatShading: notFlatShading !== true });
    }
    
    // Tạo hàng rào
    // var fence = new THREE.Mesh(barGeometry, fenceMaterial);
    // var cylinder = new THREE.Mesh(geom, mat);
    
    const geometry = new THREE.ConeGeometry(radius , height , radialSegments, heightSegments, thetaLength  ); 
    const material = new THREE.MeshPhongMaterial( {color: color} );
    const cone = new THREE.Mesh(geometry, fenceMaterial ); 
    
    
    // fence.add(mesh);
    // Đặt vị trí của hàng rào
    cone.castShadow = true;
    cone.receiveShadow = true;
    cone.position.set(x, y, z);
    
    return cone;
}

export {createBox,createCylinder, createTire, createFence}