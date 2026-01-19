const PAGE = {
    init() {
        PAGE.set_active_section();
        PAGE.set_cursor_animation();
    },

    set_active_section(){
        const SECTIONS = document.querySelectorAll("section");
        const NAVLINKS = document.querySelectorAll(".nav-item");

        window.addEventListener("scroll", () => {
            let current = "";
            SECTIONS.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute("id");
                }
            });
            NAVLINKS.forEach(link => {
                link.classList.remove("nav-line-active");
                if (link.getAttribute("href") === "#" + current) {
                    link.classList.add("nav-line-active");
                }
            });
        });
    },
    set_cursor_animation(){
        const CANVAS = document.getElementById('cursorCanvas'); 
        const CTX = CANVAS.getContext('2d'); 
        CANVAS.width = window.innerWidth; 
        CANVAS.height = window.innerHeight; 
        let mouseX = CANVAS.width / 2, mouseY = CANVAS.height / 2; 
        const TRAIL = [];
        let active = false; 
        let inactivityTimer;
        
        window.addEventListener('mousemove', e => { 
            mouseX = e.clientX; 
            mouseY = e.clientY;
            active = true;

            clearTimeout(inactivityTimer); 
            inactivityTimer = setTimeout(() => active = false, 3000);
        });

        window.addEventListener('touchmove', e => { 
            const TOUCH = e.touches[0];
            mouseX = TOUCH.clientX; 
            mouseY = TOUCH.clientY;
            active = true;

            clearTimeout(inactivityTimer); 
            inactivityTimer = setTimeout(() => active = false, 3000);
        });

        function animate() { 
            CTX.clearRect(0, 0, CANVAS.width, CANVAS.height); 
            
            if(active) TRAIL.push({ x: mouseX, y: mouseY, r: 480, alpha: 1 });
            
            for (let i = 0; i < TRAIL.length; i++) { 
                const P = TRAIL[i]; 
                CTX.beginPath(); 
                const G = CTX.createRadialGradient(P.x, P.y, 0, P.x, P.y, P.r);
                
                G.addColorStop(0.5, `rgba(0, 12, 29, 0.1)`);
                G.addColorStop(1, `rgba(67, 177, 255, 0)`);
                CTX.fillStyle = G; 
                CTX.arc(P.x, P.y, P.r, 0, Math.PI * 2); 
                CTX.fill(); 
                P.r *= 0.95; 
                P.alpha *= 1; 
                
                if (P.alpha < 0.01) TRAIL.splice(i, 1); 
            } 
            requestAnimationFrame(animate); 
        } 
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PAGE.init();
});