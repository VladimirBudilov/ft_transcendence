function initTextOnScreen() {
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    let loader = new THREE.FontLoader();
    loader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json',
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