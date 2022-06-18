import './style.css'
import * as THREE from 'three'
import gsap from "gsap";

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Light 

const light1 = new THREE.PointLight(0xff80C0, 2, 0);
light1.position.set(200, 100, 300);
scene.add(light1);

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock();

// GSAP TWEEN to(translateX, translateY, duration, delay);

gsap.to(mesh.position, {x: 2, y: 2, duration: 1, delay: 1})

// Animations 
const tick = () => {

    // Clock 
    const elapsedTime = clock.getElapsedTime(); // get in seconds format
    // mesh.rotation.x = elapsedTime * Math.PI * 2; // T * 3.14 * 2 Rev per second
    // mesh.rotation.y = elapsedTime * Math.PI * 2; // T * 3.14 * 2 Rev per second


    // Sine and Cosine Oscillation  which triggers an up and down movement
    camera.lookAt(mesh.position);
    camera.position.x = Math.cos(elapsedTime);
    camera.position.y = Math.sin(elapsedTime);

    // Render
    renderer.render(scene,camera);

    // animationFrame
    window.requestAnimationFrame(tick)
}

tick();
