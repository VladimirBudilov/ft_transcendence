// window.addEventListener('resize', onWindowResize, false);


function onWindowResize() {
	let scale = gameRender.SetWindowSize(window.innerWidth, window.innerHeight)
	gameRender.gameCamera.aspect = gameRender.WIDTH / gameRender.HEIGHT;
	gameRender.gameCamera.updateProjectionMatrix();
	gameRender.renderer.setSize(gameRender.WIDTH , gameRender.HEIGHT);
	ScaleScene(scale);
}

function ScaleScene(scaleFactor) {
	console.log("scale factor: " + scaleFactor);
	console.log("camera position: " + gameRender.gameCamera.position.z);
	if(scaleFactor === 1) return;
	gameRender.gameCamera.position.z /= scaleFactor;
	gameRender.gameCamera.position.z =
		gameRender.gameCamera.position.z < gameData.maxCameraPosition ? 
			gameData.maxCameraPosition : gameRender.gameCamera.position.z;
	
}

