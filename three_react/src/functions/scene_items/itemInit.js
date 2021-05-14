import * as THREE from 'three';

import { isEqual } from 'lodash';


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

    const obj1 = {
        floor: { 
            item: null, category: 'tile', type: 'planar', name: 'Floor Tile', openAllText: 'See Floors', section: 'room',
        },
        paint: { 
            item: null, category: 'paint', type: 'planar', name: 'Wall Paint', openAllText: 'See Paints', section: 'room',
            renderOn: [
                [ // 1st condition
                    { design_controls_path: 'room.wallsType', value: "paint" },
                ],
                [ // 2nd condition(s)
                    { design_controls_path: 'room.wallsType', value: "wallpaper" }, 
                    { design_controls_path: 'room.wallpaper_controls.full', value: false },
                    { design_controls_path: 'room.wallpaper_controls.remainingWalls_MATCH', value: 'paint' },
                ],
                [ // 3rd condition
                    { design_controls_path: 'room.wallsType', value: null },
                ],
            ],
        },
        wallTile: { 
            item: null, category: 'tile', type: 'planar', name: 'Wall Tile', openAllText: 'See Tiles', section: 'room',
            renderOn: [
                [ // 1st condition
                    { design_controls_path: 'room.wallsType', value: "tile" },
                ],
                [ // 2nd condition(s) -- special render condition ! (see below)
                    { design_controls_path: 'room.wallsType', value: "wallpaper" }, 
                    { design_controls_path: 'room.wallpaper_controls.full', value: false },
                    { design_controls_path: 'room.wallpaper_controls.includeTile', value: true },
                    { design_controls_path: 'room.wallpaper_controls.tile_MATCH', value: 'wallTile' },
                ],
            ],
            specialRenderConditions: { conditionIndeces: [ 1 ], specialFunction: 'addHalfWallTile' },
        },
        wallpaper: { 
            item: null, category: 'wallpaper', type: 'planar', name: 'Wallpaper', openAllText: 'See Wallpaper', section: 'room',
            renderOn: [
                [ // 1st condition
                    { design_controls_path: 'room.wallsType', value: "wallpaper" },
                ],
            ],
        },
        baseboardsPaint: { 
            item: null, category: 'paint', type: 'custom', name: 'Baseboards', openAllText: 'See Colors', section: 'room',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'room.baseboards.enabled', value: true }, 
                    { design_controls_path: 'room.baseboards.type', value: "paint" },
                ],
            ],
        },
        baseboardsTile: { 
            item: null, category: 'tile', type: 'custom', name: 'Baseboards', openAllText: 'See Colors', section: 'room',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'room.baseboards.enabled', value: true }, 
                    { design_controls_path: 'room.baseboards.type', value: "tile" },
                ],
            ],
        },
        // Bathing
        wetTile: { 
            item: null, category: 'tile', type: 'planar', name: 'Shower Tile', openAllText: 'See Tiles', section: 'bathing',
        },
        wetTile_2: { 
            item: null, category: 'tile', type: 'planar', openAllText: 'See Tiles', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.walls.secondaryWallTile', value: true }, 
                ],
            ],
        },
        tub: { 
            item: null, category: 'tub', name: 'Tub', openAllText: 'See Tubs', section: 'bathing',
            renderOn: [
                [
                    { design_controls_path: 'bathing.type', value: 'tub' }
                ]
            ]
        },
        showerFloor: { 
            item: null, category: 'tile', type: 'planar', name: 'Shower Floor', openAllText: 'See Tiles', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "tub" }, 
                    { design_controls_path: 'bathing.tub_controls.type', value: "freestanding" },
                ],
                [ // 2nd condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                    { design_controls_path: 'bathing.shower_controls.type', value: "curb" },
                ],
                [ // 3rd condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                    { design_controls_path: 'bathing.shower_controls.type', value: "curbless" },
                ],
            ],
        },
        curb: { 
            item: null, category: 'tile', type: 'custom', name: 'Shower Curb', openAllText: 'See Options', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                    { design_controls_path: 'bathing.shower_controls.type', value: "curb" },
                ],
            ],
        },
        showerBase: { 
            item: null, category: 'showerBase', name: 'Shower Base', openAllText: 'See Bases', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                    { design_controls_path: 'bathing.shower_controls.type', value: "pan" },
                ],
            ],
        },
        showerSet: { 
            item: null, category: 'showerSet', name: 'Shower Set (Door)', openAllText: 'See Doors', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                ],
            ],
        },
        tubDoor: { 
            item: null, category: 'tubSet', name: 'Tub Door', openAllText: 'See Panels', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "tub" }, 
                    { design_controls_path: 'bathing.tub_controls.type', value: "alcove" }, 
                    { design_controls_path: 'bathing.tub_controls.opening', value: "tubDoor" }, 
                ],
            ],
        },
        showerFixture: { 
            item: null, category: 'showerFixture', name: 'Shower Fixture', openAllText: 'Fixtures', section: 'bathing',
        },
        showerFixture2: { 
            item: null, category: 'showerFixture', name: '(Second) Shower Fixture', openAllText: 'Shower Fixtures', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.fixture_2.active', value: true }, 
                ],
            ],
        },
        tubFiller: { 
            item: null, category: 'tubFiller', name: 'Bathtub Filler', openAllText: 'Tub Fillers', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "tub" }, 
                    { design_controls_path: 'bathing.tub_controls.type', value: "freestanding" },
                ],
            ],
        },
        // Vanity
        vanity: { 
            item: null, category: 'vanity', name: 'Vanity', openAllText: 'Vanities', section: 'vanity',
        },
        vanityLight: { 
            item: null, category: 'sconceLight',  name: 'Vanity Light', openAllText: 'Lights', section: 'vanity',
        },
        vesselSet: { 
            item: null, category: 'vesselSet', name: 'Vessel Sink (Set)', openAllText: 'See Vessels', section: 'vanity',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'vanity.customTopType', value: "vesselSet" }, 
                ],
            ],
        },
        faucet: { 
            item: null, category: 'faucet', name: 'Sink Faucet', openAllText: 'See Faucets', section: 'vanity',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'vanity.customTopType', value: "faucet" }, 
                ],
                [
                    { design_controls_path: 'vanity.customTopType', value: null }, 
                ]
            ],
        },
        mirror: { 
            item: null, category: 'mirror', name: 'Mirror', openAllText: 'See Mirrors', section: 'vanity',
        },
        // Other
        toilet: { 
            item: null, category: 'toilet', name: 'Toilet', openAllText: 'See Toilets', section: 'other',
        },
        storage: { 
            item: null, category: 'storage', name: 'Additional Storage', openAllText: 'Storage', section: 'other',
        },
        ceilingLight: { 
            item: null, category: 'ceilingLight', name: 'Ceiling Light', openAllText: 'Lights', section: 'other',
        },
        towelRack: { 
            item: null, category: 'towelRack', name: 'Towel Rack', openAllText: 'Towel Racks', section: 'other',
        },
        tpHolder: { 
            item: null, category: 'tpHolder', name: 'TP Holder', openAllText: 'TP Holders', section: 'other',
        },
    };
    const obj2 = {
        floor: { 
            item: null, category: 'tile', type: 'planar', name: 'Floor Tile', openAllText: 'See Floors', section: 'room',
        },
        paint: { 
            item: null, category: 'paint', type: 'planar', name: 'Wall Paint', openAllText: 'See Paints', section: 'room',
            renderOn: [
                [ // 1st condition
                    { design_controls_path: 'room.wallsType', value: "paint" },
                ],
                [ // 2nd condition(s)
                    { design_controls_path: 'room.wallsType', value: "wallpaper" }, 
                    { design_controls_path: 'room.wallpaper_controls.full', value: false },
                    { design_controls_path: 'room.wallpaper_controls.remainingWalls_MATCH', value: 'paint' },
                ],
                [ // 3rd condition
                    { design_controls_path: 'room.wallsType', value: null },
                ],
            ],
        },
        wallTile: { 
            item: null, category: 'tile', type: 'planar', name: 'Wall Tile', openAllText: 'See Tiles', section: 'room',
            renderOn: [
                [ // 1st condition
                    { design_controls_path: 'room.wallsType', value: "tile" },
                ],
                [ // 2nd condition(s) -- special render condition ! (see below)
                    { design_controls_path: 'room.wallsType', value: "wallpaper" }, 
                    { design_controls_path: 'room.wallpaper_controls.full', value: false },
                    { design_controls_path: 'room.wallpaper_controls.includeTile', value: true },
                    { design_controls_path: 'room.wallpaper_controls.tile_MATCH', value: 'wallTile' },
                ],
            ],
            specialRenderConditions: { conditionIndeces: [ 1 ], specialFunction: 'addHalfWallTile' },
        },
        wallpaper: { 
            item: null, category: 'wallpaper', type: 'planar', name: 'Wallpaper', openAllText: 'See Wallpaper', section: 'room',
            renderOn: [
                [ // 1st condition
                    { design_controls_path: 'room.wallsType', value: "wallpaper" },
                ],
            ],
        },
        baseboardsPaint: { 
            item: null, category: 'paint', type: 'custom', name: 'Baseboards', openAllText: 'See Colors', section: 'room',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'room.baseboards.enabled', value: true }, 
                    { design_controls_path: 'room.baseboards.type', value: "paint" },
                ],
            ],
        },
        baseboardsTile: { 
            item: null, category: 'tile', type: 'custom', name: 'Baseboards', openAllText: 'See Colors', section: 'room',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'room.baseboards.enabled', value: true }, 
                    { design_controls_path: 'room.baseboards.type', value: "tile" },
                ],
            ],
        },
        // Bathing
        wetTile: { 
            item: null, category: 'tile', type: 'planar', name: 'Shower Tile', openAllText: 'See Tiles', section: 'bathing',
        },
        wetTile_2: { 
            item: null, category: 'tile', type: 'planar', openAllText: 'See Tiles', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.walls.secondaryWallTile', value: true }, 
                ],
            ],
        },
        tub: { 
            item: null, category: 'tub', name: 'Tub', openAllText: 'See Tubs', section: 'bathing',
            renderOn: [
                [
                    { design_controls_path: 'bathing.type', value: 'tub' }
                ]
            ]
        },
        showerFloor: { 
            item: null, category: 'tile', type: 'planar', name: 'Shower Floor', openAllText: 'See Tiles', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "tub" }, 
                    { design_controls_path: 'bathing.tub_controls.type', value: "freestanding" },
                ],
                [ // 2nd condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                    { design_controls_path: 'bathing.shower_controls.type', value: "curb" },
                ],
                [ // 3rd condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                    { design_controls_path: 'bathing.shower_controls.type', value: "curbless" },
                ],
            ],
        },
        curb: { 
            item: null, category: 'tile', type: 'custom', name: 'Shower Curb', openAllText: 'See Options', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                    { design_controls_path: 'bathing.shower_controls.type', value: "curb" },
                ],
            ],
        },
        showerBase: { 
            item: null, category: 'showerBase', name: 'Shower Base', openAllText: 'See Bases', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                    { design_controls_path: 'bathing.shower_controls.type', value: "pan" },
                ],
            ],
        },
        showerSet: { 
            item: null, category: 'showerSet', name: 'Shower Set (Door)', openAllText: 'See Doors', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "shower" }, 
                ],
            ],
        },
        tubDoor: { 
            item: null, category: 'tubSet', name: 'Tub Door', openAllText: 'See Panels', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "tub" }, 
                    { design_controls_path: 'bathing.tub_controls.type', value: "alcove" }, 
                    { design_controls_path: 'bathing.tub_controls.opening', value: "tubDoor" }, 
                ],
            ],
        },
        showerFixture: { 
            item: null, category: 'showerFixture', name: 'Shower Fixture', openAllText: 'Fixtures', section: 'bathing',
        },
        showerFixture2: { 
            item: null, category: 'showerFixture', name: '(Second) Shower Fixture', openAllText: 'Shower Fixtures', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.fixture_2.active', value: true }, 
                ],
            ],
        },
        tubFiller: { 
            item: null, category: 'tubFiller', name: 'Bathtub Filler', openAllText: 'Tub Fillers', section: 'bathing',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'bathing.type', value: "tub" }, 
                    { design_controls_path: 'bathing.tub_controls.type', value: "freestanding" },
                ],
            ],
        },
        // Vanity
        vanity: { 
            item: null, category: 'vanity', name: 'Vanity', openAllText: 'Vanities', section: 'vanity',
        },
        vanityLight: { 
            item: null, category: 'sconceLight',  name: 'Vanity Light', openAllText: 'Lights', section: 'vanity',
        },
        vesselSet: { 
            item: null, category: 'vesselSet', name: 'Vessel Sink (Set)', openAllText: 'See Vessels', section: 'vanity',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'vanity.customTopType', value: "vesselSet" }, 
                ],
            ],
        },
        faucet: { 
            item: null, category: 'faucet', name: 'Sink Faucet', openAllText: 'See Faucets', section: 'vanity',
            renderOn: [
                [ // 1st condition(s)
                    { design_controls_path: 'vanity.customTopType', value: "faucet" }, 
                ],
                [
                    { design_controls_path: 'vanity.customTopType', value: null }, 
                ]
            ],
        },
        mirror: { 
            item: null, category: 'mirror', name: 'Mirror', openAllText: 'See Mirrors', section: 'vanity',
        },
        // Other
        toilet: { 
            item: null, category: 'toilet', name: 'Toilet', openAllText: 'See Toilets', section: 'other',
        },
        storage: { 
            item: null, category: 'storage', name: 'Additional Storage', openAllText: 'Storage', section: 'other',
        },
        ceilingLight: { 
            item: null, category: 'ceilingLight', name: 'Ceiling Light', openAllText: 'Lights', section: 'other',
        },
        towelRack: { 
            item: null, category: 'towelRack', name: 'Towel Rack', openAllText: 'Towel Racks', section: 'other',
        },
        tpHolder: { 
            item: null, category: 'tpHolder', name: 'TP Holder', openAllText: 'TP Holders', section: 'other',
        },
    };

    console.log(isEqual(obj1, obj2));

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