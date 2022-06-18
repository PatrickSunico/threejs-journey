// Scene
const scene = new THREE.Scene();

/* 
    Setting up Geometries and Mesh
*/

// BoxGeometry class for a rectangular cube with give width, height and depth
const geometry = new THREE.BoxGeometry(1, 1, 1);
// BasicMaterial material for drawing geometries in a simple shaded way
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Instantiate the mesh, Mesh is composed of a geometry and a material
const mesh = new THREE.Mesh(geometry, material);

// Adding Objects inside the scene
scene.add(mesh);

/* 
    Setting up a Camera for POV
    The PerspectiveCamera Takes in (fov, aspectRatio, near)
    fov - from bottom to top of view in degrees
    aspectRatio - aspectRatio = (canvas width / canvas height)
    To move objects, we can use the following properties
    - position
    - rotation
    - scale
*/

const sizes = {
 width: 800,
 height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.position.x = 2;
// camera.position.y = 2;
// camera.position.z = 6;
scene.add(camera);

/* 
    - Setting up Render to preview it via canvas and html class
    - Initializing a canvas via html
    - Setting up a renderer to render the canvas via WebGLRenderer
    - Setting the size of the canvas as fixed via setSize
    - Call the render method pass in scene and the camera as parameters
*/
// Canvas Selector
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
 canvas: canvas,
});

// setSize off canvas
renderer.setSize(sizes.width, sizes.height);

// First Render
renderer.render(scene, camera);
