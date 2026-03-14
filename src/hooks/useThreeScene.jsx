import { useEffect } from 'react';
import * as THREE from 'three';

export function useThreeScene(containerRef) {
    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // === Cena e câmera ===
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xd18747, 0.018);

        const camera = new THREE.PerspectiveCamera(80, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(-100, 10, -50);
        camera.lookAt(0, 0, 0);

        // === Renderer ===
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true;
        
        // Anexa ao ref em vez de usar document.querySelector
        container.appendChild(renderer.domElement);

        // === Luzes ===
        const light = new THREE.DirectionalLight(0xffe5b4, 1.2);
        light.position.set(40, 20, 10);
        light.castShadow = true;
        scene.add(light);

        const ambient = new THREE.AmbientLight(0xffb070, 0.5);
        scene.add(ambient);

        // === Céu (Shader original) ===
        const skyGeo = new THREE.SphereGeometry(700, 32, 32);
        const skyMat = new THREE.ShaderMaterial({
            uniforms: {
                topColor: { value: new THREE.Color(0xffe6b0) },
                bottomColor: { value: new THREE.Color(0xe7a45f) },
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

        // === Duna (Configuração original) ===
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
        const dustCount = 5000;
        const dustGeometry = new THREE.BufferGeometry();
        const dustPositions = new Float32Array(dustCount * 3);
        for (let i = 0; i < dustCount; i++) {
            dustPositions[i * 3] = (Math.random() - 0.5) * 500;
            dustPositions[i * 3 + 1] = Math.random() * 50 + -15;
            dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 130;
        }
        dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
        const dustMaterial = new THREE.PointsMaterial({
            color: 0xffd9a6,
            size: 0.1,
            transparent: true,
            opacity: 0.7,
        });
        const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
        scene.add(dustParticles);

        // === Camada de névoa volumétrica ===
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
            color: 0xe7a45f,
            size: 1.2,
            transparent: true,
            opacity: 0.01,
        });
        const fogLayer = new THREE.Points(fogGeo, fogMat);
        scene.add(fogLayer);

        // === Animação ===
        const clock = new THREE.Clock();
        let animationId;

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
                dustPos[i * 3 + 1] += 0.02; 
                dustPos[i * 3] += 0.8;      
                if (dustPos[i * 3 + 1] > 50) {
                    dustPos[i * 3 + 1] = 4;
                    dustPos[i * 3] = (Math.random() - 0.5) * 100;
                    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 80;
                }
                if (dustPos[i * 3] > 200) dustPos[i * 3] = -200;
            }
            dustGeometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        }

        animate();

        // === Limpeza para evitar bugs de memória ===
        return () => {
            cancelAnimationFrame(animationId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            skyGeo.dispose();
            skyMat.dispose();
            dustGeometry.dispose();
            dustMaterial.dispose();
            fogGeo.dispose();
            fogMat.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [containerRef]);
}