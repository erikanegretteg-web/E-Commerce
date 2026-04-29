// ===== QUIZ ENGINE =====
const quizData = [
  {
    q: "Ves un producto viral en TikTok con miles de likes. ¿Qué haces?",
    opts: [
      "Lo compro de inmediato, ¡todos lo tienen!",
      "Investigo un poco y si me conviene, lo compro",
      "Me da curiosidad pero espero a ver más opiniones",
      "No me interesa, las tendencias no me afectan"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    q: "Tu influencer favorito recomienda un suplemento de salud. ¿Cuál es tu reacción?",
    opts: [
      "Si él/ella lo usa, debe ser bueno. Lo compro",
      "Busco la marca en internet antes de decidir",
      "Consulto con un profesional de salud primero",
      "Ignoro las recomendaciones de influencers por completo"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    q: "¿Con qué frecuencia compras algo porque lo viste en redes sociales?",
    opts: [
      "Casi siempre, mis compras son inspiradas por redes",
      "Frecuentemente, al menos una vez al mes",
      "Pocas veces, solo si realmente lo necesito",
      "Nunca, compro solo lo que tengo planeado"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    q: "Estás en una tienda online y ves \"¡Solo quedan 2 unidades!\" ¿Qué haces?",
    opts: [
      "¡Lo agrego al carrito antes de que se acabe!",
      "Me apresuro pero verifico que sea lo que quiero",
      "Sé que es una táctica de marketing, pero a veces funciona",
      "Lo ignoro, sé que es una estrategia de urgencia"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    q: "Un amigo te dice que los vapers son inofensivos porque lo vio en Instagram. ¿Tú qué opinas?",
    opts: [
      "Si muchos lo dicen en redes, probablemente sea verdad",
      "Podría ser, pero habría que investigar más",
      "Las redes no son fuente confiable para temas de salud",
      "Busco estudios científicos y no me guío por redes"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    q: "¿Alguna vez has comprado algo solo porque tenía muchas reseñas positivas?",
    opts: [
      "Sí, las reseñas son mi principal criterio de compra",
      "Sí, pero también considero otros factores",
      "A veces, aunque sé que pueden ser falsas",
      "No, las reseñas no influyen en mis decisiones"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    q: "¿Cómo reaccionas cuando ves un descuento del 70% en una tienda online?",
    opts: [
      "¡Compro todo lo que pueda antes de que se acabe!",
      "Aprovecho para comprar algo que ya necesitaba",
      "Desconfío un poco, podría ser un precio inflado",
      "Verifico el precio real y comparo en otras tiendas"
    ],
    scores: [4, 3, 2, 1]
  }
];

const results = [
  { min: 0, max: 10, emoji: "🛡️", title: "¡Mente de Acero!", desc: "Eres prácticamente inmune a la influencia social en tus compras. Tomas decisiones basadas en lógica y necesidad real. ¡Eres un consumidor ejemplar!" },
  { min: 11, max: 17, emoji: "🧐", title: "Consumidor Consciente", desc: "Tienes buen criterio. Aunque las tendencias te llaman la atención, sabes filtrar y tomar decisiones informadas. ¡Sigue así!" },
  { min: 18, max: 23, emoji: "📱", title: "Influenciable Moderado", desc: "Las redes sociales y el marketing tienen un impacto notable en tus decisiones. Te recomendamos desarrollar más pensamiento crítico antes de comprar." },
  { min: 24, max: 28, emoji: "🎯", title: "Altamente Influenciable", desc: "El e-commerce y los influencers tienen un gran poder sobre tus decisiones. ¡Cuidado! Reflexiona antes de cada compra y verifica la información." }
];

let currentQ = 0, answers = new Array(quizData.length).fill(-1);

function initQuiz() {
  const body = document.getElementById('quizBody');
  body.innerHTML = '';
  quizData.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-question' + (i === 0 ? ' active' : '');
    div.id = 'q' + i;
    div.innerHTML = `
      <div class="quiz-q-number">Pregunta ${i + 1} de ${quizData.length}</div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-options">${q.opts.map((o, j) =>
        `<div class="quiz-option" onclick="selectOpt(${i},${j})">
          <span class="opt-letter">${String.fromCharCode(65 + j)}</span>${o}
        </div>`).join('')}
      </div>
      <div class="quiz-nav">
        <button class="quiz-btn quiz-btn-prev" onclick="navQ(${i - 1})" ${i === 0 ? 'disabled' : ''}>← Anterior</button>
        <button class="quiz-btn quiz-btn-next" id="nextBtn${i}" onclick="${i === quizData.length - 1 ? 'showResult()' : `navQ(${i + 1})`}" ${answers[i] === -1 ? 'disabled' : ''}>
          ${i === quizData.length - 1 ? 'Ver Resultado 🎉' : 'Siguiente →'}
        </button>
      </div>`;
    body.appendChild(div);
  });
  document.getElementById('quizResult').classList.remove('active');
  document.getElementById('quizResult').style.display = 'none';
  updateProgress();
}

function selectOpt(qi, oi) {
  answers[qi] = oi;
  const opts = document.querySelectorAll(`#q${qi} .quiz-option`);
  opts.forEach((o, j) => o.classList.toggle('selected', j === oi));
  document.getElementById('nextBtn' + qi).disabled = false;
}

function navQ(idx) {
  if (idx < 0 || idx >= quizData.length) return;
  document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
  document.getElementById('q' + idx).classList.add('active');
  currentQ = idx;
  updateProgress();
}

function updateProgress() {
  const pct = ((currentQ + 1) / quizData.length) * 100;
  document.getElementById('quizProgress').style.width = pct + '%';
}

function showResult() {
  let total = 0;
  answers.forEach((a, i) => { if (a >= 0) total += quizData[i].scores[a]; });
  const r = results.find(r => total >= r.min && total <= r.max) || results[results.length - 1];
  document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
  const res = document.getElementById('quizResult');
  res.style.display = 'block';
  res.classList.add('active');
  res.innerHTML = `
    <div class="result-emoji">${r.emoji}</div>
    <div class="result-title">${r.title}</div>
    <div class="result-score">${total}/${quizData.length * 4} pts</div>
    <div class="result-desc">${r.desc}</div>
    <button class="quiz-retry" onclick="retryQuiz()">🔄 Intentar de nuevo</button>`;
  
  if (total > 15) createConfetti();
}

function createConfetti() {
  const colors = ['#4B0082', '#9370DB', '#E6E6FA', '#FFD700'];
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(c);
  }
  setTimeout(() => container.remove(), 5000);
}

function retryQuiz() {
  currentQ = 0;
  answers = new Array(quizData.length).fill(-1);
  initQuiz();
}

// ===== MODALS =====
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

// ===== SEARCH FILTER =====
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post-card');
  posts.forEach(post => {
    const text = post.innerText.toLowerCase();
    post.style.display = text.includes(query) ? 'block' : 'none';
  });
});

// ===== REVIEWS =====
let reviewRating = 0;
function setRating(n) {
  reviewRating = n;
  document.querySelectorAll('.star-rating .star').forEach((s, i) => {
    s.classList.toggle('active', i < n);
  });
}

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('blog_reviews') || '[]');
  
  // Update main list
  const list = document.getElementById('reviewsList');
  if (list) {
    if (!reviews.length) { 
      list.innerHTML = '<p class="no-reviews">Aún no hay reseñas. ¡Sé el primero en comentar!</p>'; 
    } else {
      list.innerHTML = reviews.map(r => `
        <div class="review-card">
          <div class="review-card-header">
            <span class="review-author">${r.name}<span class="review-article-tag">${r.article}</span></span>
            <span class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
          </div>
          <div class="review-text">${r.text}</div>
          <div class="review-date">${r.date}</div>
        </div>`).join('');
    }
  }

  // Update sidebar widget
  const sidebarList = document.getElementById('sidebarRecentReviews');
  if (sidebarList) {
    if (!reviews.length) {
      sidebarList.innerHTML = '<p style="font-size:0.8rem;color:var(--text-muted)">No hay comentarios recientes.</p>';
    } else {
      sidebarList.innerHTML = reviews.slice(0, 3).map(r => `
        <div class="sidebar-review-item">
          <div class="sidebar-review-meta">
            <span>${r.name}</span>
            <span class="sidebar-review-stars">${'★'.repeat(r.rating)}</span>
          </div>
          <div style="font-style:italic;color:var(--text-muted)">"${r.text.substring(0, 40)}..."</div>
        </div>`).join('');
    }
  }
}

