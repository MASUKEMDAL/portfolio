// Cursor personalizado
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Efeitos de hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
      });
    });
  }
});

// Partículas de fundo
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posição aleatória
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Delay de animação aleatório
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    particlesContainer.appendChild(particle);
  }
}

// Navegação suave e ativa
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Navegação suave
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Link ativo baseado na seção visível
  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Executar uma vez no carregamento
}

// Menu mobile
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }
}

// Animações de entrada
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        
        // Animar barras de progresso das skills
        if (entry.target.classList.contains('skill-item')) {
          const progressBar = entry.target.querySelector('.skill-progress');
          if (progressBar) {
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            setTimeout(() => {
              progressBar.style.width = width;
            }, 200);
          }
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar elementos para animação
  const animatedElements = document.querySelectorAll('.section, .project-card, .skill-item, .about-highlight');
  animatedElements.forEach(el => observer.observe(el));
}

// Filtro de projetos
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Atualizar botão ativo
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filtrar projetos
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Formulário de contato
function initContactForm() {
  const form = document.querySelector('.form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Aqui você pode adicionar a lógica para enviar o formulário
      // Por exemplo, usando EmailJS ou outro serviço
      
      // Simulação de envio
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      submitButton.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
      submitButton.disabled = true;
      
      setTimeout(() => {
        submitButton.innerHTML = '<span>Enviado!</span><i class="fas fa-check"></i>';
        
        setTimeout(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          form.reset();
        }, 2000);
      }, 2000);
    });
  }
}

// Header com efeito de scroll
function initHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.background = 'rgba(15, 15, 35, 0.98)';
      header.style.backdropFilter = 'blur(20px)';
    } else {
      header.style.background = 'rgba(15, 15, 35, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
    }
    
    // Esconder/mostrar header baseado na direção do scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

// Typing effect para o hero
function initTypingEffect() {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    // Iniciar o efeito após um pequeno delay
    setTimeout(typeWriter, 1000);
  }
}

// Parallax suave para elementos flutuantes
function initParallax() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.2;
      element.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Contador animado para estatísticas
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '+');
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = counter.textContent.includes('%') ? target + '%' : target + '+';
      }
    };
    
    updateCounter();
  };
  
  // Observer para iniciar a animação quando visível
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });
  
  counters.forEach(counter => counterObserver.observe(counter));
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  initNavigation();
  initMobileMenu();
  initScrollAnimations();
  initProjectFilter();
  initContactForm();
  initHeaderScroll();
  initTypingEffect();
  initParallax();
  initCounters();
  
  // Preloader simples
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});

// Performance: Throttle para eventos de scroll
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Aplicar throttle aos eventos de scroll
const throttledScrollHandler = throttle(() => {
  // Handlers de scroll já estão implementados acima
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);