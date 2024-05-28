/**
 * Create simple green, rectangular ground
 */

// Update the size of background
import { createBox } from "./createObjects.js";
import { Colors } from "./color.js";
import { scene } from "./createScene.js";

var ground;
function createGround() {
    ground = createBox( 20000, 20, 20000, Colors.greenDark, 0, -10, 0 );
    scene.add(ground);
}
export {createGround, ground}