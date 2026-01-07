// main.js - Enhanced Portfolio JavaScript

// ==================== Configuration ====================
const CONFIG = {
    github: {
        username: 'Ahmed-Eldeep3',
        projects: {
            'Monitor Academy': {
                repoName: 'Monitor_Academy',
                language: 'Kotlin'
            },
            'European Clinic': {
                repoName: 'European_Center',
                language: 'Java'
            },
            'To-Do-App': {
                repoName: 'To_do',
                language: 'Dart'
            },
            'Exel-clinic-system': {
                repoName: 'Exel-clinic-system',
                language: 'Excel'
            },
            'calculator': {
                repoName: 'calculator',
                language: 'Java'
            }
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
    contact: {
        email: 'ahmed5.4eldeep@gmail.com',
        phone: '+201557559895',
        whatsapp: '201557559895',
        emailJsServiceId: 'service_m5bd8rz',
        emailJsTemplateId: 'template_tsa8o0q',
        emailJsPublicKey: 'VX-ZYarEljT2sYMB2'
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
            description: "Advanced skills in formulas, Pivot Tables, and data analysis. Ability to create dynamic spreadsheets and generate detailed reports."
        }
    ]
};

// ==================== Load EmailJS ====================
(function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        emailjs.init(CONFIG.contact.emailJsPublicKey);
        console.log('✅ EmailJS initialized successfully');
    };
    document.head.appendChild(script);
})();

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

    static getLanguageIcon(language) {
        const icons = {
            'JavaScript': 'fab fa-js-square',
            'TypeScript': 'fab fa-js-square',
            'HTML': 'fab fa-html5',
            'CSS': 'fab fa-css3-alt',
            'Python': 'fab fa-python',
            'Java': 'fab fa-java',
            'Kotlin': 'fab fa-android',
            'Swift': 'fab fa-swift',
            'Dart': 'fas fa-mobile-alt',
            'Excel': 'fas fa-file-excel',
            'C++': 'fas fa-code',
            'C#': 'fas fa-code',
            'Go': 'fas fa-code',
        };
        return icons[language] || 'fas fa-code';
    }

    static showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// ==================== Advanced Particle System ====================
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.init();
    }

    init() {
        this.canvas.id = 'particle-canvas';
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

        window.addEventListener('resize', () => {
            this.resize();
            this.particles = [];
            this.createParticles();
        });

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
        const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 100);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2.5 + 0.5,
                baseSize: Math.random() * 2.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                opacity: Math.random() * 0.5 + 0.3,
                baseOpacity: Math.random() * 0.5 + 0.3,
                color: Math.random() > 0.5 ? 'rgba(0, 212, 255,' : 'rgba(124, 58, 237,'
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(dy, dx);
                particle.x -= Math.cos(angle) * force * 2;
                particle.y -= Math.sin(angle) * force * 2;
                particle.size = particle.baseSize * (1 + force * 0.5);
                particle.opacity = Math.min(particle.baseOpacity * (1 + force), 1);
            } else {
                particle.size += (particle.baseSize - particle.size) * 0.1;
                particle.opacity += (particle.baseOpacity - particle.opacity) * 0.1;
            }

            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
                particle.x = Math.max(0, Math.min(particle.x, this.canvas.width));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
                particle.y = Math.max(0, Math.min(particle.y, this.canvas.height));
            }

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color + '0.8)';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    const opacity = 0.2 * (1 - distance / 150);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==================== Enhanced Profile Image Handler ====================
class ProfileImageHandler {
    constructor() {
        this.wrapper = document.querySelector('.profile-wrapper');
        this.image = document.querySelector('.profile-inner img');
        this.showcase = document.querySelector('.profile-showcase');
        this.floatingIcons = document.querySelectorAll('.float-icon');
        this.init();
    }

