import * as THREE from "https://cdn.skypack.dev/three@0.146.0";
import GUI from "https://cdn.skypack.dev/lil-gui@0.17.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { FontLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/geometries/TextGeometry.js";


const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

/**
 * Scene
 */
const scene = new THREE.Scene();
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load(
  "https://raw.githubusercontent.com/helloiamktn0908/threejs-merry-christmas/main/fonts/rozha-one-regular.json",
  (font) => {
    const options = {
      font: font,
      size: 1.5,
      height: 0.5,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4
    };

    const merryGeometry = new TextGeometry("Mutlu", options).center();
    const christmasGeometry = new TextGeometry("Yıllarrr!!", options).center();

    const textMaterial = new THREE.MeshLambertMaterial({
      color: "#DCDCDC"
    });

    const merryText = new THREE.Mesh(merryGeometry, textMaterial);
    const christmasText = new THREE.Mesh(christmasGeometry, textMaterial);

    merryText.position.y = 1;
    christmasText.position.y = -1;

    scene.add(merryText, christmasText);
  }
);

/**
 * GLTFLoader
 */
const gltfLoader = new GLTFLoader();

// Cube
gltfLoader.load(
  "https://raw.githubusercontent.com/helloiamktn0908/threejs-merry-christmas/main/static/star.glb",
  (glb) => {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { duration: 2, ease: "easeIn" }
    });

    glb.scene.scale.set(0.8, 0.8, 0.8);
    glb.scene.position.set(-5, 2, 0);
    scene.add(glb.scene);

    tl.to(glb.scene.rotation, { z: 1 });
    tl.to(glb.scene.rotation, { z: 0 });
  }
);

gltfLoader.load(
  "https://raw.githubusercontent.com/helloiamktn0908/threejs-merry-christmas/main/static/star.glb",
  (glb) => {
    const tl = gsap.timeline({
      delay: 0.3,
      repeat: -1,
      defaults: { duration: 2.5, ease: "easeIn" }
    });

    glb.scene.scale.set(0.8, 0.8, 0.8);
    glb.scene.position.set(6, -3, 0);
    glb.scene.rotation.set(0, 0, 0.8);
    scene.add(glb.scene);

    tl.to(glb.scene.rotation, { z: -0.2 });
    tl.to(glb.scene.rotation, { z: 0.8 });
  }
);

gltfLoader.load(
  "https://raw.githubusercontent.com/helloiamktn0908/threejs-merry-christmas/main/static/candy.glb",
  (glb) => {
    const tl = gsap.timeline({
      delay: 0.3,
      repeat: -1,
      defaults: { duration: 2.5, ease: "easeIn" }
    });

    glb.scene.scale.set(0.6, 0.6, 0.6);
    glb.scene.position.set(-6.5, -2, 0);
    glb.scene.rotation.set(0, 0.1, 0.5);
    scene.add(glb.scene);

    tl.to(glb.scene.position, { y: -2.5 });
    tl.to(glb.scene.position, { y: -2 });
  }
);

gltfLoader.load(
  "https://raw.githubusercontent.com/helloiamktn0908/threejs-merry-christmas/main/static/bell.glb",
  (glb) => {
    const tl = gsap.timeline({
      repeatDelay: 0.8,
      repeat: -1,
      defaults: { duration: 2.5, ease: "easeIn" }
    });

    glb.scene.scale.set(0.6, 0.6, 0.6);
    glb.scene.position.set(5, 3.5, 0);
    glb.scene.rotation.set(0.3, 0, -0.6);
    scene.add(glb.scene);

    tl.to(glb.scene.rotation, { z: -0.2 });
    tl.to(glb.scene.rotation, { z: -0.6 });
  }
);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 0.3, 3);

scene.add(ambientLight, directionalLight);

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */


const renderer = new THREE.WebGLRenderer({
  canvas
});


renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor("#265A3C", 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const animate = () => {
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};
animate();
