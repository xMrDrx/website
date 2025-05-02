document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    const navbar = document.querySelector('.navbar');
    const headerHeight = 100;
    
    function handleScroll() {
        if (window.scrollY > headerHeight) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Theme management
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const themeStylesheet = document.getElementById('theme-style');
    const body = document.body;
    
    // Apply the theme based on localStorage or default to light
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (savedTheme === 'dark') {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    }
    
    // Function to apply dark theme
    function applyDarkTheme() {
        themeStylesheet.removeAttribute('disabled');
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
        
        // Update all theme toggle icons
        const icons = document.querySelectorAll('#theme-toggle i, #theme-toggle-mobile i');
        icons.forEach(icon => {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        });
        
        localStorage.setItem('theme', 'dark');
    }
    
    // Function to apply light theme
    function applyLightTheme() {
        themeStylesheet.setAttribute('disabled', true);
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        document.documentElement.setAttribute('data-theme', 'light');
        
        // Update all theme toggle icons
        const icons = document.querySelectorAll('#theme-toggle i, #theme-toggle-mobile i');
        icons.forEach(icon => {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        });
        
        localStorage.setItem('theme', 'light');
    }
    
    // Toggle theme on click
    themeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', function() {
                body.classList.add('theme-transition');
                
                if (body.classList.contains('light-theme')) {
                    applyDarkTheme();
                } else {
                    applyLightTheme();
                }
                
                setTimeout(function() {
                    body.classList.remove('theme-transition');
                }, 500);
            });
        }
    });
    
    // Initialize theme on page load
    initializeTheme();
    
    // Enhanced Logo Interactions
    const logos = document.querySelectorAll('.logo-img');
    logos.forEach(logo => {
        logo.addEventListener('mouseover', function() {
            logo.style.transform = 'translateY(-3px)';
        });
        
        logo.addEventListener('mouseout', function() {
            logo.style.transform = '';
        });
    });
    
    // Enhanced Hero Image Interactions
    const heroImage = document.querySelector('.hero-image');
    const animatedImage = document.querySelector('.animated-image');
    
    if (heroImage && animatedImage) {
        // Apply smoother transition for hover
        animatedImage.style.transition = 'all 0.5s ease';
        
        // Create parallax effect on mouse move
        document.addEventListener('mousemove', function(e) {
            // Only do parallax if we're not on mobile
            if (window.innerWidth > 768) {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                const moveX = (clientX / innerWidth - 0.5) * 15;
                const moveY = (clientY / innerHeight - 0.5) * 15;
                
                // Smooth transition for parallax
                animatedImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
        
        // Reset transform when mouse leaves
        heroImage.addEventListener('mouseleave', function() {
            animatedImage.style.transform = '';
        });
    }
    
    // Mobile Menu Toggle with enhanced animations
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                // Add overlay to darken background when menu is open
                if (!document.querySelector('.menu-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'menu-overlay';
                    document.body.appendChild(overlay);
                    
                    // Fade in overlay
                    setTimeout(() => {
                        overlay.style.opacity = '1';
                    }, 10);
                    
                    // Close menu when clicking overlay
                    overlay.addEventListener('click', function() {
                        closeMenu();
                    });
                }
                
                // Prevent body scrolling when menu is open
                document.body.style.overflow = 'hidden';
                
                // Change menu icon to close
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                
                // Add staggered animation to menu items
                const menuItems = navMenu.querySelectorAll('.nav-item');
                menuItems.forEach((item, index) => {
                    item.style.transitionDelay = (0.1 + index * 0.05) + 's';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                });
                
                // اضافه کردن دکمه تغییر تم به منوی موبایل اگر وجود نداشته باشد
                if (!document.querySelector('.mobile-theme-switcher')) {
                    const mobileThemeSwitcher = document.createElement('div');
                    mobileThemeSwitcher.className = 'mobile-theme-switcher';
                    
                    const mobileThemeToggle = document.createElement('button');
                    mobileThemeToggle.id = 'theme-toggle-mobile';
                    mobileThemeToggle.setAttribute('aria-label', 'Toggle theme');
                    
                    const icon = document.createElement('i');
                    icon.className = body.classList.contains('light-theme') ? 'fas fa-moon' : 'fas fa-sun';
                    
                    mobileThemeToggle.appendChild(icon);
                    mobileThemeSwitcher.appendChild(mobileThemeToggle);
                    
                    // اضافه کردن به منو
                    navMenu.appendChild(mobileThemeSwitcher);
                    
                    // Add animation to theme switcher
                    setTimeout(() => {
                        mobileThemeSwitcher.style.opacity = '1';
                        mobileThemeSwitcher.style.transform = 'translateY(0)';
                    }, 300);
                    
                    // اضافه کردن event listener
                    mobileThemeToggle.addEventListener('click', function() {
                        body.classList.add('theme-transition');
                        
                        if (body.classList.contains('light-theme')) {
                            applyDarkTheme();
                        } else {
                            applyLightTheme();
                        }
                        
                        setTimeout(function() {
                            body.classList.remove('theme-transition');
                        }, 500);
                    });
                }
            } else {
                closeMenu();
            }
        });
    }
    
    // Function to close the mobile menu
    function closeMenu() {
        if (navMenu) {
            // Reset menu item animations
            const menuItems = navMenu.querySelectorAll('.nav-item');
            menuItems.forEach(item => {
                item.style.transitionDelay = '0s';
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
            });
            
            // Reset theme switcher animation
            const themeSwitcher = navMenu.querySelector('.mobile-theme-switcher');
            if (themeSwitcher) {
                themeSwitcher.style.opacity = '0';
                themeSwitcher.style.transform = 'translateY(20px)';
            }
            
            // Remove overlay with fade out
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            }
            
            // Re-enable body scrolling
            document.body.style.overflow = '';
            
            // Change icon back to hamburger
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && 
            navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Make sure menu stays visible when active regardless of scroll position
    window.addEventListener('scroll', function() {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.style.position = 'fixed';
            navMenu.style.top = '0';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                e.preventDefault(); // Prevent default behavior to ensure menu closes first
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Wait a moment then navigate to the link
                const href = this.getAttribute('href');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    // Enhanced Testimonial Slider with Fade Effect
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlides.length > 0) {
        let currentSlide = 0;
        
        // Setup slides with proper styling
        testimonialSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Function to change slides with fade effect
        const showSlide = function(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        };
        
        // Next button click event
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % testimonialSlides.length;
                showSlide(currentSlide);
            });
        }
        
        // Previous button click event
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
                showSlide(currentSlide);
            });
        }
        
        // Auto-advance slides every 6 seconds
        setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 6000);
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create data object to send
            const formData = {
                name,
                email,
                subject,
                message,
                to: 'lil.mrdoctor@gmail.com'
            };
            
            // Here you would usually send the data to a server
            // For demonstration, we'll log it and show a success message
            console.log('Form Data:', formData);
            
            // Show success message
            alert('Your message has been sent successfully. Thank you!');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Scroll Animation
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run on load
    setTimeout(animateOnScroll, 300);
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // If the clicked item wasn't active, make it active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        
        // Open the first FAQ item by default
        if (faqItems[0]) {
            faqItems[0].classList.add('active');
        }
    }
    
    // Add loading animation class
    document.body.classList.add('loaded');
    
    // Download Modal Functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    const comingSoonModal = document.getElementById('coming-soon-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (downloadButtons.length > 0) {
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                comingSoonModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            comingSoonModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside
    comingSoonModal && comingSoonModal.addEventListener('click', function(e) {
        if (e.target === comingSoonModal) {
            comingSoonModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && comingSoonModal && comingSoonModal.classList.contains('active')) {
            comingSoonModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
}); 