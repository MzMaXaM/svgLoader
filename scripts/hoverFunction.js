import { Raycaster } from "three"


const hoverColor = '000000'
const raycaster = new Raycaster()

let name,
  oldColor,
  oldHoveredObj,
  hoveredObj;

function hoverFun(pointer, scene, camera) {

  const intersects = raycaster.intersectObjects(scene.children);
  raycaster.setFromCamera(pointer, camera);

  if (intersects.length === 0 && oldHoveredObj) {
    oldHoveredObj.material.color.setHex(oldColor)
  }
  if (intersects.length > 0) {
    const hoveredObjParr = intersects[0].object.parent
    hoveredObj = hoveredObjParr.children[0]
    // console.log(hoveredObjParr)
    // hoveredObj.material.color.setHex(hoverColor)


    if (hoveredObj.name == name) {
      if (name !== 'helper') {
        oldHoveredObj = hoveredObj
      }
      return
    }
    if (hoveredObj.name !== name) {
      name = hoveredObj.name
      if (oldHoveredObj) {
        oldHoveredObj.material.color.setHex(oldColor)
      }
      if (name !== 'helper') {
        oldColor = hoveredObj.material.color.getHex()
        hoveredObj.material.color.setHex(hoverColor)
      }
      return
    }


  }
}

export { hoverFun }