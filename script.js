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


    // --- 5. Animated Skills Constellation ---
    const canvas = document.getElementById('skills-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const container = document.querySelector('.skills-canvas-container');

        const setCanvasDimensions = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        setCanvasDimensions();

        const style = getComputedStyle(document.documentElement);
        const primaryColor = style.getPropertyValue('--primary-color').trim();
        const secondaryColor = style.getPropertyValue('--secondary-color').trim();
        const strongTextColor = style.getPropertyValue('--text-strong').trim();

        let particlesArray = [];
        const skills = [
            { text: 'C Programming', size: 1.2, isTech: true }, { text: 'Data Structures', size: 1.1, isTech: true },
            { text: 'Algorithms', size: 1.1, isTech: true }, { text: 'Linux Basics', size: 1, isTech: true },
            { text: 'Vim', size: 1, isTech: true }, { text: 'Leadership', size: 1.1, isTech: false },
            { text: 'Problem-Solving', size: 1.2, isTech: false }, { text: 'Teamwork', size: 1, isTech: false },
            { text: 'Crisis Management', size: 1, isTech: false }, { text: 'Adaptability', size: 1, isTech: false }
        ];

        const mouse = { x: null, y: null, radius: 80 };

        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });

        canvas.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, dirX, dirY, size, text, isTech) {
                this.x = x; this.y = y; this.dirX = dirX; this.dirY = dirY;
                this.baseSize = size * 5; this.size = this.baseSize;
                this.text = text; this.isTech = isTech; this.isStopped = false;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.isTech ? primaryColor : secondaryColor;
                ctx.fill();

                ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
                ctx.shadowBlur = 5;

                ctx.fillStyle = strongTextColor;
                ctx.font = `bold ${this.size * 2.5}px Rubik`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.text, this.x, this.y);

                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
            }

            update() {
                if (this.x > canvas.width || this.x < 0) this.dirX = -this.dirX;
                if (this.y > canvas.height || this.y < 0) this.dirY = -this.dirY;

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    this.isStopped = true;
                    this.size = this.baseSize * 1.5;
                } else {
                    this.isStopped = false;
                    this.size = this.baseSize;
                }

                if (!this.isStopped) {
                    this.x += this.dirX;
                    this.y += this.dirY;
                }
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            for (const skill of skills) {
                let size = skill.size;
                let x = Math.random() * (canvas.width - size * 20) + size * 10;
                let y = Math.random() * (canvas.height - size * 20) + size * 10;
                let dirX = (Math.random() * 0.4) - 0.2;
                let dirY = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, dirX, dirY, size, skill.text, skill.isTech));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 25000);
                        ctx.strokeStyle = `rgba(176, 190, 197, ${opacityValue * 0.5})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const particle of particlesArray) {
                particle.update();
            }
            connect();
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            setCanvasDimensions();
            init();
        });
    }

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

});