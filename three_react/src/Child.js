import React, { useContext, useEffect } from 'react';
import { StudioContext } from './App';

import * as THREE from 'three';

const Child = () => {

    const { scene, renderer, camera } = useContext(StudioContext);

    useEffect(() => {
        addItems();

        const animate = function () {
            requestAnimationFrame(animate);
            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            };
    
            animate();
    });

    const addItems = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

    }

    return (
        <div>
        </div>
    )
}

export default Child;
