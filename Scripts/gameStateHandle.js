function StopGame()
{
    score1 = 0;
    score2 = 0;
    startPlaying = false;
    stopGame = false;
    ballDirX = 1;
    ballDirY = 1;
    ballSpeed = 4;
    paddle1DirY = 0;
    paddle2DirY = 0;
    paddleSpeed = 3;
    difficulty = 0.2;
    let gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.removeChild(renderer.domElement);
    cancelAnimationFrame(animationId);
    cancelIdleCallback(animationId);
    printScore();
    ChangeDivStateById("StopGame", false);
}

function StartGameVsBot()
{
    if(startPlaying)
        return;
    startPlaying = true;
    ChangeDivStateById("StopGame", true);
    PrepareData();
    createScene();
    UpdateVsBot();
}

function UpdateVsBot()
{
    if(stopGame) {
        cancelAnimationFrame(animationId);
        cancelIdleCallback(animationId);
        return;
    }
    ballPhysics();
    UpdateScore();
    paddlePhysics();
    playerPaddleMovement(paddle1, paddle1DirY, Key.W, Key.S);
    BotPaddleMovement();
    renderer.render(scene, camera);
    if(IsGameFinished())
    {
        StopGame();
        return;
    }
    animationId = requestAnimationFrame(UpdateVsBot);
}

function StartGameVsPlayer()
{
    ChangeDivStateById("StopGame", true);
    PrepareData();
    createScene();
    UpdateVsPlayer();
    startPlaying = true;
}

function UpdateVsPlayer()
{
    ballPhysics();
    UpdateScore();
    paddlePhysics();
    paddle1DirY = playerPaddleMovement(paddle1, paddle1DirY, Key.W, Key.S);
    paddle2DirY = playerPaddleMovement(paddle2, paddle2DirY, Key.O, Key.L);
    renderer.render(scene, camera);
    if(IsGameFinished())
    {
        StopGame();
        if(gameType.tournament)
            document.dispatchEvent(tournament.OnGameFinished);
        return;
    }
    animationId = requestAnimationFrame(UpdateVsPlayer);
}