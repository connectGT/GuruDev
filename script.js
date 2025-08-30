document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Animate Skill Bars on Scroll ---
    gsap.utils.toArray('.progress-bar').forEach(bar => {
        gsap.fromTo(bar, 
            { width: '0%' }, 
            { 
                width: bar.dataset.width, 
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // --- General Section Fade-in Animation ---
    gsap.utils.toArray('section').forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Staggered animation for work cards
    gsap.from(".card-spotlight", {
        scrollTrigger: {
            trigger: "#work",
            start: "top 80%",
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2
    });


    // --- Text Animation Script ---
    const animatedPrefixSpan = document.getElementById('animated-prefix');
    const animatedTextSpan = document.getElementById('animated-text');
    const prefixText = "Hi, I'm ";
    const textArray = ["Guru Tiwari", "a Content Creator", "an Aspiring Web Developer", "Indian"];
    const typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000;
    let prefixCharIndex = 0, textArrayIndex = 0, charIndex = 0;

    function typePrefix() {
        if (prefixCharIndex < prefixText.length) {
            animatedPrefixSpan.textContent += prefixText.charAt(prefixCharIndex++);
            setTimeout(typePrefix, typingSpeed);
        } else {
            setTimeout(type, 500);
        }
    }
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            animatedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex++);
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, pauseDuration);
        }
    }
    function erase() {
        if (charIndex > 0) {
            animatedTextSpan.textContent = textArray[textArrayIndex].substring(0, --charIndex);
            setTimeout(erase, deletingSpeed);
        } else {
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingSpeed + 500);
        }
    }
    setTimeout(typePrefix, 1000);

    // --- Spotlight Effect Script ---
    document.querySelectorAll('.card-spotlight').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // --- Profile Card Tilt Effect ---
    const profileCardWrapper = document.querySelector('.pc-card-wrapper');
    if (profileCardWrapper) {
        const profileCard = profileCardWrapper.querySelector('.pc-card');
        
        profileCard.addEventListener('pointermove', e => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            profileCardWrapper.style.setProperty('--pointer-x', `${(x / rect.width * 100).toFixed(2)}%`);
            profileCardWrapper.style.setProperty('--pointer-y', `${(y / rect.height * 100).toFixed(2)}%`);
        });
        
        profileCard.addEventListener('pointerenter', () => {
            profileCardWrapper.classList.add('active');
        });
        profileCard.addEventListener('pointerleave', () => {
            profileCardWrapper.classList.remove('active');
        });
    }

    // --- Target Cursor Script ---
    const cursorWrapper = document.querySelector(".target-cursor-wrapper");
    if(cursorWrapper) {
        const dot = cursorWrapper.querySelector(".target-cursor-dot");
        const corners = cursorWrapper.querySelectorAll(".target-cursor-corner");
        const targetSelector = ".cursor-target";
        let isTargetActive = false;

        gsap.set(cursorWrapper, { xPercent: -50, yPercent: -50 });
        
        window.addEventListener("mousemove", e => {
            if (!isTargetActive) {
                gsap.to(cursorWrapper, { x: e.clientX, y: e.clientY, duration: 0.2, ease: "power2.out" });
            }
        });

        document.addEventListener('mouseover', e => {
            const target = e.target.closest(targetSelector);
            if (target) {
                isTargetActive = true;
                const rect = target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const cornerSize = 12;
                const borderWidth = 3;
                
                gsap.to(cursorWrapper, { x: centerX, y: centerY, duration: 0.3, ease: 'power2.out' });
                gsap.to(corners[0], { x: -rect.width / 2 - borderWidth, y: -rect.height / 2 - borderWidth, duration: 0.3, ease: 'power2.out' });
                gsap.to(corners[1], { x: rect.width / 2 + borderWidth - cornerSize, y: -rect.height / 2 - borderWidth, duration: 0.3, ease: 'power2.out' });
                gsap.to(corners[2], { x: rect.width / 2 + borderWidth - cornerSize, y: rect.height / 2 + borderWidth - cornerSize, duration: 0.3, ease: 'power2.out' });
                gsap.to(corners[3], { x: -rect.width / 2 - borderWidth, y: rect.height / 2 + borderWidth - cornerSize, duration: 0.3, ease: 'power2.out' });
            }
        });

        document.addEventListener('mouseout', e => {
            const target = e.target.closest(targetSelector);
            if (target) {
                isTargetActive = false;
                const cornerSize = 12;
                gsap.to(corners[0], { x: -cornerSize * 1.5, y: -cornerSize * 1.5, duration: 0.3, ease: 'power2.out' });
                gsap.to(corners[1], { x: cornerSize * 0.5, y: -cornerSize * 1.5, duration: 0.3, ease: 'power2.out' });
                gsap.to(corners[2], { x: cornerSize * 0.5, y: cornerSize * 0.5, duration: 0.3, ease: 'power2.out' });
                gsap.to(corners[3], { x: -cornerSize * 1.5, y: cornerSize * 0.5, duration: 0.3, ease: 'power2.out' });
            }
        });
        
        window.addEventListener("mousedown", () => {
            gsap.to(dot, { scale: 0.7, duration: 0.3 });
            gsap.to(cursorWrapper, { scale: 0.9, duration: 0.2 });
        });
        window.addEventListener("mouseup", () => {
            gsap.to(dot, { scale: 1, duration: 0.3 });
            gsap.to(cursorWrapper, { scale: 1, duration: 0.2 });
        });
    }
});
