
        // ===== PRELOADER =====
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('loaded');
            }, 1500);
        });

        // ===== NAVBAR SCROLL EFFECT =====
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const sideMenu = document.querySelector('.side-menu');
const menuOverlay = document.querySelector('.menu-overlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
});

menuOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sideMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

document.querySelectorAll('.side-menu-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});




        // ===== FADE UP ANIMATION ON SCROLL =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-scale').forEach(el => {
            fadeObserver.observe(el);
        });

        // ===== BACK TO TOP BUTTON =====
        const backToTopBtn = document.querySelector('.back-to-top');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ===== PARALLAX EFFECT ON FLOATING ORBS =====
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const orbs = document.querySelectorAll('.floating-orb');

            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.05;
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

// MAGNETIC BUTTONS
const magneticBtns = document.querySelectorAll('.cta-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});
    

    <!-- ===== CMS CONTENT INJECTION ===== -->

     
  fetch('/content/homepage.json')
    .then(response => response.json())
    .then(data => {
      // Pour chaque clé dans le JSON, on cherche l'élément avec data-cms correspondant
      Object.keys(data).forEach(key => {
        const element = document.querySelector(`[data-cms="${key}"]`);
        if (element) {
          element.textContent = data[key];
          }
        });
      })
       .catch(err => console.log('Contenu par défaut'));


       // Mobile tap pour category cards
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (window.matchMedia('(hover: none)').matches) {
            e.preventDefault();

            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                categoryCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.category-card')) {
        categoryCards.forEach(c => c.classList.remove('active'));
    }
});

