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
  p.textContent = '👋 Im Alan, a sophomore majoring in Computer Science at the College of Staten Island with an eye on Software Engineering and Web Development. Ive been using technology my whole life and have always been fascinated by it so now im trying to make a mark on others by contributing to the field professionally!';
  const pPointLabel = new CSS2DObject(p);

  const h3 = document.createElement('h3');
  h3.textContent = 'Who am I?';
  const h3PointLabel = new CSS2DObject(h3);

  const h5 = document.createElement('h5');
  h5.textContent = 'Technical Skills:';
  const h5PointLabel = new CSS2DObject(h5);

  const h52 = document.createElement('h5');
  h52.textContent = 'Professional Skills:';
  const h52PointLabel = new CSS2DObject(h52);
  h52.setAttribute("id", "h52");

  const p2 = document.createElement('p');
  p2.textContent = 'C++, Javascript, Three.js, Python, HTML, CSS, SQL, JQuery, React';
  const pPointLabel2 = new CSS2DObject(p2);
  p2.setAttribute("id", "p2");

  const p3 = document.createElement('p');
  p3.textContent = 'Leadership, Good Communication, Adaptable, Works well under pressure, Detail Oriented';
  const pPointLabel3 = new CSS2DObject(p3);
  p3.setAttribute("id", "p3");

  const div = document.createElement('div');

  const img = document.createElement('img');
  img.src = "imgs/knight.gif";
  img.setAttribute("id", "knightImg");
  const imgLabel = new CSS2DObject(img);

  
  div.setAttribute("id", "aboutPara");
  document.body.appendChild(div);

  div.appendChild(p);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(h3);
  div.appendChild(h5);
  div.appendChild(h52);
  div.appendChild(img);



  const divContainer = new CSS2DObject(div);
  scene.add(divContainer);
  divContainer.position.set(95, 0, 95)
}


function createProjects(){
  const proj1 = document.createElement('img');
  proj1.src = "imgs/firstWeb.png";
  proj1.setAttribute("id", "projPics");
  document.body.appendChild(proj1);
  const proj1Label = new CSS2DObject(proj1);
  scene.add(proj1Label);
  proj1Label.position.set(-100, 0, 95)

  const proj2 = document.createElement('img');
  proj2.src = "imgs/firstPort.png";
  proj2.setAttribute("id", "projPics");
  document.body.appendChild(proj2);
  const proj2Label = new CSS2DObject(proj2);
  scene.add(proj2Label);
  proj2Label.position.set(-140, 0, 95)

  const proj3 = document.createElement('img');
  proj3.src = "imgs/geolocator.png";
  proj3.setAttribute("id", "projPics");
  document.body.appendChild(proj3);
  const proj3Label = new CSS2DObject(proj3);
  scene.add(proj3Label);
  proj3Label.position.set(-180, 0, 95)



}

window.addEventListener('load', createAboutPara);
window.addEventListener('load', createProjects);


//---variables to stop set intervals if needed
let homeTime;
let proj1Time;
let proj2Time;
let proj3Time;
let aboutTime;
let x = null;
let x2;
let count = null;
let ranLeft = false;
let ranRight = false;

//--------------controls the camera movement when a button is clicked-----------------

const home = document.getElementById("home");
const projects = document.getElementById("projects");
const about = document.getElementById("about");


