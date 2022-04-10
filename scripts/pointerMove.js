import { Vector2 } from "three"

const pointer = new Vector2();


function onPointerMove(event) {

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}



export { onPointerMove, pointer }