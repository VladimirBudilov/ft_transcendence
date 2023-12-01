class GameRender{
    WIDTH = 640;
    HEIGHT = 360;
    renderer;
    gameScene;
    gameCamera;
    playerField = new Rectangular();
    table = new Rectangular();
    ground = new Rectangular();
    currentGameCanvas;
}

class Data{
    playerScore = 0;
    opponentScore = 0;
    maxScore = 2;
    difficulty = 0.2;
}

class Lighting
{
    spotLight;
    pointLight;
}
class Paddle {
    Mesh;
    Width = 10;
    Height = 30;
    Depth = 10;
    Quality = 10;
    DirectionY = 0;
    Speed = 6;
    Material;

}

class Ball {
    DirX = 1;
    DirY = 1;
    Speed = 5;
    Radius = 7;
    segments = 100;
    rings = 100;
    Mesh;
    Material;
}

class Rectangular{
    Width;
    Height;
    Quality;
    Material;
    Mesh;
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
let playerPaddle = new Paddle();
let opponentPaddle = new Paddle();
let ball = new Ball();
let stopGame = false;
let animationId;



