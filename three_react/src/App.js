import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Child from './Child';

import { addItems, setupScene } from './functions/sceneInit';

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
        addItems(self)

        console.log('after stuff', self);
    }, []);

    return (
        <StudioContext.Provider value={0}>
            <div ref={mount}></div>
            {/* <Child /> */}
        </StudioContext.Provider>
    );
}

export default App;
