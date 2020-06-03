(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three-full/builds/Three.cjs.js')) :
    typeof define === 'function' && define.amd ? define(['three-full/builds/Three.cjs.js'], factory) :
    (global.THREESphereGeometries = factory(global.THREE));
}(this, (function (Three_cjs) { 'use strict';

    Three_cjs = Three_cjs && Three_cjs.hasOwnProperty('default') ? Three_cjs['default'] : Three_cjs;

    /**
     * @author baptistewagner & lucassort
     */
    function IcosahedronBufferGeometry( radius, subdivisionsLevel ) {

    	Three_cjs.BufferGeometry.call( this );

    	this.type = 'IcosahedronBufferGeometry';

    	this.parameters = {
    		radius: radius,
    		subdivisionsLevel: subdivisionsLevel
    	};

    	radius = radius || 10;

    	var vertex = new Three_cjs.Vector3();
    	var normal = new Three_cjs.Vector3();

    	// buffers

    	var indices = [];
    	var vertices = [];
    	var normals = [];
        var uvs = [];
        
        verticesInit();
        trianglesInit();
        refineTriangles();
        initNormals();
        initUVs();    

    	this.setIndex( indices );
    	this.addAttribute( 'position', new Three_cjs.Float32BufferAttribute( vertices, 3 ) );
    	this.addAttribute( 'normal', new Three_cjs.Float32BufferAttribute( normals, 3 ) );
    	this.addAttribute( 'uv', new Three_cjs.Float32BufferAttribute( uvs, 2 ) );

    	function verticesInit() {
            // create 12 vertices of a icosahedron
            var t = (1.0 + Math.sqrt(5.0)) / 2.0;

            addPoint(-1,  t,  0);
            addPoint( 1,  t,  0);
            addPoint(-1, -t,  0);
            addPoint( 1, -t,  0);

            addPoint( 0, -1,  t);
            addPoint( 0,  1,  t);
            addPoint( 0, -1, -t);
            addPoint( 0,  1, -t);

            addPoint( t,  0, -1);
            addPoint( t,  0,  1);
            addPoint(-t,  0, -1);
            addPoint(-t,  0,  1);
        }

        function trianglesInit() {
            indices.push(0, 11, 5);
            indices.push(0, 5, 1);
            indices.push(0, 1, 7);
            indices.push(0, 7, 10);
            indices.push(0, 10, 11);
            
            // 5 adjacent faces
            indices.push(1, 5, 9);
            indices.push(5, 11, 4);
            indices.push(11, 10, 2);
            indices.push(10, 7, 6);
            indices.push(7, 1, 8);
            
            // 5 faces around point 3
            indices.push(3, 9, 4);
            indices.push(3, 4, 2);
            indices.push(3, 2, 6);
            indices.push(3, 6, 8);
            indices.push(3, 8, 9);
            
            // 5 adjacent faces
            indices.push(4, 9, 5);
            indices.push(2, 4, 11);
            indices.push(6, 2, 10);
            indices.push(8, 6, 7);
            indices.push(9, 8, 1);
        }

        function refineTriangles() {
            for (var i = 0; i < subdivisionsLevel - 1; i++) {
    			var indices2 = [];
                for (let index = 0; index < indices.length; index += 3) {
                    // replace triangle by 4 triangles
                    let a = indices[index];
                    let b = indices[index + 1];
    				let c = indices[index + 2];
    				
    				addMiddlePoint(a, b);
                    addMiddlePoint(b, c);
                    addMiddlePoint(c, a);
    				
    				let nVertices = vertices.length / 3;

                    indices2.push(a, nVertices - 3, nVertices - 1);
                    indices2.push(b, nVertices - 2, nVertices - 3);
                    indices2.push(c, nVertices - 1, nVertices - 2);
                    indices2.push(nVertices - 3, nVertices - 2, nVertices - 1);
                }
                indices = indices2;
            }
    	}
    	
    	// return index of point in the middle of p1 and p2
        function addMiddlePoint(id1, id2) {
            let point1 = new Three_cjs.Vector3(vertices[3 * id1], vertices[3 * id1 + 1], vertices[3 * id1 + 2]);
    		let point2 = new Three_cjs.Vector3(vertices[3 * id2], vertices[3 * id2 + 1], vertices[3 * id2 + 2]);
            
            let middle = new Three_cjs.Vector3(
                (point1.x + point2.x) / 2.0, 
                (point1.y + point2.y) / 2.0, 
                (point1.z + point2.z) / 2.0);

    		addPoint(middle.x, middle.y, middle.z);
        }

        function initNormals() {
            for (let index = 0; index < vertices.length; index += 3) {
                let x = vertices[index];
                let y = vertices[index + 1];
    			let z = vertices[index + 2];
    			
                normal.set( x, y, z ).normalize();
                normals.push( normal.x, normal.y, normal.z );
            }
        }
        
        function initUVs() {
            let u = 0.0;
            let v = 0.0;
            for (let index = 0; index < vertices.length; index += 3) {
                let x = vertices[index];
                let y = vertices[index + 1];
                let z = vertices[index + 2];
                
                u = 0.5 + Math.atan2(z, x) / (2 * Math.PI);
                v = 0.5 - Math.asin(y) / (Math.PI);

                uvs.push(u, v);
            }
        }
    	
    	function addPoint(x, y, z) {

    		vertex = new Three_cjs.Vector3(x, y, z);

    		vertex.normalize();

    		vertex.x *= radius;
            vertex.y *= radius;
    		vertex.z *= radius;
    		
    		vertices.push(vertex.x, vertex.y, vertex.z);
    	}

    }

    IcosahedronBufferGeometry.prototype = Object.create( Three_cjs.BufferGeometry.prototype );
    IcosahedronBufferGeometry.prototype.constructor = IcosahedronBufferGeometry;

    var IcosahedronBufferGeometry_1 = IcosahedronBufferGeometry;

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
    function NormalizedCubeBufferGeometry( radius, widthHeightSegments ) {

    	Three_cjs.BufferGeometry.call( this );

    	this.type = 'NormalizedCubeBufferGeometry';

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

    NormalizedCubeBufferGeometry.prototype = Object.create( Three_cjs.BufferGeometry.prototype );
    NormalizedCubeBufferGeometry.prototype.constructor = NormalizedCubeBufferGeometry;

    var NormalizedCubeBufferGeometry_1 = NormalizedCubeBufferGeometry;

    var THREESphereBufferGeometries = {
        IcosahedronBufferGeometry : IcosahedronBufferGeometry_1,
        SpherifiedCubeBufferGeometry : SpherifiedCubeBufferGeometry_1,
        NormalizedCubeBufferGeometry : NormalizedCubeBufferGeometry_1
    };

    THREE.IcosahedronBufferGeometry = THREESphereBufferGeometries.IcosahedronBufferGeometry;
    THREE.SpherifiedCubeBufferGeometry = THREESphereBufferGeometries.SpherifiedCubeBufferGeometry;
    THREE.NormalizedCubeBufferGeometry = THREESphereBufferGeometries.NormalizedCubeBufferGeometry;

    var exports$1 = THREESphereBufferGeometries;

    return exports$1;

})));
