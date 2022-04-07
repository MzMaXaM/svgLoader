import { renderSVG } from "./svg.js"
import { fitCameraToObject } from "./fitTheObject.js"
import { setupScene } from "./scene.js";
import { ukSvg } from "./countriesSVGs.js";

const defaultExtrusion = 0.5;
const app = document.querySelector("#app");
const focusButton = document.querySelector("#focus");
const { scene, camera, controls } = setupScene(app);
const { object, update } = renderSVG(defaultExtrusion, ukSvg);

scene.add(object);

focusButton.addEventListener("click", () => {
  fitCameraToObject(camera, object, controls);
});