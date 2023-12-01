function UpdateScore() {
    printScore();
    if (ball.Mesh.position.x <= -gameRender.playerField.Width / 2) {
        player.score++;
        printScore();
        resetBall(2);
    }

    if (ball.Mesh.position.x >= gameRender.playerField.Width/ 2) {
        opponent.score++;
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
    if (ball.DirY > ball.Speed * 2)
    {
        ball.DirY = ball.Speed * 2;
    }
    else if (ball.DirY < -ball.Speed * 2)
    {
        ball.DirY = -ball.Speed * 2;
    }
}

function HandlePaddleMovement(paddle) {
    if (ball.Mesh.position.x <= paddle.Mesh.position.x + paddle.Width / 2
        && ball.Mesh.position.x >= paddle.Mesh.position.x - paddle.Width / 2) {
        if (ball.Mesh.position.y <= paddle.Mesh.position.y + paddle.Height / 2
            && ball.Mesh.position.y >= paddle.Mesh.position.y - paddle.Height / 2) {
            if (ball.DirX < 0) {
                paddle.Mesh.scale.y = 15;
                ball.DirX = -ball.DirX;
                ball.DirY -= paddle.DirY * 0.7;
            }
        }
    }
}

function paddlePhysics()
{
    //TODO add ball radius
    HandlePaddleMovement(playerPaddle);
    HandlePaddleMovement(opponentPaddle);
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
    // set the ball to move +ve in y plane (towards left from the camera)
    ball.DirY = 1;
}