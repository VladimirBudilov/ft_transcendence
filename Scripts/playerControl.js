function MovePaddleInCenter(opponentPaddle) {
    let center = gameRender.playerField.Mesh.position.y;
    let gap = 10;
    if (opponentPaddle.Mesh.position.y > center + gap)
    {
        opponentPaddle.DirectionY = -ball.Speed/4;
    }
    else if (opponentPaddle.Mesh.position.y < center - gap)
    {
        opponentPaddle.DirectionY = ball.Speed/4;
    }
    else
    {
        opponentPaddle.DirectionY = 0;
    }
    opponentPaddle.Mesh.position.y += opponentPaddle.DirectionY;
}

function CalculateBotPaddleSpeed(speed, difficulty) {
    opponentPaddle.DirectionY = (ball.Mesh.position.y - opponentPaddle.Mesh.position.y) * difficulty;
    if (Math.abs(opponentPaddle.DirectionY) <= speed) {
        opponentPaddle.Mesh.position.y += opponentPaddle.DirectionY;
    } else {
        if (opponentPaddle.DirectionY > speed) {
            opponentPaddle.Mesh.position.y += speed;
        } else if (opponentPaddle.DirectionY < -speed) {
            opponentPaddle.Mesh.position.y -= speed;
        }
    }
}

function RandomSpellCast() {
    switch (botCollisionCounter) {
        case 0:
            if (Math.random() <= 1) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;
            }
            break;
        case 1:
            if (Math.random() <= 1) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;

            }
            break;
        case 2:
            if (Math.random() <= 1) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;

            }
            break;
        case 3:
            if (Math.random() <= 1) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;

            }
            break;
        case 4:
            if (Math.random() <= 1) {
                ActivateSpell(opponentPaddle);
                botCollisionCounter = 0;
            }
            break;
        default:
            break;
    }
}

function BotPaddleMovement()
{
    if(ball.DirX < 0)
    {
        MovePaddleInCenter(opponentPaddle);
        return;
    }
    if(ball.Mesh.position.x < gameRender.playerField.Mesh.position.x)
    {
        CalculateBotPaddleSpeed(ball.Speed, 0.03);
        return;
    }
    if(ball.Mesh.position.x < gameRender.playerField.Mesh.position.x + gameRender.playerField.Width/2)
    {
        CalculateBotPaddleSpeed(ball.Speed, 0.3);
        return;
    }
    CalculateBotPaddleSpeed(opponentPaddle.Speed, gameData.difficulty);
    if(CanActiveSpell(opponentPaddle))
    {
        botCollisionCounter++;
        RandomSpellCast();
        console.log("Spell try activated");
    }
}

const CanActiveSpell = (paddle) => {
    if(paddle.isSpellActive) console.log("Spell already activated");
    if(!IsBallOnPaddleWidth(paddle)) console.log("Ball not on paddle width");
    
    if(paddle.isSpellActive && !IsBallOnPaddleWidth(paddle)) return false;
    if(!paddle.isPlayer) console.log("Bot ready to cast spell");
    return IsBallNearPaddle(paddle, paddle.Width * 3);
};

function ActivateSpell(paddle) {
    document.dispatchEvent(SpellEvent);
    paddle.isSpellActive = true;
    paddle.SpellMesh.visible = true;
    paddle.SpellMesh.position = paddle.Mesh.position;
    setTimeout(() => {
        paddle.isSpellActive = false;
        paddle.SpellMesh.visible = false;
    }, 1000);
}

function playerPaddleMovement(paddle, leftKey, rightKey, spellKey)
{
    if (Key.isDown(leftKey))
    {
        if (paddle.Mesh.position.y < gameRender.playerField.Height * 0.45)
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
        if (paddle.Mesh.position.y > -gameRender.playerField.Height * 0.45)
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
        if(CanActiveSpell(paddle))
        {
            //ActivateSpell(paddle);
            console.log("Spell activated");
        }
    }
}