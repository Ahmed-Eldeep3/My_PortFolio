// enhanced.js

// ==================== Configuration ====================
const CONFIG = {
    github: {
        username: 'Ahmed-Eldeep3',
        projects: {
            'Monitor Academy': 'Monitor_Academy',
            'European Clinic': 'European_Center',
            'To-Do-App': 'To_do',
            'Exel-clinic- system': 'Exel-clinic- system',
            'calculator': 'calculator',
        };

        // Project images mapping
        const PROJECT_IMAGES = {
            'Monitor': 'https://www.itewiki.fi/write/post_images/23996.png',
            'European Clinic': 'https://tse2.mm.bing.net/th/id/OIP.E-_pjV0IVUW8HxI6uY-IwAHaHa?pid=Api&P=0&h=220',
            'To-Do-App': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'Exel-clinic-system': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'calculator': 'https://sm.ign.com/ign_pk/news/a/apples-off/apples-official-calculator-app-finally-arrives-on-ipads_m19z.jpg',
        },
        descriptions: {
            'Monitor Academy': 'An app for tracking student performance and educational progress, allowing teachers and administrators to record attendance, monitor progress, and generate accurate reports efficiently.',
            'European Clinic': 'An educational and entertaining app that provides diverse learning content in an engaging and user-friendly way, with interactive lessons and quizzes.',
            'To-Do-App': 'My first flutter project using dart featuring MVVM architecture.',
            'Exel-clinic- system': 'A comprehensive Excel file for managing the center’s data, including client tracking, session schedules, appointments, and daily/monthly statistics, enabling efficient operations and minimizing manual errors.',
            'calculator' : 'An advanced calculator app supporting basic and complex calculations, featuring a clean and simple interface with support for sequential operations and various mathematical functions.'
            
        };

        // Function to fetch all projects and filter them
        async function fetchSpecificProjects() {
            const projectsContainer = document.getElementById('projectsContainer');
            
            try {
                const response = await fetch(`https://github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
                
                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }
                
                const repos = await response.json();
                
                // Clear loading message
                projectsContainer.innerHTML = '';
                
                let foundProjects = [];
                
                // First, try to find exact matches
                Object.keys(SPECIFIC_PROJECTS).forEach(projectKey => {
                    const projectName = SPECIFIC_PROJECTS[projectKey];
                    const foundRepo = repos.find(repo => 
                        repo.name.toLowerCase() === projectName.toLowerCase() ||
                        repo.name.toLowerCase().includes(projectName.toLowerCase()) ||
                        projectName.toLowerCase().includes(repo.name.toLowerCase())
                    );
                    
                    if (foundRepo) {
                        foundProjects.push({
                            repo: foundRepo,
                            projectKey: projectKey
                        });
                    } else {
                        // If not found, create a placeholder project
                        foundProjects.push({
                            repo: {
                                name: projectName,
                                html_url: `https://github.com/${GITHUB_USERNAME}/${projectName}`,
                                description: PROJECT_DESCRIPTIONS[projectKey] || `My ${projectName} project`,
                                language: 'Code'
                            },
                            projectKey: projectKey
                        });
                    }
                });
                
                if (foundProjects.length === 0) {
                    projectsContainer.innerHTML = '<div class="error">No featured projects found.</div>';
                    return;
                }
                
                // Display filtered repositories as project cards
                foundProjects.forEach(item => {
                    const projectCard = createProjectCard(item.repo, item.projectKey);
                    projectsContainer.appendChild(projectCard);
                });
                
            } catch (error) {
                console.error('Error fetching GitHub projects:', error);
                
                // Fallback: Create project cards manually
                projectsContainer.innerHTML = '';
                Object.keys(SPECIFIC_PROJECTS).forEach(projectKey => {
                    const projectName = SPECIFIC_PROJECTS[projectKey];
                    const placeholderRepo = {
                        name: projectName,
                        html_url: `https://github.com/${GITHUB_USERNAME}/${projectName}`,
                        description: PROJECT_DESCRIPTIONS[projectKey] || `My ${projectName} project`,
                        language: 'Code'
                    };
                    
                    const projectCard = createProjectCard(placeholderRepo, projectKey);
                    projectsContainer.appendChild(projectCard);
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
            
            return projectCard;
        }

        // Function to get appropriate icon for programming language
        function getLanguageIcon(language) {
            if (!language) return 'fas fa-code';
            
            const languageIcons = {
                'JavaScript': 'fab fa-js-square',
                'TypeScript': 'fab fa-js-square',
                'HTML': 'fab fa-html5',
                'CSS': 'fab fa-css3-alt',
                'Python': 'fab fa-python',
                'Java': 'fab fa-java',
                'PHP': 'fab fa-php',
                'C++': 'fas fa-code',
                'C#': 'fas fa-code',
                'Ruby': 'far fa-gem',
                'Swift': 'fab fa-swift',
                'Kotlin': 'fas fa-mobile-alt',
                'Go': 'fas fa-code',
                'Rust': 'fas fa-code',
                'Shell': 'fas fa-terminal',
                'Dart': 'fab fa-dart',
                'Vue': 'fab fa-vuejs',
                'React': 'fab fa-react',
                'Angular': 'fab fa-angular'
            };
            
            return languageIcons[language] || 'fas fa-code';
        }

        // إضافة الشهادات بناءً على ملفك الشخصي في LinkedIn
        function addLinkedInCertifications() {
            const certsContainer = document.getElementById('certificationsContainer');
            
            // بيانات الشهادات المستندة إلى ملفك الشخصي في LinkedIn
            const certifications = [
                {
                    title: "Android native app Development",
                    issuer: "Self-Study & Practical Projects",
                    date: "2024 - Present",
                    icon: "fab fa-android",
                    description: "Skilled in developing Android apps using Kotlin with MVVM architecture for clean separation of UI and logic.\nExperienced in creating responsive and interactive interfaces using Jetpack Compose and XML layouts.\nProficient in handling network requests, local storage, and API integration efficiently."
                },
                {
                    title: "iOS native app Development",
                    issuer: "Self-Study & Practical Projects",
                    date: "2025 - Present",
                    icon: "fab fa-apple",
                    description: "Knowledgeable in Swift and SwiftUI for building iOS applications.\nCapable of designing responsive user interfaces with a focus on user experience.\nExperienced in data management and integrating apps with databases and external services."
                },
                
                {
                    title: "Database (Firebase)",
                    issuer: "Practical Experience",
                    date: "2024 - Present",
                    icon: "fas fa-database",
                    description: "ExperiExperienced in managing cloud databases using Firebase Realtime Database and Cloud Firestore.ence with Firebase, database design, CRUD operations, and data modeling for app applications.\nSkilled in structuring data for easy access and real-time updates.\nKnowledgeable in Firebase Authentication, Firebase Storage, and Firebase Cloud Messaging.\nAble to integrate apps with Firebase to sync and display data seamlessly in real time."
                },
                {
                    title: "Version Control with Git & GitHub",
                    issuer: "Professional Practice",
                    date: "2024 - Present",
                    icon: "fab fa-github",
                    description: "Proficient in Git workflows, branching strategies, collaboration, and project management using GitHub."
                },
                {
                    title: "Exel System",
                    issuer: "Self-Taught & Project-Based Learning",
                    date: "2023 - Present",
                    icon: "fas fa-file-excel",
                    description: "Advanced skills in formulas, Pivot Tables, and data analysis.\nAbility to create dynamic spreadsheets, generate detailed reports, and manage business operations efficiently.\nExperienced in designing custom Excel applications for data tracking and reporting."
                },
               
            ];
            
            certifications.forEach(cert => {
                const certCard = document.createElement('div');
                certCard.className = 'cert-card fade-in hover-3d';
                
                certCard.innerHTML = `
                    <div class="cert-header">
                        <div class="cert-icon">
                            <i class="${cert.icon}"></i>
                        </div>
                        <div>
                            <h3 class="cert-title">${cert.title}</h3>
                            <p class="cert-issuer">${cert.issuer}</p>
                        </div>
                    </div>
                    <p style="color: var(--text-light); margin-bottom: 15px; font-size: 0.9rem;">${cert.description}</p>
                    <p class="cert-date">${cert.date}</p>
                `;
                
                certsContainer.appendChild(certCard);
            });
        }

        // Typewriter effect for hero section
        function typewriterEffect() {
            const heroTitle = document.querySelector('.hero-title span');
            const originalText = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < originalText.length) {
                    heroTitle.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 100);
        }

        // تشغيل الوظائف عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', function() {
            createSparkles();
            createParticles();
            typewriterEffect();
            fetchSpecificProjects();
            addLinkedInCertifications();
        });