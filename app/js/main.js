import * as THREE from 'three';
import Wheel from './models/Wheel';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';

//car objects
const dodecgeom = new THREE.DodecahedronGeometry(30);
const dodecmatr = new THREE.MeshBasicMaterial({ color: 0x14ae6e });
const dodecmesh = new THREE.Mesh(dodecgeom, dodecmatr);

const carGeom = new THREE.CubeGeometry(20, 20, 20);
const carMatr = new THREE.MeshBasicMaterial({ color: 0x14ae7e });
const car = new THREE.Mesh(carGeom, carMatr);

//singleGeometry = new THREE.Geometry();
//singleGeometry.merge(dodecmesh.Mesh, car.Mesh);

export default class App {
    constructor() {
        const c = document.getElementById('mycanvas');
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true });
        this.scene = new THREE.Scene();
        // Use perspective camera:
        //   Field of view: 75 degrees
        //   Screen aspect ration 4:3
        //   Near plane at z=0.5, far plane at z=500
        this.camera = new THREE.PerspectiveCamera(75, 4 / 3, 0.5, 500);
        // Place the camera at (0,0,100)
        this.camera.position.z = 100;

        // const orbiter = new OrbitControls(this.camera);
        // orbiter.enableZoom = false;
        // orbiter.update();
        this.tracker = new TrackballControls(this.camera);
        this.tracker.rotateSpeed = 2.0;
        // Allow zoom and pan
        this.tracker.noZoom = false;
        this.tracker.noPan = false;

        // Dodecahedron radius = 30

        //this.scene.add(dodecmesh);

        this.scene.add(car);

        window.addEventListener('keydown', () => this.onDocumentKeyDown(event));
        

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());

    }
    render() {
        this.renderer.render(this.scene, this.camera);
        this.tracker.update();
        // setup the render function to "autoloop"
        requestAnimationFrame(() => this.render());
    }

    resizeHandler() {
        const canvas = document.getElementById("mycanvas");
        let w = window.innerWidth - 16;
        let h = 0.75 * w;  /* maintain 4:3 ratio */
        if (canvas.offsetTop + h > window.innerHeight) {
            h = window.innerHeight - canvas.offsetTop - 16;
            w = 4 / 3 * h;
        }
        canvas.width = w;
        canvas.height = h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        this.tracker.handleResize();
    }
    onDocumentKeyDown(event) {
        if (event.keyCode == 65 || event.keyCode == 37) {
            car.position.x -= 1.0;
        }
        else if (event.keyCode == 68 || event.keyCode == 39) {
            car.position.x += 1.0;
        }
        else if (event.keyCode == 87 || event.keyCode == 38) {
            car.position.y += 1.0;
        }
        else if (event.keyCode == 83 || event.keyCode == 40) {
            car.position.y -= 1.0;
        }
        else {

        }
    }
}
/*
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 4 / 3, 0.5, 500);
camera.position.z = 100;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//tracker = new TrackballControls(scene.camera);
//tracker.rotateSpeed = 2.0;

// end template here

var geom = new THREE.BoxGeometry(10, 10, 10);
var mat = new THREE.MeshBasicMaterial({ color: "red" });
var cube = new THREE.Mesh(geom, mat);

scene.add(cube);
camera.position.x = 2;
camera.position.y = 1;
camera.position.z = 20;

var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// White directional light at 70% intensity shining from the top.
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionalLight);

// movement - please calibrate these values
var xSpeed = 1.0;
var ySpeed = 1.0;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        cube.position.y += ySpeed;
    } else if (keyCode == 83) {
        cube.position.y -= ySpeed;
    } else if (keyCode == 65) {
        cube.position.x -= xSpeed;
    } else if (keyCode == 68) {
        cube.position.x += xSpeed;
    } else if (keyCode == 32) {
        cube.position.set(0, 0, 0);
    }
};

var render = function () {
    requestAnimationFrame(render);
    
    renderer.render(scene, camera);
};

render(); */
