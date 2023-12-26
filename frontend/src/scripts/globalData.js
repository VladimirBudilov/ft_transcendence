class GameRender{
    WIDTH = 800;
    HEIGHT = 600;
    renderer =null;
    gameScene =null;
    gameCamera =null;
    playerField = new Rectangular();
    table = new Rectangular();
    ground = new Rectangular();
}

class Vector3{
    x=0;
    y=0;
    z=0;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Data{
    playerScore = 0;
    opponentScore = 0;
    maxScore = 100;
    difficulty = 1;
    ballSpeed = 10;
    spellTime = 2500;
    slidePunchSpeed = 0.3;
    slidePunchTime = 1400;
    spellSpeed = 4;
    playerFieldWidth = 720;
    playerFieldHeight = 540;
    playerFieldQuality = 100;
    bounceTime = 1000;
    startCameraPosition = this.playerFieldHeight*1.3;
    allTimeouts = [];
    UpdateScreenData() {
        
    }
}

class Lighting
{
    pointLight =null;
}
class Paddle {
    Mesh;
    
    isSpellActive = false;
    leftPart;
    rightPart;
    Width = 20;
    Height = 70;
    Depth = 10;
    Quality = 10;
    DirectionY = 0;
    Speed = 10;
    Material = null;
    isPlayer = false;
    ballDirectionChanged = false;
    constructor(type) {
        this.isPlayer = type;
    }
    ScalePaddle(scale) {
        this.Mesh.scale.y *= scale;
        this.Height *= scale;
        this.Mesh.scale.z *= scale;
        this.Depth *= scale;
    }
    OriginalScalePaddle() {
        this.Mesh.scale.y = 1;
        this.Height = 70;
        this.Mesh.scale.z = 1;
        this.Depth = 10;
    }
}

class Ball {
    DirX = 0.5;
    DirY = 0.5;
    Speed;
    Radius = 16;
    segments = 100;
    rings = 100;
    Mesh =null;
    Material=null;
    constructor() {
        this.Speed = gameData.ballSpeed;
    }
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
    isFirstRound = true;
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
let SpellEvent = new Event("SpellEvent");
let botCollisionCounter = 0;
let botTryCastSpell = false;


