import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const setupScene = (self, mount) => {

    console.log('self in setupScene', self);

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    self.current.scene = new THREE.Scene();
    self.current.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    self.current.renderer = new THREE.WebGLRenderer();
    self.current.renderer.setSize(window.innerWidth, window.innerHeight)

    self.current.camera.position.z = 5;

    mount.current.appendChild(self.current.renderer.domElement);
    self.current.controls = new OrbitControls(self.current.camera, mount.current);
    self.current.controls.enableDamping = true;


    const animate = () => {
        self.current.controls.update();
        requestAnimationFrame(animate);
        self.current.renderer.render(self.current.scene, self.current.camera);
    };

    const setupEventListeners = () => {
        window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        self.current.camera.aspect = sizes.width / sizes.height;
        self.current.camera.updateProjectionMatrix();

        // Update renderer
        self.current.renderer.setSize(sizes.width, sizes.height);
        self.current.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    };

    animate();
    setupEventListeners();

}