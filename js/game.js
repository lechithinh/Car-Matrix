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


var car, fuel, ground, obstacles = [[]], numObstacle = 10, collidableObstacle = [[]],
collidableFuels = [];


function init() {

	// set up the scene, the camera and the renderer
	createScene();

	// add the lights
	var { hemisphereLight, shadowLight } = createLights();
    scene.add(hemisphereLight);
    scene.add(shadowLight);

	// add the objects
    var ground = createGround(); //ground = [[]]
    scene.add(ground);

    // car set up
    car = createCar();
    scene.add(car.mesh);

    // level set up
    createLevel();

    // add controls
    createControls();

    // reset game
    resetGame();

	// start a loop that will update the objects' positions
	// and render the scene on each frame
	loop();
}


window.addEventListener('load', init, false);
