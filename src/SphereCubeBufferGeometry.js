const THREE = require("three-full/builds/Three.cjs.js");

/**
 * @author baptistewagner & lucassort
 */
function SphereCubeBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

	THREE.BufferGeometry.call( this );

	this.type = 'SphereCubeBufferGeometry';

	this.parameters = {
		radius: radius,
		widthSegments: widthSegments,
		heightSegments: heightSegments,
		phiStart: phiStart,
		phiLength: phiLength,
		thetaStart: thetaStart,
		thetaLength: thetaLength
	};

	var scope = this;

	// generate cube

	radius = radius || 1;

	widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
	heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

	phiStart = phiStart !== undefined ? phiStart : 0;
	phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

	var thetaEnd = thetaStart + thetaLength;

	var ix, iy;
	var depth = 1;
	var height = 1;
	var width = 1;
	var depthSegments = heightSegments;

	var index = 0;
	var grid = [];

	var vertex = new THREE.Vector3();
	var normal = new THREE.Vector3();

	var numberOfVertices = 0;
	var groupStart = 0;

	var u = 1;
	var v = 1;

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
	buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
	buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
	buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
	buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
	buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

	console.log(vertices.length);

	var vIndex;

	var verticesSphere = [];
	var normalsSphere = [];
	var uvsSphere = [];

	// generate vertices, normals and uvs

	for (vIndex = 0; vIndex < vertices.length; vIndex += 3) {

		console.log(vIndex);

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

		// uv

		uvsSphere.push( u, 1 - v );

		//verticesRow.push( index ++ );
	}

	/*

	for ( iy = 0; iy <= heightSegments; iy ++ ) {

		var verticesRow = [];

		var v = iy / heightSegments;

		for ( ix = 0; ix <= widthSegments; ix ++ ) {

			var u = ix / widthSegments;

			// vertex

			vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
			vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
			vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

			vertices.push( vertex.x, vertex.y, vertex.z );

			// normal

			normal.set( vertex.x, vertex.y, vertex.z ).normalize();
			normals.push( normal.x, normal.y, normal.z );

			// uv

			uvs.push( u, 1 - v );

			verticesRow.push( index ++ );

		}

		grid.push( verticesRow );

	}

	*/

	// indices

	// indices are the same as the cube indices

	/*

	for ( iy = 0; iy < heightSegments; iy ++ ) {

		for ( ix = 0; ix < widthSegments; ix ++ ) {

			var a = grid[ iy ][ ix + 1 ];
			var b = grid[ iy ][ ix ];
			var c = grid[ iy + 1 ][ ix ];
			var d = grid[ iy + 1 ][ ix + 1 ];

			if ( iy !== 0 || thetaStart > 0 ) { indices.push( a, b, d ); }
			if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) { indices.push( b, c, d ); }

		}

	}

	*/

	// build geometry

	this.setIndex( indices );
	this.addAttribute( 'position', new THREE.Float32BufferAttribute( verticesSphere, 3 ) );
	this.addAttribute( 'normal', new THREE.Float32BufferAttribute( normalsSphere, 3 ) );
	this.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvsSphere, 2 ) );

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

SphereCubeBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
SphereCubeBufferGeometry.prototype.constructor = SphereCubeBufferGeometry;

module.exports = SphereCubeBufferGeometry;

function IsocahedronBufferGeometry( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

	THREE.BufferGeometry.call( this );

	this.type = 'IsocahedronBufferGeometry';

	this.parameters = {
		radius: radius,
		widthSegments: widthSegments,
		heightSegments: heightSegments,
		phiStart: phiStart,
		phiLength: phiLength,
		thetaStart: thetaStart,
		thetaLength: thetaLength
	};

	var scope = this;

	// generate cube

	radius = radius || 1;

	widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
	heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

	phiStart = phiStart !== undefined ? phiStart : 0;
	phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

	var thetaEnd = thetaStart + thetaLength;

	var ix, iy;
	var depth = 1;
	var height = 1;
	var width = 1;
	var depthSegments = heightSegments;

	var index = 0;
	var grid = [];

	var vertex = new THREE.Vector3();
	var normal = new THREE.Vector3();

	var numberOfVertices = 0;
	var groupStart = 0;

	var u = 1;
	var v = 1;

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
	buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
	buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
	buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
	buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
	buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

	console.log(vertices.length);

	var vIndex;

	var verticesSphere = [];
	var normalsSphere = [];
	var uvsSphere = [];

	// generate vertices, normals and uvs

	for (vIndex = 0; vIndex < vertices.length; vIndex += 3) {

		console.log(vIndex);

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

		// uv

		uvsSphere.push( u, 1 - v );

		//verticesRow.push( index ++ );
	}

	/*

	for ( iy = 0; iy <= heightSegments; iy ++ ) {

		var verticesRow = [];

		var v = iy / heightSegments;

		for ( ix = 0; ix <= widthSegments; ix ++ ) {

			var u = ix / widthSegments;

			// vertex

			vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
			vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
			vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

			vertices.push( vertex.x, vertex.y, vertex.z );

			// normal

			normal.set( vertex.x, vertex.y, vertex.z ).normalize();
			normals.push( normal.x, normal.y, normal.z );

			// uv

			uvs.push( u, 1 - v );

			verticesRow.push( index ++ );

		}

		grid.push( verticesRow );

	}

	*/

	// indices

	// indices are the same as the cube indices

	/*

	for ( iy = 0; iy < heightSegments; iy ++ ) {

		for ( ix = 0; ix < widthSegments; ix ++ ) {

			var a = grid[ iy ][ ix + 1 ];
			var b = grid[ iy ][ ix ];
			var c = grid[ iy + 1 ][ ix ];
			var d = grid[ iy + 1 ][ ix + 1 ];

			if ( iy !== 0 || thetaStart > 0 ) { indices.push( a, b, d ); }
			if ( iy !== heightSegments - 1 || thetaEnd < Math.PI ) { indices.push( b, c, d ); }

		}

	}

	*/

	// build geometry

	this.setIndex( indices );
	this.addAttribute( 'position', new THREE.Float32BufferAttribute( verticesSphere, 3 ) );
	this.addAttribute( 'normal', new THREE.Float32BufferAttribute( normalsSphere, 3 ) );
	this.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvsSphere, 2 ) );

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

IsocahedronBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
IsocahedronBufferGeometry.prototype.constructor = IsocahedronBufferGeometry;

module.exports = IsocahedronBufferGeometry;