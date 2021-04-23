import React, { useContext, useEffect } from 'react';

import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Utility functions
import { addItems } from './functions/scene_setup/sceneInit';


const Child = () => {
    console.log('rendering')


    // useEffect(() => {
    //     addItems(value);
    // }, []);

    return <div></div>
}

export default Child;
