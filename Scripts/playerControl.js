function BotPaddleMovement()
{
    // Lerp towards the ball on the y plane
    paddle2DirY = (ball.position.y - paddle2.position.y) * difficulty;

    // in case the Lerp function produces a value above max paddle speed, we clamp it
    if (Math.abs(paddle2DirY) <= paddleSpeed)
    {
        paddle2.position.y += paddle2DirY;
    }
    // if the lerp value is too high, we have to limit speed to paddleSpeed
    else
    {
        // if paddle is lerping in +ve direction
        if (paddle2DirY > paddleSpeed)
        {
            paddle2.position.y += paddleSpeed;
        }
        // if paddle is lerping in -ve direction
        else if (paddle2DirY < -paddleSpeed)
        {
            paddle2.position.y -= paddleSpeed;
        }
    }
    paddle2.scale.y += (1 - paddle2.scale.y) * 0.2;
}


// Handles player's paddle movement
function playerPaddleMovement(paddle, paddleDirY, leftKey, rightKey)
{
    var paddleDir = paddleDirY;

    // move left
    if (Key.isDown(leftKey))
    {
        // if paddle is not touching the side of table
        // we move
        if (paddle.position.y < fieldHeight * 0.45)
        {
            paddleDir = paddleSpeed * 0.5;
        }
            // else we don't move and stretch the paddle
        // to indicate we can't move
        else
        {
            paddleDir = 0;
            paddle.scale.z += (10 - paddle.scale.z) * 0.2;
        }
    }
    // move right
    else if (Key.isDown(rightKey))
    {
        // if paddle is not touching the side of table
        // we move
        if (paddle.position.y > -fieldHeight * 0.45)
        {
            paddleDir = -paddleSpeed * 0.5;
        }
            // else we don't move and stretch the paddle
        // to indicate we can't move
        else
        {
            paddleDir = 0;
            paddle.scale.z += (10 - paddle.scale.z) * 0.2;
        }
    }
    // else don't move paddle
    else
    {
        // stop the paddle
        paddleDir = 0;
    }

    paddle.scale.y += (1 - paddle.scale.y) * 0.2;
    paddle.scale.z += (1 - paddle.scale.z) * 0.2;
    paddle.position.y += paddleDir;

    return paddleDir;
}