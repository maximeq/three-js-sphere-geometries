import THREE from 'three';

/**
 * @author baptistewagner & lucassort
 */

export class RoundedCubeBufferGeometry extends THREE.BufferGeometry {
    constructor(radius, widthHeightSegments) {
        super();

        this.type = "RoundedCubeBufferGeometry";

        radius = radius || 1;

        widthHeightSegments = widthHeightSegments || 8;

        this.parameters = {
            radius: radius,
            widthHeightSegments: widthHeightSegments,
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

        var cubeBufferGeometry = new THREE.BoxBufferGeometry(
            1,
            1,
            1,
            widthHeightSegments,
            widthHeightSegments,
            widthHeightSegments
        );

        let positionArray = cubeBufferGeometry.getAttribute("position").array;
        for (let i = 0; i < positionArray.length; ++i){
            vertices.push(positionArray[i]);
        }

        let normalArray = cubeBufferGeometry.getAttribute("normal").array;
        for (let i = 0; i < normalArray.length; ++i) {
            normals.push(normalArray[i]);
        }

        let uvArray = cubeBufferGeometry.getAttribute("uv").array;
        for (let i = 0; i < uvArray.length; ++i) {
            uvs.push(uvArray[i]);
        }

        let indexArray = cubeBufferGeometry.index.array;
        for (let i = 0; i < indexArray.length; ++i) {
            indices.push(indexArray[i]);
        }

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