    init() {
        if (!this.wrapper) return;

        this.addDynamicElements();

        this.wrapper.addEventListener('mousemove', (e) => {
            const rect = this.wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -20;
            const rotateY = ((x - centerX) / centerX) * 20;
            
            this.wrapper.style.transform = `
                perspective(1200px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.08, 1.08, 1.08)
                translateZ(20px)
            `;

            this.floatingIcons.forEach((icon, index) => {
                const speed = (index + 1) * 0.5;
                const moveX = ((x - centerX) / centerX) * 30 * speed;
                const moveY = ((y - centerY) / centerY) * 30 * speed;
                icon.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.5}deg)`;
            });
        });

        this.wrapper.addEventListener('mouseleave', () => {
            this.wrapper.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
            this.floatingIcons.forEach(icon => {
                icon.style.transform = 'translate(0, 0) rotate(0deg)';
            });
        });

        window.addEventListener('scroll', Utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            if (scrolled < windowHeight) {
                const parallaxValue = scrolled * 0.3;
                if (this.showcase) {
                    this.showcase.style.transform = `translateY(${parallaxValue}px) scale(${1 - scrolled / windowHeight * 0.2})`;
                    this.showcase.style.opacity = 1 - scrolled / windowHeight * 0.5;
                }
            }
        }, 50));

        if (this.image) {
            this.image.addEventListener('mouseenter', () => {
                this.image.style.filter = 'contrast(1.3) brightness(1.2) saturate(1.3)';
                this.wrapper.style.boxShadow = '0 0 60px rgba(0, 212, 255, 0.6), 0 0 100px rgba(124, 58, 237, 0.4)';
            });

            this.image.addEventListener('mouseleave', () => {
                this.image.style.filter = 'contrast(1.1) brightness(1.05) saturate(1.1)';
                this.wrapper.style.boxShadow = 'none';
            });
        }

        this.animateFloatingIcons();
        this.addPulseEffect();
    }

    addDynamicElements() {
        if (!this.showcase) return;

        const circles = document.createElement('div');
        circles.className = 'profile-circles';
        circles.innerHTML = `
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        `;
        this.showcase.appendChild(circles);

        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'profile-sparkles';
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparklesContainer.appendChild(sparkle);
        }
        this.showcase.appendChild(sparklesContainer);
    }

    animateFloatingIcons() {
        this.floatingIcons.forEach((icon, index) => {
            let angle = (index * 120);
            let radius = 60;
            let phase = 0;
            
            const animate = () => {
                angle += 0.3;
                phase += 0.02;
                
                const radian = (angle * Math.PI) / 180;
                const pulseRadius = radius + Math.sin(phase) * 10;
                const x = Math.cos(radian) * pulseRadius;
                const y = Math.sin(radian) * pulseRadius;
                const scale = 1 + Math.sin(phase * 2) * 0.2;
                
                icon.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${angle * 0.5}deg)`;
                
                requestAnimationFrame(animate);
            };
            
            animate();
        });
    }

    addPulseEffect() {
        setInterval(() => {
            if (this.wrapper) {
                this.wrapper.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.6), 0 0 80px rgba(124, 58, 237, 0.3)';
                setTimeout(() => {
                    this.wrapper.style.boxShadow = 'none';
                }, 1000);
            }
        }, 5000);
    }
}

// ==================== Advanced Projects Manager ====================
class ProjectsManager {
    constructor() {
        this.container = document.getElementById('projectsContainer');
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.viewMode = 'grid';
        this.init();
    }

    async init() {
        await this.fetchProjects();
        this.createControls();
        this.setupSearch();
    }

