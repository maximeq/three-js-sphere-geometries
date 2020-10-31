const THREE = require("three-full");

/**
 * @author baptistewagner & lucassort
 */
function RoundedCubeBufferGeometry( radius, widthHeightSegments ) {

	THREE.BufferGeometry.call( this );

	this.type = 'RoundedCubeBufferGeometry';

	radius = radius || 1;

	widthHeightSegments = widthHeightSegments || 8;

	this.parameters = {
		radius: radius,
		widthHeightSegments: widthHeightSegments
	};

	var scope = this;

	var vertex = new THREE.Vector3();
	var normal = new THREE.Vector3();

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	// we create a normal cube and buffer it in our geometry

	var cubeBufferGeometry = new THREE.BoxBufferGeometry(1, 1, 1, widthHeightSegments, widthHeightSegments, widthHeightSegments);

	cubeBufferGeometry.getAttribute("position").array.forEach(vertex => {vertices.push(vertex)});
	cubeBufferGeometry.getAttribute("normal").array.forEach(vertex => {normals.push(vertex)});
	cubeBufferGeometry.getAttribute("uv").array.forEach(vertex => {uvs.push(vertex)});
	cubeBufferGeometry.index.array.forEach(vertex => {indices.push(vertex)});

	// then normalizing the cube to have a sphere

	var vIndex;

	var verticesSphere = [];
	var normalsSphere = [];

	// generate vertices, normals and uvs

	for (vIndex = 0; vIndex < vertices.length; vIndex += 3) {


		vertex.x = vertices[vIndex];
		vertex.y = vertices[vIndex + 1];
		vertex.z = vertices[vIndex + 2];

		// normalize to have sphere vertex

        vertex.normalize();
        vertex.multiplyScalar(radius);
		verticesSphere.push( vertex.x, vertex.y, vertex.z );

		// normal

		normal.set( vertex.x, vertex.y, vertex.z ).normalize();
		normalsSphere.push( normal.x, normal.y, normal.z );

	}

	// build geometry

	this.setIndex( indices );
	this.addAttribute( 'position', new THREE.Float32BufferAttribute( verticesSphere, 3 ) );
	this.addAttribute( 'normal', new THREE.Float32BufferAttribute( normalsSphere, 3 ) );
	this.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );

}

RoundedCubeBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
RoundedCubeBufferGeometry.prototype.constructor = RoundedCubeBufferGeometry;

module.exports = RoundedCubeBufferGeometry;