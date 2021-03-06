import { Box3, Vector3 } from "three"

export function fitCameraToObject(camera, object, controls) {
  const boundingBox = new Box3().setFromObject(object);
  const center = boundingBox.getCenter(new Vector3());
  const size = boundingBox.getSize(new Vector3());
  const offset = 1.25;
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2)) * offset;
  const minZ = boundingBox.min.z;
  const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

  controls.target = center;
  controls.maxDistance = cameraToFarEdge * 2;
  controls.minDistance = cameraToFarEdge * 0.5;
  controls.saveState();
  camera.position.z = cameraZ;
  camera.far = cameraToFarEdge * 3;
  camera.updateProjectionMatrix();
}