document.addEventListener('DOMContentLoaded', function() {
    // Initialize Preloader
    initPreloader();
    
    // Initialize Sticky Header
    initStickyHeader();
    
    // Initialize Smooth Scroll
    initSmoothScroll();
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
    
    // Initialize Particles.js
    initParticles();
    
    // Initialize Stats Counters
    initStatsCounters();
    
    // Initialize Radar Charts
    initRadarCharts();
    
    // Initialize random glitch effect
    initGlitchEffect();
    
    // Initialize hover audio effect
    initHoverAudio();
});

// Preloader initialization
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            
            // Trigger entry animations after preloader
            document.querySelectorAll('.animate__animated').forEach(el => {
                const animateClass = Array.from(el.classList).find(cls => cls.startsWith('animate__') && cls !== 'animate__animated');
                if (animateClass) {
                    el.classList.add('animate__' + animateClass);
                }
            });
            
            // Start counting stats after preloader
            animateStats();
        }, 500);
    }, 3000);
}

// Sticky Header
function initStickyHeader() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add active class to nav items on scroll
    window.addEventListener('scroll', function() {
        // Sticky navbar
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Highlight active nav item
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Show/Hide Scroll-to-top button
        const scrollBtn = document.querySelector('.scroll-top');
        if (window.scrollY > 300) {
            scrollBtn.classList.add('active');
        } else {
            scrollBtn.classList.remove('active');
        }
    });
    
    // Add attributes for cyber-heading effects
    document.querySelectorAll('.cyber-heading').forEach(heading => {
        heading.setAttribute('data-text', heading.textContent);
    });
    
    // Initialize glitch effect on the title
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.setAttribute('data-text', glitchText.textContent);
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ScrollToTop button
    document.querySelector('.scroll-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll down button in hero section
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Init Particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#6a1b9a"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6a1b9a",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.8
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Animate stats counters
function initStatsCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.closest('#about')) {
                    animateStats();
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.stats-container').forEach(element => {
        observer.observe(element);
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-count'));
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const increment = Math.ceil(finalValue / (duration / 30)); // Update every 30ms
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= finalValue) {
                stat.textContent = finalValue;
                clearInterval(counter);
            } else {
                stat.textContent = currentValue;
            }
        }, 30);
    });
}

