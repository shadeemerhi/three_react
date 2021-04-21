import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Child from './Child';

import { setupScene } from './functions/scene_setup/sceneInit';
import { addItems } from './functions/scene_items/itemInit';

export const StudioContext = React.createContext();


// Could be used in replacement of useRef
// const self = {
//     scene: null,
//     camera: null,
//     controls: null,
//     mount: null
// }

const App = () => {

    const mount = useRef(null);

    const initSelf = {
        scene: null,
        camera: null,
        controls: null,
    }

    const self = useRef(initSelf);

    useEffect(() => {

        setupScene(self, mount);
        addItems(self);

        console.log('after adding', self);
    }, []);

    return (
        <StudioContext.Provider value={0}>
            <div ref={mount}></div>
            {/* <Child /> */}
        </StudioContext.Provider>
    );
}

export default App;
