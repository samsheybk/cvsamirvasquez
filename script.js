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
        const url = `Dashboards/${i}.webp`;
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
        const message = document.getElementById('cta-message').value.trim();

        let text = `Hola Samir, soy *${name}*. Me interesa crear mi propia web.`;
        if (message) {
            text += `\n\n💬 Mensaje: ${message}`;
        }

        const whatsappUrl = `https://wa.me/584128445726?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');

        ctaModal.classList.remove('active');
        ctaForm.reset();
    });
}

// Splash Modal Logic
const splashModal = document.getElementById('splash-modal');
const splashClose = document.getElementById('splash-close');
const splashCountdown = document.getElementById('splash-countdown');

if (splashModal && splashClose && splashCountdown) {
    let seconds = 15;
    splashCountdown.textContent = seconds;

    function closeSplash() {
        splashModal.classList.remove('active');
    }

    splashClose.addEventListener('click', closeSplash);

    splashModal.addEventListener('click', (e) => {
        if (e.target === splashModal) closeSplash();
    });

    const timer = setInterval(() => {
        seconds--;
        splashCountdown.textContent = seconds;
        if (seconds <= 0) {
            clearInterval(timer);
            closeSplash();
        }
    }, 1000);

    // Mostrar splash con un leve retardo para que cargue la imagen
    setTimeout(() => {
        splashModal.classList.add('active');
    }, 300);
}

// Supabase Configuration
// Credenciales cargadas desde config.js (incluido vía <script> en el HTML)

let db = null;
function initSupabase() {
    if (typeof window.supabase !== 'undefined' && typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL !== 'https://tu-proyecto.supabase.co') {
        if (!db) db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return true;
    }
    return false;
}

initSupabase();

// Supabase Likes Logic
const likeForm = document.getElementById('like-form');
const likesFeed = document.getElementById('likes-feed');

function setupLikes() {
    if (!likeForm || !likesFeed) return;
    if (!db && !initSupabase()) {
        likesFeed.innerHTML = '<p class="loading-likes">Configurando conexión...</p>';
        setTimeout(setupLikes, 500);
        return;
    }

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
        if (heroLikes) heroLikes.textContent = formatNumber(data.length);
    }

    function formatNumber(n) {
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        return n;
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
            if (heroVisits) heroVisits.textContent = formatNumber(count);
        }
    }

    trackVisit();
    loadLikes();
}

document.addEventListener('DOMContentLoaded', setupLikes);

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

// Tech Stack Logo Glow Animation
function startLogoGlow() {
    const logos = document.querySelectorAll('.tech-stack-logos img');
    if (!logos.length) return;
    let i = 0;
    function tick() {
        logos.forEach(l => l.classList.remove('glowing'));
        logos[i].classList.add('glowing');
        i = (i + 1) % logos.length;
    }
    tick();
    setInterval(tick, 2000);
}
startLogoGlow();

// Blog Dynamic Content
const blogGrid = document.getElementById('blog-grid');

// Variables globales para el modal
const downloadModal = document.getElementById('download-modal');
const downloadForm = document.getElementById('download-form');
const downloadClose = document.getElementById('download-close');
const dlName = document.getElementById('dl-name');
const dlEmail = document.getElementById('dl-email');
const dlPhone = document.getElementById('dl-phone');
const dlProfession = document.getElementById('dl-profession');
const dlEmailError = document.getElementById('dl-email-error');
const downloadSubmit = document.querySelector('.download-submit');

let currentDownloadId = null;

// Validación de email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateForm() {
    const nameOk = dlName && dlName.value.trim().length >= 2;
    const emailOk = dlEmail && isValidEmail(dlEmail.value.trim());
    const phoneOk = dlPhone && dlPhone.value.trim().length >= 7;
    const professionOk = dlProfession && dlProfession.value.trim().length >= 2;

    // Validación visual del email
    if (dlEmail && dlEmail.value.length > 0) {
        if (emailOk) {
            dlEmail.classList.add('valid');
            dlEmail.classList.remove('invalid');
            dlEmailError.textContent = '';
        } else {
            dlEmail.classList.add('invalid');
            dlEmail.classList.remove('valid');
            dlEmailError.textContent = 'Ingresa un correo válido';
        }
    } else if (dlEmail) {
        dlEmail.classList.remove('valid', 'invalid');
        dlEmailError.textContent = '';
    }

    const allOk = nameOk && emailOk && phoneOk && professionOk;
    if (downloadSubmit) downloadSubmit.disabled = !allOk;
    return allOk;
}

if (dlName && dlEmail && dlPhone && dlProfession) {
    [dlName, dlEmail, dlPhone, dlProfession].forEach(input => {
        input.addEventListener('input', validateForm);
    });
}

if (downloadModal && downloadClose) {
    downloadClose.addEventListener('click', () => {
        downloadModal.classList.remove('active');
    });

    downloadModal.addEventListener('click', (e) => {
        if (e.target === downloadModal) {
            downloadModal.classList.remove('active');
        }
    });
}

if (downloadForm && downloadModal) {
    downloadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm() || !currentDownloadId) return;

        const submitBtn = downloadForm.querySelector('.download-submit');
        submitBtn.textContent = 'Guardando...';
        submitBtn.disabled = true;

        // 1. Guardar datos en tabla 'downloads' de Supabase
        if (db) {
            const { error: leadError } = await db.from('downloads').insert([
                {
                    blog_id: parseInt(currentDownloadId),
                    name: dlName.value.trim(),
                    email: dlEmail.value.trim(),
                    phone: dlPhone.value.trim(),
                    profession: dlProfession.value.trim()
                }
            ]);

            if (leadError) {
                console.error('Error guardando lead:', leadError);
                alert('Ocurrió un error al registrar tus datos. Intenta de nuevo.');
                submitBtn.textContent = 'Descargar Archivo';
                return;
            }
        }

        // 2. Abrir PDF inmediatamente
        const pdfPath = `Blogs%20PDF/${currentDownloadId}.pdf`;
        window.open(pdfPath, '_blank');

        // 3. Incrementar contador en tabla 'blogs'
        if (db) {
            const countSpan = document.querySelector(`.blog-read-more[data-id="${currentDownloadId}"] .download-count`);
            const newCount = (parseInt(countSpan?.textContent) || 0) + 1;
            if (countSpan) countSpan.textContent = newCount;

            await db.from('blogs').update({ downloads: newCount }).eq('id', currentDownloadId);
        }

        // Reset
        downloadModal.classList.remove('active');
        downloadForm.reset();
        submitBtn.textContent = 'Descargar Archivo';
        submitBtn.disabled = true;
        currentDownloadId = null;
    });
}

async function renderBlogs() {
    if (!blogGrid) return;
    
    if (!db && !initSupabase()) {
        blogGrid.innerHTML = '<p class="loading-likes">Configurando conexión...</p>';
        setTimeout(renderBlogs, 500);
        return;
    }

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
                    <img src="Recursos/${post.id}.webp" alt="${post.title}" onerror="this.src='https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80'">
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

        // Event delegation para descargas
        blogGrid.addEventListener('click', (e) => {
            const link = e.target.closest('.blog-read-more');
            if (!link || !downloadModal) return;

            e.preventDefault();
            currentDownloadId = parseInt(link.getAttribute('data-id'));
            downloadModal.classList.add('active');
            // Limpiar formulario al abrir
            if (downloadForm) downloadForm.reset();
            validateForm();
        });
    } catch (err) {
        console.error('Error inesperado:', err);
        blogGrid.innerHTML = '<p class="loading-likes">Error inesperado al cargar.</p>';
    }
}



// WhatsApp Chat Modal
(function() {
    const chatBtn = document.getElementById('whatsapp-chat-btn');
    const chatModal = document.getElementById('whatsapp-chat-modal');
    const chatClose = document.getElementById('whatsapp-chat-close');
    const chatForm = document.getElementById('whatsapp-chat-form');

    if (!chatBtn || !chatModal) return;

    chatBtn.addEventListener('click', () => {
        chatModal.classList.toggle('active');
    });

    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatModal.classList.remove('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (chatModal.classList.contains('active') &&
            !chatModal.contains(e.target) &&
            e.target !== chatBtn &&
            !chatBtn.contains(e.target)) {
            chatModal.classList.remove('active');
        }
    });

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('chat-name').value.trim();
            const phone = document.getElementById('chat-phone').value.trim();
            const message = document.getElementById('chat-message').value.trim();

            const text = `Hola Samir, soy *${name}*.\n📱 Teléfono: ${phone}\n\n💬 Mensaje: ${message}`;
            const whatsappUrl = `https://wa.me/584128445726?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');

            chatModal.classList.remove('active');
            chatForm.reset();
        });
    }
})();

document.addEventListener('DOMContentLoaded', renderBlogs);

