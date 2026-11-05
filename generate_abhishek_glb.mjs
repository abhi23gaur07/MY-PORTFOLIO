import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

// Polyfill FileReader for Node.js GLTFExporter binary export
class NodeFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
}
globalThis.FileReader = NodeFileReader;

console.log('Generating Abhishek Gaur 3D Model (.glb)...');

const scene = new THREE.Scene();
scene.name = "Abhishek_Gaur_Cinematic_Scene";

// Palette matching user turnaround sheet
const COLOR_SHIRT = 0x1F2A44;
const COLOR_TROUSER = 0xA0A4AA;
const COLOR_SHOES_BELT = 0x141416;
const COLOR_BUCKLE = 0xC0C0C0;
const COLOR_SKIN = 0xD4A37F;
const COLOR_HAIR = 0x18181B;
const COLOR_GOLD = 0xD4AF37;
const COLOR_KALAVA = 0xFF4500;
const COLOR_GLASSES = 0x242B35;
const COLOR_CYAN_NEON = 0x38BDF8;
const COLOR_PEDESTAL_METAL = 0x1A202C;

// Materials
const skinMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_SKIN,
  roughness: 0.65,
  metalness: 0.05,
  name: "Skin_Material"
});

const hairMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_HAIR,
  roughness: 0.85,
  metalness: 0.1,
  name: "Hair_Material"
});

const shirtMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_SHIRT,
  roughness: 0.7,
  metalness: 0.1,
  name: "Navy_Shirt_Material"
});

const trouserMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_TROUSER,
  roughness: 0.75,
  metalness: 0.05,
  name: "Grey_Trouser_Material"
});

const shoeMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_SHOES_BELT,
  roughness: 0.35,
  metalness: 0.3,
  name: "Shoe_Leather_Material"
});

const beltMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_SHOES_BELT,
  roughness: 0.4,
  metalness: 0.2,
  name: "Belt_Material"
});

const buckleMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_BUCKLE,
  roughness: 0.2,
  metalness: 0.9,
  name: "Buckle_Material"
});

const goldMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_GOLD,
  roughness: 0.25,
  metalness: 0.85,
  name: "Gold_Watch_Material"
});

const kalavaMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_KALAVA,
  roughness: 0.9,
  metalness: 0.0,
  name: "Kalava_Thread_Material"
});

const glassesMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_GLASSES,
  roughness: 0.3,
  metalness: 0.8,
  name: "Glasses_Frames_Material"
});

const lensMaterial = new THREE.MeshPhysicalMaterial ? new THREE.MeshPhysicalMaterial({
  color: 0xE0F2FE,
  transparent: true,
  opacity: 0.35,
  roughness: 0.1,
  transmission: 0.9,
  name: "Glasses_Lens_Material"
}) : new THREE.MeshStandardMaterial({
  color: 0xE0F2FE,
  transparent: true,
  opacity: 0.4,
  roughness: 0.1,
  name: "Glasses_Lens_Material"
});

const neonCyanMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_CYAN_NEON,
  emissive: COLOR_CYAN_NEON,
  emissiveIntensity: 2.2,
  roughness: 0.2,
  name: "Neon_Cyan_Material"
});

const pedestalMaterial = new THREE.MeshStandardMaterial({
  color: COLOR_PEDESTAL_METAL,
  roughness: 0.35,
  metalness: 0.8,
  name: "Pedestal_Titanium_Material"
});

// Character Root Group
const characterGroup = new THREE.Group();
characterGroup.name = "Abhishek_Gaur_Character";
scene.add(characterGroup);

// --- 1. HEAD & FACIAL FEATURES ---
const headGroup = new THREE.Group();
headGroup.position.set(0, 1.62, 0);

// Cranium & Face
const headGeo = new THREE.SphereGeometry(0.12, 32, 24);
headGeo.scale(0.9, 1.15, 0.95);
const headMesh = new THREE.Mesh(headGeo, skinMaterial);
headGroup.add(headMesh);

// Jaw & Chin
const chinGeo = new THREE.CylinderGeometry(0.065, 0.045, 0.09, 16);
chinGeo.scale(1, 1, 0.85);
const chinMesh = new THREE.Mesh(chinGeo, skinMaterial);
chinMesh.position.set(0, -0.075, 0.035);
headGroup.add(chinMesh);

