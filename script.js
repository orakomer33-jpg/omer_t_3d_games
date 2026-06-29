// Sahne Kurulumu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x060810); // Senin 2D'deki arka plan rengin
document.body.appendChild(renderer.domElement);

// Işıklandırma (TUSAŞ markasına uygun keskin ışıklar)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 2);
scene.add(directionalLight);

// Kaan TFX Formu (Low-Poly)
const geometry = new THREE.ConeGeometry(0.5, 2, 4);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x64748b, // Kaan TFX'in gri tonu
    flatShading: true 
});
const kaan = new THREE.Mesh(geometry, material);
kaan.rotation.x = Math.PI / 2;
scene.add(kaan);

camera.position.z = 5;

// Animasyon Döngüsü
function animate() {
    requestAnimationFrame(animate);
    kaan.rotation.y += 0.02; // Kendi etrafında dönsün
    renderer.render(scene, camera);
}
animate();
