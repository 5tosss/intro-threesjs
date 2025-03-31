import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Mejorar la resolución del renderizado con antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear la geometría del cubo
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Crear el wireframe con mejor resolución
const wireframe = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineDashedMaterial({
    color: "#ffffff", // Color blanco para mejor visibilidad
    linewidth: 2, // No afecta en algunos navegadores, pero ayuda en WebGL2
    scale: 1,
    dashSize: 0, // Poner en 0 para líneas continuas
    gapSize: 0
});
const cubeWireframe = new THREE.LineSegments(wireframe, lineMaterial);
scene.add(cubeWireframe);

// Importante: Necesario para que LineDashedMaterial funcione correctamente
cubeWireframe.computeLineDistances();

camera.position.z = 5;
camera.lookAt(0,0,0);        // Mirar al centro del cubo

function animate() {
    requestAnimationFrame(animate);
    
    // Rotar el wireframe
    cubeWireframe.rotation.x += 0.01;
    cubeWireframe.rotation.y += 0.01;
    cubeWireframe.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();
