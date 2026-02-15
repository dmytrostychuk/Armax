// Interactive particles effect for furniture-elements page
(function() {
  'use strict';

  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  let animationId;

  // Particle class
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Keep particles within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
    }
  }

  // Initialize canvas
  function initCanvas() {
    // Перевіряємо, чи canvas має position: fixed (для diagonal-bg)
    const isFixed = window.getComputedStyle(canvas).position === 'fixed';
    
    if (isFixed) {
      // Для fixed canvas використовуємо розміри вікна
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    } else {
      // Для звичайного canvas використовуємо розміри контейнера
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }

    // Create particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
      );
    }
  }

  // Draw lines between nearby particles
  function drawLines() {
    const maxDistance = 150;
    const maxMouseDistance = 300; // Збільшена відстань для з'єднання з курсором
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect ALL particles to mouse if close (збільшена відстань)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxMouseDistance) {
          const opacity = (1 - distance / maxMouseDistance) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw lines
    drawLines();

    animationId = requestAnimationFrame(animate);
  }

  // Знаходимо контейнер (header-product або diagonal)
  function findContainer() {
    return canvas.closest('.header-product') || 
           canvas.closest('.diagonal') || 
           canvas.parentElement;
  }

  // Mouse move handler - відстежуємо рух на всьому контейнері
  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const isFixed = window.getComputedStyle(canvas).position === 'fixed';
    const container = findContainer();
    
    const x = e.clientX;
    const y = e.clientY;
    
    if (isFixed) {
      // Для fixed canvas використовуємо координати відносно вікна
      mouse.x = x;
      mouse.y = y;
    } else {
      // Для звичайного canvas перевіряємо межі контейнера
      if (!container) {
        mouse.x = null;
        mouse.y = null;
        return;
      }
      
      const containerRect = container.getBoundingClientRect();
      
      if (x >= containerRect.left && x <= containerRect.right && 
          y >= containerRect.top && y <= containerRect.bottom) {
        // Перетворюємо координати миші відносно canvas
        mouse.x = x - rect.left;
        mouse.y = y - rect.top;
      } else {
        mouse.x = null;
        mouse.y = null;
      }
    }
  }

  // Mouse leave handler
  function handleMouseLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  // Initialize
  function init() {
    initCanvas();
    animate();

    // Знаходимо контейнер для відстеження руху миші
    const container = findContainer();
    
    // Використовуємо document для відстеження руху миші, щоб працювало навіть над текстом
    document.addEventListener('mousemove', handleMouseMove);
    
    // Event listeners на контейнер для виходу миші
    if (container) {
      container.addEventListener('mouseleave', handleMouseLeave);
    } else {
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    
    window.addEventListener('resize', () => {
      initCanvas();
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
