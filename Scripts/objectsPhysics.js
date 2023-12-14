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

function updateSpellPosition(paddle) {
    paddle.SpellMesh.position = paddle.Mesh.position;
}

function ballPhysics()
{
    if (ball.Mesh.position.y <= -gameRender.playerField.Height/2)
    {
        ball.DirY =  -ball.DirY;
    }
    if (ball.Mesh.position.y >= gameRender.playerField.Height/2)
    {
        ball.DirY = -ball.DirY;
    }
    if (ball.DirY > ball.Speed)
    {
        ball.DirY = ball.Speed;
    }
    else if (ball.DirY < -ball.Speed)
    {
        ball.DirY = -ball.Speed;
    }
    ball.Mesh.position.x += ball.DirX * ball.Speed;
    ball.Mesh.position.y += ball.DirY * ball.Speed;
}

function IsBallOnPaddleWidth(paddle) {
        return ball.Mesh.position.y <= paddle.Mesh.position.y + paddle.Height / 1.5
            && ball.Mesh.position.y >= paddle.Mesh.position.y - paddle.Height / 1.5;
}

function ChangeBallDirection(paddle) {
    if(paddle.ballDirectionChanged) return;
    if (IsBallOnPaddleWidth(paddle)) {
        paddle.ballDirectionChanged = true;
        ball.DirX = -ball.DirX;
        ball.DirY = paddle.DirectionY > 0 ? ball.DirY : -ball.DirY;
        setTimeout(() => {
            paddle.ballDirectionChanged = false;
        }, 100);
    }
}

function IsBallNearPaddle(paddle, offset = 0) {
    let isNear = false;
    if (paddle.isPlayer) {
        isNear = ball.Mesh.position.x - ball.Radius + offset <= paddle.Mesh.position.x + paddle.Width
            && ball.Mesh.position.x - ball.Radius + offset >= paddle.Mesh.position.x - paddle.Width/2;
    }
    else {
        isNear = ball.Mesh.position.x + ball.Radius - offset <= paddle.Mesh.position.x + paddle.Width * 1.5
            && ball.Mesh.position.x + ball.Radius - offset >= paddle.Mesh.position.x - paddle.Width/2;
        if(isNear) console.log("Ball near bot paddle");
    }
    return isNear;
}

function HandlePlayerPaddleMovement(paddle) {
    
    if (!IsBallNearPaddle(paddle))
        return;        
    if(paddle.isPlayer) {
        ChangeBallDirection(paddle);
    }
    else {
        ChangeBallDirection(paddle);
    }
    updateSpellPosition(paddle);
}


function paddlePhysics()
{
    HandlePlayerPaddleMovement(playerPaddle);
    HandlePlayerPaddleMovement(opponentPaddle);
}

function resetBall(loser)
{
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

function IncreaseBallSpeed() {
        ball.Speed += 0;
}

function ChangeBallColor() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    ball.Material.color.setHex(color);
}

document.addEventListener("SpellEvent", IncreaseBallSpeed);
document.addEventListener("SpellEvent", ChangeBallColor);