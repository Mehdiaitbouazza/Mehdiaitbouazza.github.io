document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Interactive Background Glow Effect ---
    const backgroundGlow = document.querySelector('.background-glow');
    document.addEventListener('mousemove', (e) => {
        backgroundGlow.style.setProperty('--x', `${e.clientX}px`);
        backgroundGlow.style.setProperty('--y', `${e.clientY}px`);
    });


    // --- 2. Fade-in Animation for Sections ---
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const sectionsToFade = document.querySelectorAll('.content-section');
    sectionsToFade.forEach(section => fadeInObserver.observe(section));


    // --- 3. Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('nav ul a');
    const sectionsForNav = document.querySelectorAll('main section');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px'
    });

    sectionsForNav.forEach(section => navObserver.observe(section));

    
    // --- 4. Interactive Terminal Logic ---
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');

    if (terminalBody && terminalInput) {

        // --- Easily editable status variable (#8 - status command) ---
        const STATUS_EN = "Open to internships — available for opportunities in IT, networking, or software development.";
        const STATUS_FR = "À la recherche d'un stage — disponible pour des opportunités en IT, réseaux ou développement logiciel.";

        // Helper: detect current language from active lang button
        const getCurrentLang = () => {
            const activeBtn = document.querySelector('.lang-btn.active');
            return activeBtn ? activeBtn.dataset.lang : 'en';
        };

        const commands = {
            help: () => {
                const lang = getCurrentLang();
                if (lang === 'fr') {
                    return `Commandes disponibles:<br>
- about-mehdi: Affiche un bref résumé sur moi.<br>
- skills: Liste mes compétences techniques.<br>
- contact: Affiche mes coordonnées.<br>
- education: Affiche mon parcours académique.<br>
- languages: Affiche mes niveaux de langues.<br>
- certs: Liste tous mes certificats.<br>
- status: Affiche ma disponibilité professionnelle.<br>
- social: Affiche mes liens GitHub et LinkedIn.<br>
- clear: Efface le terminal.`;
                }
                return `Available commands:<br>
- about-mehdi: Shows a brief summary about me.<br>
- skills: Lists my technical skills.<br>
- contact: Displays my contact information.<br>
- education: Shows my academic background.<br>
- languages: Shows my language proficiency levels.<br>
- certs: Lists all my certificates.<br>
- status: Shows my professional availability.<br>
- social: Shows my GitHub and LinkedIn links.<br>
- clear: Clears the terminal screen.`;
            },
            
            "about-mehdi": () => {
                const lang = getCurrentLang();
                if (lang === 'fr') {
                    return `J'aborde tout défi non pas comme une simple tâche, mais comme une discipline. C'est une façon structurée de pratiquer la logique, résoudre des problèmes complexes et comprendre les systèmes fondamentaux.`;
                }
                return `I approach any challenge not just as a task, but as a discipline. It's a structured way to practice logic, solve complex puzzles, and understand foundational systems.`;
            },
            
            skills: () => {
                const lang = getCurrentLang();
                if (lang === 'fr') {
                    return `Ma boîte à outils actuelle: C, Python, Shell Scripting, Réseaux, Structures de données & Algorithmes, Linux, Vim.`;
                }
                return `My current technical toolbox includes: C Programming, Python, Shell Scripting, Networking, Data Structures & Algorithms, Linux Basics, and Vim.`;
            },
            
            contact: () => {
                const lang = getCurrentLang();
                if (lang === 'fr') {
                    return `Contactez-moi par <a href="mailto:mehdiaitbouazza6@gmail.com">Email</a> ou connectez-vous sur <a href="https://github.com/Mehdiaitbouazza" target="_blank">GitHub</a>.`;
                }
                return `You can reach me via <a href="mailto:mehdiaitbouazza6@gmail.com">Email</a> or connect on <a href="https://github.com/Mehdiaitbouazza" target="_blank">GitHub</a>.`;
            },

            // --- New commands (#8) ---

            education: () => {
                const lang = getCurrentLang();
                if (lang === 'fr') {
                    return `Actuellement étudiant à l'OFPPT, Infrastructure Digitale (1ère année).<br>Spécialisation en 2ème année : Systèmes et Réseaux.`;
                }
                return `Currently studying at OFPPT, Digital Infrastructure (Year 1).<br>Year 2 specialization: Systems and Networking.`;
            },

            languages: () => {
                const lang = getCurrentLang();
                if (lang === 'fr') {
                    return `Arabe: Natif (●●●●●) | Anglais: Bon (●●●●○) | Français: Intermédiaire (●●○○○)`;
                }
                return `Arabic: Native (●●●●●) | English: Good (●●●●○) | French: Medium (●●○○○)`;
            },

            certs: () => {
                const lang = getCurrentLang();
                if (lang === 'fr') {
                    return `Mes certifications:<br>
<br>[IT]<br>
• Cisco Packet Tracer — Cisco Networking Academy<br>
• Python Essentials 1 — Cisco Networking Academy<br>
• IT Essentials — Cisco &amp; OFPPT<br>
• Introduction à la cybersécurité — Cisco Networking Academy<br>
• CCNA: Introduction to Networks — Cisco Networking Academy<br>
• Principes de cybersécurité — Cisco Networking Academy<br>
<br>[Attestations]<br>
• Certificat d'Animateur niveau 1 — Ministère de la Jeunesse Marocain<br>
• ALX Pathway Program — ALX Africa<br>
<br>[Autres]<br>
• Participation: challenge entrepreneurial FemTech — OFPPT (ISGI MARRAKECH)`;
                }
                return `My certifications:<br>
<br>[IT]<br>
• Cisco Packet Tracer — Cisco Networking Academy<br>
• Python Essentials 1 — Cisco Networking Academy<br>
• IT Essentials — Cisco &amp; OFPPT<br>
• Introduction to Cybersecurity — Cisco Networking Academy<br>
• CCNA: Introduction to Networks — Cisco Networking Academy<br>
• Cybersecurity Principles — Cisco Networking Academy<br>
<br>[Attestations]<br>
• Camp Leader certificate level1 — Moroccan Ministry of Youth<br>
• ALX Pathway Program — ALX Africa<br>
<br>[Others]<br>
• Participation: FemTech Entrepreneurial challenge — OFPPT (ISGI MARRAKECH)`;
            },

            status: () => {
                const lang = getCurrentLang();
                return lang === 'fr' ? STATUS_FR : STATUS_EN;
            },

            social: () => {
                return `GitHub: <a href="https://github.com/Mehdiaitbouazza" target="_blank">github.com/Mehdiaitbouazza</a><br>LinkedIn: <a href="https://www.linkedin.com/in/mehdi-ait-bouazza-219045349" target="_blank">linkedin.com/in/mehdi-ait-bouazza-219045349</a>`;
            },
            
            clear: () => ''
        };

        terminalInput.addEventListener('keydown', function(event) {
            if (event.key === "Enter") {
                const command = terminalInput.value.trim().toLowerCase();
                const currentLine = terminalInput.parentElement;

                const commandOutput = document.createElement('p');
                commandOutput.innerHTML = `<span class="terminal-prompt">mehdi@portfolio:~$</span> ${command}`;
                terminalBody.insertBefore(commandOutput, currentLine);

                if (command === 'clear') {
                    while (terminalBody.children.length > 1) {
                        terminalBody.removeChild(terminalBody.firstChild);
                    }
                } else if (commands[command]) {
                    const result = typeof commands[command] === 'function' ? commands[command]() : commands[command];
                    const output = document.createElement('p');
                    output.innerHTML = result;
                    terminalBody.insertBefore(output, currentLine);
                } else if (command !== '') {
                    const output = document.createElement('p');
                    output.textContent = `Command not found: ${command}. Type 'help' for a list of commands.`;
                    terminalBody.insertBefore(output, currentLine);
                }
                
                terminalInput.value = "";
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });

        terminalBody.parentElement.addEventListener('click', function() {
            terminalInput.focus();
        });
    }


    // --- 5. Flipping Cards Logic ---
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });


    // --- 6. Shape Parallax Scroll Effect ---
    const shapes = document.querySelectorAll('.hero-shapes .shape');
    if (shapes.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.15;
                shape.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        });
    }

    // --- 7. Accordion Logic (Optional - Kept if you reuse it later) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(clickedHeader => {
        clickedHeader.addEventListener('click', () => {
            const isAlreadyOpen = clickedHeader.classList.contains('active');
            accordionHeaders.forEach(header => {
                header.classList.remove('active');
                header.nextElementSibling.style.maxHeight = null;
            });
            if (!isAlreadyOpen) {
                clickedHeader.classList.add('active');
                const content = clickedHeader.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- 8. Image Modal Logic ---
    const imageTrigger = document.getElementById('image-trigger');
    const imageModal = document.getElementById('image-modal');
    const modalClose = document.getElementById('modal-close');

    if (imageTrigger && imageModal && modalClose) {
        imageTrigger.addEventListener('click', () => {
            imageModal.classList.add('visible');
        });

        const closeModal = () => {
            imageModal.classList.remove('visible');
        };

        modalClose.addEventListener('click', closeModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeModal();
            }
        });
    }

    // --- 9. Certificate Gallery Modal Logic ---
    const certificateCards = document.querySelectorAll('.certificate-card:not(.placeholder)');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImage = document.getElementById('gallery-modal-image');
    const galleryModalClose = document.getElementById('gallery-modal-close');

    if (galleryModal) {
        certificateCards.forEach(card => {
            card.addEventListener('click', () => {
                const imageSrc = card.dataset.imageSrc;
                galleryModalImage.src = imageSrc;
                galleryModal.classList.add('visible');
            });
        });

        const closeGalleryModal = () => {
            galleryModal.classList.remove('visible');
            galleryModalImage.src = ""; 
        };

        galleryModalClose.addEventListener('click', closeGalleryModal);
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }

    // --- 10. Language Switcher Logic ---
    const langSwitcher = document.querySelector('.language-switcher');
    const langBtns = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[lang]');

    const switchLanguage = (targetLang) => {
        translatableElements.forEach(el => {
            if (el.getAttribute('lang') === targetLang) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });

        langBtns.forEach(btn => {
            if (btn.dataset.lang === targetLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        localStorage.setItem('preferredLanguage', targetLang);
    };

    if (langSwitcher) {
        langSwitcher.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const selectedLang = e.target.dataset.lang;
                switchLanguage(selectedLang);
            }
        });
    }

    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        switchLanguage(savedLang);
    } else {
        switchLanguage('en');
    }

});
