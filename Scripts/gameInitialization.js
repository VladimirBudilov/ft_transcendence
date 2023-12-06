function PrepareData() {
    document.getElementById("winnerBoard").innerHTML = "First to " + gameData.maxScore + " wins!";
    gameData.playerScore = 0;
    gameData.opponentScore = 0;
}

function createScene()
{
    let currentCanvas = document.getElementById("gameCanvas");
    gameRender.renderer = new THREE.WebGLRenderer();
    gameRender.gameScene = new THREE.Scene();
    InitCamera(gameRender.WIDTH, gameRender.HEIGHT);
    gameRender.renderer.setSize(gameRender.WIDTH, gameRender.HEIGHT);
    currentCanvas.appendChild(gameRender.renderer.domElement);
    //initTextOnScreen();
    InitLight();
    InitGameField();
    InitGameTable();
    InitGround();
    InitBall();
    InitPaddle( playerPaddle, (new THREE.MeshLambertMaterial(
        {
            color: 0x1B32C0
        })))
    InitPaddle(opponentPaddle, (new THREE.MeshLambertMaterial(
        {
            color: 0xFF4045
        })))
    playerPaddle.Mesh.position.x = -gameRender.playerField.Width/2 + playerPaddle.Width;
    opponentPaddle.Mesh.position.x =  gameRender.playerField.Width/2 - opponentPaddle.Width;
    gameRender.renderer.shadowMapEnabled = true;
}

function InitCamera(WIDTH, HEIGHT) {
    let VIEW_ANGLE = 50,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 1000;
    gameRender.gameCamera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);
    gameRender.gameScene.add(gameRender.gameCamera);
      gameRender.gameCamera.position.z = 250;
        gameRender.gameCamera.position.x = 0;
        gameRender.gameCamera.position.y = -100;
        gameRender.gameCamera.rotation.x = 30 * Math.PI / 360;
        gameRender.gameCamera.rotation.y = 0;
        gameRender.gameCamera.rotation.z = 0;
}

function InitBall() {
    ball.Material =
        new THREE.MeshLambertMaterial(
            {
                color: 0xD43001
            });
    ball.Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
            ball.Radius,
            ball.segments,
            ball.rings),
        ball.Material);
    gameRender.gameScene.add(ball.Mesh);
    ball.Mesh.position.x = 0;
    ball.Mesh.position.y = 0;
    ball.Mesh.position.z = ball.Radius;
    ball.Mesh.receiveShadow = true;
    ball.Mesh.castShadow = true;
}

function InitPaddle(paddle, paddle1Material) {
    paddle.Material= paddle1Material;
    paddle.Mesh = new THREE.Mesh(
        new THREE.CubeGeometry(
            paddle.Width,
            paddle.Height,
            paddle.Depth,
            paddle.Quality,
            paddle.Quality,
            paddle.Quality),
        paddle.Material);
    gameRender.gameScene.add(paddle.Mesh);
    paddle.Mesh.receiveShadow = true;
    paddle.Mesh.castShadow = true;
}

function InitGround() {
    gameRender.ground.Material =
        new THREE.MeshLambertMaterial(
            {
                color: 0x888888
            });
    gameRender.ground.Mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            1000,
            1000,
            3,
            1,
        ),

        gameRender.ground.Material);
    gameRender.ground.Mesh.position.z = -800;
    gameRender.ground.Mesh.receiveShadow = true;
    gameRender.gameScene.add(gameRender.ground.Mesh);
}

function InitLight() {
    lighting.pointLight =
        new THREE.PointLight(0xF8D898);

    // set its position
    lighting.pointLight.position.x = -1000;
    lighting.pointLight.position.y = 0;
    lighting.pointLight.position.z = 1000;
    lighting.pointLight.intensity = 2.9;
    lighting.pointLight.distance = 10000;
    // add to the scene
    gameRender.gameScene.add(lighting.pointLight);

    // add a spotlight
    // this is important for casting shadows
    lighting.spotLight = new THREE.SpotLight(0xF8D898);
    lighting.spotLight.position.set(0, 0, 460);
    lighting.spotLight.intensity = 1.5;
    lighting.spotLight.castShadow = true;
    gameRender.gameScene.add(lighting.spotLight);
}

function InitGameField() {
        gameRender.playerField.Width = 400;
        gameRender.playerField.Height = 200;
        gameRender.playerField.Quality = 100;
        gameRender.playerField.Material = new THREE.MeshLambertMaterial(
            {
                color: 0x4BD121
            });
    gameRender.playerField.Mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            gameRender.playerField.Width * 0.95,	
            gameRender.playerField.Height,
            gameRender.playerField.Quality,
            gameRender.playerField.Quality,),
            gameRender.playerField.Material);
    gameRender.gameScene.add(gameRender.playerField.Mesh);
    gameRender.playerField.Mesh.receiveShadow = true;
    gameRender.playerField.Mesh.position.set(0, 0, -500);
}

function InitGameTable() {
    gameRender.table = gameRender.playerField;
    gameRender.table.Material =
        new THREE.MeshLambertMaterial(
            {
                color: 0x111111
            });
    gameRender.table.Mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            gameRender.table.Width * 1.05,	// this creates the feel of a billiards table, with a lining
            gameRender.table.Height * 1.03,
            gameRender.playerField.Quality,
            gameRender.playerField.Quality,
            gameRender.table.Material));
    gameRender.gameScene.add(gameRender.table.Mesh);
    gameRender.table.Mesh.receiveShadow = true;
    gameRender.playerField.Mesh.position.set(0, 0, -501);
}