    async fetchProjects() {
        this.showLoader();

        try {
            const response = await fetch(
                `https://api.github.com/users/${CONFIG.github.username}/repos?per_page=100&sort=updated`
            );
            
            if (!response.ok) throw new Error('GitHub API error');
            
            const repos = await response.json();
            
            this.projects = Object.entries(CONFIG.github.projects).map(([key, projectInfo]) => {
                const repoName = projectInfo.repoName;
                const language = projectInfo.language;
                
                const repo = repos.find(r => 
                    r.name.toLowerCase() === repoName.toLowerCase() ||
                    r.name.toLowerCase().replace(/[-_]/g, '') === repoName.toLowerCase().replace(/[-_]/g, '')
                ) || {
                    name: repoName,
                    html_url: `https://github.com/${CONFIG.github.username}/${repoName}`,
                    description: CONFIG.github.descriptions[key],
                    language: language,
                    stargazers_count: 0,
                    forks_count: 0,
                    updated_at: new Date().toISOString()
                };
                
                return {
                    ...repo,
                    language: language, // Force the correct language
                    displayName: key,
                    image: CONFIG.github.images[key],
                    fullDescription: CONFIG.github.descriptions[key]
                };
            });

            this.filteredProjects = [...this.projects];
            this.displayProjects();
            
        } catch (error) {
            console.error('Error fetching projects:', error);
            this.showFallbackProjects();
        }
    }

    showLoader() {
        this.container.innerHTML = `
            <div class="loading-spinner" style="grid-column: 1/-1;">
                <div class="spinner-advanced">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <p style="margin-top: 20px; color: var(--text-dim); font-size: 1.1rem;">Loading amazing projects...</p>
            </div>
        `;
    }

    createControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'projects-controls';

        const viewToggle = document.createElement('div');
        viewToggle.className = 'view-toggle';
        viewToggle.innerHTML = `
            <button class="view-btn active" data-view="grid">
                <i class="fas fa-th"></i>
            </button>
            <button class="view-btn" data-view="list">
                <i class="fas fa-list"></i>
            </button>
        `;

        const languages = ['all', ...new Set(this.projects.map(p => p.language).filter(Boolean))];
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        filterContainer.innerHTML = languages.map(lang => `
            <button class="filter-btn ${lang === 'all' ? 'active' : ''}" data-filter="${lang}">
                <i class="${Utils.getLanguageIcon(lang)}"></i>
                ${lang === 'all' ? 'All' : lang}
            </button>
        `).join('');

        controlsContainer.appendChild(viewToggle);
        controlsContainer.appendChild(filterContainer);
        this.container.parentElement.insertBefore(controlsContainer, this.container);

