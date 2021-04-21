import React, { useState } from 'react';
import * as THREE from 'three';

export const useSceneData = () => {

    const [controls, setControls] = useState(null);

    const setupScene = (mount) => {
        
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
    
        camera.position.z = 5;
    
        mount.current.appendChild(renderer.domElement);

        const animate = () => {
            if(controls) controls.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

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

        animate();
        setupEventListeners();
    
    }

    const addObjects = (scene) => {
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);
    }

    return {
        setupScene,
        addObjects
    }
}
