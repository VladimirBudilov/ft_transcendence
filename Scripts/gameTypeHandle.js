function StartGameVsBot()
{
    PrepareData();
    createScene();

    UpdateVsBot();
}

function UpdateVsBot()
{
    renderer.render(scene, camera);
    requestAnimationFrame(UpdateVsBot);
    ballPhysics();
    paddlePhysics();
    playerPaddleMovement(paddle1, paddle1DirY, Key.A, Key.D);
    BotPaddleMovement();
}

function StartGameVsPlayer()
{
    PrepareData();
    createScene();

    UpdateVsPlayer();
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