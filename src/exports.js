
var THREE = require("three-full");

var THREESphereBufferGeometries = {
    IcosahedronSphereBufferGeometry : require("./IcosahedronSphereBufferGeometry"),
    SpherifiedCubeBufferGeometry : require("./SpherifiedCubeBufferGeometry"),
    RoundedCubeBufferGeometry : require("./RoundedCubeBufferGeometry")
};

THREE.IcosahedronSphereBufferGeometry = THREESphereBufferGeometries.IcosahedronSphereBufferGeometry;
THREE.SpherifiedCubeBufferGeometry = THREESphereBufferGeometries.SpherifiedCubeBufferGeometry;
THREE.RoundedCubeBufferGeometry = THREESphereBufferGeometries.RoundedCubeBufferGeometry;

module.exports = THREESphereBufferGeometries;

