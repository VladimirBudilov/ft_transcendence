function StopGame()
{
    gameData.playerScore = 0;
    gameData.opponentScore = 0;
    startPlaying = false;
    stopGame = false;
    ball.DirX = 1;
    ball.DirY = 1;
    ball.Speed = 3;
    gameData.difficulty = 0.2;
    let gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.removeChild(gameRender.renderer.domElement);
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
    playerPaddleMovement(playerPaddle,Key.W, Key.S);
    BotPaddleMovement();
    gameRender.renderer.render(gameRender.gameScene, gameRender.gameCamera);
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
    playerPaddleMovement(playerPaddle, Key.W, Key.S);
    playerPaddleMovement(opponentPaddle, Key.O, Key.L);
    gameRender.renderer.render(gameRender.gameScene, gameRender.gameCamera);
    if(IsGameFinished())
    {
        StopGame();
        if(gameType.tournament)
            document.dispatchEvent(tournament.OnGameFinished);
        return;
    }
    animationId = requestAnimationFrame(UpdateVsPlayer);
}