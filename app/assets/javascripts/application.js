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


function init(){
  container = document.createElement('div');
  document.body.appendChild(container);


  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 1, 100000);
  camera.position.y = 150;
  camera.position.z = 800;






  // var light = new THREE.SpotLight();
  // light.position.set(0, 300, 200);
  // light.castShadow = true;
  // scene.add(light);

  render = new THREE.WebGLRenderer();
  // render.shadowMapEnabled = true;
  render.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(render.domElement);

  

  // Earth
  var material = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('/assets/earth.jpg')
  });
  var earth = new THREE.Mesh(new THREE.SphereGeometry(20, 100,100), material);
  earth.overdraw = true;
  earth.receiveShadow = true;
  earth.castShadow    = true;
  earth.position.x    = 900;
  earth.position.y    = 50;
  earth.position.z    = 650;
  scene.add(earth);

  // Sun
  var material = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('/assets/sun.gif')
  });
  var sun = new THREE.Mesh(new THREE.SphereGeometry(290, 100, 100), material);
  sun.overdraw = true;
  sun.position.y = 80;
  sun.position.x = 0;
  scene.add(sun);

  // directional lighting
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 80, 9).normalize();
  scene.add(directionalLight);

  var sunspot = new THREE.HemisphereLight( 0xffff00, 0xffffff, 0.6 );

  scene.add(sunspot);
 



  render.render(scene, camera);
  var t =0;
  animation();


  function animation(){
    // cube.rotation.y += 180/Math.PI * 0.001;
    sun.rotation.y += 180/Math.PI * 0.0001;
    earth.position.x = Math.sin(t*0.1) * 800;
    earth.position.z = Math.cos(t*0.1) * 500;
    t += Math.PI/180*2
    render.render(scene, camera);
    requestAnimationFrame(animation);
  }
}