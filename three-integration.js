// This file would be included only if you decide to implement full 3D capabilities with Three.js
// You would need to add the Three.js library to your project first
// Add a <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script> before this file

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create a container for Three.js canvas
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-1';
    container.id = 'three-background';
    document.body.appendChild(container);
  
    // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a group to hold all the particles
    const particlesGroup = new THREE.Group();
    scene.add(particlesGroup);
    
    // Create particles
    const particleCount = 300;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Create particle geometry and material
      const geometry = new THREE.SphereGeometry(0.1, 8, 8);
      const material = new THREE.MeshPhongMaterial({
        color: 0x6C63FF,
        transparent: true,
        opacity: 0.7
      });
      
      // Create mesh and add to group
      const particle = new THREE.Mesh(geometry, material);
      
      // Position randomly
      particle.position.x = (Math.random() - 0.5) * 30;
      particle.position.y = (Math.random() - 0.5) * 30;
      particle.position.z = (Math.random() - 0.5) * 30;
      
      // Store animation properties
      particle.userData.speed = Math.random() * 0.01 + 0.005;
      particle.userData.rotationSpeed = Math.random() * 0.01;
      
      particlesGroup.add(particle);
      particles.push(particle);
    }
    
    // Set camera position
    camera.position.z = 15;
    
    // Add mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Update particle positions and rotations
      particles.forEach(particle => {
        particle.rotation.x += particle.userData.rotationSpeed;
        particle.rotation.y += particle.userData.rotationSpeed;
        particle.position.y += Math.sin(Date.now() * particle.userData.speed) * 0.01;
      });
      
      // Smooth camera movement following mouse
      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;
      
      particlesGroup.rotation.y += (targetX - particlesGroup.rotation.y) * 0.05;
      particlesGroup.rotation.x += (targetY - particlesGroup.rotation.x) * 0.05;
      
      // Render the scene
      renderer.render(scene, camera);
    }
    
    // Start the animation loop
    animate();
    
    // Connect scrolling to camera movement
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      particlesGroup.position.y = scrollPos * -0.005;
    });