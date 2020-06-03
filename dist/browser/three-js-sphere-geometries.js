(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three-full/builds/Three.cjs.js')) :
    typeof define === 'function' && define.amd ? define(['three-full/builds/Three.cjs.js'], factory) :
    (global.THREESphereGeometries = factory(global.THREE));
}(this, (function (Three_cjs) { 'use strict';

    Three_cjs = Three_cjs && Three_cjs.hasOwnProperty('default') ? Three_cjs['default'] : Three_cjs;

    /**
     * @author baptistewagner & lucassort
     */
    function IcosahedronSphereBufferGeometry( radius, subdivisionsLevel ) {

    	Three_cjs.IcosahedronBufferGeometry.call( this, radius, subdivisionsLevel );

        this.type = 'IcosahedronSphereBufferGeometry';
    }

    IcosahedronSphereBufferGeometry.prototype = Object.create( Three_cjs.BufferGeometry.prototype );
    IcosahedronSphereBufferGeometry.prototype.constructor = IcosahedronSphereBufferGeometry;

    var IcosahedronSphereBufferGeometry_1 = IcosahedronSphereBufferGeometry;

    function SpherifiedCubeBufferGeometry( radius, widthHeightSegments ) {

    	Three_cjs.BufferGeometry.call( this );

    	this.type = 'SpherifiedCubeBufferGeometry';

    	this.parameters = {
    		radius: radius,
    		widthHeightSegments: widthHeightSegments
    	};

    	var scope = this;

    	// generate cube

    	radius = radius || 1;

    	widthHeightSegments = Math.max( 3, Math.floor( widthHeightSegments ) || 8 );
    	var depth = 1;
    	var height = 1;
    	var width = 1;

    	var vertex = new Three_cjs.Vector3();
    	var vertex2 = new Three_cjs.Vector3();
    	var normal = new Three_cjs.Vector3();

    	var numberOfVertices = 0;
    	var groupStart = 0;

    	// buffers

    	var indices = [];
    	var vertices = [];
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


    		vertex.x = vertices[vIndex] *  2.0;
    		vertex.y = vertices[vIndex + 1] * 2.0;
    		vertex.z = vertices[vIndex + 2] * 2.0;

    		// normalize to have sphere vertex
    		        
    		vertex2.x = vertex.x ** 2;
    		vertex2.y = vertex.y ** 2;
    		vertex2.z = vertex.z ** 2;
    	
            vertex.x *= Math.sqrt(1.0 - 0.5 * (vertex2.y + vertex2.z) + vertex2.y * vertex2.z/3.0) * radius;
            vertex.y *= Math.sqrt(1.0 - 0.5 * (vertex2.z + vertex2.x) + vertex2.z * vertex2.x/3.0) * radius;
    		vertex.z *= Math.sqrt(1.0 - 0.5 * (vertex2.x + vertex2.y) + vertex2.x * vertex2.y/3.0) * radius;

    		verticesSphere.push( vertex.x, vertex.y, vertex.z );

    		// normal

    		normal.set( vertex.x, vertex.y, vertex.z ).normalize();
    		normalsSphere.push( normal.x, normal.y, normal.z );

    	}

    	// build geometry

    	this.setIndex( indices );
    	this.addAttribute( 'position', new Three_cjs.Float32BufferAttribute( verticesSphere, 3 ) );
    	this.addAttribute( 'normal', new Three_cjs.Float32BufferAttribute( normalsSphere, 3 ) );
    	this.addAttribute( 'uv', new Three_cjs.Float32BufferAttribute( uvs, 2 ) );

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

    		var vector = new Three_cjs.Vector3();

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

    SpherifiedCubeBufferGeometry.prototype = Object.create( Three_cjs.BufferGeometry.prototype );
    SpherifiedCubeBufferGeometry.prototype.constructor = SpherifiedCubeBufferGeometry;

    var SpherifiedCubeBufferGeometry_1 = SpherifiedCubeBufferGeometry;

    /**
     * @author baptistewagner & lucassort
     */
    function RoundedCubeBufferGeometry( radius, widthHeightSegments ) {

    	Three_cjs.BufferGeometry.call( this );

    	this.type = 'RoundedCubeBufferGeometry';

    	this.parameters = {
    		radius: radius,
    		widthHeightSegments: widthHeightSegments
    	};

    	radius = radius || 1;

    	var vertex = new Three_cjs.Vector3();
    	var normal = new Three_cjs.Vector3();

    	// buffers

    	var indices = [];
    	var vertices = [];
    	var uvs = [];

    	// we create a normal cube and buffer it in our geometry

    	var cubeBufferGeometry = new Three_cjs.BoxBufferGeometry(1, 1, 1, widthHeightSegments, widthHeightSegments, widthHeightSegments);

    	cubeBufferGeometry.getAttribute("position").array.forEach(vertex => {vertices.push(vertex);});
    	cubeBufferGeometry.getAttribute("normal").array.forEach(vertex => {});
    	cubeBufferGeometry.getAttribute("uv").array.forEach(vertex => {uvs.push(vertex);});
    	cubeBufferGeometry.index.array.forEach(vertex => {indices.push(vertex);});

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
    	this.addAttribute( 'position', new Three_cjs.Float32BufferAttribute( verticesSphere, 3 ) );
    	this.addAttribute( 'normal', new Three_cjs.Float32BufferAttribute( normalsSphere, 3 ) );
    	this.addAttribute( 'uv', new Three_cjs.Float32BufferAttribute( uvs, 2 ) );

    }

    RoundedCubeBufferGeometry.prototype = Object.create( Three_cjs.BufferGeometry.prototype );
    RoundedCubeBufferGeometry.prototype.constructor = RoundedCubeBufferGeometry;

    var RoundedCubeBufferGeometry_1 = RoundedCubeBufferGeometry;

    var THREESphereBufferGeometries = {
        IcosahedronSphereBufferGeometry : IcosahedronSphereBufferGeometry_1,
        SpherifiedCubeBufferGeometry : SpherifiedCubeBufferGeometry_1,
        RoundedCubeBufferGeometry : RoundedCubeBufferGeometry_1
    };

    THREE.IcosahedronSphereBufferGeometry = THREESphereBufferGeometries.IcosahedronSphereBufferGeometry;
    THREE.SpherifiedCubeBufferGeometry = THREESphereBufferGeometries.SpherifiedCubeBufferGeometry;
    THREE.RoundedCubeBufferGeometry = THREESphereBufferGeometries.RoundedCubeBufferGeometry;

    var exports$1 = THREESphereBufferGeometries;

    return exports$1;

})));
