// enhanced.js

// ==================== Configuration ====================
const CONFIG = {
    github: {
        username: 'Ahmed-Eldeep3',
        projects: {
            'Monitor Academy': 'Monitor_Academy',
            'European Clinic': 'European_Center',
            'To-Do-App': 'To_do',
            'Exel-clinic-system': 'Exel-clinic- system',
            'calculator': 'calculator',
        },
        images: {
            'Monitor Academy': 'https://www.itewiki.fi/write/post_images/23996.png',
            'European Clinic': 'https://tse2.mm.bing.net/th/id/OIP.E-_pjV0IVUW8HxI6uY-IwAHaHa?pid=Api&P=0&h=220',
            'To-Do-App': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'Exel-clinic-system': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'calculator': 'https://sm.ign.com/ign_pk/news/a/apples-off/apples-official-calculator-app-finally-arrives-on-ipads_m19z.jpg',
        },
        descriptions: {
            'Monitor Academy': 'An app for tracking student performance and educational progress, allowing teachers and administrators to record attendance, monitor progress, and generate accurate reports efficiently.',
            'European Clinic': 'An educational and entertaining app that provides diverse learning content in an engaging and user-friendly way, with interactive lessons and quizzes.',
            'To-Do-App': 'My first flutter project using dart featuring MVVM architecture.',
            'Exel-clinic-system': 'A comprehensive Excel file for managing center data, including client tracking, session schedules, appointments, and daily/monthly statistics.',
            'calculator': 'An advanced calculator app supporting basic and complex calculations, featuring a clean and simple interface with support for sequential operations.'
        }
    },
    certifications: [
        {
            title: "Android Native App Development",
            issuer: "Self-Study & Practical Projects",
            date: "2024 - Present",
            icon: "fab fa-android",
            description: "Skilled in developing Android apps using Kotlin with MVVM architecture for clean separation of UI and logic. Experienced in creating responsive and interactive interfaces using Jetpack Compose and XML layouts."
        },
        {
            title: "iOS Native App Development",
            issuer: "Self-Study & Practical Projects",
            date: "2025 - Present",
            icon: "fab fa-apple",
            description: "Knowledgeable in Swift and SwiftUI for building iOS applications. Capable of designing responsive user interfaces with a focus on user experience."
        },
        {
            title: "Database (Firebase)",
            issuer: "Practical Experience",
            date: "2024 - Present",
            icon: "fas fa-database",
            description: "Experienced in managing cloud databases using Firebase Realtime Database and Cloud Firestore. Skilled in structuring data for easy access and real-time updates."
        },
        {
            title: "Version Control with Git & GitHub",
            issuer: "Professional Practice",
            date: "2024 - Present",
            icon: "fab fa-github",
            description: "Proficient in Git workflows, branching strategies, collaboration, and project management using GitHub."
        },
        {
            title: "Excel System",
            issuer: "Self-Taught & Project-Based Learning",
            date: "2023 - Present",
            icon: "fas fa-file-excel",
            description: "Advanced skills in formulas, Pivot Tables, and data analysis. Ability to create dynamic spreadsheets, generate detailed reports, and manage business operations efficiently."
        }
    ]
};

// ==================== Utility Functions ====================
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static getLanguageIcon(language) {
        const icons = {
            'JavaScript': 'fab fa-js-square',
            'TypeScript': 'fab fa-js-square',
            'HTML': 'fab fa-html5',
            'CSS': 'fab fa-css3-alt',
            'Python': 'fab fa-python',
            'Java': 'fab fa-java',
            'Kotlin': 'fas fa-mobile-alt',
            'Swift': 'fab fa-swift',
            'Dart': 'fas fa-mobile-alt',
            'C++': 'fas fa-code',
        };
        return icons[language] || 'fas fa-code';
    }
}

// ==================== Particle System ====================
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        document.body.prepend(this.canvas);

        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Mouse interaction
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                particle.x -= Math.cos(angle) * 0.5;
                particle.y -= Math.sin(angle) * 0.5;
            }

            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==================== Scroll Animations ====================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        this.elements.forEach(el => observer.observe(el));
    }
}

// ==================== Typing Effect ====================
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==================== Cursor Effect ====================
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');
        this.init();
    }

    init() {
        this.cursor.className = 'custom-cursor';
        this.cursorFollower.className = 'custom-cursor-follower';
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            this.cursor.style.left = mouseX + 'px';
            this.cursor.style.top = mouseY + 'px';
        });

        const animate = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            this.cursorFollower.style.left = followerX + 'px';
            this.cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animate);
        };
        animate();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursorFollower.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursorFollower.classList.remove('cursor-hover');
            });
        });
    }
}

// ==================== Navigation Handler ====================
class NavigationHandler {
    constructor() {
        this.header = document.getElementById('header');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }, 100));

        // Mobile menu
        this.menuToggle.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            this.menuToggle.innerHTML = this.navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Active section highlighting
        this.highlightActiveSection();
    }

    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', Utils.throttle(() => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }
}

// ==================== Projects Manager ====================
class ProjectsManager {
    constructor() {
        this.container = document.getElementById('projectsContainer');
        this.init();
    }

