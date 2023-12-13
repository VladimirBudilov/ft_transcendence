function BotPaddleMovement()
{
    opponentPaddle.DirectionY = (ball.Mesh.position.y - opponentPaddle.Mesh.position.y) * gameData.difficulty;
    // TODO add random freezing.
    if (Math.abs(opponentPaddle.DirectionY) <= opponentPaddle.Speed)
    {
        opponentPaddle.Mesh.position.y += opponentPaddle.DirectionY;
    }
    else
    {
        if (opponentPaddle.DirectionY > opponentPaddle.Speed)
        {
            opponentPaddle.Mesh.position.y += opponentPaddle.Speed;
        }
        else if (opponentPaddle.DirectionY < -opponentPaddle.Speed)
        {
            opponentPaddle.Mesh.position.y -= opponentPaddle.Speed;
        }
    }
}

function playerPaddleMovement(paddle, leftKey, rightKey)
{
    if (Key.isDown(leftKey))
    {
        if (paddle.Mesh.position.y < gameRender.playerField.Height * 0.45)
        {
            paddle.DirectionY = paddle.Speed * 0.5;
        }
        else
        {
            paddle.DirectionY = 0;
        }
    }
    else if (Key.isDown(rightKey))
    {
        if (paddle.Mesh.position.y > -gameRender.playerField.Height * 0.45)
        {
            paddle.DirectionY = -paddle.Speed * 0.5;
        }
        else
        {
            paddle.DirectionY = 0;
        }
    }
    else
    {
        paddle.DirectionY = 0;
    }
    paddle.Mesh.position.y += paddle.DirectionY;
}