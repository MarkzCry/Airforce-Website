import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the GLTF model
const loader = new GLTFLoader();
let model;

loader.load('./threeD/scene.gltf', (gltf) => {
  model = gltf.scene;
  scene.add(model);
});

// Add lights (optional)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  if (model) {
    // Rotate the model (optional)
    model.rotation.x += 0.005;
    model.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
};

animate();
