class GameRender{
    WIDTH = window.innerWidth/2;
    HEIGHT = window.innerHeight/2;
    renderer =null;
    gameScene =null;
    gameCamera =null;
    playerField = new Rectangular();
    table = new Rectangular();
    ground = new Rectangular();
    SetWindowSize(width, height) {
        this.WIDTH = width/2;
        this.HEIGHT = height/2;
    }
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
    difficulty = 0.8;
    ballSpeed = 4.5;
    spellTime = 3000;
    slidePunchSpeed = 0.5;
    slidePunchTime = 1500;
    spellSpeed = 0.5;
    playerFieldWidth = 400;
    playerFieldHeight = 200;
    playerFieldQuality = 100;
}

class Lighting
{
    spotLight =null;
    pointLight =null;
    ambientLight =null;
}
class Paddle {
    Mesh;
    
    Spell;
    isSpellActive = false;
    SpellMesh;
    Width = 10;
    Height = 30;
    Depth = 10;
    Quality = 10;
    DirectionY = 0;
    Speed = 4.5;
    Material = null;
    isPlayer = false;
    ballDirectionChanged = false;
    constructor(type) {
        this.isPlayer = type;
    }
}

class Ball {
    DirX = 1;
    DirY = 1;
    Speed;
    Radius = 7;
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


