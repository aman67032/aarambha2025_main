window.aarambhaAnimatorConfig = {
    enableParallax: false,      // Disable parallax
    enableVideoTriggers: false, // Disable video controls
    enableNavbarEffects: false  // Disable navbar animations
};
// VIDEO POPUP FUNCTIONALITY
function openPopup(videoSrc) {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");
    popup.style.display = "flex";
    popupVideo.src = videoSrc;
}

function closePopup() {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");
    popup.style.display = "none";
    popupVideo.pause();
    popupVideo.src = "";
}

 // Particle System
        class ParticleSystem {
            constructor(canvas) {
                this.canvas = canvas;
                this.ctx = canvas.getContext('2d');
                this.particles = [];
                this.resize();
                this.init();
                
                window.addEventListener('resize', () => this.resize());
            }

            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            init() {
                for (let i = 0; i < 100; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        size: Math.random() * 2 + 1,
                        opacity: Math.random() * 0.5 + 0.2,
                        color: this.getRandomColor()
                    });
                }
            }

            getRandomColor() {
                const colors = ['#8D0B41', '#D39D55', '#C685A0', '#B35C80', '#E9CEAA'];
                return colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

                    particle.opacity += (Math.random() - 0.5) * 0.02;
                    particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
                });
            }

            draw() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Draw connections
                this.particles.forEach((particle, i) => {
                    this.particles.slice(i + 1).forEach(otherParticle => {
                        const distance = Math.sqrt(
                            Math.pow(particle.x - otherParticle.x, 2) +
                            Math.pow(particle.y - otherParticle.y, 2)
                        );
                        
                        if (distance < 100) {
                            this.ctx.strokeStyle = `rgba(211, 157, 85, ${0.1 * (1 - distance / 100)})`;
                            this.ctx.lineWidth = 1;
                            this.ctx.beginPath();
                            this.ctx.moveTo(particle.x, particle.y);
                            this.ctx.lineTo(otherParticle.x, otherParticle.y);
                            this.ctx.stroke();
                        }
                    });
                });

                // Draw particles
                this.particles.forEach(particle => {
                    this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                });
            }

            animate() {
                this.update();
                this.draw();
                requestAnimationFrame(() => this.animate());
            }
        }

        // Initialize loading animation
        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('particle-canvas');
            const particleSystem = new ParticleSystem(canvas);
            particleSystem.animate();

            // Loading sequence
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                const mainContent = document.getElementById('main-content');
                
                loadingScreen.classList.add('fade-out');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.add('show');
                }, 1500);
            }, 6500); // Total loading time: 6.5 seconds
        });

        // Add some interactive effects
        document.addEventListener('mousemove', (e) => {
            const glitchElements = document.querySelectorAll('.glitch');
            glitchElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    element.style.filter = 'hue-rotate(' + (x / rect.width * 360) + 'deg)';
                }
            });
        });
