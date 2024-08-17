//3D model is not added yet...

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load a GLTF model
const loader = new THREE.GLTFLoader();
loader.load('path/to/your/model.glb', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, 0, -5); // Adjust model position
});

// Add basic lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add interactivity
let infoDiv = document.getElementById('info');
window.addEventListener('mousemove', (event) => {
    infoDiv.textContent = `Mouse position: (${event.clientX}, ${event.clientY})`;
});
