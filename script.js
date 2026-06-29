// Sahne Kurulumu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x060810); // Arka plan rengi
document.body.appendChild(renderer.domElement);

// Işıklandırma
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 5);
scene.add(directionalLight);

// Kaan TFX Profil Tasarımı (Shape)
const shape = new THREE.Shape();
shape.moveTo(0, 1);      // Burun
shape.lineTo(0.8, -0.5); // Sağ kanat altı
shape.lineTo(0.4, -0.8); // Gövde altı
shape.lineTo(-0.4, -0.8);// Gövde altı
shape.lineTo(-0.8, -0.5);// Sol kanat altı
shape.lineTo(0, 1);      // Buruna dönüş

const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1 };
const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshPhongMaterial({ color: 0x64748b, flatShading: true });
const kaan = new THREE.Mesh(geometry, material);

scene.add(kaan);

camera.position.z = 5;

// Animasyon Döngüsü
function animate() {
    requestAnimationFrame(animate);
    
    // Uçağın hafif dönmesi
    kaan.rotation.z += 0.01; 
    
    renderer.render(scene, camera);
}

// Pencere boyutu değişimi
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();
