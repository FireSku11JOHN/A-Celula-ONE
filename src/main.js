import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// === Cena e câmera ===
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xd18747, 0.018); // névoa suave e contínua

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-100, 10, -50);
camera.lookAt(0, 0, 0);

// === Renderer ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.querySelector(".scene-container").appendChild(renderer.domElement);

// === Controles de câmera ===
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // movimento suave
// controls.dampingFactor = 0.05;
// controls.enablePan = false; // desativa arrastar lateral
// controls.minDistance = 5;   // distância mínima de zoom
// controls.maxDistance = 170;  // distância máxima de zoom
// controls.maxPolarAngle = Math.PI / 2.1; // limita rotação pra não virar de cabeça pra baixo


// === Luzes ===
const light = new THREE.DirectionalLight(0xffe5b4, 1.2);
light.position.set(40, 20, 10);
light.castShadow = true;
scene.add(light);

const ambient = new THREE.AmbientLight(0xffb070, 0.5);
scene.add(ambient);

// === Céu (esfera invertida com gradiente suave) ===
const skyGeo = new THREE.SphereGeometry(700, 32, 32);
const skyMat = new THREE.ShaderMaterial({
  uniforms: {
    topColor: { value: new THREE.Color(0xffe6b0) },   // tom do topo
    bottomColor: { value: new THREE.Color(0xe7a45f) }, // tom próximo ao solo
  },
  vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
  fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                varying vec3 vWorldPosition;
                void main() {
                float h = normalize(vWorldPosition + vec3(0.0, 100.0, 0.0)).y;
                gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(h, 0.7), 0.0)), 1.0);
                }
            `,
  side: THREE.BackSide,
});
const sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);


// === Duna ===
const geometry = new THREE.PlaneGeometry(200, 200, 1850, 400);
const material = new THREE.MeshStandardMaterial({
  color: '#EBA958',
  roughness: 1,
  metalness: 0,
  flatShading: true,
});
const dune = new THREE.Mesh(geometry, material);
dune.rotation.x = -Math.PI / 2.13;
dune.castShadow = true;
dune.receiveShadow = true;
scene.add(dune);

// === Poeira principal ===
const dustCount = 10000;
const dustGeometry = new THREE.BufferGeometry();
const dustPositions = new Float32Array(dustCount * 3);

for (let i = 0; i < dustCount; i++) {
  dustPositions[i * 3] = (Math.random() - 0.5) * 500; // x
  dustPositions[i * 3 + 1] = Math.random() * 50 + -15; // y
  dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 130; // z
}

dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

const dustMaterial = new THREE.PointsMaterial({
  color: 0xffd9a6,
  // color: '#000000',
  size: 0.1,
  transparent: true,
  opacity: 0.7,
});

const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
scene.add(dustParticles);

// === Camada de névoa volumétrica (fundo) ===
const fogCount = 2000;
const fogGeo = new THREE.BufferGeometry();
const fogPos = new Float32Array(fogCount * 3);

for (let i = 0; i < fogCount; i++) {
  fogPos[i * 3] = (Math.random() - 0.5) * 600;
  fogPos[i * 3 + 1] = Math.random() * 50 + 10;
  fogPos[i * 3 + 2] = (Math.random() - 0.5) * 400;
}
fogGeo.setAttribute('position', new THREE.BufferAttribute(fogPos, 3));

const fogMat = new THREE.PointsMaterial({
  // color: 0xf7d7a3,
  color: 0xe7a45f,
  size: 1.2,
  transparent: true,
  opacity: 0.01,
});
const fogLayer = new THREE.Points(fogGeo, fogMat);
scene.add(fogLayer);

// === Animação ===
const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();
  const windSpeed = 1.8;
  const waveAmplitude = 1.4;

  // Movimento das dunas
  geometry.attributes.position.needsUpdate = true;
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);

    const wave =
      Math.sin((x - time * windSpeed) * 0.35) * waveAmplitude +
      Math.cos((y - time * windSpeed) * 0.24) * 0.8 +
      Math.sin(((x + y) - time * windSpeed) * 0.7) * 0.6;

    pos.setZ(i, wave);
  }

  // Poeira em movimento
  const dustPos = dustGeometry.attributes.position.array;
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3 + 1] += 0.02; // sobe lentamente
    dustPos[i * 3] += 0.8;      // vento horizontal

    if (dustPos[i * 3 + 1] > 50) {
      dustPos[i * 3 + 1] = 4;
      dustPos[i * 3] = (Math.random() - 0.5) * 100;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    if (dustPos[i * 3] > 200) {
      dustPos[i * 3] = -200;
    }
  }
  dustGeometry.attributes.position.needsUpdate = true;

  // controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// === Responsividade ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
