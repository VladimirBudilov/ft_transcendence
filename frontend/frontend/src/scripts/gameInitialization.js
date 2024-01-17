
function PrepareData() {
    document.getElementById("winnerBoard").innerHTML = "First to " + gameData.maxScore + " wins!";
    gameData.playerScore = 0;
    gameData.opponentScore = 0;
}

function createScene()
{
    let currentCanvas = document.getElementById("gameCanvas");
    if (currentCanvas == null) console.log("null");
    gameRender.renderer = new THREE.WebGLRenderer();
    gameRender.gameScene = new THREE.Scene();
    InitLight();

    if(threeDPieceOfShit)
    {

        InitCamera3D(gameRender.WIDTH, gameRender.HEIGHT);
        gameRender.renderer.setSize(gameRender.WIDTH, gameRender.HEIGHT);
        currentCanvas.appendChild(gameRender.renderer.domElement);
        InitGameField();
        //InitGround();
        //InitGameTable();
        InitBall3D();
        InitPaddle3D(playerPaddle, (new THREE.MeshPhongMaterial(
            {
                color: gameColors.playerColor
            })))
        InitPaddle3D(opponentPaddle, (new THREE.MeshPhongMaterial(
            {
                color: gameColors.playerColor2
            })))
    }
    else
    {
        InitCamera(gameRender.WIDTH, gameRender.HEIGHT);
        gameRender.renderer.setSize(gameRender.WIDTH, gameRender.HEIGHT);
        currentCanvas.appendChild(gameRender.renderer.domElement);
        InitGameField();
        InitGround();
        InitGameTable();
        InitBall();
        InitPaddle( playerPaddle, (new THREE.MeshPhongMaterial(
            {
                color: gameColors.playerColor
            })))
        InitPaddle(opponentPaddle, (new THREE.MeshPhongMaterial(
            {
                color: gameColors.playerColor2
            })))
    }
    playerPaddle.Mesh.position.x = -gameRender.playerField.Width/2 + playerPaddle.Width;
    opponentPaddle.Mesh.position.x =  gameRender.playerField.Width/2 - opponentPaddle.Width;
}

function InitCamera3D(WIDTH, HEIGHT) {
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
    gameRender.gameCamera.position.z = gameData.startCameraPosition;
    gameRender.gameCamera.position.x = 0;
    gameRender.gameCamera.position.y = -350;
    gameRender.gameCamera.rotation.x = 0.5;
    gameRender.gameCamera.rotation.y = 0;
    gameRender.gameCamera.rotation.z = 0;
}

function InitBall3D() {
    ball.Material =
        new THREE.MeshPhongMaterial(
            {
                color: gameColors.ballColor
            });
    ball.Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
            ball.Radius,
            ball.segments),
        ball.Material);
    gameRender.gameScene.add(ball.Mesh);
    ball.Mesh.position.x = 0;
    ball.Mesh.position.y = 0;
    ball.Mesh.position.z = ball.Radius;
}

function InitPaddle3D(paddle, paddle1Material) {
    paddle.Material= paddle1Material;
    paddle.Mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(
            paddle.Width/4,
            paddle.Width/4,
            paddle.Height/1.5,
            paddle.Quality),
        paddle.Material);
    gameRender.gameScene.add(paddle.Mesh);
    paddle.Mesh.position.z = 2;
    let leftPart = new THREE.SphereGeometry(
        paddle.Width/2,
        ball.segments,
        paddle.Quality);
    let rightPart = new THREE.SphereGeometry(
        paddle.Width/2,
        ball.segments,
        paddle.Quality);
    paddle.leftPartMesh = new THREE.Mesh(
        leftPart,
        paddle.Material);
    paddle.rightPartMesh = new THREE.Mesh(
        rightPart,
        paddle.Material);
    gameRender.gameScene.add(paddle.leftPartMesh);
    gameRender.gameScene.add(paddle.rightPartMesh);
    updatePaddlePosition(paddle);
}

function InitGround() {
    gameRender.ground.Material =
        new THREE.MeshPhongMaterial(
            {
                color: gameColors.GroundColor
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
    gameRender.ground.Mesh.position.z = -5;
    gameRender.gameScene.add(gameRender.ground.Mesh);
}

function InitLight() {
    lighting.pointLight = new THREE.PointLight(0xffffff);
    lighting.pointLight.position.x = -200;
    lighting.pointLight.position.y = 0;
    lighting.pointLight.position.z = 1000;
    lighting.pointLight.intensity = 0.9;
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
                color: gameColors.GameZoneColor
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
        new THREE.MeshPhongMaterial(
            {
                //white color
                color: gameColors.GameBorderColor
            });
    gameRender.table.Mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(
            gameRender.table.Width * 1.007,
            gameRender.table.Height * 1.008,
            100,
            gameRender.table.Quality,
            gameRender.table.Quality,
            1),
        gameRender.table.Material);
    gameRender.table.Mesh.position.z = -0.4;
    gameRender.gameScene.add(gameRender.table.Mesh);
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
    gameRender.gameCamera.position.z = gameData.startCameraPosition-100;
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
                color: gameColors.ballColor
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
    let leftPart = new THREE.CircleGeometry(
        paddle.Width/2,
        paddle.Quality);
    let rightPart = new THREE.CircleGeometry(
        paddle.Width/2,
        paddle.Quality);
    paddle.leftPartMesh = new THREE.Mesh(
        leftPart,
        paddle.Material);
    paddle.rightPartMesh = new THREE.Mesh(
        rightPart,
        paddle.Material);
    gameRender.gameScene.add(paddle.leftPartMesh);
    gameRender.gameScene.add(paddle.rightPartMesh);
    updatePaddlePosition(paddle);
}