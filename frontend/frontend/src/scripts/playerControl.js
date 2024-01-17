function MovePaddleInCenter(opponentPaddle) {

    let center = gameRender.playerField.Mesh.position.y;
    let gap = 10;
    if (opponentPaddle.Mesh.position.y > center + gap)
    {
        opponentPaddle.DirectionY = -opponentPaddle.Speed/4;
    }
    else if (opponentPaddle.Mesh.position.y < center - gap)
    {
        opponentPaddle.DirectionY = opponentPaddle.Speed/4;
    }
    else
    {
        opponentPaddle.DirectionY = 0;
    }
    opponentPaddle.Mesh.position.y += opponentPaddle.DirectionY;
}

function ReachedBorder(opponentPaddle, top) {
    if(top === "top")
    {
        return opponentPaddle.Mesh.position.y >= gameRender.playerField.Height/2 - opponentPaddle.Height/2 - opponentPaddle.Width/2;
    }
    else
    {
        return opponentPaddle.Mesh.position.y <= -gameRender.playerField.Height/2 + opponentPaddle.Height/2 + opponentPaddle.Width/2;
    }
}

function CalculateBotPaddleSpeed(speed, difficulty) {
    opponentPaddle.DirectionY = (ball.Mesh.position.y - opponentPaddle.Mesh.position.y) * difficulty;
    if (Math.abs(opponentPaddle.DirectionY) <= speed) {
        opponentPaddle.Mesh.position.y += opponentPaddle.DirectionY;
    } else {
        if (opponentPaddle.DirectionY > speed && !ReachedBorder(opponentPaddle, "top")) {
            opponentPaddle.Mesh.position.y += speed;
        } else if (opponentPaddle.DirectionY < -speed && !ReachedBorder(opponentPaddle, "bottom")) {
            opponentPaddle.Mesh.position.y -= speed;
        }
    }
}

function RandomSpellCast() {
    switch (botCollisionCounter) {
        case 1:
            if (Math.random() <= 0.1) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;
            }
            break;
        case 2:
            if (Math.random() <= 0.3) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;

            }
            break;
        case 3:
            if (Math.random() <= 0.6) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;

            }
            break;
        case 4:
            if (Math.random() <= 0.8) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;
            }
            break;
        default:
            botCollisionCounter = 0;
            break;
    }
}

function BotPaddleMovement()
{
    if(CanActiveSpell(opponentPaddle) && !botTryCastSpell)
    {
        botTryCastSpell = true;
        botCollisionCounter++;
        RandomSpellCast();
        setTimeout(() => {
            botTryCastSpell = false;
        }, 2000);
    }
    if(ball.DirX < 0)
    {
        MovePaddleInCenter(opponentPaddle);
        return;
    }
    if(ball.Mesh.position.x < gameRender.playerField.Mesh.position.x)
    {
        CalculateBotPaddleSpeed(opponentPaddle.Speed, gameData.difficulty/10);
        return;
    }
    if(ball.Mesh.position.x < gameRender.playerField.Mesh.position.x + gameRender.playerField.Width/2)
    {
        CalculateBotPaddleSpeed(opponentPaddle.Speed, gameData.difficulty/5);
        return;
    }
    if(ball.Mesh.position.x < gameRender.playerField.Mesh.position.x + gameRender.playerField.Width/2)
    {
        CalculateBotPaddleSpeed(opponentPaddle.Speed, gameData.difficulty/2);
        return;
    }
    CalculateBotPaddleSpeed(opponentPaddle.Speed, gameData.difficulty);
}

const CanActiveSpell = (paddle) => {
    if(paddle.isSpellActive || !isSkillActive) return false;
    if(paddle.isSpellActive && !IsBallOnPaddleWidth(paddle, paddle.Width/2)) return false;
    return IsBallNearPaddle(paddle, paddle.Height/2);
};

function ActivateSpell(paddle) {
    document.dispatchEvent(SpellEvent);
    paddle.isSpellActive = true;
    for(let i = 1.1; i <= 1.4; i+=0.1)
    {
        paddle.ScalePaddle(i);
    }
    setTimeout(() => {
        paddle.isSpellActive = false;
        paddle.OriginalScalePaddle();
    }, 300);
}
let tryToUseSkill = false;
function playerPaddleMovement(paddle, leftKey, rightKey, spellKey)
{
    let border= 0.42;
    if (Key.isDown(leftKey))
    {
        if (paddle.Mesh.position.y < gameRender.playerField.Height/2 - paddle.Height/2 -paddle.Width/2)
        {
            paddle.DirectionY = paddle.Speed;
        }
        else
        {
            paddle.DirectionY = 0;
        }
    }
    else if (Key.isDown(rightKey))
    {
        if (paddle.Mesh.position.y > -gameRender.playerField.Height/2 + paddle.Height/2 + paddle.Width/2)
        {
            paddle.DirectionY = -paddle.Speed;
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
    if (Key.isDown(spellKey))
    {
        if(tryToUseSkill) return;
        tryToUseSkill = true;
        if(CanActiveSpell(paddle))
        {
            ActivateSpell(paddle);
        }
        setTimeout(() => {
            tryToUseSkill = false;
        }, 1000);
    }
}