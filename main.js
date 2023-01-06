import './style.css'

import * as THREE from 'three';
import { AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mapLinear } from 'three/src/math/MathUtils';



var scene = new THREE.Scene();
scene.background = new THREE.Color(0x151E3D);


const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000);

const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
})

renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.z = 18;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//--------------------------object creation
renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(12, 12, 12)
const material = new THREE.MeshStandardMaterial({color: 0xFFFF00, wireframe:true});
const wireSphere = new THREE.Mesh( geometry, material );

var radius = .7,
    segments = 16,
    rings = 16;

var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(radius, segments, rings),
  new THREE.MeshStandardMaterial({ color: 0x6f528c })
  
);

sphere.position.set(5,18,-16);

var box = new THREE.Mesh(
  new THREE.BoxGeometry(7,7,7),
  new THREE.MeshStandardMaterial({color:0x705e55})
);



var box2 = new THREE.Mesh(
  new THREE.BoxGeometry(30,5,6),
  new THREE.MeshStandardMaterial({color:0x4b4e82})
);

var tri = new THREE.Mesh(
  new THREE.TetrahedronGeometry(5,0),
  new THREE.MeshStandardMaterial({color:0x8c6121})
);

var platform = new THREE.Mesh(
  new THREE.BoxGeometry(10000,3,10000),
  new THREE.MeshStandardMaterial({color:0x3c3933})
);

platform.receiveShadow = true;
box.receiveShadow = true;
box.castShadow = true;
box2.receiveShadow = true;
box2.castShadow = true;
tri.receiveShadow = true;
tri.castShadow = true;

box.position.set(-5,10,0);
box2.position.set(-5,0,-10);
platform.position.set(0,-15,0);
tri.position.set(5,-4,0);

box.rotateX(4);
box.rotateY(5);
box2.rotateX(1);
box2.rotateY(7);

scene.add(sphere, box, box2, tri, platform);



function addStar(){//makes stars appear in rando locations in background
  const geometry = new THREE.SphereGeometry(0.70, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 550 ));

  star.position.set(x-30,y+325,z-350);
  scene.add(star)
}

Array(500).fill().forEach(addStar)//creates the stars










const pointLight1 = new THREE.PointLight(0xF4D03F, 5, 50)
const SpaceLight = new THREE.SpotLight(0xffffff,1,20000,Math.PI, 0)
const SpaceLight2 = new THREE.SpotLight(0xffffff,1,20000,Math.PI, 0)
SpaceLight.position.set(0,0,-500)
SpaceLight2.position.set(0,0,-100)
pointLight1.castShadow = true;


pointLight1.position.set(5,16.3,-12.8)


const ambientLight = new THREE.AmbientLight(0xffffaa);
scene.add(pointLight1,SpaceLight, SpaceLight2);


//const lightHelper = new THREE.PointLightHelper(pointLight1)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add( gridHelper ,lightHelper)

const sl = new THREE.SpotLight(0xffffff,1,40,Math.PI / 4, 0);
//sl.castShadow = true;

sl.position.set(4,15,15);
//const slHelper = new THREE.SpotLightHelper(sl,3);



scene.add( sl);

const controls = new OrbitControls(camera, renderer.domElement);//allows mouse controls domElement is mouse


function animate(){//allows movement
  requestAnimationFrame( animate );
  
  controls.update();

  const time = clock.getElapsedTime();
  
  box.position.y = Math.cos( time ) * 0.2;
  box2.position.x = Math.cos( time ) * 0.4;


  tri.rotation.x += 0.004;
  tri.rotation.z += 0.004;  
  

  
  

  renderer.render( scene, camera);
}

animate()



window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

