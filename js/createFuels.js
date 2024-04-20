function Fuel() {
    this.mesh = new THREE.Object3D();
    this.berth = 100;

    var slab = createBox( 50, 5, 50, Colors.brown, 0, 0, 0 );
    var body = createBox( 20, 100, 15, Colors.red, 0, 0, 0 );
    var leftArm = createBox( 3, 80, 10, Colors.red, 12.5, 0, 0 );
    var rightArm = createBox( 3, 80, 10, Colors.red, -12.5, 0, 0 );
    var frontWindow = createBox( 10, 10, 2, Colors.blue, 0, 35, 10 );
    var backWindow = createBox( 10, 10, 2, Colors.blue, 0, 35, -10 );
    var frontBox = createBox( 8, 8, 3, Colors.red, 0, 15, 10 );
    var backBox = createBox( 8, 8, 3, Colors.red, 0, 15, -10 );
    var head = createTire( 10, 10, 5, 32, Colors.red, 0, 60, 0 );
    var headHighlight = createTire( 6, 6, 8, 32, Colors.golden, 0, 60, 0 );

    var light = new THREE.PointLight( 0xffcc00, 1, 100 );
    light.position.set( 0, 60, 0 );

    this.mesh.add( slab );
    this.mesh.add( body );
    this.mesh.add( leftArm );
    this.mesh.add( rightArm );
    this.mesh.add( frontWindow );
    this.mesh.add( backWindow );
    this.mesh.add( frontBox );
    this.mesh.add( backBox );
    this.mesh.add( head );
    this.mesh.add( headHighlight );
    this.mesh.add( light );

    this.collidable = slab;
}

function createFuel(x, z) {
    fuel = new Fuel();
    fuel.mesh.position.set( x, 0, z );
    scene.add(fuel.mesh);
    collidableFuels.push(fuel.collidable);
}


function createFuels() {
    var x = Math.random() * 600 - 300;
    var y = Math.random() * 400 - 200;
    createFuel(x, y);
    startGrowth(fuel.mesh, 50, 10, 1);
}

function endFuels() {
    scale = fuel.mesh.scale.x;
    startShrink( fuel.mesh, 25, -10, scale );
}