function submitReview(e) {
  e.preventDefault();
  const name = document.getElementById('revName').value.trim();
  const article = document.getElementById('revArticle').value;
  const text = document.getElementById('revText').value.trim();
  if (!name || !text || !reviewRating) { alert('Por favor completa todos los campos y selecciona una calificación.'); return; }
  
  const reviews = JSON.parse(localStorage.getItem('blog_reviews') || '[]');
  reviews.unshift({ 
    name, article, text, rating: reviewRating, 
    date: new Date().toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' }) 
  });
  
  localStorage.setItem('blog_reviews', JSON.stringify(reviews));
  document.getElementById('revName').value = '';
  document.getElementById('revText').value = '';
  reviewRating = 0;
  document.querySelectorAll('.star-rating .star').forEach(s => s.classList.remove('active'));
  loadReviews();
}

// ===== SHARE =====
function share(platform) {
  const url = window.location.href;
  const text = "Mira este blog sobre E-Commerce en Salud!";
  let link = '';
  if(platform === 'whatsapp') link = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
  if(platform === 'facebook') link = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  if(platform === 'twitter') link = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  if(platform === 'copy') {
    navigator.clipboard.writeText(url);
    alert('¡Enlace copiado al portapapeles!');
    return;
  }
  window.open(link, '_blank');
}

