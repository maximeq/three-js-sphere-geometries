const THREE = require("three");

/**
 * @author baptistewagner & lucassort
 */

class IcosahedronSphereBufferGeometry extends THREE.IcosahedronBufferGeometry {
    constructor(radius, subdivisionsLevel) {
        super(radius, subdivisionsLevel);

        this.type = "IcosahedronSphereBufferGeometry";

        var scope = this;
    }
}

module.exports = IcosahedronSphereBufferGeometry;
