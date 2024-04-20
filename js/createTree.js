function Tree() {

    this.mesh = new THREE.Object3D();
    var top = createCylinder( 1, 30, 30, 4, Colors.green, 0, 90, 0 );
    var mid = createCylinder( 1, 40, 40, 4, Colors.green, 0, 70, 0 );
    var bottom = createCylinder( 1, 50, 50, 4, Colors.green, 0, 40, 0 );
    var trunk = createCylinder( 10, 10, 30, 32, Colors.brownDark, 0, 0, 0 );

    this.mesh.add( top );
    this.mesh.add( mid );
    this.mesh.add( bottom );
    this.mesh.add( trunk );

    this.collidable = bottom;
}

/**
 * Creates tree according to specifications
 */
function createTree(x, z, scale, rotation) {
    var tree = new Tree();
    obstacles[tree_idx].push(tree);
    scene.add(tree.mesh);
    tree.mesh.position.set( x, 0, z );
    tree.mesh.scale.set( scale, scale, scale );
    tree.mesh.rotation.y = rotation;
    return tree;
}

function createTrees() { // TODO: find a home
    var x, y, scale, rotate, delay;
    for (var i = 0; i < numObstacle; i++) {
        x = Math.random() * 600 - 300;
        z = Math.random() * 400 - 200;
        scale = Math.random() * 1 + 0.5;
        rotate = Math.random() * Math.PI * 2;
        delay = 2000 * Math.random()
        
        // the rule that specify no tree is in the surrounding area under 100 unit with car and fuel
        var treePosition = new THREE.Vector3( x, 0, z );
        if (treePosition.distanceTo(car.mesh.position) < car.berth ||
                treePosition.distanceTo(fuel.mesh.position) < fuel.berth) {
            continue;
        }
        var tree = createTree(x, z, 0.01, rotate);

        setTimeout(function(object, scale) {
            startGrowth(object, 50, 10, scale);
        }.bind(this, tree.mesh, scale), delay);

        collidableObstacle[tree_idx].push(tree.collidable);

    }
}

function endTrees() {
    for (let tree of trees) {
        scale = tree.mesh.scale.x;
        delay = delay = 2000 * Math.random();
        setTimeout(function(object, scale) {
            startShrink(object, 25, -10, scale);
        }.bind(this, tree.mesh, scale), delay);
    }
    collidableObstacle[tree_idx] = [];
    collidableFuels = [];
    obstacles[tree_idx]= [];
}