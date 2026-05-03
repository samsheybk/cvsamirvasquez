// Header Scroll Effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Trigger reveal on load
window.onload = () => {
    reveal();
};

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

// Check for saved theme
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggleBtn.textContent = '🌙';
} else {
    themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    }
});

// Dynamic Image Carousel Loader
async function loadCarouselImages() {
    const track = document.getElementById('dynamic-carousel');
    if (!track) return;

    let i = 1;
    let imagesHTML = '';

    // Helper function to check if an image exists
    const checkImageExists = (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    while (true) {
        const url = `Dashboards/${i}.png`;
        const exists = await checkImageExists(url);

        if (exists) {
            imagesHTML += `<img src="${url}" alt="Dashboard ${i}" class="carousel-img">`;
            i++;
        } else {
            // Stop when a number is missing
            break;
        }
    }

    // Inject images (duplicated for the infinite scroll effect)
    if (imagesHTML !== '') {
        track.innerHTML = imagesHTML + imagesHTML;
    }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", loadCarouselImages);

// Mobile Menu Toggle Logic
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const navClose = document.getElementById('nav-close');
const navOverlay = document.getElementById('nav-overlay');

function openMenu() {
    menuToggle.classList.add('active');
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuToggle && navLinks) {
    // Open menu
    menuToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close button inside nav
    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    // Overlay click closes menu
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    // Close menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
}

// Like Button Logic
const likeBtn = document.getElementById('like-btn');
const likeCount = document.getElementById('like-count');

if (likeBtn && likeCount) {
    // Inicializar likes usando localStorage o comenzar en un número base aleatorio para darle vida
    let currentLikes = parseInt(localStorage.getItem('cv_likes')) || 142;
    let hasLiked = localStorage.getItem('cv_has_liked') === 'true';

    // Establecer estado inicial
    likeCount.textContent = currentLikes;
    if (hasLiked) {
        likeBtn.classList.add('liked');
    }

    likeBtn.addEventListener('click', () => {
        if (!hasLiked) {
            currentLikes++;
            hasLiked = true;
            likeBtn.classList.add('liked');
        } else {
            currentLikes--;
            hasLiked = false;
            likeBtn.classList.remove('liked');
        }

        likeCount.textContent = currentLikes;
        localStorage.setItem('cv_likes', currentLikes);
        localStorage.setItem('cv_has_liked', hasLiked);
    });
}
