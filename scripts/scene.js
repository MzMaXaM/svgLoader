import * as THREE from "three";
import { OrbitControls } from "orbit";
import { hoverFun } from "./hoverFunction.js";
import { onPointerMove, pointer } from "./pointerMove.js";

export function setupScene(container) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    1e5
  );
  const ambientLight = new THREE.AmbientLight("#888888");
  const pointLight = new THREE.PointLight("#ffffff", 2, 800);
  const controls = new OrbitControls(camera, renderer.domElement);
  const animate = () => {
    renderer.render(scene, camera);
    controls.update();

    hoverFun(pointer, scene, camera)

    requestAnimationFrame(animate);
  };

  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.add(ambientLight, pointLight);
  camera.position.z = 50;
  camera.position.x = 50;
  camera.position.y = 50;
  controls.enablePan = false;

  container.append(renderer.domElement);
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  window.addEventListener('pointermove', onPointerMove);


  animate();



  return { camera, controls, scene };
};