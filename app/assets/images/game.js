window.onload = init;

var scene, camera, render;


function init(){
  container = document.createElement('div');
  document.body.appendChild(container);


  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 100000);
  camera.position.y = 150;
  camera.position.z = 300;

  // // Place
  // var plane = new THREE.Mesh(new THREE.PlaneGeometry(600, 400, 100, 100), new THREE.MeshLambertMaterial({color: 0x000cf0}));
  // plane.position.y = -85;
  // plane.position.z = 0;
  // plane.rotation.x = -Math.PI/2;
  // plane.receiveShadow = true;
  // scene.add(plane);


  // // Cube
  // var cube = new THREE.Mesh(new THREE.CubeGeometry(150, 150, 150, 100, 100, 100), new THREE.MeshLambertMaterial({ color: 0xff0000 }));
  // cube.castShadow = true;
  // cube.receiveShadow = true;
  // cube.position.y = -60;
  // cube.position.z = -10;
  // cube.rotation.y = 180;
  // scene.add(cube);

  var sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 100,100), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('earth.jpg', new THREE.UVMapping(), function(){render.render()}), overdraw: true}));
  sphere.receiveShadow = true;
  sphere.castShadow = true;
  sphere.position.y = 100;
  scene.add(sphere);


  // var light = new THREE.SpotLight();
  // light.position.set(0, 300, 200);
  // light.castShadow = true;
  // scene.add(light);

  render = new THREE.CanvasRenderer();
  // render.shadowMapEnabled = true;
  render.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(render.domElement);
  render.render(scene, camera);

  animation();

  function animation(){
    // cube.rotation.y += 180/Math.PI * 0.001;
    sphere.rotation.y += 180/Math.PI * 0.0001;
    render.render(scene, camera);
    requestAnimationFrame(animation);
  }
}