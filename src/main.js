import * as THREE from "three";
import Stats from "three/addons/libs/stats.module";

import "./style.css";

let SCREEN_HEIGHT = window.innerHeight;
let SCREEN_WIDTH = window.innerWidth;

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x5b5b5b);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(0, 8, 4);
directionalLight.target.position.set(0, 2, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

// Camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  500
);

// Rendu
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#app").appendChild(renderer.domElement);

/**
 * Components
 */
const planeSize = 40;

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("checker.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;

const repeats = planeSize / 2;
texture.repeat.set(repeats, repeats);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: texture,
  side: THREE.FrontSide,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = Math.PI * -0.5;
plane.position.y = -0.85;
scene.add(plane);

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
