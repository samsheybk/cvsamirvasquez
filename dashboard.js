const statusEl = document.getElementById('dash-status');

function setStatus(msg, color) {
    if (statusEl) { statusEl.textContent = msg; if (color) statusEl.style.color = color; }
}

function waitForDb(retries = 30) {
    if (db !== null) {
        setStatus('✅ Conectado a Supabase. Cargando dashboard...', '#22c55e');
        loadDashboard(db);
        return;
    }
    if (typeof initSupabase === 'function' && initSupabase()) {
        setStatus('✅ Conectado a Supabase. Cargando dashboard...', '#22c55e');
        loadDashboard(db);
        return;
    }
    if (retries > 0) {
        setStatus('⏳ Esperando conexión Supabase...', '#f59e0b');
        setTimeout(() => waitForDb(retries - 1), 500);
    } else {
        setStatus('⛔ No se pudo conectar a Supabase. Revisa config.js o la consola (F12)', '#ef4444');
    }
}

waitForDb();

async function loadDashboard(database) {
    try {
        setStatus('📊 Cargando métricas...', '#22c55e');

        const [visitsRes, likesRes, downloadsRes, postsRes, allLikes, allVisits, allDownloads, blogsData] = await Promise.all([
            database.from('visits').select('*', { count: 'exact', head: true }),
            database.from('likes').select('*', { count: 'exact', head: true }),
            database.from('downloads').select('*', { count: 'exact', head: true }),
            database.from('blogs').select('*', { count: 'exact', head: true }),
            database.from('likes').select('created_at').order('created_at', { ascending: false }),
            database.from('visits').select('created_at').order('created_at', { ascending: false }),
            database.from('downloads').select('created_at'),
            database.from('blogs').select('id, title, date, downloads').order('downloads', { ascending: false }),
        ]);

        const metrics = [
            ['metric-visits', visitsRes.count || 0],
            ['metric-likes', likesRes.count || 0],
            ['metric-downloads', downloadsRes.count || 0],
            ['metric-posts', postsRes.count || 0],
        ];

        metrics.forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val >= 1000 ? (val / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : val;
        });

        const days = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().slice(0, 10));
        }

        function byDay(data, field) {
            const m = {};
            days.forEach(d => m[d] = 0);
            (data || []).forEach(item => {
                const k = new Date(item[field]).toISOString().slice(0, 10);
                if (m[k] !== undefined) m[k]++;
            });
            return days.map(d => m[d]);
        }

        function chart(containerId, labels, values, barClass) {
            const c = document.getElementById(containerId);
            if (!c) return;
            const max = Math.max(...values, 1);
            c.innerHTML = values.map((v, i) => {
                const d = new Date(labels[i] + 'T00:00:00');
                const lbl = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
                return `<div class="bar-wrapper"><span class="bar-value">${v}</span><div class="bar ${barClass}" style="height:${Math.max(v / max * 100, 4)}%"></div><span class="bar-label">${lbl}</span></div>`;
            }).join('');
        }

        chart('chart-likes', days, byDay(allLikes.data, 'created_at'), 'likes-bar');
        chart('chart-visits', days, byDay(allVisits.data, 'created_at'), 'visits-bar');

        const tbody = document.getElementById('table-downloads-body');
        if (tbody) {
            const posts = blogsData?.data || [];
            tbody.innerHTML = posts.length
                ? posts.map(p => `<tr><td>${esc(p.title)}</td><td>${p.date || '—'}</td><td><strong>${p.downloads || 0}</strong></td></tr>`).join('')
                : '<tr><td colspan="3" class="chart-empty">Sin datos</td></tr>';
        }

        const feedEl = document.getElementById('feed-list');
        if (feedEl) {
            const items = [];
            (allLikes?.data || []).slice(0, 5).forEach(item => items.push({ icon: '❤️', text: 'Nuevo like', date: item.created_at }));
            (allDownloads?.data || []).slice(0, 5).forEach(item => items.push({ icon: '⬇️', text: 'Nueva descarga', date: item.created_at }));
            items.sort((a, b) => new Date(b.date) - new Date(a.date));

            feedEl.innerHTML = items.length === 0
                ? '<p class="chart-empty">Sin actividad aún</p>'
                : items.slice(0, 10).map(item => {
                    const d = Math.floor((Date.now() - new Date(item.date)) / 60000);
                    const ago = d < 1 ? 'Ahora' : d < 60 ? `hace ${d} min` : Math.floor(d / 60) < 24 ? `hace ${Math.floor(d / 60)}h` : new Date(item.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                    return `<div class="feed-item"><span class="feed-icon">${item.icon}</span><span class="feed-text">${item.text}</span><span class="feed-date">${ago}</span></div>`;
                }).join('');
        }

        setStatus('✅ Dashboard listo', 'transparent');
    } catch (err) {
        setStatus('⛔ Error: ' + err.message, '#ef4444');
        console.error('Dashboard error:', err);
    }
}

function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}
