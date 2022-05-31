/*
 * This file encapsulates the xthree library.
 * It checks if the needed three examples and the library are duplicated.
 */
import { checkDependancy, checkThreeRevision } from "three-js-checker";

// Duplication check

import * as SphereGeometries from "./exports.js";

const PACKAGE_NAME = "three-js-sphere-geometries";

checkThreeRevision(PACKAGE_NAME, 130);

checkDependancy(PACKAGE_NAME, "SphereGeometries", SphereGeometries);

// For backward compat, should be removed someday
import { IcosahedronSphereBufferGeometry, SpherifiedCubeBufferGeometry, RoundedCubeBufferGeometry } from "./exports";
checkDependancy(PACKAGE_NAME, "IcosahedronSphereBufferGeometry", IcosahedronSphereBufferGeometry);
checkDependancy(PACKAGE_NAME, "SphereGeometSpherifiedCubeBufferGeometryries", SpherifiedCubeBufferGeometry);
checkDependancy(PACKAGE_NAME, "RoundedCubeBufferGeometry", RoundedCubeBufferGeometry);

// Reexport API

export * from "./exports";
