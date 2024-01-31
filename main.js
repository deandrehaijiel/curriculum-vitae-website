import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// TorusKnot

const geometryk = new THREE.TorusKnotGeometry(10, 3, 16, 100);
const materialk = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
const torusknot = new THREE.Mesh(geometryk, materialk);

scene.add(torusknot);

torusknot.position.z = 240;
torusknot.position.setX(20);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelpher = new THREE.PointLightHelpher(pointLight)
// const gridHelpher = new THREE.GridHelpher(200, 50);
// scene.add(lightHelpher, gridHelpher)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.OctahedronGeometry(1.1, 0);
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 })
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread(900));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.png');
scene.background = spaceTexture;

// Avatar

// const deandreTexture = new THREE.TextureLoader().load('profile.jpeg');

// const deandre = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map:deandreTexture }));

// scene.add(deandre);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.png');
const normalTexture = new THREE.TextureLoader().load('normal.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 90;
moon.position.setX(-10);

// deandre.position.z = -5;
// deandre.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  // deandre.rotation.y += 0.01;
  // deandre.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate(){
  requestAnimationFrame(animate);

  // deandre.rotation.x += 0.01;
  // deandre.rotation.y += 0.005;
  // deandre.rotation.z += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torusknot.rotation.x += 0.01;
  torusknot.rotation.y += 0.005;
  torusknot.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render( scene, camera );
}

animate();