        viewToggle.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                viewToggle.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.viewMode = btn.dataset.view;
                this.container.className = `projects-grid ${this.viewMode}-view`;
                this.displayProjects();
            });
        });

        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterProjects(btn.dataset.filter);
            });
        });
    }

    setupSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'project-search';
        searchContainer.innerHTML = `
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search projects by name, description, or language..." id="projectSearch">
            <button class="clear-search" style="display: none;">
                <i class="fas fa-times"></i>
            </button>
        `;

        this.container.parentElement.insertBefore(searchContainer, this.container);

        const searchInput = document.getElementById('projectSearch');
        const clearBtn = searchContainer.querySelector('.clear-search');

        searchInput.addEventListener('input', Utils.debounce((e) => {
            this.searchProjects(e.target.value);
            clearBtn.style.display = e.target.value ? 'flex' : 'none';
        }, 300));

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            this.searchProjects('');
        });
    }

    filterProjects(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(p => p.language === filter);
        }
        
        this.displayProjects();
    }

    searchProjects(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            if (this.currentFilter === 'all') {
                this.filteredProjects = [...this.projects];
            } else {
                this.filteredProjects = this.projects.filter(p => p.language === this.currentFilter);
            }
        } else {
            let baseProjects = this.currentFilter === 'all' ? this.projects : this.projects.filter(p => p.language === this.currentFilter);
            
            this.filteredProjects = baseProjects.filter(p => 
                p.displayName.toLowerCase().includes(searchTerm) ||
                p.fullDescription.toLowerCase().includes(searchTerm) ||
                (p.language && p.language.toLowerCase().includes(searchTerm))
            );
        }
        
        this.displayProjects();
    }

    displayProjects() {
        this.container.innerHTML = '';

        if (this.filteredProjects.length === 0) {
            this.container.innerHTML = `
                <div class="no-projects" style="grid-column: 1/-1; text-align: center; padding: 80px 20px;">
                    <div class="no-projects-icon">
                        <i class="fas fa-folder-open"></i>
                    </div>
                    <h3 style="color: var(--text); margin: 20px 0 10px; font-size: 1.5rem;">No projects found</h3>
                    <p style="color: var(--text-dim); font-size: 1.1rem;">Try adjusting your search or filter</p>
                </div>
            `;
            return;
        }

        this.filteredProjects.forEach((project, index) => {
            setTimeout(() => {
                const card = this.createProjectCard(project, index);
                this.container.appendChild(card);
                
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 50);
                });
            }, index * 80);
        });
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-language', project.language || 'Code');
        card.style.setProperty('--delay', `${index * 0.1}s`);

        const image = project.image || `https://via.placeholder.com/400x200/0A0E27/00D4FF?text=${encodeURIComponent(project.displayName)}`;
        const description = project.fullDescription || project.description || 'No description available';
        const icon = Utils.getLanguageIcon(project.language);

        const lastUpdate = new Date(project.updated_at);
        const formattedDate = lastUpdate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        card.innerHTML = `
            <div class="project-image-wrapper">
                <div class="project-image">
                    <img src="${image}" alt="${project.displayName}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200/0A0E27/00D4FF?text=Project'">
                    <div class="project-overlay">
                        <div class="overlay-content">
                            <i class="${icon} project-icon"></i>
                            <p>View Project</p>
                        </div>
                    </div>
                </div>
                <div class="project-badge">
                    <i class="${icon}"></i>
                    ${project.language || 'Code'}
                </div>
            </div>
            
            <div class="project-info">
                <div class="project-header">
                    <h3 class="project-title">${project.displayName}</h3>
                    <span class="project-date">${formattedDate}</span>
                </div>
                
                <p class="project-description">${description}</p>
                
                <div class="project-stats">
                    <span class="stat">
                        <i class="fas fa-star"></i>
                        <span>${project.stargazers_count || 0}</span>
                    </span>
                    <span class="stat">
                        <i class="fas fa-code-branch"></i>
                        <span>${project.forks_count || 0}</span>
                    </span>
                    <span class="stat">
                        <i class="fas fa-circle" style="color: var(--primary);"></i>
                        <span>${project.language || 'Code'}</span>
                    </span>
                </div>

                <div class="project-actions">
                    <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="project-btn primary">
                        <i class="fab fa-github"></i>
                        <span>View Code</span>
                    </a>
                    ${project.homepage ? `
                        <a href="${project.homepage}" target="_blank" rel="noopener noreferrer" class="project-btn secondary">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Live Demo</span>
                        </a>
                    ` : ''}
                </div>
            </div>
        `;

        return card;
    }

    showFallbackProjects() {
        this.projects = Object.entries(CONFIG.github.projects).map(([key, projectInfo]) => ({
            name: projectInfo.repoName,
            displayName: key,
            html_url: `https://github.com/${CONFIG.github.username}/${projectInfo.repoName}`,
            description: CONFIG.github.descriptions[key],
            fullDescription: CONFIG.github.descriptions[key],
            language: projectInfo.language,
            image: CONFIG.github.images[key],
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString()
        }));

        this.filteredProjects = [...this.projects];
        this.displayProjects();
    }
}

// ==================== Navigation Handler ====================
class NavigationHandler {
    constructor() {
        this.header = document.querySelector('header');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        if (!this.header || !this.menuToggle || !this.navLinks) return;

        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }, 100));

        this.menuToggle.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            this.menuToggle.innerHTML = this.navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        this.highlightActiveSection();
    }

    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', Utils.throttle(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
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

