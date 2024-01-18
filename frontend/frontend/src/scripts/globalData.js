class GameRender {
    WIDTH = 800;
    HEIGHT = 600;
    renderer = null;
    gameScene = null;
    gameCamera = null;
    playerField = new Rectangular();
    table = new Rectangular();
    ground = new Rectangular();
    // SetWindowSize(newWidth, newHeight) {
    //     let Wscale = (newWidth * 0.6) / this.WIDTH;
    //     let Hscale = (newHeight * 0.4) / this.HEIGHT;
    //     this.WIDTH = newWidth * 0.6;
    //     this.HEIGHT = newHeight * 0.4;
    //     if (Wscale < 1 || Hscale < 1) {
    //         return Wscale < Hscale ? Wscale : Hscale;
    //     }
    //     this.renderer.setSize(newWidth, newHeight);
    //     if (Wscale > 1 || Hscale > 1) {
    //         return Wscale > Hscale ? Wscale : Hscale;
    //     }
    //     return 1;
    // }
}

class Vector3 {
    x = 0;
    y = 0;
    z = 0;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Data {
    playerScore = 0;
    opponentScore = 0;
    maxScore = 7;
    difficulty = 0.8;
    ballSpeed = 10;
    spellTime = 4000;
    slidePunchSpeed = 0.6;
    slidePunchTime = 2500;
    spellSpeed = 0.7;
    playerFieldWidth = 720;
    playerFieldHeight = 540;
    playerFieldQuality = 100;
    bounceTime = 100;
    startCameraPosition = this.playerFieldHeight * 1.3;
    maxCameraPosition = 220;
    allTimeouts = [];
    UpdateScreenData() {

    }
}

class Lighting {
    pointLight = null;
}
class Paddle {
    Mesh;

    isSpellActive = false;
    leftPart;
    rightPart;
    Width = 20;
    Height = 60;
    Depth = 10;
    Quality = 10;
    DirectionY = 0;
    Speed = 9;
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
        this.Height = 60;
        this.Mesh.scale.z = 1;
        this.Depth = 10;
    }
}

class Ball {
    DirX = 0.5;
    DirY = 0.5;
    Speed;
    Radius = 14;
    segments = 100;
    rings = 100;
    Mesh = null;
    Material = null;
    constructor() {
        this.Speed = gameData.ballSpeed;
    }
}

class Rectangular {
    Width = 0;
    Height = 0;
    Quality = 0;
    Material = null;
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

let count = 0;