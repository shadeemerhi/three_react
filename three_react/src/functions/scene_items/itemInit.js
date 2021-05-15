import * as THREE from 'three';


export const addItems = (self) => {
    console.log('running')
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const object = new THREE.Mesh(geometry, material);
    // const cube2 = new THREE.Mesh(geometry, material);
    // self.current.scene.add(cube); // ONLY ADDS AN OBJECT ONCEc
    // self.current.scene.add(cube);
    // self.current.scene.add(cube);
    object.name = 'lolObject'
    self.current.scene.add(object);


    setTimeout(() => {
        console.log('animationFunction', self);
        const newGeometry = new THREE.BoxGeometry(2, 2, 2);

        const cubeInScene = self.current.scene.getObjectByName('lolObject');
        cubeInScene.geometry.dispose();
        cubeInScene.geometry = newGeometry
        console.log(cubeInScene);
        cubeInScene.material.color.set('#ff0000');
        console.log(self.current.renderer.info)
    }, 2000);

    setTimeout(() => {
        const newGeo = new THREE.SphereGeometry(2, 16, 16);
        console.log('animationFunction', self);
        object.geometry.dispose();
        object.geometry = newGeo;
        object.material.color.set('#0000ff');
        console.log(self.current.renderer.info)
    }, 4000);
}