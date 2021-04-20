import React, { useContext, useEffect } from 'react';
import { StudioContext } from './App';

import * as THREE from 'three';

const Child = () => {
    console.log('rendering')

    const { scene } = useContext(StudioContext);
    // let cube;

    useEffect(() => {
        addItems();
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