// Nose
const noseGeo = new THREE.ConeGeometry(0.018, 0.045, 8);
noseGeo.rotateX(Math.PI / 2.2);
const noseMesh = new THREE.Mesh(noseGeo, skinMaterial);
noseMesh.position.set(0, -0.015, 0.12);
headGroup.add(noseMesh);

// Ears
const earGeo = new THREE.SphereGeometry(0.025, 12, 12);
earGeo.scale(0.4, 1.2, 0.7);
const leftEar = new THREE.Mesh(earGeo, skinMaterial);
leftEar.position.set(0.11, -0.01, -0.01);
headGroup.add(leftEar);
const rightEar = leftEar.clone();
rightEar.position.set(-0.11, -0.01, -0.01);
headGroup.add(rightEar);

// Hair - Volume on top with side taper (matching hairstyle in turnaround)
const hairTopGeo = new THREE.SphereGeometry(0.126, 24, 18);
hairTopGeo.scale(0.95, 0.95, 1.05);
const hairTop = new THREE.Mesh(hairTopGeo, hairMaterial);
hairTop.position.set(0, 0.05, -0.015);
headGroup.add(hairTop);

// Hair Quiff / Crest
const quiffGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.08, 16);
quiffGeo.scale(1.1, 0.8, 1.2);
const quiff = new THREE.Mesh(quiffGeo, hairMaterial);
quiff.position.set(0, 0.125, 0.02);
quiff.rotation.x = 0.2;
headGroup.add(quiff);

// Beard & Goatee (Trimmed neat dark beard)
const beardGeo = new THREE.SphereGeometry(0.08, 16, 12);
beardGeo.scale(0.85, 0.7, 0.7);
const beard = new THREE.Mesh(beardGeo, hairMaterial);
beard.position.set(0, -0.08, 0.05);
headGroup.add(beard);

// Mustache
const mustacheGeo = new THREE.BoxGeometry(0.05, 0.012, 0.02);
const mustache = new THREE.Mesh(mustacheGeo, hairMaterial);
mustache.position.set(0, -0.045, 0.115);
headGroup.add(mustache);

// Eyebrows
const browGeo = new THREE.BoxGeometry(0.038, 0.008, 0.015);
const leftBrow = new THREE.Mesh(browGeo, hairMaterial);
leftBrow.position.set(0.042, 0.028, 0.112);
leftBrow.rotation.z = -0.08;
headGroup.add(leftBrow);
const rightBrow = new THREE.Mesh(browGeo, hairMaterial);
rightBrow.position.set(-0.042, 0.028, 0.112);
rightBrow.rotation.z = 0.08;
headGroup.add(rightBrow);

// Glasses: Rectangular wireframes matching photos
const glassesGroup = new THREE.Group();
glassesGroup.position.set(0, 0.015, 0.115);

// Left Lens Frame
const frameGeo = new THREE.TorusGeometry(0.024, 0.0035, 8, 20);
frameGeo.scale(1.25, 0.9, 1);
const leftFrame = new THREE.Mesh(frameGeo, glassesMaterial);
leftFrame.position.set(0.044, 0, 0);
glassesGroup.add(leftFrame);

// Right Lens Frame
const rightFrame = new THREE.Mesh(frameGeo, glassesMaterial);
rightFrame.position.set(-0.044, 0, 0);
glassesGroup.add(rightFrame);

// Bridge
const bridgeGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.025, 8);
bridgeGeo.rotateZ(Math.PI / 2);
const bridge = new THREE.Mesh(bridgeGeo, glassesMaterial);
bridge.position.set(0, 0.005, 0.002);
glassesGroup.add(bridge);

// Glass Lenses
const lensGeo = new THREE.CylinderGeometry(0.023, 0.023, 0.002, 16);
lensGeo.rotateX(Math.PI / 2);
lensGeo.scale(1.2, 0.88, 1);
const leftLens = new THREE.Mesh(lensGeo, lensMaterial);
leftLens.position.set(0.044, 0, 0.001);
glassesGroup.add(leftLens);
const rightLens = leftLens.clone();
rightLens.position.set(-0.044, 0, 0.001);
glassesGroup.add(rightLens);

