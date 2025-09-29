document.addEventListener('DOMContentLoaded', () => {
    // --- THEME TOGGLE LOGIC (RETAINED) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(savedTheme + '-mode');
    updateThemeIcon(savedTheme);

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'Switch to Light Mode';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'Switch to Dark Mode';
        }
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        let newTheme;

        if (currentTheme === 'light') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            newTheme = 'dark';
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            newTheme = 'light';
        }

        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    // --- ANIMATED INTRO LOGIC (MODIFIED) ---
    const overlay = document.getElementById('intro-overlay');
    const introAvatar = document.getElementById('intro-avatar'); // NEW
    const textElement = document.getElementById('animated-text');
    const fullText = "Hello, I'm Gautam Gupta"; // CHANGED: Your personalized greeting
    const avatarShowDelay = 500; // milliseconds before avatar appears
    const typingStartDelay = 800; // milliseconds after avatar appears before typing starts
    const typingSpeed = 70; 
    const delayBeforeFade = 1500; 

    let i = 0;

    function typeWriter() {
        if (i < fullText.length) {
            textElement.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Text is fully typed, delay and then fade out the overlay
            setTimeout(() => {
                overlay.classList.add('hidden-overlay');
            }, delayBeforeFade);
        }
    }

    // NEW: Sequence for avatar and text
    setTimeout(() => {
        introAvatar.classList.add('show'); // Show avatar
        setTimeout(() => {
            textElement.classList.add('show'); // Fade in text container
            typeWriter(); // Start typing
        }, typingStartDelay);
    }, avatarShowDelay);


    // --- DYNAMIC RESUME MOCKUP LOGIC (RETAINED) ---
    const resumeLink = document.getElementById('resume-link');
    const lastUpdatedDate = document.getElementById('last-updated-date');
    
    const dynamicResumeData = {
        fileUrl: 'https://drive.google.com/file/d/11Fo4NJf4bF8u9Xxe0m1bPcryvyCUuKiS/view',
        updated: 'August 12, 2025', 
    };

    resumeLink.href = dynamicResumeData.fileUrl;
    lastUpdatedDate.textContent = dynamicResumeData.updated;


    // --- CONTACT FORM MOCKUP LOGIC (RETAINED) ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        formStatus.textContent = "Sending...";
        formStatus.style.color = "#007bff";

        setTimeout(() => {
            formStatus.textContent = "Thank you! Your message has been sent successfully.";
            formStatus.style.color = "#28a745"; 
            contactForm.reset(); 
        }, 1500);
    });
});