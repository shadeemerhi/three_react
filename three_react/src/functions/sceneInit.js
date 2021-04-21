import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const setupScene = (self, mount) => {

    console.log('self', self)

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    // const scene = new THREE.Scene();
    self.current.scene = new THREE.Scene();
    self.current.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    // const camera = new THREE.PerspectiveCamera(
    //     75,
    //     window.innerWidth / window.innerHeight,
    //     0.1,
    //     1000
    // );
    self.current.renderer = new THREE.WebGLRenderer();
    // const renderer = new THREE.WebGLRenderer();

    // self.renderer.setSize(window.innerWidth, window.innerHeight);
    self.current.renderer.setSize(window.innerWidth, window.innerHeight)

    // self.camera.position.z = 5;
    self.current.camera.position.z = 5;

    mount.current.appendChild(self.current.renderer.domElement);
    const controls = new OrbitControls(self.current.camera, mount.current);
    controls.enableDamping = true;

    // Not sure if this will work
    // setControls(controls);


    const animate = () => {
        // console.log('calling animate');
        // if(controls) controls.update();
        controls.update();
        requestAnimationFrame(animate);
        // self.renderer.render(self.scene, self.camera);
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

export const addItems = (self) => {
    console.log('running')
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    self.current.scene.add(cube);
}