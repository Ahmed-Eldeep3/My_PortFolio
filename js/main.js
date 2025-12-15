// Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });

        // Animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Create sparkles effect for profile picture
        function createSparkles() {
            const sparklesContainer = document.getElementById('sparkles');
            const numSparkles = 20;
            
            for (let i = 0; i < numSparkles; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                
                // Random position on the circle
                const angle = (i / numSparkles) * 360;
                const radius = 175; // Half of profile wrapper width
                const x = radius + radius * Math.cos(angle * Math.PI / 180);
                const y = radius + radius * Math.sin(angle * Math.PI / 180);
                
                sparkle.style.left = `${x}px`;
                sparkle.style.top = `${y}px`;
                sparkle.style.animationDelay = `${Math.random() * 2}s`;
                
                sparklesContainer.appendChild(sparkle);
            }
        }

        // Create particles background
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const numParticles = 50;
            
            for (let i = 0; i < numParticles; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation
                const duration = 10 + Math.random() * 20;
                const delay = Math.random() * 5;
                
                particle.style.animation = `
                    floatParticle ${duration}s ease-in-out ${delay}s infinite
                `;
                
                // Add CSS for animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes floatParticle {
                        0%, 100% {
                            transform: translate(0, 0);
                            opacity: 0.1;
                        }
                        25% {
                            transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
                            opacity: 0.3;
                        }
                        50% {
                            transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
                            opacity: 0.1;
                        }
                        75% {
                            transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
                            opacity: 0.3;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                particlesContainer.appendChild(particle);
            }
        }

        // Profile picture hover effect
        const profileWrapper = document.querySelector('.profile-wrapper');
        profileWrapper.addEventListener('mousemove', (e) => {
            const rect = profileWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            profileWrapper.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.05)
            `;
        });

        profileWrapper.addEventListener('mouseleave', () => {
            profileWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });

        // GitHub username
        const GITHUB_USERNAME = 'Ahmed-Eldeep3';
        
        // List of specific projects to display with their EXACT repository names
        const SPECIFIC_PROJECTS = {
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
            'Exel-clinic- system': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'calculator' : 'https://sm.ign.com/ign_pk/news/a/apples-off/apples-official-calculator-app-finally-arrives-on-ipads_m19z.jpg',
        };

        // Project descriptions
        const PROJECT_DESCRIPTIONS = {
            'Monitor Academy': 'An app for tracking student performance and educational progress, allowing teachers and administrators to record attendance, monitor progress, and generate accurate reports efficiently.',
            'European Clinic': 'An educational and entertaining app that provides diverse learning content in an engaging and user-friendly way, with interactive lessons and quizzes, and a responsive design for all devices.',
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

        // Function to create a project card with image
        function createProjectCard(repo, projectKey) {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in hover-3d';
            
            // Get programming languages from repo (if available)
            const languages = repo.language ? [repo.language] : ['Code'];
            
            // Get project image
            const projectImage = PROJECT_IMAGES[projectKey] || 
                'https://www.itewiki.fi/write/post_images/23996.png';
            
            // Get project description
            const description = PROJECT_DESCRIPTIONS[projectKey] || 
                (repo.description ? 
                    (repo.description.length > 120 
                        ? repo.description.substring(0, 120) + '...' 
                        : repo.description) 
                    : 'Project description not available.');
            
            // Get appropriate icon based on language
            const languageIcon = getLanguageIcon(repo.language);
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${projectImage}" alt="${repo.name}">
                    <div class="project-overlay">
                        <i class="${languageIcon} project-icon"></i>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-description">${description}</p>
                    <div class="project-tech">
                        ${languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank">
                            <i class="fab fa-github"></i> Code
                        </a>
                        ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank">
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