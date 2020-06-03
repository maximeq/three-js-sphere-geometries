
var THREESphereBufferGeometries = {
    IcosahedronSphereBufferGeometry : require("./IcosahedronSphereBufferGeometry"),
    SpherifiedCubeBufferGeometry : require("./SpherifiedCubeBufferGeometry"),
    NormalizedCubeBufferGeometry : require("./NormalizedCubeBufferGeometry")
};

THREE.IcosahedronSphereBufferGeometry = THREESphereBufferGeometries.IcosahedronSphereBufferGeometry;
THREE.SpherifiedCubeBufferGeometry = THREESphereBufferGeometries.SpherifiedCubeBufferGeometry;
THREE.NormalizedCubeBufferGeometry = THREESphereBufferGeometries.NormalizedCubeBufferGeometry;

module.exports = THREESphereBufferGeometries;

