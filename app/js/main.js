import * as THREE from 'three';
import Wheel from './models/Wheel';
// import orbit from 'three-orbit-controls';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';

var hit;
//car objects
var enemy = new THREE.Mesh();

const landGeom = new THREE.CubeGeometry(500, 50, 400, 40);
const landMatr = new THREE.MeshBasicMaterial({ color: 0x91ef00 });
const land = new THREE.Mesh(landGeom, landMatr);
land.position.z = -50;
land.position.y = -40;

const box = new THREE.BoxGeometry(20, 10, 10);
const sphere = new THREE.SphereGeometry(10, 20, 20);
const singleGeom = new THREE.Geometry();
const boxMesh = new THREE.Mesh(box);
const sphereMesh = new THREE.Mesh(sphere);
boxMesh.updateMatrix();
singleGeom.merge(boxMesh.geometry, boxMesh.matrix);
sphereMesh.updateMatrix();
singleGeom.merge(sphereMesh.geometry, sphereMesh.matrix);
const mat = new THREE.MeshBasicMaterial({ color: 0x000080 });
const newMesh = new THREE.Mesh(singleGeom, mat);

const trunkGeom = new THREE.CylinderGeometry(8, 8, 10, 10);
const trunkMatr = new THREE.MeshBasicMaterial({ color: 0x808000 });
const trunk = new THREE.Mesh(trunkGeom, trunkMatr);
trunk.position.set(20, -5, 25);

const leafGeom = new THREE.ConeGeometry(15, 35, 15, 15);
const leafMatr = new THREE.MeshBasicMaterial({ color: 0x008000});
const leaf = new THREE.Mesh(leafGeom, leafMatr);
leaf.position.set(20, 13, 25);

const camera = new THREE.PerspectiveCamera(75, 4 / 3, 0.5, 500);

const collidableMeshList = [];
collidableMeshList.push(trunk, leaf);

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
        //camera = new THREE.PerspectiveCamera(75, 4 / 3, 0.5, 500);
        // Place the camera at (0,0,100)
        camera.position.z = 100;
        this.start = false;
        // const orbiter = new OrbitControls(this.camera);
        // orbiter.enableZoom = false;
        // orbiter.update();
        this.tracker = new TrackballControls(camera);
        this.tracker.rotateSpeed = 2.0;
        // Allow zoom and pan
        this.tracker.noZoom = false;
        this.tracker.noPan = false;

        this.rings = [];
        for (let i = 0; i < 10; i++) {
            var tget = new THREE.TorusGeometry(5, 4, 20, 26);
            var tmat = new THREE.MeshBasicMaterial({ color: 0x00FFFF });
            enemy = new THREE.Mesh(tget, tmat);



            var x = Math.floor(Math.random() * (70 - (-65 + 1)) - 65);
            enemy.position.x = x;
            var z = Math.floor(Math.random() * (90 - (-90 + 1)) - 90);
            enemy.position.z = z;
            enemy.position.y = 7;
            this.rings[i] = enemy;
            this.scene.add(enemy);
        }

        //this.scene.add(dodecmesh);

        this.scene.add(land);
        this.scene.add(newMesh);
        newMesh.add(camera);

        this.scene.add(trunk);
        this.scene.add(leaf);
        this.clock = new THREE.Clock();
        window.addEventListener('keydown', () => this.onDocumentKeyDown(event));
        

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());

    }
    render() {
        this.renderer.render(this.scene, camera);
        this.tracker.update();
        // setup the render function to "autoloop"
        requestAnimationFrame(() => this.render());

        camera.lookAt(newMesh.position);
        camera.updateProjectionMatrix();
        //camera.lookAt(car.position.y);
        this.collision();

        
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
        camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
        this.tracker.handleResize();
    }
    onDocumentKeyDown(event) {
        if (event.keyCode == 65 || event.keyCode == 37) {
            newMesh.position.x -= 5.0;
            if (this.start === false) {
                this.clock.start();
                this.start = true;
            }
        }
        else if (event.keyCode == 68 || event.keyCode == 39) {
            newMesh.position.x += 5.0;
            if (this.start === false) {
                this.clock.start();
                this.start = true;
            }
        }
        else if (event.keyCode == 87 || event.keyCode == 38) {
            newMesh.position.z -= 5.0;
            if (this.start === false) {
                this.clock.start();
                this.start = true;
            }
        }
        else if (event.keyCode == 83 || event.keyCode == 40) {
            newMesh.position.z += 5.0;
            if (this.start === false) {
                this.clock.start();
                this.start = true;
            }
        }
        else {

        }
    }
    collision() {
        this.rings.forEach((x) => {
            if (Math.abs(newMesh.position.x - x.position.x) < 15 && Math.abs(newMesh.position.z - x.position.z) < 12) {
                this.scene.remove(x);
                this.rings.splice(this.rings.indexOf(x), 1);
                console.log(this.rings.length);
                if (this.rings.length == 0) {
                    this.keyboard = {};
                    this.clock.stop();
                    alert("Doughnuts Collected in: " + this.clock.elapsedTime.toString().substring(0, 5) + " Seconds");
                    
                }
            }
        });
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
