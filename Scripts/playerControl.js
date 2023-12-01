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


// Handles player's paddle movement
function playerPaddleMovement(paddle, leftKey, rightKey)
{
    
    // move left
    if (Key.isDown(leftKey))
    {
        // if paddle is not touching the side of table
        // we move
        if (paddle.Mesh.position.y < gameRender.playerField.Height * 0.45)
        {
            paddle.DirectionY = paddle.Speed * 0.5;
        }
            // else we don't move and stretch the paddle
        // to indicate we can't move
        else
        {
            paddle.DirectionY = 0;
        }
    }
    // move right
    else if (Key.isDown(rightKey))
    {
        // if paddle is not touching the side of table
        // we move
        if (paddle.Mesh.position.y > -gameRender.playerField.Height * 0.45)
        {
            paddle.DirectionY = -paddle.Speed * 0.5;
        }
            // else we don't move and stretch the paddle
        // to indicate we can't move
        else
        {
            paddle.DirectionY = 0;
        }
    }
    // else don't move paddle
    else
    {
        // stop the paddle
        paddle.DirectionY = 0;
    }
    paddle.Mesh.position.y += paddle.DirectionY;
}