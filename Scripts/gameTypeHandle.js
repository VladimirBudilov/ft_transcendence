function StopGame()
{
    //reset player and opponent scores
    score1 = 0;
    score2 = 0;
    startPlaying = false;
    ballDirX = 1;
    ballDirY = 1;
    ballSpeed = 4;
    paddle1DirY = 0;
    paddle2DirY = 0;
    paddleSpeed = 3;
    difficulty = 0.2;
    let gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.removeChild(renderer.domElement);
}

function StartGameVsBot()
{
    if(startPlaying)
        return;
    startPlaying = true;
    PrepareData();
    createScene();
    UpdateVsBot();
}

function UpdateVsBot()
{
    ballPhysics();
    paddlePhysics();
    playerPaddleMovement(paddle1, paddle1DirY, Key.A, Key.D);
    BotPaddleMovement();
    renderer.render(scene, camera);
    return  requestAnimationFrame(UpdateVsBot);
}

function StartGameVsPlayer()
{
    if(startPlaying)
        return;
    PrepareData();
    createScene();
    UpdateVsPlayer();
    startPlaying = true;
}

function UpdateVsPlayer()
{
    renderer.render(scene, camera);
    requestAnimationFrame(UpdateVsPlayer);
    ballPhysics();
    paddlePhysics();
    playerPaddleMovement(paddle1, paddle1DirY, Key.W, Key.S);
    playerPaddleMovement(paddle2, paddle2DirY, Key.O, Key.L);
}