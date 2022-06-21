import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Custom Geometry
const geometry = new THREE.BufferGeometry();
const material = new THREE.MeshBasicMaterial( {side: THREE.FrontSide,wireframe: true,transparent:false, color: 0xff0000} )
const mesh = new THREE.Mesh(geometry, material)

// Coordinates 
// const vertices = [
//     (Math.random() - 0.5) * 4, // x 
//     (Math.random() - 0.5) * 4, // y
//     (Math.random() - 0.5) * 4 // z
// ]

// console.log(vertices);
const vertices = [
    -1, -1, 0,
    1, -1, 0,
    1, 1, 0,
    -1, 1, 0
];

const indices = [
    0,1,2,
    2,3,0
]

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setIndex(indices);


// Coordinates of each point in a vertices
// const position = new Float32Array( [
// 	-1.0, -1.0,  1.0,
// 	 1.0, -1.0,  1.0,
// 	 1.0,  1.0,  1.0,

// 	 1.0,  1.0,  1.0,
// 	-1.0,  1.0,  1.0,
// 	-1.0, -1.0,  1.0
// ] );
// console.log(geometry.setAttribute( 'position', new THREE.BufferAttribute( position, 3 ) ));

// var colors = new Float32Array([0,0,1, 0,0,0, 0,0,0])
// geometry.setAttribute('color', new THREE.BufferAttribute(colors,3))

// let vertices;
// for(let i = 0; i < 50; i++) {
//     for(let j =0; j<3; j++) {
//         vertices = new Float32Array([
//             (Math.random() - 0.5) * 4, // x 
//             (Math.random() - 0.5) * 4, // y
//             (Math.random() - 0.5) * 4 // z
//         ]);
//         // console.log(vertices)
//     }
//     // console.log(vertices);
//     console.log(geometry.setAttribute(`position`, new THREE.BufferAttribute(vertices, 3)));

//     // console.log(vertices);
// }


scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()