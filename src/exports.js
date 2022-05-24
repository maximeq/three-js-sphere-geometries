
var THREE = require("three");

var THREESphereBufferGeometries = {
    IcosahedronSphereBufferGeometry : require("./IcosahedronSphereBufferGeometry"),
    SpherifiedCubeBufferGeometry : require("./SpherifiedCubeBufferGeometry"),
    RoundedCubeBufferGeometry : require("./RoundedCubeBufferGeometry")
};

THREE.IcosahedronSphereBufferGeometry = THREESphereBufferGeometries.IcosahedronSphereBufferGeometry;
THREE.SpherifiedCubeBufferGeometry = THREESphereBufferGeometries.SpherifiedCubeBufferGeometry;
THREE.RoundedCubeBufferGeometry = THREESphereBufferGeometries.RoundedCubeBufferGeometry;

module.exports = THREESphereBufferGeometries;

