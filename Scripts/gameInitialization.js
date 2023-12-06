function PrepareData() {
    document.getElementById("winnerBoard").innerHTML = "First to " + gameData.maxScore + " wins!";
    gameData.playerScore = 0;
    gameData.opponentScore = 0;
}

function initTextOnScreen() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene(); // Create a Three.js scene

    // Create text geometry
    let loader = new THREE.FontLoader();
    loader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json',
        function (font) {
            let textGeometry = new THREE.TextGeometry('Hello, Three.js!', {
                font: font,
                size: 100,
                height: 3,
                curveSegments: 50,
            }); 

            let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            let textMesh = new THREE.Mesh(textGeometry, textMaterial);
            gameRender.gameScene.add(textMesh); // Add text mesh to the scene
            textMesh.position.set(-2, 0, -500); // Position adjusted to be in the center and more visible
    }
    );
}

function createScene()
{
    let currentCanvas = document.getElementById("gameCanvas");
    gameRender.renderer = new THREE.WebGLRenderer();
    gameRender.gameScene = new THREE.Scene();
    InitCamera(gameRender.WIDTH, gameRender.HEIGHT);
    gameRender.renderer.setSize(gameRender.WIDTH, gameRender.HEIGHT);
    currentCanvas.appendChild(gameRender.renderer.domElement);
    //gameRender.renderer.shadowMapEnabled = true;
    initTextOnScreen();
    /*InitLight();
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
    InitGround();*/
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
            gameRender.table.Width * 1.05,	// this creates the feel of a billiards table, with a lining
            gameRender.table.Height * 1.03,
            100,				// an arbitrary depth, the camera can't see much of it anyway
            gameRender.table.Quality,
            gameRender.table.Quality,
            1),
        gameRender.table.Material);
    gameRender.table.Mesh.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
    gameRender.gameScene.add(gameRender.table.Mesh);
    gameRender.table.Mesh.receiveShadow = true;
}
