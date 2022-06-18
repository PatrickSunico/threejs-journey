import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    // BoxGeometry(width, height,depth, widthSegments, heightSegments, depthSegment)
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3

// move camera so it faces the cube


// get distance of the camera 
console.log(camera.position.length());
camera.lookAt(mesh.position)
scene.add(camera)


/**
 * Controls
 * OrbitControls(camera, domElement)
 * Damping
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.update();



// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (e) => {
    // clientX provides horizontal coordinate within the browsers viewport
    // clientY provides vertical coordinate within the browsers viewport

    // get values that goes from 0 to 1, apply - 0.5 if you want to go from left to right from either a or y axis
    // cursor.x = -(e.clientX / sizes.width -0.5); // follows the mouse based on it's location
    // cursor.y = e.clientY / sizes.height - 0.5 // follows the mouse based on it's location

    // Negated moves the object opposite to the mouse's location
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = -(e.clientY / sizes.width - 0.5);
    

})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update Camera and update via amplitude of 3
    // camera.position.x = cursor.x * 3
    // camera.position.y = cursor.y * 3
    
    // Math PI a full revolution 
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    // camera.position.y = cursor.y * 3;
    // camera.lookAt(mesh.position);

    // Update Controls
    controls.update();

    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()