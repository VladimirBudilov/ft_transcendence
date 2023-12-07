import {FontLoader} from "three/src/loaders/FontLoader";
import * as THREE from "three";

const loader = new FontLoader();
loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
    const color = 0x006699;
    new THREE.LineBasicMaterial({
        color: color,
        side: THREE.DoubleSide
    });
    let matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
    });
    let message = '   Three.js\nSimple text.';
    let shapes = font.generateShapes(message, 100);
    let geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    let xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    let text = new THREE.Mesh(geometry, matLite);
    text.position.z = -150;
    scene.add(text);
});