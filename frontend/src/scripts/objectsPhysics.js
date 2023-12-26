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

function updatePaddlePosition(paddle) {
    paddle.leftPartMesh.position.z = paddle.Mesh.position.z;
    paddle.rightPartMesh.position.z = paddle.Mesh.position.z;
    paddle.leftPartMesh.position.x = paddle.Mesh.position.x;
    paddle.rightPartMesh.position.x = paddle.Mesh.position.x;
    paddle.leftPartMesh.position.y = paddle.Mesh.position.y + paddle.Height/2;
    paddle.rightPartMesh.position.y = paddle.Mesh.position.y - paddle.Height/2;
}

let paddleBounced = false;
function ballPhysics()
{
    if (!paddleBounced && (ball.Mesh.position.y - ball.Radius <= -gameRender.playerField.Height/2))
    {
        //console.log(ball.DirX, ball.DirY);
        paddleBounced = true;
        ball.DirY *=  -1;
        ball.DirY = Math.max(ball.DirY, -1);
        if(ball.DirX > 0)
            ball.DirX = ball.DirX < 0.35 ? 0.35 : ball.DirX;
        else
            ball.DirX = ball.DirX > -0.35 ? -0.35 : ball.DirX;
        setTimeout(() => {
            paddleBounced = false;
        }, 20);
    }
    else if (!paddleBounced && (ball.Mesh.position.y + ball.Radius >= gameRender.playerField.Height/2))
    {
        //console.log(ball.DirX, ball.DirY);
        paddleBounced = true;
        ball.DirY *= -1;
        ball.DirY = Math.min(ball.DirY, 1);
        if(ball.DirX > 0)
            ball.DirX = ball.DirX < 0.35 ? 0.35 : ball.DirX;
        else
            ball.DirX = ball.DirX > -0.35 ? -0.35 : ball.DirX;
        paddleBounced = true;
        setTimeout(() => {
            paddleBounced = false;
        }, 20);
    }
    ball.Mesh.position.x += ball.DirX * ball.Speed;
    ball.Mesh.position.y += ball.DirY * ball.Speed;

}

function IsBallOnPaddleWidth(paddle, offset = 0) {
        return ball.Mesh.position.y <= paddle.Mesh.position.y + paddle.Height/2 + paddle.Width + offset
            && ball.Mesh.position.y >= paddle.Mesh.position.y - paddle.Height/2 - paddle.Width - offset;
}

function ChangeBallDirection(paddle) {
    if(paddle.ballDirectionChanged) return;
    if (IsBallOnPaddleWidth(paddle)) {
        paddle.ballDirectionChanged = true;
        ball.DirX = -ball.DirX;
        let boost = Math.abs(paddle.DirectionY) > 0 ? gameData.ballSpeed * gameData.slidePunchSpeed : 0;
        ball.DirY = paddle.DirectionY > 0 ? Math.abs(ball.DirY + paddle.DirectionY/4 ) : Math.abs(ball.DirY+ paddle.DirectionY/4) * -1;
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
        }, gameData.bounceTime);
        gameData.allTimeouts.push(setTimeout(() => {
            ball.Speed -= boost;
        }, gameData.slidePunchTime))
    }
}

function IsBallNearPaddle(paddle, offset = 0) {
    if (paddle.isPlayer) {
        return ball.Mesh.position.x - ball.Radius <= paddle.Mesh.position.x + paddle.Width/2 + offset
            && ball.Mesh.position.x - ball.Radius >= paddle.Mesh.position.x - paddle.Width/2;
    }
    else {
        return ball.Mesh.position.x + ball.Radius >= paddle.Mesh.position.x - paddle.Width/2 - offset
            && ball.Mesh.position.x + ball.Radius <= paddle.Mesh.position.x + paddle.Width/2;
    }
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
    updatePaddlePosition(paddle);
}


function paddlePhysics()
{
    HandlePlayerPaddleMovement(playerPaddle);
    HandlePlayerPaddleMovement(opponentPaddle);
    updatePaddlePosition(playerPaddle);
    updatePaddlePosition(opponentPaddle);
}

function resetBall(loser)
{
    for(let timeout of gameData.allTimeouts) {clearTimeout(timeout);}
    ball.Mesh.position.x = 0;
    ball.Mesh.position.y = 0;
    ball.Speed = gameData.ballSpeed;
    ball.DirX = loser === 1 ? -0.5 : 0.5;
    ball.DirY = 0.5;
}

function IncreaseBallSpeed() {
        ball.Speed += gameData.spellSpeed;
        gameData.allTimeouts.push(setTimeout(() => {
            if(ball.Speed > gameData.ballSpeed)
                ball.Speed -= gameData.spellSpeed;
        }, gameData.spellTime));
}

function ChangeBallColor() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
//    ball.Material.color.setHex(color);
}

document.addEventListener("SpellEvent", IncreaseBallSpeed);
document.addEventListener("SpellEvent", ChangeBallColor);