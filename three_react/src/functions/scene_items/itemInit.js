import * as THREE from 'three';


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

    setTimeout(() => {
        console.log('animationFunction', self);
        cube.material.color.set('#ff0000');
        // requestAnimationFrame(self.current.animationLoop);
    }, 2000)

    setTimeout(() => {
        console.log('animationFunction', self);
        cube.material.color.set('#0000ff');
        // requestAnimationFrame(self.current.animationLoop);
    }, 4000)

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