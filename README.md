# three-js-sphere-geometries
3 different meshes for modelling spheres as new geometric primitives for THREE.JS.

The different meshes are the following (with their related Buffer Geometry):
* Normalized Cube (NormalizedCubeBufferGeometry)
* Spherified Cube (SpherifiedCubeBufferGeometry)
* Icosahedron (IcosahedronBufferGeometry)


## Setup
Assuming that npm and node are already installed.

Clone the current repository. Then in the repository folder :

```
npm install
```

This should install all required dependencies for build and development.

## Usage
You can use this library directly in browser or from node.js.

### Browser
Distribution files can be found in ./dist/browser, to be included in your HTML :

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>THREE CapsuleBufferGeometry</title>
    </head>
    <body>
        <!-- Don't forget to include THREE, its is not shipped with the lib -->
        <script src="three.js"></script>
        <script src="dist/browser/three-js-sphere-geometries.js"></script>
        <script>
            
        </script>
    </body>
</html>
```

### Node
In the repository folder:

```
npm start
```

This should open a browser window with a test application on a local server.

http-server must be installed in order to run this command:

```
npm install --global http-server
```

## Repository Commands
### Build:

```
npm run build
```

Will update the browser build in dist.

## Dependencies
### Browser Dependencies
In browser, only THREE is required.

### Node Dependencies
This library currently depends on node module three-full which is packaging all THREE.JS sources, including extras like examples. It can work with only THREE, but for convenience we rely on three-full.
