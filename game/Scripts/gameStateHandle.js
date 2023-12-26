function StopGame()
{
    for (let i = 0; i < gameData.allTimeouts.length; i++){
        let timeout = gameData.allTimeouts[i];
        clearTimeout(timeout);}
    gameData.playerScore = 0;
    gameData.opponentScore = 0;
    startPlaying = false;
    stopGame = false;
    ball.Speed = gameData.ballSpeed;
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
    gameData.UpdateScreenData();
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
    playerPaddleMovement(playerPaddle,Key.W, Key.S, Key.A);
    BotPaddleMovement();
    ballPhysics();
    UpdateScore();
    paddlePhysics();
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
    gameData.UpdateScreenData();
    ChangeDivStateById("StopGame", true);
    PrepareData();
    createScene();
    UpdateVsPlayer();
    startPlaying = true;
}

function UpdateVsPlayer()
{
    playerPaddleMovement(playerPaddle, Key.W, Key.S, Key.A);
    playerPaddleMovement(opponentPaddle, Key.I, Key.K, Key.L);
    ballPhysics();
    UpdateScore();
    paddlePhysics();
    gameRender.renderer.render(gameRender.gameScene, gameRender.gameCamera);
    if(IsGameFinished())
    {
        StopGame();
        if(gameType.tournament)
            tournament.StartMatch();
        return;
    }
    animationId = requestAnimationFrame(UpdateVsPlayer);
}