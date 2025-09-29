document.addEventListener('DOMContentLoaded', () => {
    // --- THEME TOGGLE LOGIC ---
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
    
    // --- ANIMATED INTRO LOGIC ---
    const overlay = document.getElementById('intro-overlay');
    const introAvatar = document.getElementById('intro-avatar'); 
    const textElement = document.getElementById('animated-text');
    const fullText = "Hello, I'm Gautam Gupta"; 
    const avatarShowDelay = 500; 
    const typingStartDelay = 800; 
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

    // Sequence for avatar and text
    setTimeout(() => {
        introAvatar.classList.add('show'); // Show avatar
        setTimeout(() => {
            textElement.classList.add('show'); // Fade in text container
            typeWriter(); // Start typing
        }, typingStartDelay);
    }, avatarShowDelay);


    // --- DYNAMIC RESUME LOGIC (MODIFIED FOR MODAL) ---
    // Modal elements
    const modal = document.getElementById('resume-modal');
    const closeBtn = document.getElementsByClassName('close-btn')[0];
    const resumeLink = document.getElementById('resume-link'); // Original button
    const modalDownloadBtn = document.getElementById('modal-download-btn'); // Modal download button
    const resumeIframe = document.getElementById('resume-iframe');

    // MOCK DATA (CRITICAL: Update your actual resume URLs here)
    const file_ID='1C4vJgM3lFIU386wOOK6331ZIB_OJ-p4b';
    const dynamicResumeData = {
        // This URL is used for the direct download button inside the modal
       fileUrl:  `https://drive.google.com/uc?export=download&id=${file_ID}`,
        //fileUrl: 'https://drive.google.com/file/d/1C4vJgM3lFIU386wOOK6331ZIB_OJ-p4b/view?usp=sharing', 
        
        // This URL is used to embed the PDF inside the modal iframe
       // iframeEmbedUrl: 'https://drive.google.com/file/d/1C4vJgM3lFIU386wOOK6331ZIB_OJ-p4b/preview' 
        iframeEmbedUrl: `https://drive.google.com/file/d/${file_ID}/preview`
    };

    // Initialize the main download button and the modal download button
    resumeLink.href = dynamicResumeData.fileUrl;
    modalDownloadBtn.href = dynamicResumeData.fileUrl;


    // 1. OPEN MODAL (Handles click on the main download button)
    resumeLink.addEventListener('click', function(event) {
        event.preventDefault(); // Stop the default new tab action

        // Load the PDF into the iframe
        resumeIframe.src = dynamicResumeData.iframeEmbedUrl;
        
        // Show the modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // 2. CLOSE MODAL (Handles click on the 'X' button)
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        resumeIframe.src = ''; // Clear iframe source to stop background processing
        document.body.style.overflow = 'auto';
    });

    // 3. CLOSE MODAL (Handles click outside the modal)
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            resumeIframe.src = '';
            document.body.style.overflow = 'auto';
        }
    });


    // --- PRACTICE INTERVIEW SECTION LOGIC (COMMENTED OUT) ---
    /*
    const interviewQuestions = {
        'selenium': [
            "What is the difference between findElement() and findElements()?",
            "Explain the concept of Implicit Wait and Explicit Wait in Selenium.",
            "How do you handle dynamic web elements (like AJAX calls) in Selenium?",
            "What are the types of WebDriver Exceptions you commonly encounter?"
        ],
        'cypress': [
            "What is Cypress and how does it differ from Selenium?",
            "Explain the Cypress Command Queue and how asynchronous commands are handled.",
            "How do you handle cross-origin navigation or visits in Cypress?",
            "What is a 'fixture' and how do you use it for data mocking?"
        ],
        'api': [
            "What is the significance of HTTP status codes 200, 201, 400, and 500?",
            "Explain the difference between PUT and PATCH methods.",
            "How do you handle token-based authentication (e.g., Bearer Token) in Postman?",
            "What is API schema validation and why is it important?"
        ],
        'ci-cd': [
            "What is Continuous Integration (CI) and why is it essential for QE?",
            "How do you trigger automated tests as part of a Jenkins/GitHub Actions pipeline?",
            "Explain the concept of a 'Quality Gate' in a CI/CD pipeline.",
            "What is the benefit of containerizing your test environment using Docker?"
        ]
    };

    const topicSelect = document.getElementById('topic-select');
    const questionsContainer = document.getElementById('questions-container');

    topicSelect.addEventListener('change', function() {
        const selectedTopic = this.value;
        let htmlContent = '';

        if (selectedTopic === 'default') {
            questionsContainer.innerHTML = '<p>Select a topic above to load interview questions.</p>';
            return;
        }

        const questions = interviewQuestions[selectedTopic];
        
        // Loop through the questions and build the HTML content
        questions.forEach((q, index) => {
            htmlContent += `
                <div class="question-item">
                    <strong>Q${index + 1}:</strong> ${q}
                </div>
            `;
        });

        // Update the container with the generated content
        questionsContainer.innerHTML = htmlContent;
    });
    */


    // --- CONTACT FORM MOCKUP LOGIC (RETAINED) ---
    // NOTE: This will give a mock success message. 
    // You must add your Formspree/Netlify action URL in the HTML for it to work.
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        formStatus.textContent = "Sending...";
        formStatus.style.color = "#007bff";

        setTimeout(() => {
            // Simulate success
            formStatus.textContent = "Thank you! Your message has been sent successfully.";
            formStatus.style.color = "#28a745"; 
            contactForm.reset(); 
        }, 1500);
    });
});