home.addEventListener("click", goHome);
projects.addEventListener("click", goProjects);
about.addEventListener("click", goAbout);
  
    
function goHome(){
  clearTimeout(proj1Time);
  clearTimeout(proj2Time);
  clearTimeout(proj3Time);
  clearTimeout(aboutTime);
  const tl = gsap.timeline();
  tl.to(camera.position, {
    x:0,
    duration:1.5,
    onUpdate: function(){
      camera.lookAt(0,0,0);
    }
    
  });

  tl.to(camera.position, {
    x:0,
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

  homeTime = setTimeout(function() {
    document.getElementById('name').style.opacity = 100;
    
  }, 3000);
  
}

function goProjects(){
  clearTimeout(homeTime);
  clearTimeout(aboutTime);
  if(x == null)
    x = -100;
  if(count == null)
    count = 1;

  console.log('count started at ' + count)
  console.log(x);
  const tl = gsap.timeline();
  tl.to(camera.position, {
    x:x,
    y:30,
    z:100,
    duration:2,
    onUpdate: function(){
      camera.lookAt(-100,0,-500);
    }
    
    
  });

  tl.to(camera.position, {
    x:x,
    y:0,
    z:100,
    duration:1,
    onUpdate: function(){
      camera.lookAt(-100,0,-500);
    }
    
    
  });
  
  document.getElementById("about").textContent = "<About>"
  document.getElementById("home").textContent = "<Home>"
  document.getElementById("projects").textContent = "</Projects>"

  proj1Time = setTimeout(function(){
    let showProj = document.querySelectorAll("#projPics");

    for(let i = 0; i < showProj.length; i++){
      showProj[i].style.opacity = 1;
    }
  },2000);
  

  document.getElementById("aboutPara").style.opacity = 0;

  proj2Time = setTimeout(function() {
    document.getElementById('name').style.opacity = 0;
  }, 500);

  proj3Time = setTimeout(function() {
    document.getElementById('name').style.display = "none";
    document.getElementById('arrows').style.opacity = 1;
    document.getElementById('arrows').style.display = "flex";
    document.getElementById('arrows').style.alignItems = "flex-start";
    document.getElementById('left').style.opacity = 1;
    document.getElementById('middle').style.opacity = 1;
  }, 1500);


  //arrow logic--------
  const leftArrow = document.getElementById("left");
  const rightArrow = document.getElementById("right");
  var max = 3;//max is the # of projects on page
  
  //var x = -100;
  //var x2;

  var projNames = ["First Website", "First Portfolio", "geolocator app"];
  var projLink = ["https://project-2-hacked-website-qcc2022edlc2w4.qcc2022edlc2w4.repl.co", "https://my-final-portfolio-alanmack.qcc2022edlc2w4.repl.co", "..."];

  
  document.getElementById('middle').innerHTML = projNames[count-1];
  document.getElementById('middle').href = projLink[count-1];

if(ranLeft == false){
  leftArrow.addEventListener("click", function(){
    
    if(count < max){
      document.getElementById('right').style.opacity = 1;
      x = x-40;
      x2 = x;
      gsap.to(camera.position, {
        x:x,
        y:0,
        z:100,
        duration:1.5,
        
      });
      console.log(x);
      count++;
      console.log(count)

      if(count == max)
      document.getElementById('left').style.opacity = 0;
  }
  document.getElementById('middle').innerHTML = projNames[count-1];
  document.getElementById('middle').href = projLink[count-1];

  });
  ranLeft = true;
}

if(ranRight == false){
  rightArrow.addEventListener("click", function(){
    
    if(count > 1){
      count--;
      console.log('clicked right' + count);
      x2 = x+40;
      gsap.to(camera.position, {
        x:x2,
        y:0,
        z:100,
        duration:1.5,
        
      });
      x = x2;
      console.log(x);
  }
  document.getElementById('middle').innerHTML = projNames[count-1];
  document.getElementById('middle').href = projLink[count-1];
    if(count != 3){
      document.getElementById('left').style.opacity = 1;
    }

    if(count == 1){
      document.getElementById('right').style.opacity = 0;
    }
  });
  ranRight = true;
}
  
  
  
}
//---------------

function goAbout(){
  console.log('count ended at ' + count)
  clearTimeout(proj1Time);
  clearTimeout(proj2Time);
  clearTimeout(proj3Time);
  clearTimeout(homeTime);
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
  document.getElementById('arrows').style.display = "none";

  
  let hideProj = document.querySelectorAll("#projPics");

  for(let i = 0; i < hideProj.length; i++){
    hideProj[i].style.opacity = 0;
  }


  aboutTime = setTimeout(function() {
    document.getElementById('name').style.opacity = 0;
    document.getElementById("aboutPara").style.opacity = 1;
    
  }, 500);
}


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