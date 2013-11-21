// window.onload = init;

// var scene, camera, render;


// function init(){
//   container = document.createElement('div');
//   document.body.appendChild(container);


//   scene = new THREE.Scene();
//   camera = new THREE.Camera(65, window.innerWidth/window.innerHeight, 0.1, 100000);
//   camera.position.y = 150;
//   camera.position.z = 300;

//   var sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 100,100), new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('/assets/earth.jpg', new THREE.UVMapping(), function(){render.render()}), overdraw: true}));
//   sphere.receiveShadow = true;
//   sphere.castShadow = true;
//   sphere.position.y = 100;
//   scene.add(sphere);


//   // var light = new THREE.SpotLight();
//   // light.position.set(0, 300, 200);
//   // light.castShadow = true;
//   // scene.add(light);

//   render = new THREE.CanvasRenderer();
//   // render.shadowMapEnabled = true;
//   render.setSize(window.innerWidth, window.innerHeight);
//   container.appendChild(render.domElement);
//   render.render(scene, camera);

//   animation();

//   function animation(){
//     // cube.rotation.y += 180/Math.PI * 0.001;
//     sphere.rotation.y += 180/Math.PI * 0.0001;
//     render.render(scene, camera);
//     requestAnimationFrame(animation);
//   }
// }