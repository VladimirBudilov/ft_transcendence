
function initTextOnScreen() {
    let loader = new THREE_ADDONS.FontLoader();
    loader.load('/Users/vbudilov/Desktop/transuha/ft_transcendence/Scripts/three/examples/fonts/gentilis_bold.typeface.json',
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