// Schedule Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Initialize schedule data for all days
    const scheduleData = {
        day1: [
            {
                time: '9:00 AM - 10:30 AM',
                title: 'Registration & Welcome Kit Distribution',
                location: 'Main Auditorium'
            },
            {
                time: '11:00 AM - 12:30 PM',
                title: 'Inaugural Ceremony',
                location: 'Main Auditorium'
            },
            {
                time: '1:30 PM - 2:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '3:00 PM - 5:00 PM',
                title: 'Ice Breaking Sessions',
                location: 'Department-wise Activity Areas'
            }
        ],
        day2: [
            {
                time: '9:30 AM - 11:00 AM',
                title: 'University Tour',
                location: 'Campus Grounds'
            },
            {
                time: '11:30 AM - 1:00 PM',
                title: 'Department Introduction',
                location: 'Respective Departments'
            },
            {
                time: '1:00 PM - 2:00 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:30 PM - 4:30 PM',
                title: 'Industry Expert Talk',
                location: 'Seminar Hall'
            },
            {
                time: '5:00 PM - 7:00 PM',
                title: 'Cultural Activities',
                location: 'Central Lawn'
            }
        ],
        day3: [
            {
                time: '9:30 AM - 11:30 AM',
                title: 'Workshop: Career Planning',
                location: 'Lecture Hall 1'
            },
            {
                time: '12:00 PM - 1:30 PM',
                title: 'Alumni Interaction',
                location: 'Seminar Hall'
            },
            {
                time: '1:30 PM - 2:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '3:00 PM - 6:00 PM',
                title: 'Sports & Games',
                location: 'Sports Complex'
            }
        ],
        day4: [
            {
                time: '9:30 AM - 12:30 PM',
                title: 'Technical Workshop',
                location: 'Computer Labs'
            },
            {
                time: '12:30 PM - 1:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:00 PM - 4:00 PM',
                title: 'Entrepreneurship Session',
                location: 'E-Cell Hub'
            },
            {
                time: '4:30 PM - 6:30 PM',
                title: 'Talent Hunt Preliminaries',
                location: 'Auditorium'
            }
        ],
        day5: [
            {
                time: '10:00 AM - 12:00 PM',
                title: 'Motivational Talk',
                location: 'Main Auditorium'
            },
            {
                time: '12:30 PM - 1:30 PM',
                title: 'Lunch Break',
                location: 'University Cafeteria'
            },
            {
                time: '2:00 PM - 5:00 PM',
                title: 'Cultural Night & Talent Hunt Finals',
                location: 'Main Auditorium'
            },
            {
                time: '5:30 PM - 7:00 PM',
                title: 'Closing Ceremony',
                location: 'Main Auditorium'
            }
        ]
    };
    
    // Function to create schedule HTML
    function createScheduleHTML(day) {
        const scheduleItems = scheduleData[day];
        let html = '';
        
        scheduleItems.forEach(item => {
            html += `
                <div class="schedule-item">
                    <div class="time">${item.time}</div>
                    <div class="event-details">
                        <h3>${item.title}</h3>
                        <p>${item.location}</p>
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    // Initially load day 1 schedule
    const day1Content = document.getElementById('day1');
    if (day1Content) {
        day1Content.innerHTML = createScheduleHTML('day1');
    }
    
    // Tab switching
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the day data attribute
                const day = this.getAttribute('data-day');
                
                // Hide all tab panes
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Show the selected tab pane
                const tabPane = document.getElementById(day);
                if (!tabPane) {
                    // Create tab pane if it doesn't exist
                    const newPane = document.createElement('div');
                    newPane.id = day;
                    newPane.className = 'tab-pane active';
                    newPane.innerHTML = createScheduleHTML(day);
                    document.querySelector('.tab-content').appendChild(newPane);
                } else {
                    tabPane.classList.add('active');
                    // Update content if it's empty
                    if (tabPane.innerHTML.trim() === '') {
                        tabPane.innerHTML = createScheduleHTML(day);
                    }
                }
            });
        });
    }

window.onload = () => {
  const gallery = document.querySelector(".gallery-grid");
  const images = Array.from(gallery.children);

  // Clone all images to allow infinite scroll
  images.forEach((img) => {
    const clone = img.cloneNode(true);
    gallery.appendChild(clone);
  });
};

function updateCountdown() {
    const targetDate = new Date('July 25, 2025 00:00:00').getTime();
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelector('.countdown').innerHTML = '<h2>Event Started!</h2>';
        }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateCountdown);


// Mobile-optimized JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuToggle && navLinks) {
        // Stop event propagation on the menu itself
        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from immediately closing
            navLinks.classList.toggle('mobile-active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking on a link
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('mobile-active') && !navbar.contains(event.target)) {
                navLinks.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Touch-friendly video popup for mobile
    const videos = document.querySelectorAll('.video-row video');
    const popup = document.querySelector('.popup');
    const popupVideo = document.querySelector('.popup-content video');
    const closeBtn = document.querySelector('.close');

    videos.forEach(video => {
        video.addEventListener('click', function() {
            if (popup && popupVideo) {
                popupVideo.src = this.src;
                popup.style.display = 'flex';
                // Pause all other videos
                videos.forEach(v => v.pause());
            }
        });
    });

    if (closeBtn && popup) {
        closeBtn.addEventListener('click', function() {
            popup.style.display = 'none';
            if (popupVideo) {
                popupVideo.pause();
            }
        });

        // Close popup when clicking outside
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.style.display = 'none';
                if (popupVideo) {
                    popupVideo.pause();
                }
            }
        });
    }

    // Touch-friendly gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightbox.style.display = 'flex';
            }
        });
    });

    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Countdown Timer (Mobile optimized)
    function updateCountdown() {
        const eventDate = new Date('2024-12-31T23:59:59'); // Replace with your event date
        const now = new Date();
        const difference = eventDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const countdownElements = {
                days: document.querySelector('.countdown-box:nth-child(1) span:first-child'),
                hours: document.querySelector('.countdown-box:nth-child(2) span:first-child'),
                minutes: document.querySelector('.countdown-box:nth-child(3) span:first-child'),
                seconds: document.querySelector('.countdown-box:nth-child(4) span:first-child')
            };

            if (countdownElements.days) countdownElements.days.textContent = days;
            if (countdownElements.hours) countdownElements.hours.textContent = hours;
            if (countdownElements.minutes) countdownElements.minutes.textContent = minutes;
            if (countdownElements.seconds) countdownElements.seconds.textContent = seconds;
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately

    // Handle tab switching on mobile
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs and panes
            tabBtns.forEach(tab => tab.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            if (tabPanes[index]) {
                tabPanes[index].classList.add('active');
            }
        });
    });

    // Gallery filters for mobile
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItemsAll = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItemsAll.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

   

    // Prevent menu body scroll when mobile menu is open
    const style = document.createElement('style');
    style.textContent = `
        body.menu-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        // Close mobile menu on orientation change
        if (navLinks && navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            mobileMenuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        // Refresh layout after orientation change
        setTimeout(() => {
            window.scrollTo(window.scrollX, window.scrollY);
        }, 500);
    });

    // Touch gesture support for gallery
    let touchStartX = 0;
    let touchStartY = 0;

    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        lightbox.addEventListener('touchend', function(e) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            // Close lightbox on swipe down
            if (Math.abs(diffY) > Math.abs(diffX) && diffY < -50) {
                lightbox.style.display = 'none';
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Utility function to detect mobile device
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Utility function to handle viewport height on mobile
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set initial viewport height
setVH();

// Update on resize and orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', () => {
    setTimeout(setVH, 500);
});