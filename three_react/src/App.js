import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import "./App.css";

const App = () => {

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    const mount = useRef(null);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,

        1000
    );
    const renderer = new THREE.WebGLRenderer();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    renderer.setSize(window.innerWidth, window.innerHeight);

    useEffect(() => {
        // document.body.appendChild( renderer.domElement );
        scene.add(cube);
        camera.position.z = 5;
        mount.current.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, mount.current);
        controls.enableDamping = true;

        const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        };

        animate();
        setupEventListeners();
    });



    const setupEventListeners = () => {
        window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    };

    return <div ref={mount} className="App"></div>;
}

export default App;
