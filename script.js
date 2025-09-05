document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                bar.style.width = bar.getAttribute('data-width');
            }
        });
    }
    
    // Initial check and then on scroll
    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server here
            // For this example, we'll just show an alert and reset the form
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Header background change on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 30, 30, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--card-bg)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Function to update profile photo
    function updateProfilePhoto(photoUrl) {
        const profilePhoto = document.getElementById('profile-photo');
        if (profilePhoto && photoUrl) {
            profilePhoto.src = photoUrl;
        }
    }
    
    // Example of how to change the photo (you can call this function from browser console)
    window.updateProfilePhoto = updateProfilePhoto;
    
    // Dark/Light mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Auto typing effect
    const autoTypeElement = document.querySelector('.auto-type');
    const text = "Programmer, Frontend Developer ";
    let index = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = text.substring(0, index);
        autoTypeElement.innerHTML = currentText + '<span class="typed-cursor">|</span>';
        
        if (!isDeleting && index < text.length) {
            // Typing forward
            index++;
            typingSpeed = 100;
        } else if (isDeleting && index > 0) {
            // Deleting
            index--;
            typingSpeed = 50;
        }
        
        // Change direction
        if (index === text.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (index === 0 && isDeleting) {
            isDeleting = false;
            typingSpeed = 500; // Pause at the start
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
});