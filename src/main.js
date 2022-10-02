import * as THREE from "three";
import { Raycaster } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module";

import "./style.css";

let SCREEN_HEIGHT = window.innerHeight;
let SCREEN_WIDTH = window.innerWidth;

/**
 * "settings"
 */
const textureLoader = new THREE.TextureLoader();

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x5b5b5b);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
directionalLight.position.set(0, 8, 4);
directionalLight.target.position.set(0, 2, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

// Light display
// const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(dirLightHelper);

// Camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  500
);
camera.position.set(0, 0, 2);

// Rendering
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#app").appendChild(renderer.domElement);

// Camera controls
const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Components
 */
const planeSize = 40;

const planeTexture = textureLoader.load("checker.png");
planeTexture.wrapS = THREE.RepeatWrapping;
planeTexture.wrapT = THREE.RepeatWrapping;
planeTexture.magFilter = THREE.NearestFilter;

const repeats = planeSize / 2;
planeTexture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: planeTexture,
  side: THREE.FrontSide,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = Math.PI * -0.5;
plane.position.y = -0.85;
scene.add(plane);

// Player
// const playerTexture = textureLoader.load("airplane.png");
// playerTexture.wrapS = THREE.RepeatWrapping;
// playerTexture.wrapT = THREE.RepeatWrapping;
// playerTexture.magFilter = THREE.NearestFilter;

const map = textureLoader.load("airplane.png");
const material = new THREE.SpriteMaterial({ map: map });

const Player = new THREE.Sprite(material);

const raycaster = new THREE.Raycaster();
// Player.raycast(raycaster);
scene.add(Player);

// const playerGeo = new THREE.PlaneGeometry(0.2, 0.1);
// const playerMat = new THREE.MeshPhongMaterial({
//   map: playerTexture,
//   side: THREE.FrontSide,
// color: 0x49e8ed,
//});
// const player = new THREE.Mesh(playerGeo, playerMat);

Player.position.set(0, -0.5, -2);
//scene.add(player);

// Player movement
const xSpeed = 0.1;
const ySpeed = 0.1;

document.addEventListener("keydown", onDocumentKeyDown);

function onDocumentKeyDown(event) {
  const keyCode = String(event.key).toLowerCase();
  if (keyCode === " ") Player.position.set(0, -0.5, -2);

  if (keyCode === "q" && Player.position.x > -3) Player.position.x -= xSpeed;
  if (keyCode === "d" && Player.position.x < 3) Player.position.x += xSpeed;
  if (keyCode === "z" && Player.position.y < 1) Player.position.y += ySpeed;
  if (keyCode === "s" && Player.position.y > -0.5) Player.position.y -= ySpeed;
}

/**
 * Exec
 */

// Suivre la taille de la fenetre
window.addEventListener("resize", onWindowResize);

renderer.setAnimationLoop(render);

function render(time) {
  // rotateMesh(defaultCube, time);
  stats.update();

  // controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  SCREEN_HEIGHT = window.innerHeight;
  SCREEN_WIDTH = window.innerWidth;

  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
}
