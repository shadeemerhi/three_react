import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { setupScene } from './functions/scene_setup/sceneInit';
import { addItems } from './functions/scene_items/itemInit';


const App = () => {

    const mount = useRef(null);

    const initSelf = {
        scene: null,
        camera: null,
    }

    const self = useRef(initSelf);

    useEffect(() => {

        setupScene(self, mount);
        addItems(self);
    }, []);

    return <div ref={mount}></div>
}

export default App;
