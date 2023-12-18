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
        let rndNumber = Math.random() * (gameData.slidePunchSpeed - gameData.slidePunchSpeed/3) + gameData.slidePunchSpeed/3;
        let boost = Math.abs(paddle.DirectionY) > gameData.ballSpeed ? gameData.ballSpeed * rndNumber : 0;
        ball.DirY = paddle.DirectionY > 0 ? Math.abs(ball.DirY + paddle.DirectionY/5 ) : Math.abs(ball.DirY+ paddle.DirectionY/5 ) * -1;
        if(paddle.DirectionY === 0) ball.DirY *= -1;
        ball.Speed += boost;
        let vector = {
            x: ball.DirX,
            y: ball.DirY
        };
        let magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        ball.DirX /= magnitude;
        ball.DirY /= magnitude;
        setTimeout(() => {
            paddle.ballDirectionChanged = false;
        }, 1000);
        setTimeout(() => {
            ball.Speed = gameData.ballSpeed;
        }, gameData.slidePunchTime);
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
    ball.Speed = gameData.ballSpeed;
    ball.DirX = loser === 1 ? -0.5 : 0.5;
    ball.DirY = 0.5;
}

function IncreaseBallSpeed() {
        ball.Speed += gameData.spellSpeed;
        setTimeout(() => {
            ball.Speed = gameData.ballSpeed;
        }, gameData.spellTime);
}

function ChangeBallColor() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    ball.Material.color.setHex(color);
}

document.addEventListener("SpellEvent", IncreaseBallSpeed);
document.addEventListener("SpellEvent", ChangeBallColor);