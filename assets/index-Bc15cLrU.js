(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),window.addEventListener(`scroll`,function(){let e=document.getElementById(`header`);window.scrollY>50?e.classList.add(`scrolled`):e.classList.remove(`scrolled`)});var e=document.querySelector(`.menu-toggle`),t=document.querySelector(`.nav-links`);e.addEventListener(`click`,function(){t.classList.toggle(`active`)}),document.querySelectorAll(`.nav-links a`).forEach(e=>{e.addEventListener(`click`,function(){t.classList.remove(`active`)})});var n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`fade-in`)})},{threshold:.1,rootMargin:`0px 0px -50px 0px`});document.querySelectorAll(`.fade-in`).forEach(e=>{n.observe(e)}),document.getElementById(`contactForm`).addEventListener(`submit`,function(e){e.preventDefault(),alert(`Thank you for your message! I will get back to you soon.`),this.reset()});function r(){let e=document.getElementById(`sparkles`);for(let t=0;t<20;t++){let n=document.createElement(`div`);n.className=`sparkle`;let r=t/20*360,i=175+175*Math.cos(r*Math.PI/180),a=175+175*Math.sin(r*Math.PI/180);n.style.left=`${i}px`,n.style.top=`${a}px`,n.style.animationDelay=`${Math.random()*2}s`,e.appendChild(n)}}function i(){let e=document.getElementById(`particles`);for(let t=0;t<50;t++){let t=document.createElement(`div`);t.className=`particle`,t.style.left=`${Math.random()*100}%`,t.style.top=`${Math.random()*100}%`;let n=10+Math.random()*20,r=Math.random()*5;t.style.animation=`
                    floatParticle ${n}s ease-in-out ${r}s infinite
                `;let i=document.createElement(`style`);i.textContent=`
                    @keyframes floatParticle {
                        0%, 100% {
                            transform: translate(0, 0);
                            opacity: 0.1;
                        }
                        25% {
                            transform: translate(${Math.random()*50-25}px, ${Math.random()*50-25}px);
                            opacity: 0.3;
                        }
                        50% {
                            transform: translate(${Math.random()*50-25}px, ${Math.random()*50-25}px);
                            opacity: 0.1;
                        }
                        75% {
                            transform: translate(${Math.random()*50-25}px, ${Math.random()*50-25}px);
                            opacity: 0.3;
                        }
                    }
                `,document.head.appendChild(i),e.appendChild(t)}}var a=document.querySelector(`.profile-wrapper`);a.addEventListener(`mousemove`,e=>{let t=a.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=t.width/2,o=(r-t.height/2)/20,s=(i-n)/20;a.style.transform=`
                perspective(1000px) 
                rotateX(${o}deg) 
                rotateY(${s}deg) 
                scale(1.05)
            `}),a.addEventListener(`mouseleave`,()=>{a.style.transform=`perspective(1000px) rotateX(0) rotateY(0) scale(1)`});var o=`Ahmed-Eldeep3`,s={"Monitor Academy":`Monitor Academy`,"European Clinic":`European Clinic`,"To-Do-App":`To-Do-App`,"Exel-clinic- system":`Exel-clinic- system`,calculator:`calculator`},c={Monitor:`https://www.itewiki.fi/write/post_images/23996.png`,"European Clinic":`https://tse2.mm.bing.net/th/id/OIP.E-_pjV0IVUW8HxI6uY-IwAHaHa?pid=Api&P=0&h=220`,"To-Do-App":`https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,"Exel-clinic- system":`https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,calculator:`https://sm.ign.com/ign_pk/news/a/apples-off/apples-official-calculator-app-finally-arrives-on-ipads_m19z.jpg`},l={"Monitor Academy":`An app for tracking student performance and educational progress, allowing teachers and administrators to record attendance, monitor progress, and generate accurate reports efficiently.`,"European Clinic":`An educational and entertaining app that provides diverse learning content in an engaging and user-friendly way, with interactive lessons and quizzes, and a responsive design for all devices.`,"To-Do-App":`My first flutter project using dart featuring MVVM architecture.`,"Exel-clinic- system":`A comprehensive Excel file for managing the center’s data, including client tracking, session schedules, appointments, and daily/monthly statistics, enabling efficient operations and minimizing manual errors.`,calculator:`An advanced calculator app supporting basic and complex calculations, featuring a clean and simple interface with support for sequential operations and various mathematical functions.`};async function u(){let e=document.getElementById(`projectsContainer`);try{let t=await fetch(`https://github.com/users/${o}/repos?per_page=100`);if(!t.ok)throw Error(`GitHub API error: ${t.status}`);let n=await t.json();e.innerHTML=``;let r=[];if(Object.keys(s).forEach(e=>{let t=s[e],i=n.find(e=>e.name.toLowerCase()===t.toLowerCase()||e.name.toLowerCase().includes(t.toLowerCase())||t.toLowerCase().includes(e.name.toLowerCase()));i?r.push({repo:i,projectKey:e}):r.push({repo:{name:t,html_url:`https://github.com/${o}/${t}`,description:l[e]||`My ${t} project`,language:`Code`},projectKey:e})}),r.length===0){e.innerHTML=`<div class="error">No featured projects found.</div>`;return}r.forEach(t=>{let n=d(t.repo,t.projectKey);e.appendChild(n)})}catch(t){console.error(`Error fetching GitHub projects:`,t),e.innerHTML=``,Object.keys(s).forEach(t=>{let n=s[t],r=d({name:n,html_url:`https://github.com/${o}/${n}`,description:l[t]||`My ${n} project`,language:`Code`},t);e.appendChild(r)})}}function d(e,t){let n=document.createElement(`div`);n.className=`project-card fade-in hover-3d`;let r=e.language?[e.language]:[`Code`],i=c[t]||`https://www.itewiki.fi/write/post_images/23996.png`,a=l[t]||(e.description?e.description.length>120?e.description.substring(0,120)+`...`:e.description:`Project description not available.`),o=f(e.language);return n.innerHTML=`
                <div class="project-image">
                    <img src="${i}" alt="${e.name}">
                    <div class="project-overlay">
                        <i class="${o} project-icon"></i>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${e.name}</h3>
                    <p class="project-description">${a}</p>
                    <div class="project-tech">
                        ${r.map(e=>`<span class="tech-tag">${e}</span>`).join(``)}
                    </div>
                    <div class="project-links">
                        <a href="${e.html_url}" target="_blank">
                            <i class="fab fa-github"></i> Code
                        </a>
                        ${e.homepage?`
                        <a href="${e.homepage}" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        `:``}
                    </div>
                </div>
            `,n}function f(e){return e&&{JavaScript:`fab fa-js-square`,TypeScript:`fab fa-js-square`,HTML:`fab fa-html5`,CSS:`fab fa-css3-alt`,Python:`fab fa-python`,Java:`fab fa-java`,PHP:`fab fa-php`,"C++":`fas fa-code`,"C#":`fas fa-code`,Ruby:`far fa-gem`,Swift:`fab fa-swift`,Kotlin:`fas fa-mobile-alt`,Go:`fas fa-code`,Rust:`fas fa-code`,Shell:`fas fa-terminal`,Dart:`fab fa-dart`,Vue:`fab fa-vuejs`,React:`fab fa-react`,Angular:`fab fa-angular`}[e]||`fas fa-code`}function p(){let e=document.getElementById(`certificationsContainer`);[{title:`Android native app Development`,issuer:`Self-Study & Practical Projects`,date:`2024 - Present`,icon:`fab fa-android`,description:`Skilled in developing Android apps using Kotlin with MVVM architecture for clean separation of UI and logic.
Experienced in creating responsive and interactive interfaces using Jetpack Compose and XML layouts.
Proficient in handling network requests, local storage, and API integration efficiently.`},{title:`iOS native app Development`,issuer:`Self-Study & Practical Projects`,date:`2025 - Present`,icon:`fab fa-apple`,description:`Knowledgeable in Swift and SwiftUI for building iOS applications.
Capable of designing responsive user interfaces with a focus on user experience.
Experienced in data management and integrating apps with databases and external services.`},{title:`Database (Firebase)`,issuer:`Practical Experience`,date:`2024 - Present`,icon:`fas fa-database`,description:`ExperiExperienced in managing cloud databases using Firebase Realtime Database and Cloud Firestore.ence with Firebase, database design, CRUD operations, and data modeling for app applications.
Skilled in structuring data for easy access and real-time updates.
Knowledgeable in Firebase Authentication, Firebase Storage, and Firebase Cloud Messaging.
Able to integrate apps with Firebase to sync and display data seamlessly in real time.`},{title:`Version Control with Git & GitHub`,issuer:`Professional Practice`,date:`2024 - Present`,icon:`fab fa-github`,description:`Proficient in Git workflows, branching strategies, collaboration, and project management using GitHub.`},{title:`Exel System`,issuer:`Self-Taught & Project-Based Learning`,date:`2023 - Present`,icon:`fas fa-file-excel`,description:`Advanced skills in formulas, Pivot Tables, and data analysis.
Ability to create dynamic spreadsheets, generate detailed reports, and manage business operations efficiently.
Experienced in designing custom Excel applications for data tracking and reporting.`}].forEach(t=>{let n=document.createElement(`div`);n.className=`cert-card fade-in hover-3d`,n.innerHTML=`
                    <div class="cert-header">
                        <div class="cert-icon">
                            <i class="${t.icon}"></i>
                        </div>
                        <div>
                            <h3 class="cert-title">${t.title}</h3>
                            <p class="cert-issuer">${t.issuer}</p>
                        </div>
                    </div>
                    <p style="color: var(--text-light); margin-bottom: 15px; font-size: 0.9rem;">${t.description}</p>
                    <p class="cert-date">${t.date}</p>
                `,e.appendChild(n)})}function m(){let e=document.querySelector(`.hero-title span`),t=e.textContent;e.textContent=``;let n=0,r=setInterval(()=>{n<t.length?(e.textContent+=t.charAt(n),n++):clearInterval(r)},100)}document.addEventListener(`DOMContentLoaded`,function(){r(),i(),m(),u(),p()});