
var THREESphereBufferGeometries = {
    IcosahedronBufferGeometry : require("./IcosahedronBufferGeometry"),
    SpherifiedCubeBufferGeometry : require("./SpherifiedCubeBufferGeometry"),
    NormalizedCubeBufferGeometry : require("./NormalizedCubeBufferGeometry")
};

THREE.IcosahedronBufferGeometry = THREESphereBufferGeometries.IcosahedronBufferGeometry;
THREE.SpherifiedCubeBufferGeometry = THREESphereBufferGeometries.SpherifiedCubeBufferGeometry;
THREE.NormalizedCubeBufferGeometry = THREESphereBufferGeometries.NormalizedCubeBufferGeometry;

module.exports = THREESphereBufferGeometries;

