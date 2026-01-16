document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const siteNav = document.querySelector('nav');
    
    mobileMenuButton.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            feather.replace();
        } else {
            mobileMenu.classList.add('hidden');
        }
    });

    // Smooth scroll for in-page anchors with fixed nav offset
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();

            const navOffset = siteNav ? siteNav.offsetHeight + 12 : 0;
            const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navOffset;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });

            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            // Toggle answer visibility
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('consultation-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Replace with your actual Google Form action URL and entry IDs
            const formAction = 'https://docs.google.com/forms/d/e/1FAIpQLSfx7QxqGc9tmBsK112HbAXUkLxi9Gow9kFaM2Vj9m2kRyRu0Q/formResponse';
            const nameEntry = 'entry.1696071945';
            const emailEntry = 'entry.1858917425';
            const phoneEntry = 'entry.1353879457';
            const budgetEntry = 'entry.145670213';
            const messageEntry = 'entry.380710471';
            
            const formData = new FormData(contactForm);
            const name = encodeURIComponent(formData.get('name'));
            const email = encodeURIComponent(formData.get('email'));
            const phone = encodeURIComponent(formData.get('phone') || '');
            const budget = encodeURIComponent(formData.get('budget'));
            const message = encodeURIComponent(formData.get('message'));
            
            const url = `${formAction}?${nameEntry}=${name}&${emailEntry}=${email}&${phoneEntry}=${phone}&${budgetEntry}=${budget}&${messageEntry}=${message}`;
            
            fetch(url, { 
                method: 'GET',
                mode: 'no-cors'
            })
            .then(() => {
                window.location.href = 'thank-you.html?from=form';
            })
            .catch(() => {
                alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.');
            });
        });
    }

    // Intersection Observer for Animations
    const animateElements = document.querySelectorAll('.fade-in, .slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});
