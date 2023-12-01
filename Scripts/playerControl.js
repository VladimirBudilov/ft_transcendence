function BotPaddleMovement()
{
    // Lerp towards the ball on the y plane
    opponentPaddle.DirectionY = (ball.Mesh.position.y - opponentPaddle.Mesh.position.y) * gameData.difficulty;
    // TODO add random freezing.

    // in case the Lerp function produces a value above max paddle speed, we clamp it
    if (Math.abs(opponentPaddle.DirectionY) <= opponentPaddle.Speed)
    {
        opponentPaddle.Mesh.position.y += opponentPaddle.DirectionY;
    }
    // if the lerp value is too high, we have to limit speed to paddleSpeed
    else
    {
        // if paddle is lerping in +ve direction
        if (opponentPaddle.DirectionY > opponentPaddle.Speed)
        {
            opponentPaddle.Mesh.position.y += opponentPaddle.Speed;
        }
        // if paddle is lerping in -ve direction
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