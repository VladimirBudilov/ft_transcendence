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
    InitGameField();
    InitGround();
    InitGameTable();
    InitLight();
    InitBall();
    InitPaddle( playerPaddle, (new THREE.MeshPhongMaterial(
        {
            color: 0x069E92
        })))
    InitPaddle(opponentPaddle, (new THREE.MeshPhongMaterial(
        {
            color: 0xFE638B
        })))
    playerPaddle.Mesh.position.x = -gameRender.playerField.Width/2 + playerPaddle.Width;
    opponentPaddle.Mesh.position.x =  gameRender.playerField.Width/2 - opponentPaddle.Width;
}

function InitCamera(WIDTH, HEIGHT) {
    let VIEW_ANGLE = 50,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;
    gameRender.gameCamera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);
    gameRender.gameScene.add(gameRender.gameCamera);
    gameRender.gameCamera.position.z = 400;
    gameRender.gameCamera.position.x = 0;
    gameRender.gameCamera.position.y = 0;
    gameRender.gameCamera.rotation.x = 0;
    gameRender.gameCamera.rotation.y = 0;
    gameRender.gameCamera.rotation.z = 0;
}

function InitBall() {
    ball.Material =
        new THREE.MeshPhongMaterial(
            {
                color: 0xFCCA45
            });
    ball.Mesh = new THREE.Mesh(
        new THREE.CircleGeometry(
            ball.Radius,
            ball.segments),
        ball.Material);
    gameRender.gameScene.add(ball.Mesh);
    ball.Mesh.position.x = 0;
    ball.Mesh.position.y = 0;
    ball.Mesh.position.z = ball.Radius;
}

function InitPaddle(paddle, paddle1Material) {
    paddle.Material= paddle1Material;
    paddle.Mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            paddle.Width,
            paddle.Height,
            paddle.Quality,
            paddle.Quality),
        paddle.Material);
    gameRender.gameScene.add(paddle.Mesh);
    paddle.Mesh.position.z = 2;
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
        new THREE.MeshPhongMaterial(
            {
                color: 0x041B29 
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
    gameRender.ground.Mesh.position.z = -55;
    gameRender.gameScene.add(gameRender.ground.Mesh);
}

function InitLight() {
    lighting.pointLight = new THREE.PointLight(0xffffff);
    lighting.pointLight.position.x = 0;
    lighting.pointLight.position.y = 0;
    lighting.pointLight.position.z = 150;
    lighting.pointLight.intensity = 2;
    lighting.pointLight.distance = 10000;
    gameRender.gameScene.add(lighting.pointLight);

/*
    Ix don't know why but this light is not working. always white screen. *sounds of tears*
    
    lighting.ambientLight = new THREE.AmbientLight(0x404040 );
    lighting.ambientLight.intensity = 0.01; // Adjust the intensity to a lower value
    gameRender.gameScene.add(lighting.ambientLight);*/
}

function InitGameField() {
        gameRender.playerField.Width = gameData.playerFieldWidth;
        gameRender.playerField.Height = gameData.playerFieldHeight;
        gameRender.playerField.Quality = gameData.playerFieldQuality;
        gameRender.playerField.Material = new THREE.MeshPhongMaterial(
            {
                color: 0x041B29
            });
    gameRender.playerField.Mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            gameRender.playerField.Width,	
            gameRender.playerField.Height,
            gameRender.playerField.Quality,
            gameRender.playerField.Quality,),
            gameRender.playerField.Material);
    gameRender.gameScene.add(gameRender.playerField.Mesh);
    gameRender.playerField.Mesh.position.z = 0;
}

function InitGameTable() {
    gameRender.table = gameRender.playerField;
    gameRender.table.Material =
        new THREE.MeshLambertMaterial(
            {
                //white color
                color: 0xffffff
            });
    gameRender.table.Mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            gameRender.table.Width * 1.135,
            gameRender.table.Height * 1.137,
            100,
            gameRender.table.Quality,
            gameRender.table.Quality,
            1),
        gameRender.table.Material);
    gameRender.table.Mesh.position.z = -52;
    gameRender.gameScene.add(gameRender.table.Mesh);
}