// ==================== Contact Form Handler ====================
class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.validateField(field);
                }
            });
        });

        this.addContactButtons();
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
        const data = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            Utils.showNotification('Please fill in all fields correctly', 'error');
            return;
        }

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded yet');
            }

            console.log('Sending email with EmailJS...');
            console.log('Service ID:', CONFIG.contact.emailJsServiceId);
            console.log('Template ID:', CONFIG.contact.emailJsTemplateId);

            const response = await emailjs.send(
                CONFIG.contact.emailJsServiceId,
                CONFIG.contact.emailJsTemplateId,
                {
                    from_name: data.from_name,
                    from_email: data.from_email,
                    subject: data.subject,
                    message: data.message,
                    to_email: CONFIG.contact.email,
                    reply_to: data.from_email
                }
            );

            console.log('EmailJS Response:', response);

            if (response.status === 200) {
                Utils.showNotification('✅ Message sent successfully! I will get back to you soon.', 'success');
                this.form.reset();
                this.form.querySelectorAll('input, textarea').forEach(field => {
                    field.classList.remove('success', 'error');
                });
            } else {
                throw new Error('Failed to send');
            }

        } catch (error) {
            console.error('Error sending message:', error);
            
            // Fallback: Open email client
            const mailtoLink = `mailto:${CONFIG.contact.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.from_name}\nEmail: ${data.from_email}\n\nMessage:\n${data.message}`)}`;
            
            Utils.showNotification('Opening your email client... Or contact me via WhatsApp', 'error');
            
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1500);
            
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    addContactButtons() {
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = `https://wa.me/${CONFIG.contact.whatsapp}?text=Hi%20Ahmed!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.`;
        whatsappBtn.target = '_blank';
        whatsappBtn.className = 'float-btn whatsapp-float';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        whatsappBtn.title = 'Chat on WhatsApp';
        document.body.appendChild(whatsappBtn);

        const callBtn = document.createElement('a');
        callBtn.href = `tel:${CONFIG.contact.phone}`;
        callBtn.className = 'float-btn call-float';
        callBtn.innerHTML = '<i class="fas fa-phone"></i>';
        callBtn.title = 'Call Me';
        document.body.appendChild(callBtn);

        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo) {
            const whatsappCard = document.createElement('div');
            whatsappCard.className = 'contact-card';
            whatsappCard.innerHTML = `
                <div class="contact-icon" style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <h3>WhatsApp</h3>
                <p>${CONFIG.contact.phone}</p>
                <a href="https://wa.me/${CONFIG.contact.whatsapp}?text=Hi%20Ahmed!" target="_blank" class="btn btn-primary" style="margin-top: 10px; font-size: 0.9rem; padding: 8px 20px; display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fab fa-whatsapp"></i> Chat Now
                </a>
            `;
            
            const phoneCard = Array.from(contactInfo.children).find(child => 
                child.querySelector('h3')?.textContent === 'Phone'
            );
            if (phoneCard) {
                phoneCard.insertAdjacentElement('afterend', whatsappCard);
            } else {
                contactInfo.insertBefore(whatsappCard, contactInfo.querySelector('.social-links'));
            }
        }
    }
}

// ==================== Certifications Manager ====================
class CertificationsManager {
    constructor() {
        this.container = document.getElementById('certificationsContainer');
        if (this.container) {
            this.init();
        }
    }

    init() {
        CONFIG.certifications.forEach((cert, index) => {
            setTimeout(() => {
                const card = this.createCertCard(cert);
                this.container.appendChild(card);
                setTimeout(() => card.classList.add('show'), 10);
            }, index * 120);
        });
    }

    createCertCard(cert) {
        const card = document.createElement('div');
        card.className = 'cert-card';

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
            <p style="color: var(--text-dim); line-height: 1.6; margin-bottom: 15px;">${cert.description}</p>
            <p class="cert-date"><i class="fas fa-calendar"></i> ${cert.date}</p>
        `;

        return card;
    }
}

// ==================== Stats Counter ====================
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        if (this.counters.length > 0) {
            this.init();
        }
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

// ==================== Skills Animator ====================
class SkillsAnimator {
    constructor() {
        this.skills = document.querySelectorAll('.skill-progress');
        if (this.skills.length > 0) {
            this.init();
        }
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
    console.log('🚀 Portfolio Initialized');
    
    // Initialize all components
    new ParticleSystem();
    new ProfileImageHandler();
    new ProjectsManager();
    new NavigationHandler();
    new ContactFormHandler();
    new CertificationsManager();
    new StatsCounter();
    new SkillsAnimator();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    console.log('✅ All components loaded successfully');
});