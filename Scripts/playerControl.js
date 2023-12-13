function BotPaddleMovement()
{
    opponentPaddle.DirectionY = (ball.Mesh.position.y - opponentPaddle.Mesh.position.y) * gameData.difficulty;
    // TODO add random freezing.
    if (Math.abs(opponentPaddle.DirectionY) <= opponentPaddle.Speed)
    {
        opponentPaddle.Mesh.position.y += opponentPaddle.DirectionY;
    }
    else
    {
        if (opponentPaddle.DirectionY > opponentPaddle.Speed)
        {
            opponentPaddle.Mesh.position.y += opponentPaddle.Speed;
        }
        else if (opponentPaddle.DirectionY < -opponentPaddle.Speed)
        {
            opponentPaddle.Mesh.position.y -= opponentPaddle.Speed;
        }
    }
}

const CanActiveSpell = (paddle) => {
    if(paddle.isSpellActive && !IsBallOnPaddle(paddle)) return false;
    return Math.abs(ball.Mesh.position.x - paddle.Mesh.position.x) < 60
};

function ActivateSpell(paddle) {
    document.dispatchEvent(SpellEvent);
    paddle.isSpellActive = true;
    paddle.SpellMesh.visible = true;
    paddle.SpellMesh.position = paddle.Mesh.position;
    setTimeout(() => {
        paddle.isSpellActive = false;
        paddle.SpellMesh.visible = false;
    }, 2000);
}

function playerPaddleMovement(paddle, leftKey, rightKey, spellKey)
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
    if (Key.isDown(spellKey))
    {
        if(CanActiveSpell(paddle))
        {
            ActivateSpell(paddle);
            console.log("Spell activated");
        }
    }
}