// Initialize Radar Charts
function initRadarCharts() {
    if (typeof Chart !== 'undefined') {
        // CS2 Radar Chart
        const csRadar = document.getElementById('csRadar');
        if (csRadar) {
            new Chart(csRadar, {
                type: 'radar',
                data: {
                    labels: ['Aim', 'Strategy', 'Teamwork', 'Economy', 'Map Knowledge'],
                    datasets: [{
                        label: 'Team Performance',
                        data: [85, 90, 75, 80, 92],
                        backgroundColor: 'rgba(106, 27, 154, 0.2)',
                        borderColor: '#6a1b9a',
                        pointBackgroundColor: '#ff6d00',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#ff6d00'
                    }]
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            pointLabels: {
                                color: '#adb5bd'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.5)',
                                backdropColor: 'transparent'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // LoL Radar Chart
        const lolRadar = document.getElementById('lolRadar');
        if (lolRadar) {
            new Chart(lolRadar, {
                type: 'radar',
                data: {
                    labels: ['Macro', 'Farming', 'Teamfights', 'Objectives', 'Champion Pool'],
                    datasets: [{
                        label: 'Team Performance',
                        data: [78, 92, 85, 88, 80],
                        backgroundColor: 'rgba(106, 27, 154, 0.2)',
                        borderColor: '#6a1b9a',
                        pointBackgroundColor: '#ff6d00',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#ff6d00'
                    }]
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            pointLabels: {
                                color: '#adb5bd'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.5)',
                                backdropColor: 'transparent'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // Apex Radar Chart
        const apexRadar = document.getElementById('apexRadar');
        if (apexRadar) {
            new Chart(apexRadar, {
                type: 'radar',
                data: {
                    labels: ['Accuracy', 'Positioning', 'Rotation', 'Legend Skills', 'Combat'],
                    datasets: [{
                        label: 'Team Performance',
                        data: [90, 82, 78, 85, 95],
                        backgroundColor: 'rgba(106, 27, 154, 0.2)',
                        borderColor: '#6a1b9a',
                        pointBackgroundColor: '#ff6d00',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#ff6d00'
                    }]
                },
                options: {
                    scales: {
                        r: {
                            angleLines: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            pointLabels: {
                                color: '#adb5bd'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.5)',
                                backdropColor: 'transparent'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    }
}

// Random glitch effect
function initGlitchEffect() {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    const body = document.body;
    
    // Random glitch effect throughout the site
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance to trigger
            body.classList.add('glitch-active');
            
            setTimeout(() => {
                body.classList.remove('glitch-active');
            }, 500);
        }
    }, 5000);
    
    // Add glitch effect on hover for certain elements
    const glitchTriggers = document.querySelectorAll('.cyber-heading, .discipline-card, .team-member, .product-card');
    
    glitchTriggers.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (Math.random() < 0.3) { // 30% chance to trigger on hover
                body.classList.add('glitch-active');
                
                setTimeout(() => {
                    body.classList.remove('glitch-active');
                }, 300);
            }
        });
    });
}

// Hover audio effect for cyber elements
function initHoverAudio() {
    // Create audio element
    const hoverSound = new Audio();
    hoverSound.src = 'data:audio/mp3;base64,SUQzAwAAAAAfdlRJVDIAAAAbAAAASG92ZXIgU291bmQgLSBDeWJlcnB1bmsgVUkAVEFMQgAAABsAAABIb3ZlciBTb3VuZCAtIEN5YmVycHVuayBVSQBUQ09NAAAAIQAAAQB5AGIAZQByAHAAdQBuAGsAIABVAEkAIABzAG8AdQBuAGQAcwAATEVOQwAAABAAAAAwMDowMDowMS4xNTkwMDAAAEFQSUMAAAATAAAAaHR0cHM6Ly9leGFtcGxlLmNvbQAA';
    hoverSound.volume = 0.3;
    
    // Elements that will trigger the sound
    const soundTriggers = document.querySelectorAll('.cyber-button, .cyber-heading, .nav-link, .social-link');
    
    soundTriggers.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (hoverSound.paused) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(e => {
                    // Ignore autoplay restrictions
                });
            }
        });
    });
}

// Initialize custom cursor (optional)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add hover class to cursor when hovering over links
    const links = document.querySelectorAll('a, button, .discipline-card, .team-member, .product-card');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Show default cursor on inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'auto';
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });
        
        input.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'none';
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    });
}

// Handle hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// Parallax effect for background elements
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Parallax for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.backgroundPosition = `center ${scrollY * 0.4}px`;
    }
    
    // Parallax for grid backgrounds
    const cyberGrid = document.querySelector('.cyber-grid');
    if (cyberGrid) {
        cyberGrid.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
    
    const hexBg = document.querySelector('.hex-bg');
    if (hexBg) {
        hexBg.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    
    const techLines = document.querySelector('.tech-lines');
    if (techLines) {
        techLines.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
    
    const dataGrid = document.querySelector('.data-grid');
    if (dataGrid) {
        dataGrid.style.transform = `translateY(${scrollY * 0.1}px)`;
    }
    
    const cyberLineGrid = document.querySelector('.cyber-line-grid');
    if (cyberLineGrid) {
        cyberLineGrid.style.transform = `translateY(${scrollY * 0.12}px)`;
    }
});

// Timeline progress effect
function initTimelineProgress() {
    const achievementsSection = document.querySelector('.achievements-section');
    const timelineProgress = document.querySelector('.timeline-progress');
    
    if (achievementsSection && timelineProgress) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    achievementsSection.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(achievementsSection);
    }
}

// Call this in your document.addEventListener('DOMContentLoaded', ...) function
document.addEventListener('DOMContentLoaded', function() {
    // ... other initializations
    
    // Initialize timeline progress
    initTimelineProgress();
});