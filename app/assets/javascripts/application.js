// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require three.min
//= require jquery_ujs
//= require_tree .


window.onload = init;

var scene, camera, render;
var t = 0;
var x = 0;
var y = 0;



function init(){
  container = document.createElement('div');
  document.body.appendChild(container);


  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 1, 100000);
  // camera.position.y = 150;
  camera.position.z = 31200;

  var controlls = new THREE.RollControls(camera);
  controlls.movementSpeed = 20000;
  controlls.lookSpeed = 1.6;





  // var light = new THREE.SpotLight();
  // light.position.set(0, 300, 200);
  // light.castShadow = true;
  // scene.add(light);

  render = new THREE.WebGLRenderer({antialiasing: true});
  // render.shadowMapEnabled = true;
  render.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(render.domElement);

  

  // Earth
  var texture = THREE.ImageUtils.loadTexture('/assets/dark_earth.png');
  texture.anisotropy = 24;
  var material = new THREE.MeshPhongMaterial({
    map: texture,
    emissive: 0xffffff
  });
  var earth = new THREE.Mesh(new THREE.SphereGeometry(100, 100,100), material);
  earth.overdraw = true;
  earth.receiveShadow = true;
  earth.castShadow    = true;
  earth.position.z    = 650;
  scene.add(earth);



  // june
  var texture = THREE.ImageUtils.loadTexture('/assets/darksun.jpg');
  texture.anisotropy = 24;
  var material = new THREE.MeshPhongMaterial({
    map: texture
    // emissive: 0xffffff
  });
  var june = new THREE.Mesh(new THREE.SphereGeometry(780, 100,100), material);
  june.overdraw = true;
  june.receiveShadow = true;
  june.castShadow    = true;
  june.position.z    = 650;
  scene.add(june);

  // Sun
  var texture = THREE.ImageUtils.loadTexture('/assets/sun.jpeg');
  texture.anisotropy = 24;
  var material = new THREE.MeshPhongMaterial({
    map: texture,
    emissive: 0xffffff
  });
  var sun = new THREE.Mesh(new THREE.SphereGeometry(2090, 200, 200), material);
  sun.overdraw = true;
  sun.position.y = 80;
  sun.position.x = 0;
  scene.add(sun);

  // directional lighting
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 80, 9).normalize();
  scene.add(directionalLight);


  // Ambient
  var ambient = new THREE.AmbientLight({color: 0xffffff});
  scene.add(ambient);

  // sunspot
  var sunspot = new THREE.HemisphereLight( 0xffff00, 0xffffff, 0.6 );
  scene.add(sunspot);
 
  // Particles
  var starsGeometry = new THREE.Geometry();
  var starsMaterial = new THREE.ParticleBasicMaterial({size: 1, sizeAttenuation: false, color: 0x333333, opacity: 0.3});
  var stars;

  for(var i=0; i < 40000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = 1 + Math.random() * (Math.random() < 0.5 ? -1 : 1) * 90000 ;
    vertex.y = 1 + Math.random() * (Math.random() < 0.5 ? -1 : 1) * 90000 ;
    vertex.z = 1 + Math.random() * (Math.random() < 0.5 ? -1 : 1) * 80000 ;
    starsGeometry.vertices.push(vertex);
  }

  stars = new THREE.ParticleSystem(starsGeometry, starsMaterial);
  scene.add(stars);


  var starsGeometry2 = new THREE.Geometry()
  var starsMaterial2 = new THREE.ParticleBasicMaterial({size: 10, sizeAttenuation: false, color: 0xffffff, opacity: 1});
  var stars2;

  for(var i=0; i < 20000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = 1 + Math.random() * (Math.random() < 0.5 ? -1 : 1) * 40000 ;
    vertex.y = 1 + Math.random() * (Math.random() < 0.5 ? -1 : 1) * 40000 ;
    vertex.z = 1 + Math.random() * (Math.random() < 0.5 ? -1 : 1) * 40000 ;
    starsGeometry2.vertices.push(vertex);
  }

  stars2 = new THREE.ParticleSystem(starsGeometry2, starsMaterial2);
  stars2.scale.set(70, 150, 100);
  scene.add(stars2);

  render.render(scene, camera);



  animation();


  function animation(){
    // cube.rotation.y += 180/Math.PI * 0.001;
    controlls.update(0.01);
    sun.rotation.y += 180/Math.PI * 0.0001;
    earth.rotation.y += 180/Math.PI * 0.00001;
    earth.position.x = Math.sin(t*0.03) * 9500;
    earth.position.z = Math.cos(t*0.03) * 9500;

    june.rotation.y += 180/Math.PI * 0.0001;
    june.position.x = Math.sin(t*0.03) * 6500;
    june.position.z = Math.cos(t*0.03) * 5500;

    t += Math.PI/180*2

    // camera.position.x = x ;
    // camera.position.y = y ;
    // camera.position.z = earth.position.z + 1320
    // camera.lookAt(sun.position);
    render.render(scene, camera);
    requestAnimationFrame(animation);
  }
}