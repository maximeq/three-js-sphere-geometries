const THREE = require("three-full/builds/Three.cjs.js");

/**
 * @author baptistewagner & lucassort
 */
function IcosahedronSphereBufferGeometry( radius, subdivisionsLevel ) {

	THREE.IcosahedronBufferGeometry.call( this, radius, subdivisionsLevel );

    this.type = 'IcosahedronSphereBufferGeometry';
    
    var scope = this;
}

IcosahedronSphereBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
IcosahedronSphereBufferGeometry.prototype.constructor = IcosahedronSphereBufferGeometry;

module.exports = IcosahedronSphereBufferGeometry;