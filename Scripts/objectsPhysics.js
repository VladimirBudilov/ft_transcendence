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

function IsBallOnPaddleWidth(paddle, offset = 0) {
        return ball.Mesh.position.y <= paddle.Mesh.position.y + paddle.Height / 1.5 + offset
            && ball.Mesh.position.y >= paddle.Mesh.position.y - paddle.Height / 1.5 - offset;
}

function ChangeBallDirection(paddle) {
    if(paddle.ballDirectionChanged) return;
    if (IsBallOnPaddleWidth(paddle)) {
        paddle.ballDirectionChanged = true;
        ball.DirX = -ball.DirX;
        let rndNumber = Math.random() * (0.2 - 0.1) + 0.1;
        let boost = paddle.DirectionY > gameData.ballSpeed ? gameData.ballSpeed * rndNumber : paddle.DirectionY * rndNumber;
        ball.DirY = paddle.DirectionY >= 0 ? ball.DirY + boost : -ball.DirY - boost;
        setTimeout(() => {
            paddle.ballDirectionChanged = false;
        }, 500);
    }
}

function IsBallNearPaddle(paddle, offset = 0) {
    let isNear = false;
    if (paddle.isPlayer) {
        isNear = ball.Mesh.position.x - ball.Radius <= paddle.Mesh.position.x + paddle.Width + offset
            && ball.Mesh.position.x - ball.Radius >= paddle.Mesh.position.x - paddle.Width/2;
    }
    else {
        isNear = ball.Mesh.position.x - ball.Radius >= paddle.Mesh.position.x - paddle.Width * 1.5 - offset
            && ball.Mesh.position.x - ball.Radius <= paddle.Mesh.position.x + paddle.Width/2;
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