// ===== SCROLL TO TOP =====
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 400);
});
if (scrollBtn) scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== SCROLL ANIMATION =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { 
      entry.target.style.opacity = '1'; 
      entry.target.style.transform = 'translateY(0)'; 
    }
  });
}, { threshold: 0.02, rootMargin: '0px 0px 100px 0px' });

document.querySelectorAll('.post-card, .quiz-container, .reviews-section').forEach((el, i) => {
  el.style.opacity = '0'; 
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  observer.observe(el);
});

// ===== VIEW COUNTER ANIMATION =====
function animateCounter(id, target, duration = 2000) {
  const el = document.getElementById(id);
  if (!el) return;
  
  let start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutExpo)
    const value = Math.floor(progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress)));
    
    if (el.textContent !== value.toLocaleString()) {
      el.textContent = value.toLocaleString();
      el.classList.remove('updating');
      void el.offsetWidth; // Trigger reflow
      el.classList.add('updating');
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function initViewCounters() {
  const API_URL = 'https://api.counterapi.dev/v1/AlbertG/EcommerceEnSalud/up';
  const BASE_VIEWS = 12483; // Base views to preserve historical data
  
  // Fetch real count from API
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const realCount = BASE_VIEWS + data.count;
      
      // Animate when in view
      const counterEl = document.getElementById('totalVisits');
      if (counterEl) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            animateCounter('totalVisits', realCount, 2500);
            observer.disconnect();
          }
        }, { threshold: 0.5 });
        observer.observe(counterEl);
      }
    })
    .catch(err => {
      console.warn('CounterAPI error, falling back to local simulation:', err);
      // Fallback to local if API fails
      let localTotal = parseInt(localStorage.getItem('total_visits') || '12483');
      localTotal += 1;
      localStorage.setItem('total_visits', localTotal);
      animateCounter('totalVisits', localTotal);
    });

  // Active Readers Simulation (Real readers would require WebSockets/Firebase)
  setInterval(() => {
    const el = document.getElementById('activeReaders');
    if (el) {
      const current = parseInt(el.textContent);
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      const newVal = Math.max(8, Math.min(42, current + change));
      
      if (newVal !== current) {
        el.textContent = newVal;
        el.classList.remove('updating');
        void el.offsetWidth; // Trigger reflow
        el.classList.add('updating');
      }
    }
  }, 4000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  loadReviews();
  initViewCounters();
});
