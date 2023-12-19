window.addEventListener('resize', onWindowResize, false);

function UpdateObjectsPosition(scale) {
	
}

function UpdateObjectsSizeOnScene(scale) {
	// remove old game field, ground and table
	gameRender.gameScene.remove(gameRender.playerField.Mesh);
	gameRender.gameScene.remove(gameRender.ground.Mesh);
	gameRender.gameScene.remove(gameRender.table.Mesh);
	// create new game field, ground and table
	InitGameField();
	InitGround();
	InitGameTable();
}

function onWindowResize() {
	let scale = gameRender.SetWindowSize(window.innerWidth, window.innerHeight)
	gameRender.gameCamera.aspect = gameRender.WIDTH / gameRender.HEIGHT;
	gameRender.gameCamera.updateProjectionMatrix();
	gameRender.renderer.setSize(gameRender.WIDTH , gameRender.HEIGHT);
	//UpdateObjectsSizeOnScene(scale);
	ScaleScene(scale);
}

function ScaleScene(scaleFactor) {
	console.log("scaleScene");
	gameRender.gameScene.traverse(function (object) {
			object.scale.multiplyScalar(scaleFactor);
			object.position.multiplyScalar(scaleFactor);
	});
}

