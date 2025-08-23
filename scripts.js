document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('bgCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const geometry = new THREE.PlaneGeometry(40, 40, 200, 200);
    const material = new THREE.MeshStandardMaterial({
        color: 0x111111, metalness: 0.7, roughness: 0.4, side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(10, 20, 20);
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    camera.position.z = 25;
    camera.position.y = 5;
    plane.rotation.x = -0.5;

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const pos = plane.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i), y = pos.getY(i);
            const wave = Math.sin(x * 0.3 + t) * 0.6 + Math.cos(y * 0.3 + t) * 0.6;
            pos.setZ(i, wave);
        }
        pos.needsUpdate = true;
        plane.rotation.z += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Keep canvas filling viewport
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Subtle parallax on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY * 0.002;
        plane.position.y = -scrollY;
    });
});
