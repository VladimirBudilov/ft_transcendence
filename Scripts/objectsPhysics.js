function UpdateScore() {
    printScore();
    if (ball.Mesh.position.x <= -gameRender.playerField.Width / 1.5) {
        gameData.opponentScore++;
        printScore();
        resetBall(2);
    }

    if (ball.Mesh.position.x >= gameRender.playerField.Width/ 1.5) {
        gameData.playerScore++;
        printScore();
        resetBall(1);
    }
}

function ballPhysics()
{
    if (ball.Mesh.position.y <= -gameRender.playerField.Height/2)
    {
        ball.DirY = -ball.DirY;
    }
    if (ball.Mesh.position.y >= gameRender.playerField.Height/2)
    {
        ball.DirY = -ball.DirY;
    }
    ball.Mesh.position.x += ball.DirX * ball.Speed;
    ball.Mesh.position.y += ball.DirY * ball.Speed;
    if (ball.DirY > ball.Speed)
    {
        ball.DirY = ball.Speed;
    }
    else if (ball.DirY < -ball.Speed)
    {
        ball.DirY = -ball.Speed;
    }
}

function CheckThatBallTouchedPaddle(paddle) {
    if (ball.Mesh.position.y <= paddle.Mesh.position.y + paddle.Height / 1.5
        && ball.Mesh.position.y >= paddle.Mesh.position.y - paddle.Height / 1.5) {
        ball.DirX = -ball.DirX;
        ball.DirY -= paddle.DirectionY * 0.7;
    }
}

function HandlePlayerPaddleMovement(paddle) {
    
    if (Math.abs(ball.Mesh.position.x - paddle.Mesh.position.x) > 1)
        return;        
    if(paddle.isPlayer) {
        CheckThatBallTouchedPaddle(paddle);
    }
    else {
        CheckThatBallTouchedPaddle(paddle);
    }
}


function paddlePhysics()
{
    HandlePlayerPaddleMovement(playerPaddle);
    HandlePlayerPaddleMovement(opponentPaddle);
}

function resetBall(loser)
{
    // position the ball in the center of the table
    ball.Mesh.position.x = 0;
    ball.Mesh.position.y = 0;
    if (loser === 1)
    {
        ball.DirX = -1;
    }
    else
    {
        ball.DirX = 1;
    }
    ball.DirY = 1;
}