/**
 * Create simple green, rectangular ground
 */

// Update the size of background
import { createBox } from "./createObjects.js";
import { Colors } from "./color.js";
import { scene } from "./createScene.js";
function createGround() {
    var ground = createBox( 900, 20, 500, Colors.greenDark, 0, -10, 0 );
    scene.add(ground);
}
export {createGround}