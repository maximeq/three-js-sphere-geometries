import THREE from 'three';

/**
 * @author baptistewagner & lucassort
 */

export class IcosahedronSphereBufferGeometry extends THREE.IcosahedronBufferGeometry {
    constructor(radius, subdivisionsLevel) {
        super(radius, subdivisionsLevel);

        this.type = "IcosahedronSphereBufferGeometry";

        var scope = this;
    }
}
