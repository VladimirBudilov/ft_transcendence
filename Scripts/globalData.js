let startPlaying = false;

var renderer, scene, camera, pointLight, spotLight;

// field variables
let fieldWidth = 400, fieldHeight = 200;

// paddle variables
let paddleWidth, paddleHeight, paddleDepth, paddleQuality;
let paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 6;

// ball variables
let ball, paddle1, paddle2;
let ballDirX = 1, ballDirY = 1, ballSpeed = 5;

// game-related variables
let score1 = 0, score2 = 0;
// you can change this to any positive whole number
let maxScore = 2;

// set opponent reflexes (0 - easiest, 1 - hardest)
let difficulty = 0.2;

let stopGame = false;

let defaultPlayerName = "Player", defaultOpponentName = "Opponent";

let animationId;

class GameType {
    static vsBot = false;
    static vsPlayer = false;
    static tournament = false;
}

class Player { 
    playerName = "";
    id = -1;
    score = -1;
    wonLastGame = false;
    constructor(name,id) {
        this.playerName = name;
        this.score = 0;
        this.id = id;
        this.wonLastGame = false;
    }
}

