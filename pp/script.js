// 3D cursor effect
document.addEventListener('mousemove', (e) => {
    const cursorFollower = document.querySelector('.cursor-follower');
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  });
  
  // 3D card hover effect
  document.querySelectorAll('.project-card, .skill-card, .nav-btn').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
  
  // Smooth scrolling for navigation
  document.querySelectorAll('.nav-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const section = document.getElementById(sections[index] || sections[0]);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 3D parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.section-title, .hero-content').forEach(el => {
      el.style.transform = `translateZ(${scrollY * 0.1}px)`;
    });
  });
  
  // For a more advanced 3D website, you could add Three.js integration here
  // This would require including the Three.js library in your HTML
  /*
  // Example of how you might set up a basic Three.js scene
  if (typeof THREE !== 'undefined') {
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    // Configure renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('background-canvas').appendChild(renderer.domElement);
    
    // Add objects to scene
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x6C63FF });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    // Add lights
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Position camera
    camera.position.z = 30;
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  */