// Sahne, Kamera, Renderer kurulumu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Basit bir ışık kaynağı
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Kamera pozisyonu
camera.position.z = 5;

// KAAN TFX için basit bir low-poly gövde oluşturalım
const geometry = new THREE.ConeGeometry(0.5, 2, 4); // Basit bir form
const material = new THREE.MeshPhongMaterial({ color: 0x64748b, flatShading: true });
const kaan = new THREE.Mesh(geometry, material);

// Modelin duruşunu ayarlayalım
kaan.rotation.x = Math.PI / 2;
scene.add(kaan);

// Şimdi biraz hareket katalım (Oyunun atmosferi için)
function updateGame() {
    kaan.rotation.z += 0.01; // Uçağın kendi etrafında hafif dönmesi
}

// Oyun döngüsü
function animate() {
    requestAnimationFrame(animate);
    
    updateGame(); // Yeni eklediğimiz hareket fonksiyonunu çağır
    
    renderer.render(scene, camera);
}

animate();

// Ekran boyutu değişince oyunu yeniden boyutlandır
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
