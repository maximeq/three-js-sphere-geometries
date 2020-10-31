(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three-full')) :
    typeof define === 'function' && define.amd ? define(['three-full'], factory) :
    (global.THREESphereGeometries = factory(global.THREE));
}(this, (function (threeFull) { 'use strict';

    threeFull = threeFull && threeFull.hasOwnProperty('default') ? threeFull['default'] : threeFull;

    /**
     * @author baptistewagner & lucassort
     */
    function IcosahedronSphereBufferGeometry( radius, subdivisionsLevel ) {

    	threeFull.IcosahedronBufferGeometry.call( this, radius, subdivisionsLevel );

        this.type = 'IcosahedronSphereBufferGeometry';
    }

    IcosahedronSphereBufferGeometry.prototype = Object.create( threeFull.BufferGeometry.prototype );
    IcosahedronSphereBufferGeometry.prototype.constructor = IcosahedronSphereBufferGeometry;

    var IcosahedronSphereBufferGeometry_1 = IcosahedronSphereBufferGeometry;

    function SpherifiedCubeBufferGeometry( radius, widthHeightSegments ) {

    	threeFull.BufferGeometry.call( this );

    	this.type = 'SpherifiedCubeBufferGeometry';

    	radius = radius || 1;

    	widthHeightSegments = widthHeightSegments || 8;

    	this.parameters = {
    		radius: radius,
    		widthHeightSegments: widthHeightSegments
    	};

    	var vertex = new threeFull.Vector3();
    	var vertex2 = new threeFull.Vector3();
    	var normal = new threeFull.Vector3();

    	// buffers

    	var indices = [];
    	var vertices = [];
    	var uvs = [];

    	// we create a normal cube and buffer it in our geometry

    	var cubeBufferGeometry = new threeFull.BoxBufferGeometry(1, 1, 1, widthHeightSegments, widthHeightSegments, widthHeightSegments);

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
    	this.addAttribute( 'position', new threeFull.Float32BufferAttribute( verticesSphere, 3 ) );
    	this.addAttribute( 'normal', new threeFull.Float32BufferAttribute( normalsSphere, 3 ) );
    	this.addAttribute( 'uv', new threeFull.Float32BufferAttribute( uvs, 2 ) );

    }

    SpherifiedCubeBufferGeometry.prototype = Object.create( threeFull.BufferGeometry.prototype );
    SpherifiedCubeBufferGeometry.prototype.constructor = SpherifiedCubeBufferGeometry;

    var SpherifiedCubeBufferGeometry_1 = SpherifiedCubeBufferGeometry;

    /**
     * @author baptistewagner & lucassort
     */
    function RoundedCubeBufferGeometry( radius, widthHeightSegments ) {

    	threeFull.BufferGeometry.call( this );

    	this.type = 'RoundedCubeBufferGeometry';

    	radius = radius || 1;

    	widthHeightSegments = widthHeightSegments || 8;

    	this.parameters = {
    		radius: radius,
    		widthHeightSegments: widthHeightSegments
    	};

    	var vertex = new threeFull.Vector3();
    	var normal = new threeFull.Vector3();

    	// buffers

    	var indices = [];
    	var vertices = [];
    	var uvs = [];

    	// we create a normal cube and buffer it in our geometry

    	var cubeBufferGeometry = new threeFull.BoxBufferGeometry(1, 1, 1, widthHeightSegments, widthHeightSegments, widthHeightSegments);

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
            vertex.multiplyScalar(radius);
    		verticesSphere.push( vertex.x, vertex.y, vertex.z );

    		// normal

    		normal.set( vertex.x, vertex.y, vertex.z ).normalize();
    		normalsSphere.push( normal.x, normal.y, normal.z );

    	}

    	// build geometry

    	this.setIndex( indices );
    	this.addAttribute( 'position', new threeFull.Float32BufferAttribute( verticesSphere, 3 ) );
    	this.addAttribute( 'normal', new threeFull.Float32BufferAttribute( normalsSphere, 3 ) );
    	this.addAttribute( 'uv', new threeFull.Float32BufferAttribute( uvs, 2 ) );

    }

    RoundedCubeBufferGeometry.prototype = Object.create( threeFull.BufferGeometry.prototype );
    RoundedCubeBufferGeometry.prototype.constructor = RoundedCubeBufferGeometry;

    var RoundedCubeBufferGeometry_1 = RoundedCubeBufferGeometry;

    var THREESphereBufferGeometries = {
        IcosahedronSphereBufferGeometry : IcosahedronSphereBufferGeometry_1,
        SpherifiedCubeBufferGeometry : SpherifiedCubeBufferGeometry_1,
        RoundedCubeBufferGeometry : RoundedCubeBufferGeometry_1
    };

    threeFull.IcosahedronSphereBufferGeometry = THREESphereBufferGeometries.IcosahedronSphereBufferGeometry;
    threeFull.SpherifiedCubeBufferGeometry = THREESphereBufferGeometries.SpherifiedCubeBufferGeometry;
    threeFull.RoundedCubeBufferGeometry = THREESphereBufferGeometries.RoundedCubeBufferGeometry;

    var exports$1 = THREESphereBufferGeometries;

    return exports$1;

})));
