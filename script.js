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
        const commands = {
            help: `Available commands: <br>
                   - about-mehdi: Shows a brief summary about me.<br>
                   - skills: Lists my technical skills.<br>
                   - contact: Displays my contact information.<br>
                   - clear: Clears the terminal screen.`,
            
            "about-mehdi": `I approach any challenge not just as a task, but as a discipline. It's a structured way to practice logic, solve complex puzzles, and understand foundational systems. My journey with C is a personal exploration of these fundamentals.`,
            
            skills: `My current technical toolbox includes: C Programming, Data Structures & Algorithms, Linux Basics, and Vim.`,
            
            contact: `You can reach me via <a href="mailto:mehdiaitbouazza6@gmail.com">Email</a> or connect on <a href="https://github.com/Mehdiaitbouazza" target="_blank">GitHub</a>.`,
            
            clear: ''
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
                    const output = document.createElement('p');
                    output.innerHTML = commands[command];
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

    // --- 7. Accordion Logic ---
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

});