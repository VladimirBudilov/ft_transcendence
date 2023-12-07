import * as THREE from 'three';
import { FontLoader } from 'three/src/loaders/FontLoader';
let camera, scene, renderer;

init();

function printText(text, position) {
    const loader = new FontLoader();
    loader.load('https://cdn.jsdelivr.net/npm/three@0.130.1/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textOptions = {
            font: font,
            size: 100,
            height: 5,
        };
        const shapes = font.generateShapes(text , textOptions.size);
        const geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();
        const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        const yMid = -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
        geometry.translate(xMid, yMid, 0); // Center text horizontally and vertically
        const textMaterial = new THREE.MeshBasicMaterial({
            color: 0x006699,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide
        });
        const textMesh = new THREE.Mesh(geometry, textMaterial);
        scene.add(textMesh);
    });
}

function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1000); // Adjusted camera position to see the text
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    printText("helllo", camera.position);
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