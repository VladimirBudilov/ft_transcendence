function UpdateScore() {
    printScore();
    if (ball.position.x <= -fieldWidth / 2) {
        score2++;
        printScore();
        resetBall(2);
    }

    // if ball goes off the 'right' side (CPU's side)
    if (ball.position.x >= fieldWidth / 2) {
        // Player scores
        score1++;
        // update scoreboard HTML
        printScore();
        // reset ball to center
        resetBall(1);
    }
}

function ballPhysics()
{
    // if ball goes off the top side (side of table)
    if (ball.position.y <= -fieldHeight/2)
    {
        ballDirY = -ballDirY;
    }
    // if ball goes off the bottom side (side of table)
    if (ball.position.y >= fieldHeight/2)
    {
        ballDirY = -ballDirY;
    }
    // update ball position over time
    ball.position.x += ballDirX * ballSpeed;
    ball.position.y += ballDirY * ballSpeed;
    // limit ball's y-speed to 2x the x-speed
    // this is so the ball doesn't speed from left to right super fast
    // keeps game playable for humans
    if (ballDirY > ballSpeed * 2)
    {
        ballDirY = ballSpeed * 2;
    }
    else if (ballDirY < -ballSpeed * 2)
    {
        ballDirY = -ballSpeed * 2;
    }
}

// Handles paddle collision logic
function paddlePhysics()
{
    // PLAYER PADDLE LOGIC
    // if ball is aligned with paddle1 on x plane
    // remember the position is the CENTER of the object
    // we only check between the front and the middle of the paddle (one-way collision)
    if (ball.position.x <= paddle1.position.x + paddleWidth
        &&  ball.position.x >= paddle1.position.x)
    {
        // and if ball is aligned with paddle1 on y plane
        if (ball.position.y <= paddle1.position.y + paddleHeight/2
            &&  ball.position.y >= paddle1.position.y - paddleHeight/2)
        {
            // and if ball is travelling towards player (-ve direction)
            if (ballDirX < 0)
            {
                // stretch the paddle to indicate a hit
                paddle1.scale.y = 15;
                // switch direction of ball travel to create bounce
                ballDirX = -ballDirX;
                // we impact ball angle when hitting it
                // this is not realistic physics, just spices up the gameplay
                // allows you to 'slice' the ball to beat the opponent
                ballDirY -= paddle1DirY * 0.7;
            }
        }
    }
    // OPPONENT PADDLE LOGIC
    // if ball is aligned with paddle2 on x plane
    // remember the position is the CENTER of the object
    // we only check between the front and the middle of the paddle (one-way collision)
    if (ball.position.x <= paddle2.position.x + paddleWidth/2
        &&  ball.position.x >= paddle2.position.x - paddleWidth/2)
    {
        // and if ball is aligned with paddle2 on y plane
        if (ball.position.y <= paddle2.position.y + paddleHeight/2
            &&  ball.position.y >= paddle2.position.y - paddleHeight/2)
        {
            // and if ball is travelling towards opponent (+ve direction)
            if (ballDirX > 0)
            {
                // stretch the paddle to indicate a hit
                paddle2.scale.y = 15;
                // switch direction of ball travel to create bounce
                ballDirX = -ballDirX;
                // we impact ball angle when hitting it
                // this is not realistic physics, just spices up the gameplay
                // allows you to 'slice' the ball to beat the opponent
                ballDirY -= paddle2DirY * 0.7;
            }
        }
    }
}

function resetBall(loser)
{
    // position the ball in the center of the table
    ball.position.x = 0;
    ball.position.y = 0;
    if (loser === 1)
    {
        ballDirX = -1;
    }
    else
    {
        ballDirX = 1;
    }
    // set the ball to move +ve in y plane (towards left from the camera)
    ballDirY = 1;
}