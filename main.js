import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.addEventListener("load", function () {
  // Create Scene
  const scene = new THREE.Scene();
  // scene.add(new THREE.AxesHelper(5))

  // Add a light
  const light = new THREE.PointLight(0xffffff, 1000);
  light.position.set(7.5, 30, 7.5);
  scene.add(light);

  // Add a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0.8, 1.4, 1.0);

  // Add renderer and put in the DOM
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(200, 200);

  // Add the orbit controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);

  var mixer;
  var modelReady = false;

  // Load our FBX model from the directory
  var loader = new FBXLoader();
  loader.load("StandingTorchLightTorch.fbx", function (object) {
    // Scale and position the model
    object.scale.set(0.007, 0.007, 0.007);
    object.position.set(0, 0, 0);

    // Start the default animation
    mixer = new THREE.AnimationMixer(object);
    var action = mixer.clipAction(object.animations[0]);
    action.play();

    // Add it to the scene
    scene.add(object);

    modelReady = true;
  });

  // Add animation routine
  var clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    // Call the animate on the objec
    if (modelReady) mixer.update(clock.getDelta());

    renderer.render(scene, camera);
  }

  animate();
});
