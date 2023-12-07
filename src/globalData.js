class GameRender{
    WIDTH = 640;
    HEIGHT = 360;
    renderer =null;
    gameScene =null;
    gameCamera =null;
    playerField = new Rectangular();
    table = new Rectangular();
    ground = new Rectangular();
}

class Data{
    playerScore = 0;
    opponentScore = 0;
    maxScore = 2;
    difficulty = 0.5;
}

class Text{
    playerNames = null;
    opponentNames = null;
    playerScore = null;
    opponentScore = null;
    maxScore = null;
}

class Lighting
{
    spotLight =null;
    pointLight =null;
}
class Paddle {
    Mesh;
    Width = 10;
    Height = 30;
    Depth = 10;
    Quality = 10;
    DirectionY = 0;
    Speed = 6;
    Material = null;
    isPlayer = false;
    constructor(type) {
        this.isPlayer = type;
    }
}

class Ball {
    DirX = 1;
    DirY = 1;
    Speed = 3;
    Radius = 7;
    segments = 100;
    rings = 100;
    Mesh =null;
    Material=null;
}

class Rectangular{
    Width=0;
    Height=0;
    Quality=0;
    Material=null;
    Mesh = null;
}

class GameType {
    static vsBot = false;
    static vsPlayer = false;
    static tournament = false;
}

class Player {
    defaultPlayerName = "Player";
    defaultOpponentName = "Opponent";
    playerName = "";
    id = -1;
    score = 0;
    constructor(name, id) {
        this.playerName = name;
        this.id = id; 
    }
}
let lighting = new Lighting();
let gameType = new GameType();
let player = new Player();
let opponent = new Player();
let startPlaying = false;
let gameRender = new GameRender();
let gameData = new Data();
let playerPaddle = new Paddle(true);
let opponentPaddle = new Paddle(false);
let ball = new Ball();
let stopGame = false;
let animationId;

export { gameRender, gameData, playerPaddle, opponentPaddle, ball, stopGame, animationId, player, opponent, startPlaying, gameType};