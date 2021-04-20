import React, { useContext, useEffect } from 'react';
import { StudioContext } from './App';

import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Utility functions
import { addItems } from './functions/sceneInit';


const Child = () => {
    console.log('rendering')

    const value = useContext(StudioContext);
    console.log('value', value);

    useEffect(() => {
        addItems(value);
    }, []);

    return (
        <div ref={value.mount}></div>
    )
}

export default Child;
