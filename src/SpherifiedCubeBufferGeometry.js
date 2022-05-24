const THREE = require("three");

class SpherifiedCubeBufferGeometry extends THREE.BufferGeometry {
    constructor(radius, widthHeightSegments) {
        super();

        this.type = "SpherifiedCubeBufferGeometry";

        radius = radius || 1;

        widthHeightSegments = widthHeightSegments || 8;

        this.parameters = {
            radius: radius,
            widthHeightSegments: widthHeightSegments,
        };

        var scope = this;

        // generate cube
        var ix, iy;
        var depth = 1;
        var height = 1;
        var width = 1;

        var vertex = new THREE.Vector3();
        var vertex2 = new THREE.Vector3();
        var normal = new THREE.Vector3();

        var numberOfVertices = 0;
        var groupStart = 0;

        // buffers

        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // we create a normal cube and buffer it in our geometry

        var cubeBufferGeometry = new THREE.BoxBufferGeometry(
            1,
            1,
            1,
            widthHeightSegments,
            widthHeightSegments,
            widthHeightSegments
        );

        cubeBufferGeometry.getAttribute("position").array.forEach((vertex) => {
            vertices.push(vertex);
        });
        cubeBufferGeometry.getAttribute("normal").array.forEach((vertex) => {
            normals.push(vertex);
        });
        cubeBufferGeometry.getAttribute("uv").array.forEach((vertex) => {
            uvs.push(vertex);
        });
        cubeBufferGeometry.index.array.forEach((vertex) => {
            indices.push(vertex);
        });

        // then normalizing the cube to have a sphere

        var vIndex;

        var verticesSphere = [];
        var normalsSphere = [];

        // generate vertices, normals and uvs

        for (vIndex = 0; vIndex < vertices.length; vIndex += 3) {
            vertex.x = vertices[vIndex] * 2.0;
            vertex.y = vertices[vIndex + 1] * 2.0;
            vertex.z = vertices[vIndex + 2] * 2.0;

            // normalize to have sphere vertex

            vertex2.x = vertex.x ** 2;
            vertex2.y = vertex.y ** 2;
            vertex2.z = vertex.z ** 2;

            vertex.x *=
                Math.sqrt(
                    1.0 -
                        0.5 * (vertex2.y + vertex2.z) +
                        (vertex2.y * vertex2.z) / 3.0
                ) * radius;
            vertex.y *=
                Math.sqrt(
                    1.0 -
                        0.5 * (vertex2.z + vertex2.x) +
                        (vertex2.z * vertex2.x) / 3.0
                ) * radius;
            vertex.z *=
                Math.sqrt(
                    1.0 -
                        0.5 * (vertex2.x + vertex2.y) +
                        (vertex2.x * vertex2.y) / 3.0
                ) * radius;

            verticesSphere.push(vertex.x, vertex.y, vertex.z);

            // normal

            normal.set(vertex.x, vertex.y, vertex.z).normalize();
            normalsSphere.push(normal.x, normal.y, normal.z);
        }

        // build geometry

        this.setIndex(indices);
        this.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(verticesSphere, 3)
        );
        this.setAttribute(
            "normal",
            new THREE.Float32BufferAttribute(normalsSphere, 3)
        );
        this.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    }
}

module.exports = SpherifiedCubeBufferGeometry;