// Temple Stems (arms of glasses extending back to ears)
const stemGeo = new THREE.CylinderGeometry(0.0025, 0.0025, 0.12, 8);
stemGeo.rotateX(Math.PI / 2);
const leftStem = new THREE.Mesh(stemGeo, glassesMaterial);
leftStem.position.set(0.078, 0, -0.06);
glassesGroup.add(leftStem);
const rightStem = new THREE.Mesh(stemGeo, glassesMaterial);
rightStem.position.set(-0.078, 0, -0.06);
glassesGroup.add(rightStem);

headGroup.add(glassesGroup);
characterGroup.add(headGroup);

// --- 2. NECK ---
const neckGeo = new THREE.CylinderGeometry(0.052, 0.062, 0.12, 16);
const neck = new THREE.Mesh(neckGeo, skinMaterial);
neck.position.set(0, 1.50, -0.005);
characterGroup.add(neck);

// --- 3. TORSO (Navy Dress Shirt) ---
const torsoGroup = new THREE.Group();
torsoGroup.position.set(0, 1.22, 0);

// Main Chest & Abdomen
const chestGeo = new THREE.CylinderGeometry(0.18, 0.145, 0.44, 20);
chestGeo.scale(1.18, 1, 0.72);
const chest = new THREE.Mesh(chestGeo, shirtMaterial);
torsoGroup.add(chest);

// Shirt Collar
const collarGeo = new THREE.TorusGeometry(0.068, 0.018, 12, 24);
collarGeo.scale(1, 1.25, 0.9);
collarGeo.rotateX(Math.PI / 2.2);
const collar = new THREE.Mesh(collarGeo, shirtMaterial);
collar.position.set(0, 0.22, 0.015);
torsoGroup.add(collar);

// Shirt Placket (front vertical button strip)
const placketGeo = new THREE.BoxGeometry(0.022, 0.43, 0.01);
const placket = new THREE.Mesh(placketGeo, shirtMaterial);
placket.position.set(0, 0, 0.108);
torsoGroup.add(placket);

// Shirt Buttons (small white/silver dots)
const buttonGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.004, 8);
buttonGeo.rotateX(Math.PI / 2);
const buttonMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.3 });
for (let i = 0; i < 4; i++) {
  const btn = new THREE.Mesh(buttonGeo, buttonMat);
  btn.position.set(0, 0.14 - i * 0.08, 0.114);
  torsoGroup.add(btn);
}

characterGroup.add(torsoGroup);

// --- 4. BELT & BUCKLE ---
const beltGeo = new THREE.CylinderGeometry(0.148, 0.148, 0.045, 24);
beltGeo.scale(1.15, 1, 0.75);
const belt = new THREE.Mesh(beltGeo, beltMaterial);
belt.position.set(0, 0.985, 0);
characterGroup.add(belt);

// Rectangular Silver Buckle
const buckleGeo = new THREE.BoxGeometry(0.045, 0.038, 0.015);
const buckle = new THREE.Mesh(buckleGeo, buckleMaterial);
buckle.position.set(0, 0.985, 0.115);
characterGroup.add(buckle);

// --- 5. ARMS & HANDS (with Watch on Left, Kalava on Right) ---
// Left Arm
const leftArmGroup = new THREE.Group();
leftArmGroup.position.set(0.22, 1.38, 0);
leftArmGroup.rotation.z = -0.09;
leftArmGroup.rotation.x = -0.05;

// Upper Arm (Navy Sleeve)
const upperArmGeo = new THREE.CylinderGeometry(0.052, 0.046, 0.28, 16);
upperArmGeo.translate(0, -0.14, 0);
const leftUpperArm = new THREE.Mesh(upperArmGeo, shirtMaterial);
leftArmGroup.add(leftUpperArm);

// Forearm (Sleeve tapering to cuff)
const forearmGeo = new THREE.CylinderGeometry(0.045, 0.038, 0.26, 16);
forearmGeo.translate(0, -0.39, 0);
const leftForearm = new THREE.Mesh(forearmGeo, shirtMaterial);
leftArmGroup.add(leftForearm);

