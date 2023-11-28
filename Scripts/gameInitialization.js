function OnLoadPreparation()
{

}

function InitCamera(WIDTH, HEIGHT) {
    var VIEW_ANGLE = 50,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 1000;
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);
    // add the camera to the scene
    scene.add(camera);
    // set a default position for the camera
    // not doing this somehow messes up shadow rendering
    camera.position.z = 250;
    camera.position.x = 0;
    camera.position.y = -100;
    camera.rotation.x = 30 * Math.PI / 360;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
}

function InitBall() {
    var radius = 7,
        segments = 100,
        rings = 100;
    var sphereMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0xD43001
            });
    ball = new THREE.Mesh(
        new THREE.SphereGeometry(
            radius,
            segments,
            rings),
        sphereMaterial);
    scene.add(ball);
    ball.position.x = 0;
    ball.position.y = 0;
    ball.position.z = radius/2;
    ball.receiveShadow = true;
    ball.castShadow = true;
}

function InitPaddle(paddle1Material) {
    var paddle;
    paddleWidth = 10;
    paddleHeight = 30;
    paddleDepth = 10;
    paddleQuality = 10;
    paddle = new THREE.Mesh(
        new THREE.CubeGeometry(
            paddleWidth,
            paddleHeight,
            paddleDepth,
            paddleQuality,
            paddleQuality,
            paddleQuality),
        paddle1Material);

    // // add the sphere to the scene
    scene.add(paddle);
    paddle.receiveShadow = true;
    paddle.castShadow = true;
    return paddle;
}

function InitGround() {
    var groundMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0x888888
            });
    var ground = new THREE.Mesh(
        new THREE.CubeGeometry(
            1000,
            1000,
            3,
            1,
            1,
            1),

        groundMaterial);
    ground.position.z = -132;
    ground.receiveShadow = true;
    scene.add(ground);
}

function InitLight() {
    pointLight =
        new THREE.PointLight(0xF8D898);

    // set its position
    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;
    // add to the scene
    scene.add(pointLight);

    // add a spot light
    // this is important for casting shadows
    spotLight = new THREE.SpotLight(0xF8D898);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);
}

function InitGameField() {
    var planeWidth = fieldWidth,
        planeHeight = fieldHeight,
        planeQuality = 10;
    var planeMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0x4BD121
            });
    var pillarMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0x534d0d
            });
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(
            planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
            planeHeight,
            planeQuality,
            planeQuality),
        planeMaterial);
    scene.add(plane);
    plane.receiveShadow = true;
    return {planeWidth, planeHeight, planeQuality};
}

function InitGameTable(planeWidth, planeHeight, planeQuality) {
    var tableMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0x111111
            });
    var table = new THREE.Mesh(
        new THREE.CubeGeometry(
            planeWidth * 1.05,	// this creates the feel of a billiards table, with a lining
            planeHeight * 1.03,
            100,				// an arbitrary depth, the camera can't see much of it anyway
            planeQuality,
            planeQuality,
            1),
        tableMaterial);
    table.position.z = -51;	// we sink the table into the ground by 50 units. The extra 1 is so the plane can be seen
    scene.add(table);
    table.receiveShadow = true;
}

function createScene()
{
    var gameCanvas = document.getElementById("gameCanvas");
    // set the scene size 
    var WIDTH = 640,
        HEIGHT = 360;
    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    InitCamera(WIDTH, HEIGHT);
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);
    // attach the render-supplied DOM element
    gameCanvas.appendChild(renderer.domElement);
    // set up the playing surface plane
    var {planeWidth, planeHeight, planeQuality} = InitGameField();
    InitGameTable(planeWidth, planeHeight, planeQuality);
    InitBall();
    paddle1 = InitPaddle((new THREE.MeshLambertMaterial(
        {
            color: 0x1B32C0
        })))
    paddle2 = InitPaddle((new THREE.MeshLambertMaterial(
        {
            color: 0xFF4045
        })))
    paddle1.position.x = -fieldWidth/2 + paddleWidth;
    paddle2.position.x =  fieldWidth/2 - paddleWidth;
    InitGround();
    InitLight();
    renderer.shadowMapEnabled = true;
}