    async init() {
        await this.fetchProjects();
    }

    async fetchProjects() {
        try {
            const response = await fetch(
                `https://api.github.com/users/${CONFIG.github.username}/repos?per_page=100`
            );
            
            if (!response.ok) throw new Error('GitHub API error');
            
            const repos = await response.json();
            this.container.innerHTML = '';
            
            const projects = Object.entries(CONFIG.github.projects).map(([key, repoName]) => {
                const repo = repos.find(r => 
                    r.name.toLowerCase() === repoName.toLowerCase() ||
                    r.name.toLowerCase().includes(repoName.toLowerCase())
                ) || {
                    name: repoName,
                    html_url: `https://github.com/${CONFIG.github.username}/${repoName}`,
                    description: CONFIG.github.descriptions[key],
                    language: 'Code'
                };
                
                return { repo, key };
            });

            projects.forEach(({ repo, key }, index) => {
                setTimeout(() => {
                    const card = this.createProjectCard(repo, key);
                    this.container.appendChild(card);
                    setTimeout(() => card.classList.add('show'), 10);
                }, index * 100);
            });
            
        } catch (error) {
            console.error('Error fetching projects:', error);
            this.showFallbackProjects();
        }
    }

    createProjectCard(repo, projectKey) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';

        const image = CONFIG.github.images[projectKey] || 'https://via.placeholder.com/400x200';
        const description = CONFIG.github.descriptions[projectKey] || repo.description || 'No description available';
        const icon = Utils.getLanguageIcon(repo.language);
        const languages = repo.language ? [repo.language] : ['Code'];

        card.innerHTML = `
            <div class="project-image">
                <img src="${image}" alt="${repo.name}" loading="lazy">
                <div class="project-overlay">
                    <i class="${icon} project-icon"></i>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${repo.name.replace(/_/g, ' ')}</h3>
                <p class="project-description">${description}</p>
                <div class="project-tech">
                    ${languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> View Code
                    </a>
                    ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `;

        return card;
    }

    showFallbackProjects() {
        this.container.innerHTML = '';
        Object.entries(CONFIG.github.projects).forEach(([key, repoName], index) => {
            setTimeout(() => {
                const repo = {
                    name: repoName,
                    html_url: `https://github.com/${CONFIG.github.username}/${repoName}`,
                    description: CONFIG.github.descriptions[key],
                    language: 'Code'
                };
                const card = this.createProjectCard(repo, key);
                this.container.appendChild(card);
                setTimeout(() => card.classList.add('show'), 10);
            }, index * 100);
        });
    }
}

// ==================== Certifications Manager ====================
class CertificationsManager {
    constructor() {
        this.container = document.getElementById('certificationsContainer');
        this.init();
    }

    init() {
        CONFIG.certifications.forEach((cert, index) => {
            setTimeout(() => {
                const card = this.createCertCard(cert);
                this.container.appendChild(card);
                setTimeout(() => card.classList.add('show'), 10);
            }, index * 100);
        });
    }

    createCertCard(cert) {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';

        card.innerHTML = `
            <div class="cert-header">
                <div class="cert-icon">
                    <i class="${cert.icon}"></i>
                </div>
                <div>
                    <h3>${cert.title}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                </div>
            </div>
            <p>${cert.description}</p>
            <p class="cert-date">${cert.date}</p>
        `;

        return card;
    }
}

// ==================== Contact Form Handler ====================
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.validateField(field);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }

        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
        } else {
            field.classList.add('error');
            field.classList.remove('success');
        }

        return isValid;
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Please fill in all fields correctly', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            this.form.reset();
            this.form.querySelectorAll('input, textarea').forEach(field => {
                field.classList.remove('success', 'error');
            });
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ==================== Counter Animation ====================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }
}

// ==================== Skill Progress Animation ====================
class SkillProgressAnimation {
    constructor() {
        this.skills = document.querySelectorAll('.skill-progress');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skills.forEach(skill => observer.observe(skill));
    }
}

// ==================== Initialize Everything ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ParticleSystem();
    new NavigationHandler();
    new ScrollAnimations();
    new ProjectsManager();
    new CertificationsManager();
    new ContactFormHandler();
    new CounterAnimation();
    new SkillProgressAnimation();
    
    // Custom cursor for desktop only
    if (window.innerWidth > 768) {
        new CustomCursor();
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add CSS for show class
    const style = document.createElement('style');
    style.textContent = `
        .project-card.show,
        .cert-card.show {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .custom-cursor {
            width: 10px;
            height: 10px;
            background: var(--primary);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
        }

        .custom-cursor-follower {
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.5;
        }

        .custom-cursor.cursor-hover {
            transform: scale(2);
        }

        .custom-cursor-follower.cursor-hover {
            transform: scale(1.5);
        }

        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-success {
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        }

        .notification-error {
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        }

        .form-control.error {
            border-color: #EF4444 !important;
        }

        .form-control.success {
            border-color: #10B981 !important;
        }

        .nav-links a.active {
            color: var(--primary) !important;
        }
    `;
    document.head.appendChild(style);

    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #00D4FF; font-size: 20px; font-weight: bold;');
});

// ==================== Performance Optimization ====================
// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}