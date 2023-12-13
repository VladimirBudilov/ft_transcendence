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
    gameRender.renderer.shadowMapEnabled = true;
    InitLight();
    InitGameField();
    InitGameTable();
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
    InitGround();
    InitLight();
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
        new THREE.MeshPhongMaterial(
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

    paddle.Spell = new THREE.SphereGeometry(
        paddle.Width * 1.6,
        paddle.Quality,
        paddle.Quality);
    paddle.SpellMesh = new THREE.Mesh(
        paddle.Spell,
        new THREE.MeshPhongMaterial(
            {
                color: 0xD43001
            }));
    paddle.SpellMesh.visible = false;
    gameRender.gameScene.add(paddle.SpellMesh);
    paddle.SpellMesh.receiveShadow = true;
    paddle.SpellMesh.castShadow = true;
}

function InitGround() {
    gameRender.ground.Material =
        new THREE.MeshLambertMaterial(
            {
                color: 0x888888
            });
    gameRender.ground.Mesh = new THREE.Mesh(
        new THREE.CubeGeometry(
            1000,
            1000,
            3,
            1,
            1,
            1),
        gameRender.ground.Material);
    gameRender.ground.Mesh.position.z = -132;
    gameRender.ground.Mesh.receiveShadow = true;
    gameRender.gameScene.add(gameRender.ground.Mesh);
}

function InitLight() {
    lighting.pointLight =
        new THREE.PointLight(0xF8D898);
    lighting.pointLight.position.x = -1000;
    lighting.pointLight.position.y = 0;
    lighting.pointLight.position.z = 1000;
    lighting.pointLight.intensity = 2.9;
    lighting.pointLight.distance = 10000;
    gameRender.gameScene.add(lighting.pointLight);

    lighting.spotLight = new THREE.SpotLight(0xF8D898);
    lighting.spotLight.position.set(0, 0, 460);
    lighting.spotLight.intensity = 1.5;
    lighting.spotLight.castShadow = true;
    gameRender.gameScene.add(lighting.spotLight);
}

function InitGameField() {
        gameRender.playerField.Width = 400;
        gameRender.playerField.Height = 200;
        gameRender.playerField.Quality = 10;
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
}

function InitGameTable() {
    gameRender.table = gameRender.playerField;
    gameRender.table.Material =
        new THREE.MeshLambertMaterial(
            {
                color: 0x111111
            });
    gameRender.table.Mesh = new THREE.Mesh(
        new THREE.CubeGeometry(
            gameRender.table.Width * 1.05,
            gameRender.table.Height * 1.03,
            100,
            gameRender.table.Quality,
            gameRender.table.Quality,
            1),
        gameRender.table.Material);
    gameRender.table.Mesh.position.z = -51;
    gameRender.gameScene.add(gameRender.table.Mesh);
    gameRender.table.Mesh.receiveShadow = true;
}
