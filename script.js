// Floating hearts on click
  document.addEventListener("click", (e) => {
    const heart = document.createElement("div");
    const hearts = ["💖", "💗", "💘", "💝", "❤️", "🩷", "💕", "💞"];
heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.pointerEvents = "none";
    heart.style.animation = "rise 2s ease forwards";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  });

  // Inject animation style once
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes rise {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-80px) scale(1.5);
      }
    }
  `;
  document.head.appendChild(style);

import * as THREE from './three.module.min.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Light background

const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500);
document.getElementById('rose-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Rose petals setup
const petalCount = 25; // Number of petals
const petals = [];
const compliments = [
    "You are the most beautiful flower in my garden.",
    "Your smile lights up my world like a rose in bloom.",
    "You make my heart petal with joy.",
    "Your love is as delicate and precious as a rose petal.",
    "You are my forever blooming love.",
    "Every moment with you is a petal of happiness.",
    "Your kindness is as soft as rose petals.",
    "You are the rose that makes my life colorful.",
    "Your touch is like a gentle petal caress.",
    "You are my sweetest rose, full of love.",
    "Your eyes sparkle like dew on a rose.",
    "You make my days as vibrant as a red rose.",
    "Your laughter is music to my petals.",
    "You are the stem that holds my heart together.",
    "Your love grows stronger with every petal.",
    "You are my secret garden's most beautiful bloom.",
    "Your warmth is like sunlight on roses.",
    "You make me feel alive, like a fresh rose.",
    "Your grace is as elegant as a rose in full bloom.",
    "You are the thorn that protects my love.",
    "Your beauty is timeless, like an eternal rose.",
    "You fill my life with fragrant love.",
    "Your presence is a bouquet of joy.",
    "You are my rose, my love, my everything.",
    "With you, every day is Rose Day."
];

// Create petals
for (let i = 0; i < petalCount; i++) {
    // Petal geometry: A simple curved plane for each petal
    const geometry = new THREE.PlaneGeometry(0.5, 1, 10, 10);
    // Bend the geometry to make it petal-like
    const positions = geometry.attributes.position.array;
    for (let j = 0; j < positions.length; j += 3) {
        const x = positions[j];
        const y = positions[j + 1];
        const z = positions[j + 2];
        positions[j + 2] = Math.sin(x * 2) * 0.1; // Slight curve
    }
    geometry.attributes.position.needsUpdate = true;

    const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color().setHSL(i / petalCount, 0.7, 0.5), // Vary colors
        side: THREE.DoubleSide
    });

    const petal = new THREE.Mesh(geometry, material);

    // Position petals in a spiral (rose-like)
    const angle = (i / petalCount) * Math.PI * 2;
    const radius = 0.5 + (i * 0.05);
    petal.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        i * 0.02 // Slight z-offset for depth
    );
    petal.rotation.z = angle; // Rotate each petal

    petal.userData = { compliment: compliments[i] }; // Store compliment

    scene.add(petal);
    petals.push(petal);
}

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredPetal = null;

function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(petals);

    // Reset previous hover
    if (hoveredPetal) {
        hoveredPetal.material.emissive.setHex(0x000000);
        hoveredPetal = null;
    }

    if (intersects.length > 0) {
        hoveredPetal = intersects[0].object;
        hoveredPetal.material.emissive.setHex(0x444444); // Glow effect
    }
}

function onMouseClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(petals);

    if (intersects.length > 0) {
        const clickedPetal = intersects[0].object;
        document.getElementById('compliment-display').textContent = clickedPetal.userData.compliment;
    }
}

renderer.domElement.addEventListener('mousemove', onMouseMove);
renderer.domElement.addEventListener('click', onMouseClick);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();