// Left Wrist & Gold Watch
const leftWristGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.05, 16);
leftWristGeo.translate(0, -0.53, 0);
const leftWrist = new THREE.Mesh(leftWristGeo, skinMaterial);
leftArmGroup.add(leftWrist);

// Gold Watch (Bezel & Strap)
const watchGeo = new THREE.TorusGeometry(0.035, 0.009, 12, 20);
watchGeo.rotateX(Math.PI / 2);
const leftWatch = new THREE.Mesh(watchGeo, goldMaterial);
leftWatch.position.set(0, -0.525, 0);
leftArmGroup.add(leftWatch);
const watchDialGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.015, 16);
const watchDial = new THREE.Mesh(watchDialGeo, goldMaterial);
watchDial.position.set(0.02, -0.525, 0);
watchDial.rotation.z = Math.PI / 2;
leftArmGroup.add(watchDial);

// Left Hand
const handGeo = new THREE.BoxGeometry(0.045, 0.08, 0.025);
handGeo.translate(0, -0.58, 0);
const leftHand = new THREE.Mesh(handGeo, skinMaterial);
leftArmGroup.add(leftHand);

characterGroup.add(leftArmGroup);

// Right Arm
const rightArmGroup = new THREE.Group();
rightArmGroup.position.set(-0.22, 1.38, 0);
rightArmGroup.rotation.z = 0.09;
rightArmGroup.rotation.x = -0.05;

const rightUpperArm = new THREE.Mesh(upperArmGeo, shirtMaterial);
rightArmGroup.add(rightUpperArm);

const rightForearm = new THREE.Mesh(forearmGeo, shirtMaterial);
rightArmGroup.add(rightForearm);

const rightWrist = new THREE.Mesh(leftWristGeo, skinMaterial);
rightArmGroup.add(rightWrist);

// Sacred Red/Orange Kalava Thread on Right Wrist
const kalavaGeo = new THREE.TorusGeometry(0.034, 0.006, 10, 20);
kalavaGeo.rotateX(Math.PI / 2);
const rightKalava = new THREE.Mesh(kalavaGeo, kalavaMaterial);
rightKalava.position.set(0, -0.525, 0);
rightArmGroup.add(rightKalava);

const rightHand = new THREE.Mesh(handGeo, skinMaterial);
rightArmGroup.add(rightHand);

characterGroup.add(rightArmGroup);

// --- 6. LEGS & TROUSERS (Light Grey Formal Trousers) ---
// Left Leg
const leftLegGroup = new THREE.Group();
leftLegGroup.position.set(0.088, 0.96, 0);

// Thigh
const thighGeo = new THREE.CylinderGeometry(0.076, 0.062, 0.44, 18);
thighGeo.translate(0, -0.22, 0);
const leftThigh = new THREE.Mesh(thighGeo, trouserMaterial);
leftLegGroup.add(leftThigh);

// Shin / Lower Leg
const shinGeo = new THREE.CylinderGeometry(0.061, 0.054, 0.45, 18);
shinGeo.translate(0, -0.65, 0);
const leftShin = new THREE.Mesh(shinGeo, trouserMaterial);
leftLegGroup.add(leftShin);

// Left Shoe (Black Polished Formal Oxford)
const shoeGroup = new THREE.Group();
shoeGroup.position.set(0, -0.89, 0.02);
const shoeSoleGeo = new THREE.BoxGeometry(0.075, 0.03, 0.17);
shoeSoleGeo.translate(0, -0.015, 0.02);
const leftSole = new THREE.Mesh(shoeSoleGeo, shoeMaterial);
shoeGroup.add(leftSole);

const shoeUpperGeo = new THREE.SphereGeometry(0.048, 16, 12);
shoeUpperGeo.scale(0.85, 0.7, 1.4);
shoeUpperGeo.translate(0, 0.01, 0.035);
const leftUpper = new THREE.Mesh(shoeUpperGeo, shoeMaterial);
shoeGroup.add(leftUpper);

