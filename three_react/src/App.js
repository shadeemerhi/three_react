import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { setupScene } from './functions/scene_setup/sceneInit';
import { addItems } from './functions/scene_items/itemInit';


const App = () => {

    const mount = useRef(null);

    const initSelf = {
        // Three.js
        scene: null,
        sceneVars: {
            dev: false,
            enableBoxHelpers: false,
            disableEnv: false,
            showMirrorSphere: false,
            mouseActions: true,
            mouseSelect: true,
            dragCounter: 0,
            enableLightHelpers: false,
            updateNeeded: true,
        },
        camera: null,
        renderer: null,
        clock: null,
        cameraControls: null,
        loader: null,
        dracoLoader: null,
        textureLoader: null,
        cubeTextureLoader: null,
        raycaster: null,
        composer: null,
        outlinePass: null,

        // Wall variables
        wallTileCount: 0,
        wetWallTileCount: 0,
        glassWallCount: 0,
        mirrorWallCount: 0,
        metalWallCount: 0,

        baseboardMeshes: [],

        // Interaction
        mouse: null,
        left: null,
        top: null,
    };

    const self = useRef(initSelf);

    useEffect(() => {

        setupScene(self, mount);
        addItems(self);
    }, []);

    return <div ref={mount}></div>
}

export default App;
