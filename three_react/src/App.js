import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Child from './Child';

import { addItems, setupScene } from './functions/sceneInit';

export const StudioContext = React.createContext();

const App = () => {

    const [controls, setControls] = useState(null);

    // const sizes = {
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // };
    const mount = useRef(null);

    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(
    //     75,
    //     window.innerWidth / window.innerHeight,
    //     0.1,
    //     1000
    // );
    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);

    useEffect(() => {
        
        // Call scene setup function; pass setControls function?
        // const getSceneData = async () => {
        //     const sceneVars = await setupScene(mount, setControls);

        // }

        const sceneVars = setupScene(mount, setControls);
        addItems(sceneVars)
        console.log(sceneVars);

        // console.log(sceneVars);
        
        
        // camera.position.z = 5;
        
        // mount.current.appendChild(renderer.domElement);

        // setControls(new OrbitControls(camera, mount.current))

        // animate();

        // console.log('value in ue', value);

        // setupEventListeners();
    }, []);

    // const animate = () => {
    //     if(controls) controls.update();
    //     requestAnimationFrame(animate);
    //     renderer.render(scene, camera);
    // };



    // useEffect(() => {
        
    //     if(!controls) return;
    //     console.log('enabling damping');
    //     controls.enableDamping = true;
    //     requestAnimationFrame(animate);

    // }, [controls]);

    // const setupEventListeners = () => {
    //     window.addEventListener("resize", () => {
    //     // Update sizes
    //     sizes.width = window.innerWidth;
    //     sizes.height = window.innerHeight;

    //     // Update camera
    //     camera.aspect = sizes.width / sizes.height;
    //     camera.updateProjectionMatrix();

    //     // Update renderer
    //     renderer.setSize(sizes.width, sizes.height);
    //     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    //     });
    // };

    const value = {
        // scene,
        // renderer,
        // camera,
        mount,
        // controls
    }

    return (
        <StudioContext.Provider value={value}>
            <div ref={mount}></div>
            {/* <Child /> */}
        </StudioContext.Provider>
    );
}

export default App;
