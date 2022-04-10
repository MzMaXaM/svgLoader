// import * as THREE from "https://cdn.skypack.dev/three@0.130.0";
import * as THREE from 'three';
import { SVGLoader } from "loader";

const stokeMaterial = new THREE.LineBasicMaterial({ color: "#555" });

export function renderSVG(extrusion, svg, color, name) {
  const fillMaterial = new THREE.MeshBasicMaterial({ color: color });
  const loader = new SVGLoader();
  const svgData = loader.parse(svg);
  const svgGroup = new THREE.Group();
  const updateMap = [];

  svgGroup.scale.y *= -1;
  svgGroup.name = name//add name
  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);

    shapes.forEach((shape) => {
      const meshGeometry = new THREE.ExtrudeBufferGeometry(shape, {
        depth: (extrusion / 10) * 3,
        bevelEnabled: false
      });
      const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
      const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
      const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);

      updateMap.push({ shape, mesh, lines });
      svgGroup.add(mesh, lines);
    });
  });

  return {
    object: svgGroup,
    update(extrusion) {
      updateMap.forEach((updateDetails) => {
        const meshGeometry = new THREE.ExtrudeBufferGeometry(
          updateDetails.shape,
          {
            depth: extrusion,
            bevelEnabled: false
          }
        );
        const linesGeometry = new THREE.EdgesGeometry(meshGeometry);

        updateDetails.mesh.geometry.dispose();
        updateDetails.lines.geometry.dispose();
        updateDetails.mesh.geometry = meshGeometry;
        updateDetails.lines.geometry = linesGeometry;
      });
    }
  };
};