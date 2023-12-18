window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	// Update the camera's aspect ratio
	gameRender.SetWindowSize(window.innerWidth, window.innerHeight)
	gameRender.gameCamera.aspect = gameRender.WIDTH / gameRender.HEIGHT;
	gameRender.gameCamera.updateProjectionMatrix();
	// Update the renderer's size
	gameRender.renderer.setSize(gameRender.WIDTH , gameRender.HEIGHT);
}

function scaleScene(scaleFactor) {
	console.log("scaleScene");
	gameRender.gameScene.traverse(function (object) {
			object.scale.multiplyScalar(scaleFactor);
	});
}

