// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleMenu);
}

// Header Scroll Effect
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

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

            // Close mobile menu after scrolling
            setTimeout(() => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            }, 500);
        }
    });
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (themeToggleBtn) {
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
}

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

// CTA Modal Logic
const ctaModal = document.getElementById('cta-modal');
const ctaClose = document.getElementById('cta-close');
const ctaForm = document.getElementById('cta-form');

document.querySelectorAll('.cta-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        if (ctaModal) ctaModal.classList.add('active');
    });
});

// CV Modal Logic
const cvModal = document.getElementById('cv-modal');
const cvClose = document.getElementById('cv-close');

document.querySelectorAll('.cv-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
        if (cvModal) cvModal.classList.add('active');
    });
});

if (ctaClose && ctaModal) {
    ctaClose.addEventListener('click', () => {
        ctaModal.classList.remove('active');
    });
}

if (cvClose && cvModal) {
    cvClose.addEventListener('click', () => {
        cvModal.classList.remove('active');
    });
}

if (cvModal) {
    cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) {
            cvModal.classList.remove('active');
        }
    });
}

if (ctaModal) {
    ctaModal.addEventListener('click', (e) => {
        if (e.target === ctaModal) {
            ctaModal.classList.remove('active');
        }
    });
}

if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('cta-name').value.trim();
        const phone = document.getElementById('cta-phone').value.trim();
        const email = document.getElementById('cta-email').value.trim();
        const message = document.getElementById('cta-message').value.trim();

        let text = `Hola Samir, soy *${name}*. Me interesa crear mi propia web.\n\n`;
        text += `📱 Teléfono: ${phone}\n`;
        text += `📧 Correo: ${email}`;
        if (message) {
            text += `\n\n💬 Mensaje: ${message}`;
        }

        const whatsappUrl = `https://wa.me/584128445726?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');

        ctaModal.classList.remove('active');
        ctaForm.reset();
    });
}

// Supabase Configuration
const SUPABASE_URL = 'https://ejajfqfhrhfgcuwxiyii.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqYWpmcWZocmhmZ2N1d3hpeWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MTQ5MTYsImV4cCI6MjA5MzQ5MDkxNn0.wg2T2nPWM9H1rOoijwCJEO4M0HDqhY9w76DcK-NvSxU';

let db = null;
if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'TU_SUPABASE_URL_AQUI') {
    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Supabase Likes Logic
const likeForm = document.getElementById('like-form');
const likesFeed = document.getElementById('likes-feed');

if (likeForm && likesFeed && db) {

    async function loadLikes() {
        const { data, error } = await db
            .from('likes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error cargando likes:', error);
            likesFeed.innerHTML = '<p class="loading-likes">No se pudieron cargar los likes.</p>';
            return;
        }

        likesFeed.innerHTML = '';

        if (data.length === 0) {
            likesFeed.innerHTML = '<p class="loading-likes">Sé el primero en dejar un like ❤️</p>';
        } else {
            data.forEach(like => {
                const date = new Date(like.created_at);
                const formattedDate = date.toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'short', year: 'numeric'
                });

                const likeEl = document.createElement('div');
                likeEl.className = 'like-item';
                likeEl.innerHTML = `
                    <div class="like-header">
                        <span class="like-name">${escapeHTML(like.name)}</span>
                        <span class="like-date">${formattedDate}</span>
                    </div>
                    <p class="like-comment">${escapeHTML(like.comment)}</p>
                `;
                likesFeed.appendChild(likeEl);
            });
        }

        // Update hero stats
        const heroLikes = document.getElementById('hero-likes-count');
        if (heroLikes) heroLikes.textContent = data.length;
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    likeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('like-name').value.trim();
        const comment = document.getElementById('like-comment').value.trim();

        if (!name || !comment) return;

        const submitBtn = likeForm.querySelector('.like-submit');
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        const { error } = await db
            .from('likes')
            .insert([{ name, comment }]);

        if (error) {
            console.error('Error enviando like:', error);
            submitBtn.textContent = 'Error al enviar';
        } else {
            likeForm.reset();
            await loadLikes();
            submitBtn.textContent = '❤️ Dar Like';
        }

        submitBtn.disabled = false;
    });

    async function trackVisit() {
        await db.from('visits').insert({});
        const { count, error } = await db.from('visits').select('*', { count: 'exact', head: true });

        if (!error) {
            const heroVisits = document.getElementById('hero-visits-count');
            if (heroVisits) heroVisits.textContent = count;
        }
    }

    trackVisit();
    loadLikes();
} else if (likeForm && likesFeed) {
    likesFeed.innerHTML = '<p class="loading-likes">Configura Supabase para activar el muro de likes.</p>';
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

// Blog Dynamic Content
const blogGrid = document.getElementById('blog-grid');

if (blogGrid && db) {
    async function renderBlogs() {
        blogGrid.innerHTML = '<p class="loading-likes">Cargando artículos...</p>';

        try {
            const { data: posts, error } = await db
                .from('blogs')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                console.error('Error Supabase:', error.message);
                blogGrid.innerHTML = `<p class="loading-likes">Error: ${error.message}</p>`;
                return;
            }

            if (!posts || posts.length === 0) {
                blogGrid.innerHTML = '<p class="loading-likes">No hay artículos cargados aún.</p>';
                return;
            }

            blogGrid.innerHTML = '';

            posts.forEach(post => {
                const article = document.createElement('article');
                article.className = 'blog-card';
                article.innerHTML = `
                    <div class="blog-card-image">
                        <img src="Recursos/${post.id}.jpg" alt="${post.title}" onerror="this.src='https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80'">
                    </div>
                    <div class="blog-card-content">
                        <span class="blog-tag">${post.tag}</span>
                        <h2>${post.title}</h2>
                        <p>${post.content}</p>
                        <div class="blog-meta">
                            <span>${post.date}</span>
                            <span>${post.readTime}</span>
                        </div>
                        <a href="javascript:void(0)" class="blog-read-more" data-id="${post.id}">Descargar <span class="download-count">${post.downloads || 0}</span> ⬇</a>
                    </div>
                `;
                blogGrid.appendChild(article);
            });

            document.querySelectorAll('.blog-read-more').forEach(link => {
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const postId = parseInt(link.getAttribute('data-id'));
                    const pdfPath = `Blogs%20PDF/${postId}.pdf`;
                    const countSpan = link.querySelector('.download-count');
                    
                    window.open(pdfPath, '_blank');

                    const newCount = (parseInt(countSpan?.textContent) || 0) + 1;
                    if (countSpan) countSpan.textContent = newCount;

                    await db.from('blogs').update({ downloads: newCount }).eq('id', postId);
                });
            });
        } catch (err) {
            console.error('Error inesperado:', err);
            blogGrid.innerHTML = '<p class="loading-likes">Error inesperado al cargar.</p>';
        }
    }

    renderBlogs();
}

// Blog Download Logic
if (blogGrid) {
    // Cargar contadores al inicio
    async function loadDownloadCounts() {
        if (!db) return;
        const countEls = document.querySelectorAll('[id^="dl-count-"]');
        for (const el of countEls) {
            const articleId = parseInt(el.id.replace('dl-count-', ''));
            try {
                const { count, error } = await db.from('downloads').select('*', { count: 'exact', head: true }).eq('article_id', articleId);
                if (!error && count !== null) el.textContent = count;
            } catch (err) {}
        }
    }

    // Usar delegación de eventos y abrir inmediatamente
    blogGrid.addEventListener('click', (e) => {
        const link = e.target.closest('.blog-read-more');
        if (!link) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const articleId = link.getAttribute('data-article');
        const pdfPath = `Blogs%20PDF/${articleId}.pdf`;

        // 1. Abrir nueva pestaña INMEDIATAMENTE
        window.open(pdfPath, '_blank');

        // 2. Actualizar contador visual
        const countEl = document.getElementById(`dl-count-${articleId}`);
        if (countEl) {
            countEl.textContent = (parseInt(countEl.textContent) || 0) + 1;
        }

        // 3. Registrar en DB (convertir a entero para evitar errores de tipo)
        if (db) {
            db.from('downloads').insert([{ article_id: parseInt(articleId) }]);
        }
    });

    loadDownloadCounts();
}
