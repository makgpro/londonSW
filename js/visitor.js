
        // PRELOADER
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('loaded');
            }, 1500);
        });

        // NAVBAR SCROLL EFFECT
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

        // HAMBURGER MENU
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

        // FADE UP ANIMATION ON SCROLL
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

        // BACK TO TOP BUTTON
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

        // SMOOTH SCROLL FOR ANCHOR LINKS
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

        // PARALLAX EFFECT ON FLOATING ORBS
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const orbs = document.querySelectorAll('.floating-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.05;
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    
        // Mobile tap pour category cards
        const categoryCards = document.querySelectorAll('.category-card');

        categoryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Vérifier si c'est un écran tactile (pas de hover)
                if (window.matchMedia('(hover: none)').matches) {
                    e.preventDefault();

                    // Si la carte est déjà active, la désactiver
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                    } else {
                        // Désactiver toutes les autres cartes
                        categoryCards.forEach(c => c.classList.remove('active'));
                        // Activer celle-ci
                        this.classList.add('active');
                    }
                }
            });
        });

        // Fermer si on clique ailleurs
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.category-card')) {
                categoryCards.forEach(c => c.classList.remove('active'));
            }
        });
