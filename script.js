let scene, camera, renderer, player, obstacles = [];
let score = 0, gameActive = false;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Işık
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    
    // Uçak (KAAN)
    const geo = new THREE.ConeGeometry(0.5, 2, 4);
    player = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: 0x64748b }));
    player.position.y = -3;
    scene.add(player);

    camera.position.z = 5;
    animate();
}

function startGame() {
    document.getElementById('menu').style.display = 'none';
    gameActive = true;
}

function spawnObstacle() {
    if (!gameActive) return;
    // Düşman Unsurlar (2D'deki gibi)
    const types = ['wall', 'radar', 'enemy'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let geo = type === 'wall' ? new THREE.BoxGeometry(1, 0.2, 0.2) : new THREE.SphereGeometry(0.5);
    let color = type === 'wall' ? 0xed3435 : 0x22c55e;
    
    let obs = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ color: color }));
    obs.position.set(Math.random() * 6 - 3, 5, 0);
    scene.add(obs);
    obstacles.push({ mesh: obs, type: type });
}

function animate() {
    requestAnimationFrame(animate);
    if (gameActive) {
        obstacles.forEach((o, i) => {
            o.mesh.position.y -= 0.05;
            if (o.mesh.position.y < -5) {
                scene.remove(o.mesh);
                obstacles.splice(i, 1);
                score++;
                document.getElementById('score').innerText = "Skor: " + score;
            }
        });
        if (Math.random() < 0.03) spawnObstacle();
    }
    renderer.render(scene, camera);
}

init();
