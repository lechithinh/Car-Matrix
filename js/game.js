var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
    green:0x669900,
    greenDark:0x496d01,
    golden:0xff9900
};


var scene, camera, car, fuel, ground, obstacles = [[]], 
    numObstacle = 10, 
    collidableObstacle = [[]],
    collidableFuels = [];


function init() {

	createScene();

	var { hemisphereLight, shadowLight } = createLights();
    scene.add(hemisphereLight);
    scene.add(shadowLight);

    var ground = createGround(); 
    scene.add(ground);

    car = createCar();
    scene.add(car.mesh);

    createLevel();

    createControls();

    resetGame();

	// start a loop that will update the objects' positions
	loop();
}


window.addEventListener('load', init, false);
