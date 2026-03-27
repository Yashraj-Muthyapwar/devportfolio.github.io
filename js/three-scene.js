/* ═══════════════════════════════════════════════════════════════
   Three.js 3D Scene for Hero Section
   WebGL-powered 3D visualization with GPU detection
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Check for WebGL support
  function hasWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  // Check if device is mobile
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768;
  }

  // Initialize 3D scene only if supported and not mobile
  if (hasWebGLSupport() && !isMobile()) {
    loadThreeJS();
  } else {
    console.log('3D scene disabled: WebGL not supported or mobile device');
  }

  function loadThreeJS() {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    script.onload = initScene;
    script.onerror = () => console.error('Failed to load Three.js');
    document.head.appendChild(script);
  }

  function initScene() {
    const container = document.querySelector('.hero-visual');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create canvas wrapper
    const canvasWrapper = document.createElement('div');
    canvasWrapper.className = 'threejs-canvas';
    canvasWrapper.style.position = 'absolute';
    canvasWrapper.style.top = '0';
    canvasWrapper.style.left = '0';
    canvasWrapper.style.width = '100%';
    canvasWrapper.style.height = '100%';
    canvasWrapper.style.zIndex = '0';
    canvasWrapper.appendChild(renderer.domElement);

    // Add canvas before code window
    container.style.position = 'relative';
    container.insertBefore(canvasWrapper, container.firstChild);

    // Create floating geometric shapes
    const shapes = [];
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.TetrahedronGeometry(0.8),
      new THREE.OctahedronGeometry(0.8),
      new THREE.IcosahedronGeometry(0.8, 0)
    ];

    // Get theme color
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const primaryColor = isDark ? 0x818cf8 : 0x6366f1;
    const secondaryColor = isDark ? 0xa78bfa : 0x8b5cf6;

    // Create multiple shapes
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? primaryColor : secondaryColor,
        transparent: true,
        opacity: 0.6,
        wireframe: i % 3 === 0
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Random position
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;

      // Random rotation speed
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.5 + 0.5,
        floatOffset: Math.random() * Math.PI * 2
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primaryColor, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(secondaryColor, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    camera.position.z = 12;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate and float shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        // Floating motion
        shape.position.y += Math.sin(time * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.02;
      });

      // Camera follows mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    function onResize() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', onResize);

    // Handle theme changes
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          const newPrimary = isDark ? 0x818cf8 : 0x6366f1;
          const newSecondary = isDark ? 0xa78bfa : 0x8b5cf6;

          shapes.forEach((shape, i) => {
            shape.material.color.setHex(i % 2 === 0 ? newPrimary : newSecondary);
          });

          pointLight1.color.setHex(newPrimary);
          pointLight2.color.setHex(newSecondary);
        }
      });
    });

    themeObserver.observe(document.documentElement, { attributes: true });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      shapes.forEach(shape => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
      renderer.dispose();
      themeObserver.disconnect();
    });

    console.log('Three.js 3D scene initialized successfully');
  }

})();
