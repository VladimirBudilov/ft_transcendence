import * as THREE from 'three';
import { printText } from './textHandle.js';
import { gameRender, playerPaddle, opponentPaddle, ball } from './globalData.js';
import { StartGameVsBot, StartGameVsPlayer, StopGame, UpdateVsBot, UpdateVsPlayer } from './gameStateHandle.js';

// get button by id and add event listener
function AddButtonEventListenerById(id, func) {
    let button = document.getElementById(id);
    button.addEventListener("click", func);
}

function startGame () {
    AddButtonEventListenerById("StartGame", StartGameVsBot);
}

startGame();

let camera, scene, renderer;

init();
function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1000); // Adjusted camera position to see the text
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    printText("helllo", camera.position, scene);
    printText("Hello world!",camera.position, scene);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    animate(); // Start animation loop
}
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
