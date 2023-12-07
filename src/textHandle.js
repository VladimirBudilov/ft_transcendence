import {FontLoader} from "three/src/loaders/FontLoader";
import * as THREE from "three";

function initTextOnScreen() {
    var loader = new FontLoader();
    loader.load('/Users/vbudilov/Desktop/transuha/ft_transcendence/three-addons/three/examples/fonts/gentilis_bold.typeface.json',
        function (font) {
            let textGeometry = new THREE.TextGeometry('Hello, Three.js!', {
                font: font,
                size: 100,
                height: 3,
                curveSegments: 50,
            });
            let textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            let textMesh = new THREE.Mesh(textGeometry, textMaterial);
            gameRender.gameScene.add(textMesh); // Add text mesh to the scene
            textMesh.position.set(-2, 0, -500); // Position adjusted to be in the center and more visible
        }
    );
}

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