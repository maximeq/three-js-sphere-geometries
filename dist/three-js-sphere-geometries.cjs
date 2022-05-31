'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var THREE$1 = require('three');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var THREE__default = /*#__PURE__*/_interopDefaultLegacy(THREE$1);

function checkDependancy(packageName, dependancyName, dependancy) {
    let duplicationMessage = `${packageName}: ${dependancyName} is duplicated. Your bundle includes ${dependancyName} twice. Please repair your bundle.`;
    try {
        if (THREE[dependancyName] === undefined) {
            THREE[dependancyName] = dependancy;
            return;
        }

        if (THREE[dependancyName] !== dependancy) {
            throw duplicationMessage;
        }
    } catch (error) {
        if (error !== duplicationMessage) {
            console.warn(
                `${packageName}: Duplication check unavailable.` + error
            );
        } else {
            throw error;
        }
    }
}

function checkThreeRevision(packageName, revision) {
    if (THREE.REVISION != revision) {
        console.error(
            `${packageName} depends on THREE revision ${revision}, but current revision is ${THREE.REVISION}.`
        );
    }
}

/**
 * @author baptistewagner & lucassort
 */

class IcosahedronSphereBufferGeometry extends THREE__default["default"].IcosahedronBufferGeometry {
    constructor(radius, subdivisionsLevel) {
        super(radius, subdivisionsLevel);

        this.type = "IcosahedronSphereBufferGeometry";
    }
}

class SpherifiedCubeBufferGeometry extends THREE__default["default"].BufferGeometry {
    constructor(radius, widthHeightSegments) {
        super();

        this.type = "SpherifiedCubeBufferGeometry";

        radius = radius || 1;

        widthHeightSegments = widthHeightSegments || 8;

        this.parameters = {
            radius: radius,
            widthHeightSegments: widthHeightSegments,
        };

        var vertex = new THREE__default["default"].Vector3();
        var vertex2 = new THREE__default["default"].Vector3();
        var normal = new THREE__default["default"].Vector3();

        // buffers

        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // we create a normal cube and buffer it in our geometry

        var cubeBufferGeometry = new THREE__default["default"].BoxBufferGeometry(
            1,
            1,
            1,
            widthHeightSegments,
            widthHeightSegments,
            widthHeightSegments
        );

        let positionArray = cubeBufferGeometry.getAttribute("position").array;
        for (let i = 0; i < positionArray.length; ++i) {
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
            new THREE__default["default"].Float32BufferAttribute(verticesSphere, 3)
        );
        this.setAttribute(
            "normal",
            new THREE__default["default"].Float32BufferAttribute(normalsSphere, 3)
        );
        this.setAttribute("uv", new THREE__default["default"].Float32BufferAttribute(uvs, 2));
    }
}

/**
 * @author baptistewagner & lucassort
 */

class RoundedCubeBufferGeometry extends THREE__default["default"].BufferGeometry {
    constructor(radius, widthHeightSegments) {
        super();

        this.type = "RoundedCubeBufferGeometry";

        radius = radius || 1;

        widthHeightSegments = widthHeightSegments || 8;

        this.parameters = {
            radius: radius,
            widthHeightSegments: widthHeightSegments,
        };

        var vertex = new THREE__default["default"].Vector3();
        var normal = new THREE__default["default"].Vector3();

        // buffers

        var indices = [];
        var vertices = [];
        var normals = [];
        var uvs = [];

        // we create a normal cube and buffer it in our geometry

        var cubeBufferGeometry = new THREE__default["default"].BoxBufferGeometry(
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
            new THREE__default["default"].Float32BufferAttribute(verticesSphere, 3)
        );
        this.setAttribute(
            "normal",
            new THREE__default["default"].Float32BufferAttribute(normalsSphere, 3)
        );
        this.setAttribute("uv", new THREE__default["default"].Float32BufferAttribute(uvs, 2));
    }
}

var SphereGeometries = /*#__PURE__*/Object.freeze({
    __proto__: null,
    IcosahedronSphereBufferGeometry: IcosahedronSphereBufferGeometry,
    SpherifiedCubeBufferGeometry: SpherifiedCubeBufferGeometry,
    RoundedCubeBufferGeometry: RoundedCubeBufferGeometry
});

/*
 * This file encapsulates the xthree library.
 * It checks if the needed three examples and the library are duplicated.
 */

const PACKAGE_NAME = "three-js-sphere-geometries";

checkThreeRevision(PACKAGE_NAME, 130);

checkDependancy(PACKAGE_NAME, "SphereGeometries", SphereGeometries);
checkDependancy(PACKAGE_NAME, "IcosahedronSphereBufferGeometry", IcosahedronSphereBufferGeometry);
checkDependancy(PACKAGE_NAME, "SphereGeometSpherifiedCubeBufferGeometryries", SpherifiedCubeBufferGeometry);
checkDependancy(PACKAGE_NAME, "RoundedCubeBufferGeometry", RoundedCubeBufferGeometry);

exports.IcosahedronSphereBufferGeometry = IcosahedronSphereBufferGeometry;
exports.RoundedCubeBufferGeometry = RoundedCubeBufferGeometry;
exports.SpherifiedCubeBufferGeometry = SpherifiedCubeBufferGeometry;