leftLegGroup.add(shoeGroup);
characterGroup.add(leftLegGroup);

// Right Leg
const rightLegGroup = new THREE.Group();
rightLegGroup.position.set(-0.088, 0.96, 0);

const rightThigh = new THREE.Mesh(thighGeo, trouserMaterial);
rightLegGroup.add(rightThigh);

const rightShin = new THREE.Mesh(shinGeo, trouserMaterial);
rightLegGroup.add(rightShin);

const rightShoeGroup = shoeGroup.clone();
rightLegGroup.add(rightShoeGroup);

characterGroup.add(rightLegGroup);

// --- 7. CYBER PEDESTAL STAGE (Matching mockup & standing photo) ---
const pedestalGroup = new THREE.Group();
pedestalGroup.name = "Cyber_Pedestal_Podium";
pedestalGroup.position.set(0, 0, 0);

// Stepped Metallic Tier 1 (Top Platform)
const tier1Geo = new THREE.CylinderGeometry(0.48, 0.52, 0.05, 48);
const tier1 = new THREE.Mesh(tier1Geo, pedestalMaterial);
tier1.position.set(0, -0.025, 0);
pedestalGroup.add(tier1);

// Neon Cyan Perimeter Light Ring (Glowing under tier 1)
const neonRingGeo = new THREE.TorusGeometry(0.505, 0.012, 16, 64);
neonRingGeo.rotateX(Math.PI / 2);
const neonRing = new THREE.Mesh(neonRingGeo, neonCyanMaterial);
neonRing.position.set(0, -0.025, 0);
pedestalGroup.add(neonRing);

// Stepped Metallic Tier 2 (Middle Ring)
const tier2Geo = new THREE.CylinderGeometry(0.54, 0.58, 0.06, 48);
const tier2 = new THREE.Mesh(tier2Geo, pedestalMaterial);
tier2.position.set(0, -0.075, 0);
pedestalGroup.add(tier2);

// Stepped Metallic Tier 3 (Base Ring)
const tier3Geo = new THREE.CylinderGeometry(0.60, 0.64, 0.05, 48);
const tier3 = new THREE.Mesh(tier3Geo, pedestalMaterial);
tier3.position.set(0, -0.125, 0);
pedestalGroup.add(tier3);

// Outer Accent Neon Ring
const outerNeonGeo = new THREE.TorusGeometry(0.63, 0.008, 16, 64);
outerNeonGeo.rotateX(Math.PI / 2);
const outerNeon = new THREE.Mesh(outerNeonGeo, neonCyanMaterial);
outerNeon.position.set(0, -0.125, 0);
pedestalGroup.add(outerNeon);

// 3D Orbital Rings tilted around character
const orbit1Geo = new THREE.TorusGeometry(0.95, 0.006, 12, 72);
orbit1Geo.rotateX(Math.PI / 2.3);
orbit1Geo.rotateY(0.2);
const orbit1 = new THREE.Mesh(orbit1Geo, neonCyanMaterial);
orbit1.position.set(0, 0.9, 0);
pedestalGroup.add(orbit1);

const orbit2Geo = new THREE.TorusGeometry(1.15, 0.005, 12, 72);
orbit2Geo.rotateX(Math.PI / 2.5);
orbit2Geo.rotateY(-0.35);
const orbit2 = new THREE.Mesh(orbit2Geo, neonCyanMaterial);
orbit2.position.set(0, 1.1, 0);
pedestalGroup.add(orbit2);

scene.add(pedestalGroup);

// --- EXPORT TO BINARY .GLB ---
const exporter = new GLTFExporter();
const outputPath = path.resolve('public/models/abhishek_gaur.glb');

exporter.parse(
  scene,
  (gltf) => {
    fs.writeFileSync(outputPath, Buffer.from(gltf));
    const stats = fs.statSync(outputPath);
    console.log(`✅ SUCCESS! Exported Abhishek Gaur 3D Model:`);
    console.log(`   Path: ${outputPath}`);
    console.log(`   File Size: ${(stats.size / 1024).toFixed(2)} KB`);
  },
  (error) => {
    console.error('❌ Failed to export GLTF:', error);
  },
  { binary: true }
);

