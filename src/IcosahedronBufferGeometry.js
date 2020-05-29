const THREE = require("three-full/builds/Three.cjs.js");

/**
 * @author baptistewagner & lucassort
 */
function IcosahedronBufferGeometry( radius, subdivisionsLevel ) {

	THREE.BufferGeometry.call( this );

	this.type = 'IcosahedronBufferGeometry';

	this.parameters = {
		radius: radius,
		subdivisionsLevel: subdivisionsLevel
	};

	var scope = this;

	radius = radius || 10;

	var ix, iy;

	var vertex = new THREE.Vector3();
	var normal = new THREE.Vector3();

	var u = 1;
	var v = 1;

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
    var uvs = [];
    
    verticesInit();
    trianglesInit();
    refineTriangles();
    initNormals();    

	this.setIndex( indices );
	this.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	this.addAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
	this.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );

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
        let point1 = new THREE.Vector3(vertices[3 * id1], vertices[3 * id1 + 1], vertices[3 * id1 + 2]);
		let point2 = new THREE.Vector3(vertices[3 * id2], vertices[3 * id2 + 1], vertices[3 * id2 + 2]);
        
        let middle = new THREE.Vector3(
            (point1.x + point2.x) / 2.0, 
            (point1.y + point2.y) / 2.0, 
            (point1.z + point2.z) / 2.0);

		addPoint(middle.x, middle.y, middle.z);
    }

    function initNormals() {
		// normal

        for (let index = 0; index < vertices.length; index += 3) {
            let x = vertices[index];
            let y = vertices[index + 1];
			let z = vertices[index + 2];
			
            normal.set( x, y, z ).normalize();
            normals.push( normal.x, normal.y, normal.z );
        }
	}
	
	function addPoint(x, y, z) {

		vertex = new THREE.Vector3(x, y, z);

		vertex.normalize();

		vertex.x *= radius;
        vertex.y *= radius;
		vertex.z *= radius;
		
		vertices.push(vertex.x, vertex.y, vertex.z);
	}

}

IcosahedronBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
IcosahedronBufferGeometry.prototype.constructor = IcosahedronBufferGeometry;

module.exports = IcosahedronBufferGeometry;