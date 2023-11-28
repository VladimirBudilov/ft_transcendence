function OnLoadPreparation()
{

}

function createScene()
{
    // set the scene size
    var WIDTH = 640,
        HEIGHT = 360;

    // set some camera attributes
    var VIEW_ANGLE = 50,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    var c = document.getElementById("gameCanvas");

    // create a WebGL renderer, camera
    // and a scene
    renderer = new THREE.WebGLRenderer();
    camera =
        new THREE.PerspectiveCamera(
            VIEW_ANGLE,
            ASPECT,
            NEAR,
            FAR);

    scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);

    // set a default position for the camera
    // not doing this somehow messes up shadow rendering
    camera.position.z = 320;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    c.appendChild(renderer.domElement);

    // set up the playing surface plane
    var planeWidth = fieldWidth,
        planeHeight = fieldHeight,
        planeQuality = 10;

    // create the paddle1's material
    var paddle1Material =
        new THREE.MeshLambertMaterial(
            {
                color: 0x1B32C0
            });
    // create the paddle2's material
    var paddle2Material =
        new THREE.MeshLambertMaterial(
            {
                color: 0xFF4045
            });
    // create the plane's material
    var planeMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0x4BD121
            });
    // create the table's material
    var tableMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0x111111
            });
    // create the pillar's material
    var pillarMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0x534d0d
            });
    // create the ground's material
    var groundMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0x888888
            });


    // create the playing surface plane
    var plane = new THREE.Mesh(

        new THREE.PlaneGeometry(
            planeWidth * 0.95,	// 95% of table width, since we want to show where the ball goes out-of-bounds
            planeHeight,
            planeQuality,
            planeQuality),

        planeMaterial);

    scene.add(plane);
    plane.receiveShadow = true;

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

    // // set up the sphere vars
    // lower 'segment' and 'ring' values will increase performance
    var radius = 5,
        segments = 6,
        rings = 6;

    // // create the sphere's material
    var sphereMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0xD43001
            });

    // Create a ball with sphere geometry
    ball = new THREE.Mesh(

        new THREE.SphereGeometry(
            radius,
            segments,
            rings),

        sphereMaterial);

    // // add the sphere to the scene
    scene.add(ball);

    ball.position.x = 0;
    ball.position.y = 0;
    // set ball above the table surface
    ball.position.z = radius;
    ball.receiveShadow = true;
    ball.castShadow = true;

    // // set up the paddle vars
    paddleWidth = 10;
    paddleHeight = 30;
    paddleDepth = 10;
    paddleQuality = 1;

    paddle1 = new THREE.Mesh(

        new THREE.CubeGeometry(
            paddleWidth,
            paddleHeight,
            paddleDepth,
            paddleQuality,
            paddleQuality,
            paddleQuality),

        paddle1Material);

    // // add the sphere to the scene
    scene.add(paddle1);
    paddle1.receiveShadow = true;
    paddle1.castShadow = true;

    paddle2 = new THREE.Mesh(

        new THREE.CubeGeometry(
            paddleWidth,
            paddleHeight,
            paddleDepth,
            paddleQuality,
            paddleQuality,
            paddleQuality),

        paddle2Material);

    // // add the sphere to the scene
    scene.add(paddle2);
    paddle2.receiveShadow = true;
    paddle2.castShadow = true;

    // set paddles on each side of the table
    paddle1.position.x = -fieldWidth/2 + paddleWidth;
    paddle2.position.x = fieldWidth/2 - paddleWidth;

    // lift paddles over playing surface
    paddle1.position.z = paddleDepth;
    paddle2.position.z = paddleDepth;

    // we iterate 10x (5x each side) to create pillars to show off shadows
    // this is for the pillars on the left
    for (var i = 0; i < 5; i++)
    {
        var backdrop = new THREE.Mesh(

            new THREE.CubeGeometry(
                30,
                30,
                300,
                1,
                1,
                1 ),

            pillarMaterial);

        backdrop.position.x = -50 + i * 100;
        backdrop.position.y = 230;
        backdrop.position.z = -30;
        backdrop.castShadow = true;
        backdrop.receiveShadow = true;
        scene.add(backdrop);
    }
    // we iterate 10x (5x each side) to create pillars to show off shadows
    // this is for the pillars on the right
    for (var i = 0; i < 5; i++)
    {
        var backdrop = new THREE.Mesh(

            new THREE.CubeGeometry(
                30,
                30,
                300,
                1,
                1,
                1 ),

            pillarMaterial);

        backdrop.position.x = -50 + i * 100;
        backdrop.position.y = -230;
        backdrop.position.z = -30;
        backdrop.castShadow = true;
        backdrop.receiveShadow = true;
        scene.add(backdrop);
    }

    // finally we finish by adding a ground plane
    // to show off pretty shadows
    var ground = new THREE.Mesh(

        new THREE.CubeGeometry(
            1000,
            1000,
            3,
            1,
            1,
            1 ),

        groundMaterial);
    // set ground to arbitrary z position to best show off shadowing
    ground.position.z = -132;
    ground.receiveShadow = true;
    scene.add(ground);

    // // create a point light
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

    // MAGIC SHADOW CREATOR DELUXE EDITION with Lights PackTM DLC
    renderer.shadowMapEnabled = true;
}