import * as THREE from 'three';

import { isEqual } from 'lodash';


export const addItems = (self) => {
    console.log('running')
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    // const cube2 = new THREE.Mesh(geometry, material);
    // self.current.scene.add(cube); // ONLY ADDS AN OBJECT ONCEc
    // self.current.scene.add(cube);
    // self.current.scene.add(cube);
    cube.name = 'lolCube'
    self.current.scene.add(cube);

    const obj1 = {a: 'shadee', lol: {b: 1}}
    const obj2 = {a: 'shadee', lol: {b: 1}}

    console.log(isEqual(obj1, obj2));

    setTimeout(() => {
        console.log('animationFunction', self);

        const cubeInScene = self.current.scene.getObjectByName('lolCube');
        console.log(cubeInScene);
        cubeInScene.material.color.set('#ff0000');
        // cube.material.color.set('#ff0000');
    }, 2000)

    // setTimeout(() => {
    //     console.log('animationFunction', self);
    //     cube.material.color.set('#0000ff');
    // }, 4000)

    // addCubes(self, [{}, {}, {}]);

    // const cubeFromScene = self.current.scene.getObjectByName('lcdcdolCube');
    // console.log('we found', cubeFromScene);


}


// Showing that duplicate objects can be added if created as different variables
// const addCubes = (self, objects) => {

//     for(const object of objects) {
//         const geometry = new THREE.BoxGeometry(1, 1, 1);
//         const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//         const cube = new THREE.Mesh(geometry, material);
//         self.current.scene.add(cube);

//     }
// }