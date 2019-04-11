import { TorusGeometry, CylinderGeometry, MeshPhongMaterial, Mesh } from 'three';

export default class Wheel {
    constructor(numSpokes) { // number of spokes on the wheel
        const WHEEL_RADIUS = 200;
        const TIRE_THICKNESS = 20;
        /* Torus with 6 radial segments, 30 tubular segments */
        const tubeGeom = new TorusGeometry(WHEEL_RADIUS, TIRE_THICKNESS, 6, 30);
        const tubeMatr = new MeshPhongMaterial({ color: 0x82332a });
        const tube = new Mesh(tubeGeom, tubeMatr);

        return tube;
    }
}