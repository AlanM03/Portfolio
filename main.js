import './style.css'

import * as THREE from 'three';
import { AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { mapLinear } from 'three/src/math/MathUtils';
import gsap from 'gsap';
import { CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';


//--------------------------SETTING UP SCENE AND PROPERTIES--------------------------

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

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.top = '0';
labelRenderer.domElement.style.position = 'fixed';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);


renderer.render(scene, camera);

//---------------------------------------------------------------------------------------------


//--------------------------object creation----------------------------------------------------

var radius = .7,
    segments = 16,
    rings = 16;

var sphere = new THREE.Mesh(
  new THREE.SphereGeometry(radius, segments, rings),
  new THREE.MeshStandardMaterial({ color: 0x6f528c })
  
);


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
sphere.position.set(5,18,-16);

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


//---------------------------------creates about me geometries-----------------------


var aboutSlate = new THREE.Mesh(
  new THREE.PlaneGeometry(10,10,1,1),
  new THREE.MeshStandardMaterial({color:0x4b4e82})
);

aboutSlate.position.set(95,0,95);
aboutSlate.rotateY(.78)

//scene.add(aboutSlate)





//--------------------------------------------------------------------------------------------------------
function createAboutPara() {
  const p = document.createElement('p');
  p.textContent = '👋 Im Alan, a sophomore majoring in Computer Science at the College of Staten Island with an eye on Software Engineering and Web Development. Ive been using technology my whole life and have always been fascinated by it so now im trying to make a mark on others by creating my own!';
  const cPointLabel = new CSS2DObject(p);

  const h3 = document.createElement('h3');
  h3.textContent = 'Who am I?';
  const h3PointLabel = new CSS2DObject(h3);

  const div = document.createElement('div');

  const img = document.createElement('img');
  img.src = "imgs/frostKnight.gif";
  img.setAttribute("id", "knightImg");
  const imgLabel = new CSS2DObject(img);

  const img2 = document.createElement('img');
  img2.src = "imgs/gravelord.gif";
  img2.setAttribute("id", "gravelordImg");
  const img2Label = new CSS2DObject(img2);
  div.setAttribute("id", "aboutPara");
  document.body.appendChild(div);

  div.appendChild(p);
  div.appendChild(h3);
  div.appendChild(img);
  div.appendChild(img2);


  const divContainer = new CSS2DObject(div);
  scene.add(divContainer);
  divContainer.position.set(95, 0, 95)
}


function createProjects(){
  const proj1 = document.createElement('img');
  proj1.src = "imgs/firstPort.png";
  proj1.setAttribute("id", "projPics");
  document.body.appendChild(proj1);
  const proj1Label = new CSS2DObject(proj1);
  scene.add(proj1Label);
  proj1Label.position.set(-100, 0, 95)

  const proj2 = document.createElement('img');
  proj2.src = "imgs/geolocator.png";
  proj2.setAttribute("id", "projPics");
  document.body.appendChild(proj2);
  const proj2Label = new CSS2DObject(proj2);
  scene.add(proj2Label);
  proj2Label.position.set(-140, 0, 95)



}

window.addEventListener('load', createAboutPara);
window.addEventListener('load', createProjects);












//--------------controls the camera movement when a button is clicked-----------------

const home = document.getElementById("home");
const projects = document.getElementById("projects");
const about = document.getElementById("about");


home.addEventListener("click", goHome);
projects.addEventListener("click", goProjects);
about.addEventListener("click", goAbout);
  
    
function goHome(){
  const tl = gsap.timeline();
  tl.to(camera.position, {
    x:0,
    duration:1.5,
    onUpdate: function(){
      camera.lookAt(0,0,0);
    }
    
  });

  tl.to(camera.position, {
    z:18,
    duration:1.5,
    onUpdate: function(){
      camera.lookAt(0,0,0);
    }
    
  });
    
  document.getElementById("about").textContent = "<About>"
  document.getElementById("home").textContent = "</Home>"
  document.getElementById("projects").textContent = "<Projects>"
  document.getElementById('arrows').style.opacity = 0;
  document.getElementById('arrows').style.display = "none";
  document.getElementById('name').style.display = "block";

  setTimeout(function() {
    document.getElementById('name').style.opacity = 100;
    
  }, 3000);
  
}

function goProjects(){
  const tl = gsap.timeline();
  tl.to(camera.position, {
    x:-100,
    y:30,
    z:100,
    duration:2,
    onUpdate: function(){
      camera.lookAt(-100,0,-500);
    }
    
    
  });

  tl.to(camera.position, {
    x:-100,
    y:0,
    z:100,
    duration:1,
    
    
  });
  
  document.getElementById("about").textContent = "<About>"
  document.getElementById("home").textContent = "<Home>"
  document.getElementById("projects").textContent = "</Projects>"

  setTimeout(function(){
    let showProj = document.querySelectorAll("#projPics");

    for(let i = 0; i < showProj.length; i++){
      showProj[i].style.opacity = 1;
  }
  },2000);
  

  document.getElementById("aboutPara").style.opacity = 0;

  setTimeout(function() {
    document.getElementById('name').style.opacity = 0;
  }, 500);

  setTimeout(function() {
    document.getElementById('name').style.display = "none";
    document.getElementById('arrows').style.opacity = 1;
    document.getElementById('arrows').style.display = "flex";
    document.getElementById('arrows').style.alignItems = "flex-start";
    document.getElementById('left').style.opacity = 1;
  }, 1500);


  //arrow logic--------
  const leftArrow = document.getElementById("left");
  const rightArrow = document.getElementById("right");
  var count = 1, max = 2;//max is the # of projects on page
  var x = -100;
  var x2;

  Object.defineProperty(this, 'x2', {//makes x2 always equal to x
    get() { return x; },
    set(value) { x = value; },
  });

  leftArrow.addEventListener("click", function(){
    if(count < max){
      document.getElementById('right').style.opacity = 1;
      x = x-40;
      
      gsap.to(camera.position, {
        x:x,
        y:0,
        z:100,
        duration:1.5,
        
      });
    
      count++;

      if(count == max)
      document.getElementById('left').style.opacity = 0;
  }
  });

  rightArrow.addEventListener("click", function(){
    if(count > 1){
      count--;
      x2 = x+40;
      gsap.to(camera.position, {
        x:x2,
        y:0,
        z:100,
        duration:1.5,
        
      });
      x = x2;
  }
    if(count == 1)
      document.getElementById('right').style.opacity = 0;
      document.getElementById('left').style.opacity = 1;
  });
  
}
//---------------

function goAbout(){
  const tl = gsap.timeline();
  tl.to(camera.position, {
    x:100,
    y:30,
    z:100,
    duration:2,
    onUpdate: function(){
      camera.lookAt(0,0,0);
    }
    
  });

  tl.to(camera.position, {
    x:100,
    y:0,
    z:100,
    duration:1,
    onUpdate: function(){
      camera.lookAt(0,0,0);
    }
    
  });
 

  document.getElementById("about").textContent = "</About>"
  document.getElementById("home").textContent = "<Home>"
  document.getElementById("projects").textContent = "<Projects>"

  
  let hideProj = document.querySelectorAll("#projPics");

  for(let i = 0; i < hideProj.length; i++){
    hideProj[i].style.opacity = 0;
  }


  setTimeout(function() {
    document.getElementById('name').style.opacity = 0;
    document.getElementById("aboutPara").style.opacity = 1;
    
  }, 500);
}

//------------------------------------arrow functionality-----------------------------------







//-----------------------------------ALL LIGHTS IN PROJECT--------------
const pointLight1 = new THREE.PointLight(0xF4D03F, 5, 50)
const SpaceLight = new THREE.SpotLight(0xffffff,1,20000,Math.PI, 0)
const SpaceLight2 = new THREE.SpotLight(0xffffff,1,20000,Math.PI, 0)
const aboutLight = new THREE.PointLight(0xffffff,5,50)
SpaceLight.position.set(0,0,-500)
SpaceLight2.position.set(0,0,-100)

pointLight1.castShadow = true;


pointLight1.position.set(5,16.3,-12.8)

aboutLight.position.set(100,0,100)

const ambientLight = new THREE.AmbientLight(0xffffaa);
scene.add(pointLight1,SpaceLight, SpaceLight2, aboutLight);


//const lightHelper = new THREE.PointLightHelper(pointLight1)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add( gridHelper ,lightHelper)

const sl = new THREE.SpotLight(0xffffff,1,40,Math.PI / 4, 0);
//sl.castShadow = true;

sl.position.set(4,15,15);
//const slHelper = new THREE.SpotLightHelper(sl,3);



scene.add( sl);

//-----------------------------------------------------------

//const controls = new OrbitControls(camera, renderer.domElement);//allows mouse controls domElement is mouse


//-----------------------------------------Animation loop and resize event----------------

function animate(){//allows movement
  requestAnimationFrame( animate );
  
  //controls.update();

  const time = clock.getElapsedTime();
  
  box.position.y = Math.cos( time ) * 0.2;
  box2.position.x = Math.cos( time ) * 0.4;


  tri.rotation.x += 0.004;
  tri.rotation.z += 0.004;  
  

  labelRenderer.render(scene,camera);
  

  renderer.render( scene, camera);
}

animate()



window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight);
});
//-------------------------------------------------------------