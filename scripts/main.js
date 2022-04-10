import { renderSVG } from "./svg.js"
import { fitCameraToObject } from "./fitTheObject.js"
import { setupScene } from "./scene.js";
import { countries } from "./countriesSVGs.js";

const app = document.querySelector("#app");
const focusButton = document.querySelector("#focus");
const { scene, camera, controls } = setupScene(app);

countries.forEach(element => {
  const { object, update } = renderSVG(element.depths, element.paths, element.color, element.name);

  scene.add(object);
});


focusButton.addEventListener("click", () => {
  fitCameraToObject(camera, scene, controls);
  console.log(scene)
});

