import {FontLoader} from "three/src/loaders/FontLoader";
import * as THREE from "three";

function initTextOnScreen() {

}

function printText(text, position, scene) {
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
export {printText};