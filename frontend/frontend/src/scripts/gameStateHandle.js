function printNames() {
	document.getElementById("playerNames").innerHTML = player.defaultPlayerName + "-" + player.defaultOpponentName;
}

function StopGame()
{
    for(let timeout of gameData.allTimeouts) {clearTimeout(timeout);}
    gameData.playerScore = 0;
    gameData.opponentScore = 0;
    startPlaying = false;
    stopGame = false;
    ball.Speed = gameData.ballSpeed;
    let gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.removeChild(gameRender.renderer.domElement);
    cancelAnimationFrame(animationId);
    // cancelIdleCallback(animationId);
    printScore();
    //ChangeDivStateById("StopGame", false);
}

function StartGameVsBot()
{ 
    setTimeout(() => {
        if(startPlaying)
            return;
        gameData.UpdateScreenData();
        startPlaying = true;
        //ChangeDivStateById("StopGame", true);
        //PrepareData();
        printNames();
        createScene();
        UpdateVsBot();
    }, 1000);
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
    setTimeout(() => {
        gameData.UpdateScreenData();
        //ChangeDivStateById("StopGame", true);
        // PrepareData();
        createScene();
        UpdateVsPlayer();
        startPlaying = true;
    }, 1000);
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

// export { StartGameVsBot };