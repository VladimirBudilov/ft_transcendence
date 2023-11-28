var renderer, scene, camera, pointLight, spotLight;

// field variables
let fieldWidth = 400, fieldHeight = 200;

// paddle variables
let paddleWidth, paddleHeight, paddleDepth, paddleQuality;
let paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;

// ball variables
let ball, paddle1, paddle2;
let ballDirX = 1, ballDirY = 1, ballSpeed = 2;

// game-related variables
let score1 = 0, score2 = 0;
// you can change this to any positive whole number
let maxScore = 7;

// set opponent reflexes (0 - easiest, 1 - hardest)
let difficulty = 0.2;

//create structure with 3 variables (x, y, z)


let game = new gameType(false, false, false);

