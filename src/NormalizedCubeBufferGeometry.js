const THREE = require("three-full/builds/Three.cjs.js");

/**
 * @author baptistewagner & lucassort
 */
function NormalizedCubeBufferGeometry( radius, widthHeightSegments ) {

	THREE.BufferGeometry.call( this );

	this.type = 'NormalizedCubeBufferGeometry';

	this.parameters = {
		radius: radius,
		widthHeightSegments: widthHeightSegments
	};

	var scope = this;

	// generate cube

	radius = radius || 1;

	widthHeightSegments = Math.max( 3, Math.floor( widthHeightSegments ) || 8 );

	var ix, iy;
	var depth = 1;
	var height = 1;
	var width = 1;

	var vertex = new THREE.Vector3();
	var normal = new THREE.Vector3();

	var numberOfVertices = 0;
	var groupStart = 0;

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	// building the cube the same way as in BoxBufferGeometry

	buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, widthHeightSegments, widthHeightSegments, 0 ); // px
	buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, widthHeightSegments, widthHeightSegments, 1 ); // nx
	buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthHeightSegments, widthHeightSegments, 2 ); // py
	buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthHeightSegments, widthHeightSegments, 3 ); // ny
	buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthHeightSegments, widthHeightSegments, 4 ); // pz
	buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthHeightSegments, widthHeightSegments, 5 ); // nz

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
        vertex.x *= radius;
        vertex.y *= radius;
        vertex.z *= radius;
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

	function buildPlane( u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex ) {

		var segmentWidth = width / gridX;
		var segmentHeight = height / gridY;

		var widthHalf = width / 2;
		var heightHalf = height / 2;
		var depthHalf = depth / 2;

		var gridX1 = gridX + 1;
		var gridY1 = gridY + 1;

		var vertexCounter = 0;
		var groupCount = 0;

		var ix, iy;

		var vector = new THREE.Vector3();

		// generate vertices, normals and uvs

		for ( iy = 0; iy < gridY1; iy ++ ) {

			var y = iy * segmentHeight - heightHalf;

			for ( ix = 0; ix < gridX1; ix ++ ) {

				var x = ix * segmentWidth - widthHalf;

				// set values to correct vector component

				vector[ u ] = x * udir;
				vector[ v ] = y * vdir;
				vector[ w ] = depthHalf;

				// now apply vector to vertex buffer

				vertices.push( vector.x, vector.y, vector.z );

				// set values to correct vector component

				vector[ u ] = 0;
				vector[ v ] = 0;
				vector[ w ] = depth > 0 ? 1 : - 1;

				// now apply vector to normal buffer

				normals.push( vector.x, vector.y, vector.z );

				// uvs

				uvs.push( ix / gridX );
				uvs.push( 1 - ( iy / gridY ) );

				// counters

				vertexCounter += 1;

			}

		}

		// indices

		// 1. you need three indices to draw a single face
		// 2. a single segment consists of two faces
		// 3. so we need to generate six (2*3) indices per segment

		for ( iy = 0; iy < gridY; iy ++ ) {

			for ( ix = 0; ix < gridX; ix ++ ) {

				var a = numberOfVertices + ix + gridX1 * iy;
				var b = numberOfVertices + ix + gridX1 * ( iy + 1 );
				var c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
				var d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

				// increase counter

				groupCount += 6;

			}

		}

		// add a group to the geometry. this will ensure multi material support

		scope.addGroup( groupStart, groupCount, materialIndex );

		// calculate new start value for groups

		groupStart += groupCount;

		// update total number of vertices

		numberOfVertices += vertexCounter;

	}

}

NormalizedCubeBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
NormalizedCubeBufferGeometry.prototype.constructor = NormalizedCubeBufferGeometry;

module.exports = NormalizedCubeBufferGeometry;