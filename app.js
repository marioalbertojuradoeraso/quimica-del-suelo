/* =========================================================================
   app.js — motor de la web app
   ========================================================================= */

const app = document.getElementById('app');
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ---------------------------------------------------------- progreso ------ */
const KEY = 'suelo.progreso.v1';
let leidos = new Set();
try { leidos = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch (e) { leidos = new Set(); }

function guardarProgreso() {
  try { localStorage.setItem(KEY, JSON.stringify([...leidos])); } catch (e) {}
  actualizarProgreso(posActual);
}

/* posActual = número (1..15) del módulo que se está viendo, o 0 en el inicio.
   En un módulo el contador dice «dónde estoy»; en el inicio, «cuánto llevo». */
let posActual = 0;

function actualizarProgreso(pos) {
  if (typeof pos === 'number') posActual = pos;
  const total = MODULOS.length;
  const n = posActual > 0 ? posActual : leidos.size;
  const pct = Math.round(n / total * 100);
  const txt = n + ' de ' + total;
  const pt = $('#progTxt'); if (pt) pt.textContent = txt;
  const pb = $('#progBar'); if (pb) pb.style.width = pct + '%';
  const bn = $('#bnProg'); if (bn) bn.textContent = txt;
  const cont = $('.hdr-progress');
  if (cont) cont.setAttribute('aria-label', posActual > 0
    ? 'Módulo ' + posActual + ' de ' + total
    : n + ' de ' + total + ' módulos completados');
}

/* ------------------------------------------------------------ sonido ------ */
const SON_KEY = 'suelo.sonido.v1';
let sonidoOn = true;
try { sonidoOn = localStorage.getItem(SON_KEY) !== '0'; } catch (e) {}

let audioCtx = null;
function chime(tipo) {
  if (!sonidoOn) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  try {
    audioCtx = audioCtx || new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const notas = tipo === 'down' ? [440, 349.23] : [523.25, 659.25, 783.99];
    const vol = tipo === 'down' ? 0.06 : 0.09;
    notas.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const t = audioCtx.currentTime + i * 0.085;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + 0.36);
    });
  } catch (e) {}
}

function aplicarSonido() {
  const b = $('#btnSonido');
  if (!b) return;
  b.textContent = sonidoOn ? '🔔' : '🔕';
  b.setAttribute('aria-pressed', sonidoOn ? 'true' : 'false');
  b.title = sonidoOn ? 'Sonido de avance activado' : 'Sonido desactivado';
}

/* ------------------------------------------------------ tamaño del texto --- */
const ESC_KEY = 'suelo.escala.v1';
let escala = 1;
try { escala = parseFloat(localStorage.getItem(ESC_KEY)) || 1; } catch (e) { escala = 1; }

function aplicarEscala(v, avisar) {
  escala = clamp(v, 0.95, 1.5);
  document.documentElement.style.setProperty('--escala', escala);
  const b = $('#btnEscala');
  if (b) b.textContent = Math.round(escala * 100) + '%';
  try { localStorage.setItem(ESC_KEY, escala); } catch (e) {}
  if (avisar) toast('Texto al ' + Math.round(escala * 100) + '%');
}

/* --------------------------------------------------------------- avisos --- */
function toast(msg, tipo) {
  const wrap = $('#toast');
  if (!wrap) return;
  // como mucho dos avisos a la vez: si alguien avanza rápido, no se apilan
  while (wrap.children.length > 1) wrap.firstElementChild.remove();
  const el = document.createElement('div');
  el.className = 'toast ' + (tipo || 'ok');
  el.textContent = msg;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add('ver'));
  setTimeout(() => {
    el.classList.remove('ver');
    setTimeout(() => el.remove(), 300);
  }, 2900);
}

/* ----------------------------------------------------------- completar ---- */
function completar(id, motivo) {
  if (leidos.has(id)) return false;
  leidos.add(id);
  guardarProgreso();
  const n = leidos.size, total = MODULOS.length;
  const m = MODULOS.find(x => x.id === id);
  chime('up');
  toast('✓ Módulo ' + (m ? m.num : '') + ' guardado' + (motivo ? ' · ' + motivo : ''), 'ok');
  const barra = $('#barraNav');
  if (barra) {
    barra.classList.add('pulso');
    setTimeout(() => barra.classList.remove('pulso'), 750);
  }
  const cont = $('.hdr-progress');
  if (cont) {
    cont.classList.add('pulso');
    setTimeout(() => cont.classList.remove('pulso'), 900);
  }
  if (n === total) setTimeout(() => { chime('up'); toast('¡Completaste los 15 módulos! 🎉'); }, 1100);
  return true;
}

/* ------------------------------------------------------------ utilidades -- */
const esc = s => String(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

function punteroSlider(id, min, max, step, val, unidad) {
  return `<div class="field">
    <label for="${id}"><span>${unidad.et}</span><output id="${id}_o">${val}${unidad.suf || ''}</output></label>
    <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}">
  </div>`;
}

/* =========================================================================
   ROUTER
   ========================================================================= */
let quitarScroll = null;

function router() {
  detenerVoz();
  if (quitarScroll) { quitarScroll(); quitarScroll = null; }
  const hash = location.hash.replace(/^#\/?/, '');
  if (!hash) { renderHome(); }
  else {
    const m = MODULOS.find(x => x.id === hash);
    m ? renderModulo(m) : renderHome();
  }
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function init() {
  if (init.hecho) return;
  init.hecho = true;

  aplicarEscala(escala);
  aplicarSonido();

  $('#btnMenos').onclick = () => aplicarEscala(escala - 0.1, true);
  $('#btnMas').onclick = () => aplicarEscala(escala + 0.1, true);
  $('#btnEscala').onclick = () => aplicarEscala(1, true);

  $('#btnSonido').onclick = () => {
    sonidoOn = !sonidoOn;
    try { localStorage.setItem(SON_KEY, sonidoOn ? '1' : '0'); } catch (e) {}
    aplicarSonido();
    if (sonidoOn) chime('up');
    toast(sonidoOn ? 'Sonido activado' : 'Sonido desactivado');
  };

  actualizarProgreso();
  router();
}

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', init);
if (document.readyState !== 'loading') init();

/* =========================================================================
   HOME
   ========================================================================= */
function renderHome() {
  $('#barraNav').hidden = true;
  document.body.classList.remove('con-barra');
  actualizarProgreso(0);
  const grupos = GRUPOS.map(g => {
    const mods = MODULOS.filter(m => m.grupo === g);
    return `<section class="grupo">
      <h2>${g}</h2>
      <div class="cards">
        ${mods.map(m => `
          <a class="card ${leidos.has(m.id) ? 'is-done' : ''}" href="#/${m.id}">
            <span class="done">✓</span>
            <span class="num">MÓDULO ${String(m.num).padStart(2, '0')}</span>
            <span class="ico">${m.icono}</span>
            <h3>${m.titulo}</h3>
            <p>${m.subtitulo}</p>
          </a>`).join('')}
      </div>
    </section>`;
  }).join('');

  app.innerHTML = `
    <section class="hero">
      <div>
        <div class="chips">
          <span class="chip">🌍 15 módulos</span>
          <span class="chip">🔬 8 simuladores</span>
          <span class="chip">🔊 Narración</span>
        </div>
        <h1>El suelo no es «tierra».<br>Es un <em>sistema vivo</em>.</h1>
        <p class="lead">Un recorrido para entender qué es el suelo, cómo se mide, qué significan esos números y por qué un suelo puede ser fértil y a la vez vulnerable. Cada concepto se explica desde cero: qué es, por qué hablamos de él y para qué se mide.</p>
        <a class="btn btn-primary" href="#/origen">Empezar por el principio →</a>
        <a class="btn btn-ghost" href="#/textura" style="margin-left:8px">Ir directo a un parámetro</a>
      </div>
      <figure>
        <img src="assets/portada.jpg" alt="Corte de un suelo con raíces, piedras y agua filtrándose entre los poros">
      </figure>
    </section>
    ${grupos}
    <section class="grupo">
      <h2>Cómo usar este material</h2>
      <div class="bloque">
        <p>Cada módulo sigue el mismo orden, y no es casual:</p>
        <p><b>1. Qué es.</b> La definición, sin dar por sabido nada.<br>
        <b>2. Por qué hablamos de esto.</b> La razón por la que el tema existe y aparece en cualquier discusión sobre suelo.<br>
        <b>3. Para qué se mide.</b> Qué decisión concreta cambia cuando conocemos el dato.</p>
        <p>Después viene una analogía, una tabla de datos clave, un simulador para mover las variables con las manos, una pregunta para pensar y la narración en voz alta del módulo.</p>
        <p>No hay nota ni puntaje. El simulador no se «pierde»: se explora.</p>
        <h3 style="margin:26px 0 10px;font-size:1rem">Cómo moverte</h3>
        <p>Dentro de un módulo, <b>desliza hacia abajo</b> para leerlo completo. Al final tienes un bloque que pregunta si te quedó claro, con dos caminos: <b>seguir</b> o <b>repasar</b>.</p>
        <p>La <b>barra de abajo</b> está siempre visible y te deja ir a «Anterior» o «Siguiente» en cualquier momento, sin volver a subir.</p>
        <p>El contador de la cabecera sube a medida que completas módulos, y suena un aviso corto cuando sumas uno. Puedes silenciarlo con el icono 🔔.</p>
        <p>Si el texto te resulta pequeño, usa <b>A−</b> y <b>A+</b> arriba a la derecha: el tamaño se guarda en tu dispositivo y también agranda los títulos, las tablas y los botones.</p>
      </div>
    </section>`;
}

/* =========================================================================
   MÓDULO
   ========================================================================= */
function renderModulo(m) {
  const idx = MODULOS.indexOf(m);
  const prev = MODULOS[idx - 1];
  const next = MODULOS[idx + 1];

  document.body.classList.add('con-barra');

  app.innerHTML = `
    <a class="volver" href="#/">← Todos los módulos</a>

    <header class="mod-head">
      <div class="kicker">${m.grupo} · Módulo ${String(m.num).padStart(2, '0')}</div>
      <h1>${m.titulo}</h1>
      <p class="sub">${m.subtitulo}</p>
    </header>

    <p class="hint-lectura">
      <span class="flecha" aria-hidden="true">↓</span>
      <span>Desliza para leer el módulo completo. Al final encontrarás <b>Siguiente</b>. Si prefieres, la <b>barra de abajo</b> te deja avanzar en cualquier momento.</span>
    </p>

    <div class="audio-bar">
      <button class="btn btn-ghost btn-sm" id="btnEscuchar">🔊 Escuchar este módulo</button>
      <span class="et" id="vozEstado">Narración en voz alta · 1–2 min</span>
      <p class="nota">Puedes leer y escuchar al mismo tiempo. La narración usa la grabación del módulo cuando está disponible y, si no, la voz en español del navegador.</p>
    </div>

    <figure class="mod-figure">
      <img src="${m.imagen}" alt="Ilustración del módulo: ${m.titulo}">
      <figcaption>Ilustración didáctica generada para este módulo.</figcaption>
    </figure>

    <section class="bloque">
      <h2><span class="n">1</span> ¿Qué es?</h2>
      ${m.queEs.map(p => `<p>${p}</p>`).join('')}
    </section>

    <section class="bloque porque">
      <h2><span class="n">2</span> ¿Por qué hablamos de esto?</h2>
      ${m.porQue.map(p => `<p>${p}</p>`).join('')}
    </section>

    <section class="bloque paraque">
      <h2><span class="n">3</span> ¿Para qué se mide?</h2>
      ${m.paraQue.map(p => `<p>${p}</p>`).join('')}
    </section>

    <aside class="analogia">
      <h3>Una forma de imaginarlo</h3>
      <p>${m.analogia}</p>
    </aside>

    <section class="datos">
      <h3>Datos clave</h3>
      <table>${m.datos.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table>
    </section>

    <section class="lab" id="lab">
      <h2>🧪 Pruébalo tú</h2>
      <p class="lab-sub">Mueve los controles y observa qué cambia. Nada de esto se califica: el objetivo es ver la consecuencia antes de leer la explicación.</p>
      <div id="labBody"></div>
    </section>

    <section class="quiz" id="quiz">
      <div class="q-tag">Comprueba lo que entendiste</div>
      <p class="q-text">${m.quiz.pregunta}</p>
      <div class="opciones" id="opciones">
        ${m.quiz.opciones.map((o, i) => `<button class="opcion" data-i="${i}">${o.texto}</button>`).join('')}
      </div>
      <div class="sig" id="quizSig"></div>
    </section>

    <section class="cierre-mod" id="cierreMod">
      <h2>¿Te quedó claro «${m.titulo}»?</h2>
      <p class="cierre-sub">Si lo entendiste, avanza. Si no, vuelve a leerlo con calma: aquí nada se califica y puedes repetirlo las veces que necesites.</p>
      <div class="cierre-btns">
        <button type="button" class="btn btn-primary" id="btnSegui">${next ? 'Sí, seguir →' : 'Sí, terminar el recorrido →'}</button>
        <button type="button" class="btn btn-ghost" id="btnRepasar">No del todo, quiero repasar</button>
      </div>
      <p class="cierre-nota" id="cierreNota" hidden></p>
    </section>

    <nav class="mod-nav">
      ${prev ? `<a href="#/${prev.id}"><div class="dir">← Anterior</div><div class="tt">${prev.titulo}</div></a>` : `<a href="#/"><div class="dir">←</div><div class="tt">Volver al inicio</div></a>`}
      ${next ? `<a class="next" href="#/${next.id}"><div class="dir">Siguiente →</div><div class="tt">${next.titulo}</div></a>` : `<a class="next" href="#/"><div class="dir">Fin del recorrido →</div><div class="tt">Volver al inicio</div></a>`}
    </nav>`;

  configurarBarra(m, prev, next);
  actualizarProgreso(idx + 1);
  montarSeguimiento(m);
  montarLab(m);
  montarQuiz(m);
  montarVoz(m);
  montarCierre(m, prev, next);
}

/* ---------------------------------------------------- barra de navegación -- */
function corto(t) {
  return t.length > 24 ? t.slice(0, 22).trim() + '…' : t;
}

function configurarBarra(m, prev, next) {
  const barra = $('#barraNav');
  barra.hidden = false;
  const bp = $('#bnPrev');
  const bn = $('#bnNext');

  const rotulo = (txt, tt) =>
    '<span class="bn-lbl">' + txt + '</span>' +
    '<span class="bn-tt">' + tt + '</span>';

  bp.innerHTML = '‹ ' + rotulo(prev ? 'Anterior' : 'Inicio', prev ? corto(prev.titulo) : 'Todos los módulos');
  bn.innerHTML = rotulo(next ? 'Siguiente' : 'Fin', next ? corto(next.titulo) : 'Volver al inicio') + ' ›';
  bp.setAttribute('aria-label', prev ? 'Ir al módulo anterior: ' + prev.titulo : 'Volver a todos los módulos');
  bn.setAttribute('aria-label', next ? 'Ir al módulo siguiente: ' + next.titulo : 'Volver a todos los módulos');

  bp.onclick = () => { location.hash = prev ? '#/' + prev.id : '#/'; };
  bn.onclick = () => {
    completar(m.id, 'avanzaste');
    location.hash = next ? '#/' + next.id : '#/';
  };
}

/* ------------------------------------------------- avance por scroll ------ */
function montarSeguimiento(m) {
  const barra = $('#lecturaBar');
  let raf = 0;
  let avisado = false;

  const medir = () => {
    raf = 0;
    const alto = document.documentElement.scrollHeight - window.innerHeight;
    const p = alto > 40 ? Math.min(1, Math.max(0, window.scrollY / alto)) : 1;
    if (barra) barra.style.width = Math.round(p * 100) + '%';
    document.documentElement.classList.toggle('lectura-completa', p > 0.9);
    if (p > 0.9 && !avisado) {
      avisado = true;
      completar(m.id, 'llegaste al final');
    }
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(medir); };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  medir();

  quitarScroll = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (raf) cancelAnimationFrame(raf);
    if (barra) barra.style.width = '0%';
    document.documentElement.classList.remove('lectura-completa');
  };
}

/* --------------------------------------------------- ¿quedó claro? -------- */
function montarCierre(m, prev, next) {
  $('#btnSegui').onclick = () => {
    completar(m.id, 'avanzaste');
    location.hash = next ? '#/' + next.id : '#/';
  };

  $('#btnRepasar').onclick = () => {
    chime('down');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const nota = $('#cierreNota');
    if (nota) {
      nota.hidden = false;
      nota.innerHTML =
        'Vuelve a la sección <b>1 · ¿Qué es?</b> y léela despacio. También puedes pulsar ' +
        '<b>🔊 Escuchar este módulo</b> para oírlo mientras lees.' +
        (prev ? ' Si el tema anterior te ayudaría, usa <b>‹ ' + corto(prev.titulo) + '</b> en la barra de abajo.' : '');
    }
    const b = $('#btnEscuchar');
    if (b) {
      b.classList.add('destacar');
      setTimeout(() => b.classList.remove('destacar'), 2400);
    }
    toast('Sin prisa: vuelve a leerlo las veces que necesites', 'info');
  };
}

/* =========================================================================
   QUIZ
   ========================================================================= */
function montarQuiz(m) {
  const cont = $('#opciones');
  cont.addEventListener('click', e => {
    const btn = e.target.closest('.opcion');
    if (!btn || cont.dataset.done) return;
    cont.dataset.done = '1';
    const i = +btn.dataset.i;
    const op = m.quiz.opciones[i];

    btn.classList.add(op.correcta ? 'correcta' : 'incorrecta');
    btn.insertAdjacentHTML('beforeend', `<span class="fb">${op.feedback}</span>`);

    // mostrar también la explicación de la opción correcta si falló
    if (!op.correcta) {
      m.quiz.opciones.forEach((o, j) => {
        if (o.correcta) {
          const b = cont.querySelector(`[data-i="${j}"]`);
          b.classList.add('correcta');
        }
      });
    }
    $$('.opcion', cont).forEach(b => b.disabled = true);

    if (!op.correcta) {
      $('#quizSig').innerHTML = `<button class="btn btn-ghost btn-sm" id="reintentar">Volver a intentarlo</button>`;
      $('#reintentar').onclick = () => {
        delete cont.dataset.done;
        cont.innerHTML = m.quiz.opciones.map((o, k) => `<button class="opcion" data-i="${k}">${o.texto}</button>`).join('');
        $('#quizSig').innerHTML = '';
        cont.dataset.done = '';
      };
    }

    completar(m.id, 'respondiste la pregunta');

    // marcar tarjeta en home la próxima vez
  });
}

/* =========================================================================
   VOZ
   ========================================================================= */
let vozActual = null;
let audioEl = null;
let sinAudio = false;   // no hay grabaciones MP3 en assets/audio: se usa la voz del navegador

function detenerVoz() {
  if (vozActual) {
    // se anulan los manejadores para que la cancelación no se interprete como error
    vozActual.onstart = null;
    vozActual.onend = null;
    vozActual.onerror = null;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  if (audioEl) {
    try { audioEl.pause(); audioEl.currentTime = 0; } catch (e) {}
    audioEl = null;
  }
  vozActual = null;
  const b = document.getElementById('btnEscuchar');
  if (b) { b.textContent = '🔊 Escuchar este módulo'; b.classList.remove('playing'); }
}

function montarVoz(m) {
  const btn = $('#btnEscuchar');
  const estado = $('#vozEstado');

  const hablar = () => {
    if (!('speechSynthesis' in window)) {
      detenerVoz();
      estado.textContent = 'Este navegador no admite narración';
      return;
    }
    const voces = window.speechSynthesis.getVoices();
    const v = voces.find(x => /es[-_]/i.test(x.lang)) || null;
    const u = new SpeechSynthesisUtterance(m.audio);
    if (v) u.voice = v;
    u.lang = v ? v.lang : 'es-ES';
    u.rate = 0.97;
    u.pitch = 1;
    u.onstart = () => {
      btn.textContent = '⏹ Detener';
      btn.classList.add('playing');
      estado.textContent = 'Narrando con la voz del navegador…';
    };
    u.onend = () => { detenerVoz(); estado.textContent = 'Narración terminada'; };
    u.onerror = () => { detenerVoz(); estado.textContent = 'La voz del sistema no está disponible'; };
    vozActual = u;
    window.speechSynthesis.speak(u);
  };

  btn.onclick = () => {
    if (vozActual || audioEl) { detenerVoz(); estado.textContent = 'Narración detenida'; return; }

    let respaldoHecho = false;
    const respaldo = () => { if (!respaldoHecho) { respaldoHecho = true; hablar(); } };

    // Ya se comprobó antes que no hay grabaciones: no se repite la búsqueda.
    if (sinAudio) { respaldo(); return; }

    // 1) grabación del módulo (assets/audio/<id>.mp3), si existe
    const a = new Audio('assets/audio/' + m.id + '.mp3');
    a.addEventListener('playing', () => {
      audioEl = a;
      btn.textContent = '⏹ Detener';
      btn.classList.add('playing');
      estado.textContent = 'Narrando…';
    }, { once: true });
    a.addEventListener('ended', () => { detenerVoz(); estado.textContent = 'Narración terminada'; }, { once: true });
    a.addEventListener('error', () => { if (!audioEl) { sinAudio = true; respaldo(); } }, { once: true });
    const p = a.play();
    // 2) si no hay archivo, voz del navegador
    if (p && typeof p.catch === 'function') {
      p.catch(() => { if (!audioEl) { sinAudio = true; respaldo(); } });
    }
  };
}

/* =========================================================================
   LABORATORIOS INTERACTIVOS
   ========================================================================= */
function montarLab(m) {
  const body = $('#labBody');
  const fn = LABS[m.interaccion.tipo];
  if (!fn) { body.innerHTML = '<p class="lab-sub">Simulador en preparación.</p>'; return; }
  fn(body);
}

const LABS = {};

/* ---------------------------------------------------------- 1 meteorización */
LABS.meteorizacion = (root) => {
  root.innerHTML = `
    ${punteroSlider('anos', 0, 5000, 10, 500, { et: 'Tiempo de exposición', suf: ' años' })}
    <div class="readout">
      <div class="r-title">Estado del material</div>
      <div class="r-main" id="mEst">Roca intacta</div>
      <p id="mTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Fragmentación</span><span class="v" id="mFrag">0 %</span></div>
        <div class="r-cell"><span class="k">Aporte biológico</span><span class="v" id="mBio">nulo</span></div>
        <div class="r-cell"><span class="k">¿Ya es suelo?</span><span class="v" id="mSuelo">No</span></div>
      </div>
    </div>`;
  const s = $('#anos');
  const upd = () => {
    const a = +s.value;
    $('#anos_o').textContent = a.toLocaleString('es') + ' años';
    const frag = clamp(a / 40, 0, 100);
    let est, txt, bio, suelo;
    if (a < 100)      { est = 'Roca intacta'; txt = 'El agua y el hielo apenas han empezado a abrir grietas. Nada de esto es suelo todavía.'; bio = 'nulo'; suelo = 'No'; }
    else if (a < 600) { est = 'Roca fragmentada'; txt = 'La meteorización física rompe la roca en fragmentos. Los primeros líquenes y musgos se instalan en las superficies, pero aún no hay materia orgánica acumulada.'; bio = 'muy escaso'; suelo = 'Todavía no'; }
    else if (a < 1500){ est = 'Material parental en alteración'; txt = 'La meteorización química transforma los minerales: la hidrólisis y la oxidación cambian su composición. Las raíces empiezan a aportar materia orgánica en la superficie.'; bio = 'incipiente'; suelo = 'Apenas'; }
    else if (a < 3500){ est = 'Suelo joven'; txt = 'Ya hay acumulación de materia orgánica, estructura incipiente y actividad biológica. Se distingue una capa superficial más oscura. Es un suelo joven, con horizontes poco desarrollados.'; bio = 'activo'; suelo = 'Sí'; }
    else              { est = 'Suelo desarrollado'; txt = 'Hay horizontes diferenciados, estructura estable y un ciclo activo de materia orgánica. El suelo funciona como sistema. Ha tardado miles de años en llegar aquí.'; bio = 'alto'; suelo = 'Sí, plenamente'; }

    $('#mEst').textContent = est;
    $('#mTxt').textContent = txt;
    $('#mFrag').textContent = Math.round(frag) + ' %';
    $('#mBio').textContent = bio;
    $('#mSuelo').textContent = suelo;
  };
  s.oninput = upd; upd();
};

/* ------------------------------------------------------------ 2 composición */
LABS.composicion = (root) => {
  root.innerHTML = `
    ${punteroSlider('cMin', 25, 70, 1, 45, { et: 'Minerales', suf: ' %' })}
    ${punteroSlider('cMo',  0, 20, 1, 5,   { et: 'Materia orgánica', suf: ' %' })}
    ${punteroSlider('cAgua', 0, 45, 1, 25, { et: 'Agua', suf: ' %' })}
    <p class="suma" id="cSuma"></p>
    <div class="readout">
      <div class="r-title">Composición del volumen</div>
      <div class="compo">
        <span class="c-min"  id="bMin"></span>
        <span class="c-mo"   id="bMo"></span>
        <span class="c-agua" id="bAgua"></span>
        <span class="c-aire" id="bAire"></span>
      </div>
      <div class="r-main" id="cEst">—</div>
      <p id="cTxt"></p>
    </div>`;
  const [mi, mo, ag] = [$('#cMin'), $('#cMo'), $('#cAgua')];
  const upd = () => {
    const min = +mi.value, morg = +mo.value, agua = +ag.value;
    let aire = 100 - min - morg - agua;
    $('#cMin_o').textContent = min + ' %';
    $('#cMo_o').textContent = morg + ' %';
    $('#cAgua_o').textContent = agua + ' %';

    const suma = $('#cSuma');
    if (aire < 0) {
      suma.textContent = 'La suma de minerales, materia orgánica y agua supera el 100 %. Baja algún valor.';
      suma.className = 'suma mal';
      aire = 0;
    } else {
      suma.textContent = `Suma: ${min + morg + agua} % · el resto (${aire} %) es aire`;
      suma.className = 'suma ok';
    }

    $('#bMin').style.width  = min + '%';
    $('#bMo').style.width   = morg + '%';
    $('#bAgua').style.width = agua + '%';
    $('#bAire').style.width = Math.max(0, aire) + '%';

    let est, txt;
    if (agua > 35)      { est = 'Suelo saturado'; txt = 'El agua ocupa casi todos los poros. Queda poco aire, y sin oxígeno las raíces no pueden respirar. Es la condición típica de un suelo encharcado o compactado.'; }
    else if (aire < 10) { est = 'Suelo asfixiado'; txt = 'Hay muy poco aire. Aunque el suelo tenga agua de sobra, el crecimiento de las raíces se frena y cambian los procesos químicos: aparecen condiciones reductoras.'; }
    else if (morg < 2)  { est = 'Suelo pobre en materia orgánica'; txt = 'La fracción orgánica es muy baja. El suelo pierde estructura, capacidad de retención de agua y de nutrientes. Es el caso de muchos suelos laboreados durante décadas.'; }
    else if (agua >= 15 && agua <= 30 && aire >= 20) { est = 'Equilibrio adecuado'; txt = 'Hay agua suficiente para las raíces y aire suficiente para que respiren. Esta proporción es la que se busca en un suelo fértil: agua y aire compartiendo el espacio poroso.'; }
    else                { est = 'Proporción intermedia'; txt = 'La mezcla es funcional, aunque hay margen de mejora. Ajusta el agua y la materia orgánica para ver cuánto cambia el comportamiento.'; }

    $('#cEst').textContent = est;
    $('#cTxt').textContent = txt;
  };
  [mi, mo, ag].forEach(s => s.oninput = upd); upd();
};

/* -------------------------------------------------------------- 3 comparar */
LABS.comparar = (root) => {
  const filas = [
    ['Origen', 'Se forma en el sitio, a partir del material parental de abajo', 'Llega transportado por agua, viento o hielo desde otro lugar'],
    ['Estructura', 'Agregados (peds) con poros conectados y raíces', 'Estratos depositados por capas, granos sueltos o cementados'],
    ['Forma de los granos', 'Angulosos y de tamaños variados', 'Redondeados y seleccionados por tamaño'],
    ['Materia orgánica', 'Concentrada en la superficie (horizonte O y A)', 'Baja y dispersa; excepcionalmente alta en turberas'],
    ['Actividad biológica', 'Alta: raíces, hongos, bacterias, lombrices', 'Menor y condicionada por el agua y el oxígeno'],
    ['Cómo se muestrea', 'Por horizontes y por profundidad', 'Por estratos de deposición'],
    ['Norma que aplica', 'Calidad de suelo según el uso del terreno', 'Calidad de sedimento y salud del ecosistema acuático']
  ];
  root.innerHTML = `
    <div class="compare">
      <div class="col suelo"><h3>🌱 Suelo</h3><ul id="csuelo"></ul></div>
      <div class="col sedim"><h3>🏞️ Sedimento</h3><ul id="csedim"></ul></div>
    </div>
    <p class="lab-sub" style="margin-top:16px">Toca una característica para verla resaltada en ambos lados.</p>
    <div class="readout" id="cDet"><p>Todavía no has seleccionado ninguna característica.</p></div>`;
  const ulS = $('#csuelo'), ulD = $('#csedim');
  ulS.innerHTML = filas.map((f, i) => `<li><b>${f[0]}</b>${f[1]}</li>`).join('');
  ulD.innerHTML = filas.map((f, i) => `<li><b>${f[0]}</b>${f[2]}</li>`).join('');

  const marcar = (i) => {
    $$('li', ulS).forEach((l, k) => { l.style.background = k === i ? 'var(--brand-lt)' : ''; });
    $$('li', ulD).forEach((l, k) => { l.style.background = k === i ? '#e8edf3' : ''; });
    $('#cDet').innerHTML = `<div class="r-title">${filas[i][0]}</div>
      <p><b style="color:var(--brand)">Suelo:</b> ${filas[i][1]}</p>
      <p style="margin-top:8px"><b style="color:#2c4a63">Sedimento:</b> ${filas[i][2]}</p>`;
  };
  $$('li', ulS).forEach((li, i) => { li.style.cursor = 'pointer'; li.onclick = () => marcar(i); });
  $$('li', ulD).forEach((li, i) => { li.style.cursor = 'pointer'; li.onclick = () => marcar(i); });
};

/* ---------------------------------------------------------------- 4 capas */
LABS.capas = (root) => {
  const capas = [
    ['O', '#4a3a2a', 'Horizonte orgánico', 'Hojas, ramas y restos poco descompuestos. Muy oscuro y esponjoso. Protege la superficie del impacto de la lluvia.',
      'No es imprescindible que exista: en un desierto o en una ladera erosionada puede faltar por completo. Cuando está, es la entrada principal de materia orgánica al sistema.'],
    ['A', '#3d2f22', 'Horizonte mineral superficial', 'Mezcla de minerales y humus. Aquí se concentran las raíces y la mayor parte de la actividad biológica. Suele ser el más fértil.',
      'Es la capa que se pierde primero con la erosión, y la que más cuesta recuperar. Su espesor es un indicador directo de la historia de uso del terreno.'],
    ['E', '#7d7566', 'Horizonte eluvial', 'Zona de lavado. El agua que percola se llevó arcilla, hierro y materia orgánica. Se ve más claro que las capas vecinas.',
      'Su presencia indica que hay infiltración activa. Si es muy marcado, también indica pérdida de nutrientes y de capacidad de retención hacia las capas profundas.'],
    ['B', '#a8622f', 'Horizonte iluvial', 'Zona de acumulación: recibe la arcilla, el hierro o los carbonatos que bajan de arriba. Color más intenso y estructura en bloques.',
      'Un horizonte B muy arcilloso y poco permeable genera encharcamiento superficial aunque la capa de arriba drene bien. Es un detalle clave en obras y en agricultura.'],
    ['C', '#8c8577', 'Material parental fragmentado', 'Roca meteorizada, en fragmentos, pero sin estructura de suelo. Conserva rasgos de la roca original.',
      'Indica qué materiales hay disponibles para seguir formando suelo, y qué tan profunda es la zona que las raíces pueden explorar.'],
    ['D / R', '#6d6a63', 'Roca madre', 'Roca continua, dura, sin alterar. Es el límite inferior del perfil.',
      'Define la profundidad efectiva del suelo. En un terreno con roca a 30 cm no se puede plantar un árbol de raíz profunda ni excavar una zanja sin voladura.']
  ];
  root.innerHTML = `<div class="perfil">
    ${capas.map((c, i) => `
      <button class="capa" aria-expanded="false" data-i="${i}">
        <span class="sigla" style="background:${c[1]}">${c[0]}</span>
        <span>
          <span class="nom">${c[2]}</span><br>
          <span class="desc">${c[3]}</span>
        </span>
        <span class="capa-detalle">${c[4]}</span>
      </button>`).join('')}
  </div>
  <p class="lab-sub" style="margin-top:16px">Toca cada capa para ver su función. No todos los suelos tienen todas las capas, y el espesor cambia mucho de un lugar a otro.</p>`;
  $$('.capa', root).forEach(b => {
    b.onclick = () => {
      const abierto = b.getAttribute('aria-expanded') === 'true';
      $$('.capa', root).forEach(x => x.setAttribute('aria-expanded', 'false'));
      b.setAttribute('aria-expanded', abierto ? 'false' : 'true');
    };
  });
};

/* -------------------------------------------------------------- 5 textura */
LABS.textura = (root) => {
  root.innerHTML = `
    ${punteroSlider('tAre', 0, 100, 1, 40, { et: 'Arena (2 – 0,05 mm)', suf: ' %' })}
    ${punteroSlider('tLim', 0, 100, 1, 40, { et: 'Limo (0,05 – 0,002 mm)', suf: ' %' })}
    ${punteroSlider('tArc', 0, 100, 1, 20, { et: 'Arcilla (< 0,002 mm)', suf: ' %' })}
    <p class="suma" id="tSuma"></p>
    <div class="readout">
      <div class="r-title">Clase textural</div>
      <div class="r-main" id="tClase">Franca</div>
      <p id="tTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Retención de agua</span><span class="v" id="tRet">—</span></div>
        <div class="r-cell"><span class="k">Drenaje</span><span class="v" id="tDre">—</span></div>
        <div class="r-cell"><span class="k">CIC esperada</span><span class="v" id="tCic">—</span></div>
        <div class="r-cell"><span class="k">Facilidad de laboreo</span><span class="v" id="tLab">—</span></div>
      </div>
    </div>`;
  const [ar, li, arc] = [$('#tAre'), $('#tLim'), $('#tArc')];

  const upd = () => {
    let a = +ar.value, l = +li.value, c = +arc.value;
    let tot = a + l + c;
    const suma = $('#tSuma');
    if (tot !== 100) {
      suma.textContent = `Suma ${tot} % — se normaliza a 100 % para clasificar (${Math.round(a*100/tot)} / ${Math.round(l*100/tot)} / ${Math.round(c*100/tot)})`;
      suma.className = 'suma ' + (Math.abs(tot - 100) < 3 ? 'ok' : 'mal');
      a = a * 100 / tot; l = l * 100 / tot; c = c * 100 / tot;
    } else { suma.textContent = 'Suma: 100 %'; suma.className = 'suma ok'; }

    $('#tAre_o').textContent = Math.round(a) + ' %';
    $('#tLim_o').textContent = Math.round(l) + ' %';
    $('#tArc_o').textContent = Math.round(c) + ' %';

    let clase, txt, ret, dre, cic, lab;
    if (a >= 85)                     { clase = 'Arenosa'; txt = 'Predominan los granos grandes. El agua atraviesa rápido y se lleva consigo los nutrientes disueltos.'; ret = 'muy baja'; dre = 'muy rápido'; cic = 'muy baja'; lab = 'muy fácil'; }
    else if (c >= 40)                { clase = 'Arcillosa'; txt = 'Predominan las partículas finas. Retiene mucha agua y nutrientes, pero deja poco aire y se compacta con facilidad.'; ret = 'muy alta'; dre = 'muy lento'; cic = 'alta'; lab = 'difícil'; }
    else if (a >= 52 && c < 27)      { clase = 'Franco-arenosa'; txt = 'Mayoría de arena con suficiente limo y arcilla para retener algo de agua. Buen drenaje, retención moderada.'; ret = 'baja-media'; dre = 'rápido'; cic = 'baja-media'; lab = 'fácil'; }
    else if (l >= 50 && c < 27)      { clase = 'Limosa'; txt = 'Mucho limo. Retiene bien, pero los granos finos sellan la superficie con facilidad y favorece el encostramiento.'; ret = 'media-alta'; dre = 'moderado'; cic = 'media'; lab = 'media'; }
    else if (c >= 27 && a >= 20)     { clase = 'Franco-arcillosa'; txt = 'Equilibrio con peso hacia la arcilla. Buena reserva de nutrientes y agua, pero exige manejo cuidadoso para no compactar.'; ret = 'alta'; dre = 'lento'; cic = 'alta'; lab = 'difícil'; }
    else if (c >= 27)                { clase = 'Arcillo-limosa'; txt = 'Muy fina en general. Alta retención y alta CIC, con riesgo de encharcamiento y de sellado superficial.'; ret = 'muy alta'; dre = 'muy lento'; cic = 'alta'; lab = 'difícil'; }
    else                             { clase = 'Franca'; txt = 'Mezcla equilibrada de los tres tamaños: retiene agua, deja entrar aire y permite el desarrollo de raíces. Es la textura que se busca en agricultura.'; ret = 'media'; dre = 'moderado'; cic = 'media'; lab = 'fácil'; }

    $('#tClase').textContent = clase;
    $('#tTxt').textContent = txt;
    $('#tRet').textContent = ret;
    $('#tDre').textContent = dre;
    $('#tCic').textContent = cic;
    $('#tLab').textContent = lab;
  };
  [ar, li, arc].forEach(s => s.oninput = upd); upd();
};

/* ----------------------------------------------------------- 6 estructura */
LABS.estructura = (root) => {
  const tipos = {
    granular:   { nom: 'Granular (migajón)', agua: 'alta', aire: 'alto', raiz: 'fácil', eros: 'baja',
      txt: 'Grumos redondeados y pequeños, unidos por materia orgánica y raíces. Es la estructura típica de la capa superficial fértil. Cada grumo deja huecos entre sí, así que entran agua y aire al mismo tiempo.', buena: true },
    bloques:    { nom: 'En bloques', agua: 'media', aire: 'medio', raiz: 'media', eros: 'media',
      txt: 'Terrones con caras planas y aristas. Frecuente en el horizonte B. Funciona, pero si los bloques son grandes y duros, las raíces y el agua encuentran resistencia.', buena: true },
    laminar:    { nom: 'Laminar', agua: 'baja', aire: 'bajo', raiz: 'difícil', eros: 'alta',
      txt: 'Capas horizontales delgadas y apretadas. Suele aparecer por compactación o por laboreo repetido a la misma profundidad. El agua se escurre por encima en lugar de entrar.', buena: false },
    columnar:   { nom: 'Columnar (con sodio)', agua: 'muy baja', aire: 'muy bajo', raiz: 'muy difícil', eros: 'muy alta',
      txt: 'Columnas verticales separadas por grietas. Es la firma visual de un exceso de sodio: la arcilla se dispersa, se sella la superficie y el suelo pierde su capacidad de infiltrar.', buena: false },
    masiva:     { nom: 'Masiva (sin agregados)', agua: 'muy baja', aire: 'muy bajo', raiz: 'muy difícil', eros: 'muy alta',
      txt: 'No se distinguen agregados: el material se ve como un bloque único. Aparece en suelos muy alterados, compactados o en material parental reciente. Sin poros, no hay vida ni circulación.', buena: false }
  };
  root.innerHTML = `
    <div class="chips" id="eChips" style="margin-bottom:20px">
      ${Object.entries(tipos).map(([k, v], i) => `<button class="chip" data-t="${k}" style="cursor:pointer;${i===0?'background:var(--brand-lt);border-color:var(--brand);color:var(--brand-dk);font-weight:600':''}">${v.nom}</button>`).join('')}
    </div>
    <div class="readout">
      <div class="r-title">Comportamiento</div>
      <div class="r-main" id="eNom">Granular (migajón)</div>
      <p id="eTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Entrada de agua</span><span class="v" id="eAgua">—</span></div>
        <div class="r-cell"><span class="k">Aireación</span><span class="v" id="eAire">—</span></div>
        <div class="r-cell"><span class="k">Penetración de raíces</span><span class="v" id="eRaiz">—</span></div>
        <div class="r-cell"><span class="k">Susceptibilidad a erosión</span><span class="v" id="eEros">—</span></div>
      </div>
    </div>`;
  const pintar = (k) => {
    const t = tipos[k];
    $('#eNom').textContent = t.nom;
    $('#eTxt').textContent = t.txt;
    $('#eAgua').textContent = t.agua;
    $('#eAire').textContent = t.aire;
    $('#eRaiz').textContent = t.raiz;
    $('#eEros').textContent = t.eros;
    $$('#eChips .chip').forEach(c => {
      const on = c.dataset.t === k;
      c.style.background = on ? 'var(--brand-lt)' : '';
      c.style.borderColor = on ? 'var(--brand)' : '';
      c.style.color = on ? 'var(--brand-dk)' : '';
      c.style.fontWeight = on ? '600' : '400';
    });
  };
  $$('#eChips .chip').forEach(c => c.onclick = () => pintar(c.dataset.t));
  pintar('granular');
};

/* -------------------------------------------------------------- 7 físicos */
LABS.fisicos = (root) => {
  root.innerHTML = `
    ${punteroSlider('fDa', 0.8, 2.0, 0.01, 1.30, { et: 'Densidad aparente (Da)', suf: ' g/cm³' })}
    ${punteroSlider('fDr', 2.50, 2.85, 0.01, 2.65, { et: 'Densidad real (Dr)', suf: ' g/cm³' })}
    ${punteroSlider('fArc', 5, 60, 1, 25, { et: 'Contenido de arcilla', suf: ' %' })}
    <div class="readout">
      <div class="r-title">Resultado</div>
      <div class="r-main" id="fPor">49 % <small>de porosidad</small></div>
      <p id="fTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Estado</span><span class="v" id="fEst">—</span></div>
        <div class="r-cell"><span class="k">Agua disponible estimada</span><span class="v" id="fAgua">—</span></div>
        <div class="r-cell"><span class="k">Riesgo de anoxia</span><span class="v" id="fAnox">—</span></div>
        <div class="r-cell"><span class="k">Infiltración esperada</span><span class="v" id="fInf">—</span></div>
      </div>
    </div>`;
  const [da, dr, arc] = [$('#fDa'), $('#fDr'), $('#fArc')];
  const upd = () => {
    const dA = +da.value, dR = +dr.value, ar = +arc.value;
    $('#fDa_o').textContent = dA.toFixed(2) + ' g/cm³';
    $('#fDr_o').textContent = dR.toFixed(2) + ' g/cm³';
    $('#fArc_o').textContent = ar + ' %';

    const por = clamp(1 - dA / dR, 0, 1) * 100;
    $('#fPor').innerHTML = Math.round(por) + ' % <small>de porosidad</small>';

    // agua disponible aproximada: más arcilla retiene más, pero más compactación reduce
    const aguaDisp = clamp(ar * 0.55 + (100 - por) * 0.05, 2, 26);
    let est, txt, anox, inf;
    if (por < 35)      { est = 'Compactado'; txt = 'La porosidad es demasiado baja para un suelo funcional. Con tan poco espacio poroso, el agua no entra, el aire no circula y las raíces no penetran. Es el resultado típico de tráfico pesado o pastoreo intenso.'; }
    else if (por < 45) { est = 'Porosidad limitada'; txt = 'El suelo todavía funciona, pero está por debajo de lo deseable. Conviene reducir la compactación y aumentar la materia orgánica para recuperar estructura.'; }
    else if (por <= 60){ est = 'Adecuada'; txt = 'La porosidad está en el rango esperable para un suelo mineral. Hay espacio para el agua y para el aire, que es lo que necesitan las raíces y los microorganismos.'; }
    else               { est = 'Muy porosa'; txt = 'La porosidad es alta. Puede ser un suelo muy orgánico y esponjoso, o un suelo con exceso de huecos grandes donde el agua drena demasiado rápido y los nutrientes se lavan.'; }

    anox = (ar > 35 && por < 45) ? 'alto' : (por < 40 ? 'medio' : 'bajo');
    inf = por < 35 ? 'muy baja' : por < 45 ? 'baja-media' : por < 58 ? 'adecuada' : 'alta';

    $('#fEst').textContent = est;
    $('#fTxt').textContent = txt;
    $('#fAgua').textContent = Math.round(aguaDisp) + ' % del volumen';
    $('#fAnox').textContent = anox;
    $('#fInf').textContent = inf;
  };
  [da, dr, arc].forEach(s => s.oninput = upd); upd();
};

/* ------------------------------------------------------------------ 8 pH */
LABS.ph = (root) => {
  root.innerHTML = `
    ${punteroSlider('pPh', 3.5, 10, 0.1, 6.5, { et: 'pH del suelo', suf: '' })}
    <div class="readout">
      <div class="r-title">Lectura</div>
      <div class="r-main" id="pEst">Neutro</div>
      <p id="pTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Fósforo</span><span class="v" id="pP">—</span></div>
        <div class="r-cell"><span class="k">Hierro / Manganeso / Zinc</span><span class="v" id="pFe">—</span></div>
        <div class="r-cell"><span class="k">Aluminio tóxico</span><span class="v" id="pAl">—</span></div>
        <div class="r-cell"><span class="k">Actividad microbiana</span><span class="v" id="pMic">—</span></div>
      </div>
    </div>
    <p class="lab-sub" id="pRec" style="margin-top:16px"></p>`;
  const s = $('#pPh');
  const upd = () => {
    const ph = +s.value;
    $('#pPh_o').textContent = ph.toFixed(1);
    let est, txt, P, Fe, Al, Mic, rec;
    if (ph < 4.5)      { est = 'Extremadamente ácido'; txt = 'Condición muy restrictiva. La mayoría de los cultivos no prospera y la actividad biológica es mínima.'; }
    else if (ph < 5.5) { est = 'Muy ácido'; txt = 'El aluminio se vuelve soluble y tóxico para las raíces. El fósforo queda fijado con hierro y aluminio, fuera del alcance de la planta.'; }
    else if (ph < 6.0) { est = 'Ácido'; txt = 'Aún hay riesgo de aluminio y de fijación de fósforo. Muchos cultivos crecen, pero por debajo de su potencial.'; }
    else if (ph <= 7.0){ est = 'Óptimo'; txt = 'Rango favorable para la mayoría de los cultivos: el fósforo está disponible, los micronutrientes se mantienen accesibles y la actividad microbiana es alta.'; }
    else if (ph <= 7.8){ est = 'Ligeramente alcalino'; txt = 'Todavía funcional. Algunos micronutrientes empiezan a insolubilizarse, sobre todo el hierro, el zinc y el manganeso.'; }
    else if (ph <= 8.5){ est = 'Alcalino'; txt = 'El fósforo se fija con calcio y el hierro deja de estar disponible. Aparecen clorosis en hojas nuevas.'; }
    else               { est = 'Muy alcalino'; txt = 'Suelo fuertemente alcalino, frecuente en zonas áridas o sódicas. La disponibilidad de micronutrientes es muy baja y la estructura suele estar degradada.'; }

    const dispo = (rango) => ph >= rango[0] && ph <= rango[1];
    P  = dispo([5.8, 7.2]) ? 'alta' : (ph < 5.8 ? 'baja (fijado por Fe/Al)' : 'baja (fijado por Ca)');
    Fe = ph < 6.2 ? 'alta' : ph < 7.0 ? 'media' : 'baja';
    Al = ph < 5.0 ? 'muy alto — tóxico' : ph < 5.5 ? 'presente — riesgo' : 'insignificante';
    Mic = ph >= 5.5 && ph <= 7.5 ? 'alta' : ph < 5.5 ? 'baja' : 'media';

    if (ph < 5.8) rec = '→ Manejo habitual: aplicar material encalante (carbonato de calcio) para subir el pH hacia 6,0–6,5, y confirmar con un nuevo análisis.';
    else if (ph > 7.5) rec = '→ Manejo habitual: acidificar de forma controlada (azufre elemental, materiales orgánicos ácidos) o elegir cultivos adaptados a la alcalinidad.';
    else rec = '→ No se requiere corrección de pH. Mantener el nivel con el manejo habitual del suelo.';

    $('#pEst').textContent = est;
    $('#pTxt').textContent = txt;
    $('#pP').textContent = P;
    $('#pFe').textContent = Fe;
    $('#pAl').textContent = Al;
    $('#pMic').textContent = Mic;
    $('#pRec').textContent = rec;
  };
  s.oninput = upd; upd();
};

/* ----------------------------------------------------------------- 9 CIC */
LABS.cic = (root) => {
  root.innerHTML = `
    ${punteroSlider('kCic', 2, 45, 1, 18, { et: 'CIC del suelo', suf: ' cmol(+)/kg' })}
    ${punteroSlider('kCa', 0, 100, 1, 55, { et: 'Calcio (Ca²⁺)', suf: ' % de la CIC' })}
    ${punteroSlider('kMg', 0, 100, 1, 15, { et: 'Magnesio (Mg²⁺)', suf: ' % de la CIC' })}
    ${punteroSlider('kK', 0, 100, 1, 5, { et: 'Potasio (K⁺)', suf: ' % de la CIC' })}
    ${punteroSlider('kNa', 0, 100, 1, 3, { et: 'Sodio (Na⁺)', suf: ' % de la CIC' })}
    <p class="suma" id="kSuma"></p>
    <div class="readout">
      <div class="r-title">Balance de cationes</div>
      <div class="r-main" id="kSat">—</div>
      <p id="kTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Saturación de bases</span><span class="v" id="kBase">—</span></div>
        <div class="r-cell"><span class="k">PSI (sodio)</span><span class="v" id="kPsi">—</span></div>
        <div class="r-cell"><span class="k">Aluminio + H (acidez)</span><span class="v" id="kAl">—</span></div>
        <div class="r-cell"><span class="k">Nutrientes retenidos</span><span class="v" id="kNut">—</span></div>
      </div>
    </div>`;
  const [cic, ca, mg, k, na] = ['#kCic', '#kCa', '#kMg', '#kK', '#kNa'].map(s => $(s));
  const upd = () => {
    const C = +cic.value, Ca = +ca.value, Mg = +mg.value, K = +k.value, Na = +na.value;
    $('#kCic_o').textContent = C + ' cmol/kg';
    ['#kCa_o', '#kMg_o', '#kK_o', '#kNa_o'].forEach((id, i) => $(id).textContent = [Ca, Mg, K, Na][i] + ' %');

    const sumaBases = Ca + Mg + K + Na;
    const al = 100 - sumaBases;
    const suma = $('#kSuma');
    if (sumaBases > 100) { suma.textContent = 'Las bases suman más del 100 %. Reduce algún valor.'; suma.className = 'suma mal'; }
    else { suma.textContent = `Bases: ${sumaBases} % · acidez (Al + H): ${100 - sumaBases} %`; suma.className = 'suma ' + (sumaBases >= 50 ? 'ok' : 'mal'); }

    let est, txt;
    if (Na > 15)      { est = 'Suelo sódico'; txt = 'El sodio ocupa más del 15 % de las posiciones de intercambio. La arcilla se dispersa, los agregados se deshacen y la superficie se sella. El agua deja de infiltrarse y el pH sube. Se corrige con yeso, lavado y drenaje.'; }
    else if (sumaBases < 35) { est = 'Suelo ácido, baja saturación'; txt = 'Menos de un tercio de las posiciones están ocupadas por bases. El resto lo ocupan aluminio e hidrógeno, lo que acidifica el medio y puede liberar aluminio tóxico.'; }
    else if (sumaBases < 50) { est = 'Saturación media-baja'; txt = 'El suelo retiene nutrientes, pero hay margen para mejorar. Un encalado moderado suele aumentar la saturación de bases y la disponibilidad de fósforo.'; }
    else if (sumaBases <= 85) { est = 'Bien saturado'; txt = 'La mayor parte de las posiciones están ocupadas por calcio, magnesio y potasio. Es la condición de un suelo fértil: hay donde retener nutrientes y la acidez no domina.'; }
    else              { est = 'Saturación muy alta'; txt = 'Casi todas las posiciones están ocupadas por bases. Es favorable para la fertilidad, pero conviene vigilar el sodio y el equilibrio entre cationes.'; }

    $('#kSat').textContent = est;
    $('#kTxt').textContent = txt;
    $('#kBase').textContent = sumaBases + ' %';
    $('#kPsi').textContent = Na + ' %' + (Na > 15 ? ' — sódico' : ' — normal');
    $('#kAl').textContent = Math.max(0, al) + ' %';
    $('#kNut').textContent = C < 8 ? 'pocos (se lavan)' : C < 20 ? 'moderados' : 'muchos';
  };
  [cic, ca, mg, k, na].forEach(s => s.oninput = upd); upd();
};

/* ------------------------------------------------------------ 10 salinidad */
LABS.salinidad = (root) => {
  root.innerHTML = `
    ${punteroSlider('sCe', 0, 20, 0.1, 1.0, { et: 'Conductividad eléctrica (CE)', suf: ' dS/m' })}
    ${punteroSlider('sPsi', 0, 40, 1, 5, { et: 'Porcentaje de sodio intercambiable (PSI)', suf: ' %' })}
    <div class="readout">
      <div class="r-title">Diagnóstico combinado</div>
      <div class="r-main" id="sEst">Suelo normal</div>
      <p id="sTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Clase por salinidad</span><span class="v" id="sSal">—</span></div>
        <div class="r-cell"><span class="k">Clase por sodicidad</span><span class="v" id="sSod">—</span></div>
        <div class="r-cell"><span class="k">Efecto en la planta</span><span class="v" id="sEf">—</span></div>
        <div class="r-cell"><span class="k">Corrección</span><span class="v" id="sCor">—</span></div>
      </div>
    </div>`;
  const ce = $('#sCe'), psi = $('#sPsi');
  const upd = () => {
    const C = +ce.value, P = +psi.value;
    $('#sCe_o').textContent = C.toFixed(1) + ' dS/m';
    $('#sPsi_o').textContent = P + ' %';

    const claseSal = C < 2 ? 'normal' : C < 4 ? 'ligeramente salino' : C < 8 ? 'moderadamente salino' : C < 16 ? 'fuertemente salino' : 'extremadamente salino';
    const claseSod = P >= 15 ? 'sódico' : 'normal';
    const esSal = C >= 4, esSod = P >= 15;

    let est, txt, ef, cor;
    if (esSal && esSod) { est = 'Salino y sódico'; txt = 'Hay dos problemas a la vez y hay que tratarlos en orden: primero el yeso para desplazar el sodio y recuperar la estructura, después el lavado con drenaje para retirar las sales.'; }
    else if (esSal)     { est = 'Suelo salino'; txt = 'El exceso de sales aumenta la presión osmótica: hay agua en el suelo, pero la planta no puede absorberla. Además puede haber toxicidad por cloruro o sodio.'; }
    else if (esSod)     { est = 'Suelo sódico'; txt = 'El sodio ocupa demasiadas posiciones de intercambio y dispersa la arcilla. El suelo se sella, pierde infiltración y sube el pH. Las sales totales pueden ser normales.'; }
    else                { est = 'Suelo normal'; txt = 'Ni la salinidad ni la sodicidad están en niveles problemáticos. Conviene vigilarlas si se riega con agua de calidad dudosa o si hay intrusión marina.'; }

    ef  = C < 2 ? 'sin estrés' : C < 4 ? 'leve en cultivos sensibles' : C < 8 ? 'reducción de rendimiento' : 'severo';
    cor = esSod ? (esSal ? 'yeso + lavado + drenaje' : 'yeso + lavado + drenaje')
                : esSal ? 'lavado + drenaje (sin yeso)'
                : 'ninguna';

    $('#sEst').textContent = est;
    $('#sTxt').textContent = txt;
    $('#sSal').textContent = claseSal;
    $('#sSod').textContent = claseSod;
    $('#sEf').textContent = ef;
    $('#sCor').textContent = cor;
  };
  [ce, psi].forEach(s => s.oninput = upd); upd();
};

/* ------------------------------------------------------- 11 materia orgánica */
LABS['materia-organica'] = (root) => {
  root.innerHTML = `
    ${punteroSlider('mCot', 0.2, 6, 0.1, 1.8, { et: 'Carbono orgánico total (COT)', suf: ' %' })}
    <div class="readout">
      <div class="r-title">Equivalencia y efectos</div>
      <div class="r-main" id="mMo">3,1 % <small>de materia orgánica</small></div>
      <p id="mTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Nivel</span><span class="v" id="mNiv">—</span></div>
        <div class="r-cell"><span class="k">Aporte a la CIC</span><span class="v" id="mCic">—</span></div>
        <div class="r-cell"><span class="k">Agua retenida</span><span class="v" id="mAgua">—</span></div>
        <div class="r-cell"><span class="k">Nitrógeno potencial</span><span class="v" id="mN">—</span></div>
      </div>
    </div>
    <p class="lab-sub" style="margin-top:14px">La conversión usa el factor habitual: materia orgánica ≈ carbono orgánico × 1,724.</p>`;
  const s = $('#mCot');
  const upd = () => {
    const cot = +s.value;
    const mos = cot * 1.724;
    $('#mCot_o').textContent = cot.toFixed(1) + ' %';
    $('#mMo').innerHTML = mos.toFixed(1).replace('.', ',') + ' % <small>de materia orgánica</small>';

    let niv, txt;
    if (mos < 1)      { niv = 'muy bajo'; txt = 'El suelo depende casi por completo de la fracción mineral. Tiene poca capacidad de retener agua y nutrientes, y la estructura es frágil.'; }
    else if (mos < 2) { niv = 'bajo'; txt = 'Es el valor habitual en suelos agrícolas muy trabajados. La fertilidad se sostiene sobre todo con fertilizantes externos.'; }
    else if (mos < 4) { niv = 'medio'; txt = 'Nivel funcional. El suelo retiene agua y nutrientes de forma razonable y mantiene estructura estable.'; }
    else if (mos < 8) { niv = 'alto'; txt = 'Suelo con buena reserva orgánica: alta CIC, buena estructura y capacidad de retención. Es el resultado de años de manejo con aportes orgánicos.'; }
    else              { niv = 'muy alto'; txt = 'Suelo orgánico. Dominan las propiedades de la materia orgánica: retención muy alta, densidad aparente baja y alta reserva de nutrientes.'; }

    // CIC aportada: ~200 cmol/kg de MO como orden de magnitud
    const cicMo = mos / 100 * 200;
    $('#mMo').style.color = '';
    $('#mNiv').textContent = niv;
    $('#mTxt').textContent = txt;
    $('#mCic').textContent = '≈ ' + cicMo.toFixed(1) + ' cmol(+)/kg';
    $('#mAgua').textContent = '≈ ' + (mos * 3).toFixed(0) + ' % de su peso';
    $('#mN').textContent = '≈ ' + (cot * 0.05 * 1000).toFixed(0) + ' kg N/ha (orden de magnitud)';
  };
  s.oninput = upd; upd();
};

/* ------------------------------------------------------------ 12 nutrientes */
LABS.nutrientes = (root) => {
  const N = {
    N:  { nom: 'Nitrógeno (N)', mov: 'móvil en forma de nitrato', falta: 'amarilleo general que empieza en las hojas viejas; crecimiento lento', exceso: 'crecimiento vegetativo excesivo, plantas blandas, lixiviación de nitrato', pH: 'disponible en un rango amplio; el amonio se favorece en pH ácido' },
    P:  { nom: 'Fósforo (P)', mov: 'muy poco móvil; se fija en el suelo', falta: 'crecimiento reducido, hojas con tonos púrpuras o verde oscuro, raíces pobres', exceso: 'poco frecuente en la planta; el problema es la pérdida hacia ríos y lagos', pH: 'máxima disponibilidad cerca de pH 6,5; se fija con Fe y Al en ácido y con Ca en alcalino' },
    K:  { nom: 'Potasio (K)', mov: 'retenido en arcillas, poco lixiviado', falta: 'bordes y puntas de hojas quemadas, tallos débiles, frutos de baja calidad', exceso: 'puede bloquear la absorción de magnesio y calcio', pH: 'disponible en un rango amplio' },
    Ca: { nom: 'Calcio (Ca)', mov: 'poco móvil dentro de la planta', falta: 'puntas de hojas nuevas deformadas, necrosis en los bordes, frutos con pudrición apical', exceso: 'rara vez tóxico; compite con magnesio y potasio', pH: 'abundante en suelos neutros y alcalinos; escaso en suelos ácidos' },
    Mg: { nom: 'Magnesio (Mg)', mov: 'móvil dentro de la planta', falta: 'clorosis entre nervaduras en hojas viejas, que siguen verdes en las venas', exceso: 'desequilibra el calcio; puede inducir deficiencia de potasio', pH: 'más disponible en pH 6,0–7,0' },
    S:  { nom: 'Azufre (S)', mov: 'moderadamente móvil', falta: 'amarilleo uniforme en hojas jóvenes, similar al nitrógeno pero en hojas nuevas', exceso: 'poco frecuente', pH: 'disponible como sulfato en un rango amplio' },
    Fe: { nom: 'Hierro (Fe)', mov: 'inmóvil dentro de la planta', falta: 'clorosis entre nervaduras en hojas JÓVENES, con las venas verdes', exceso: 'toxicidad en suelos inundados (formas reducidas)', pH: 'muy disponible en ácido, insoluble en alcalino' },
    Mn: { nom: 'Manganeso (Mn)', mov: 'inmóvil', falta: 'clorosis y manchas necróticas en hojas jóvenes', exceso: 'toxicidad en suelos muy ácidos o inundados', pH: 'más disponible en medio ácido' },
    Zn: { nom: 'Zinc (Zn)', mov: 'poco móvil', falta: 'hojas pequeñas, entrenudos cortos, clorosis intervenal en hojas nuevas', exceso: 'puede ser tóxico en suelos contaminados por minería', pH: 'más disponible en medio ácido' },
    B:  { nom: 'Boro (B)', mov: 'poco móvil', falta: 'muerte del punto de crecimiento, hojas deformes y quebradizas', exceso: 'tóxico con margen estrecho; cuidado con agua de riego', pH: 'disponibilidad cae en pH alto' }
  };
  root.innerHTML = `
    <div class="chips" id="nChips" style="margin-bottom:18px">
      ${Object.entries(N).map(([k, v], i) => `<button class="chip" data-n="${k}" style="cursor:pointer;${i===0?'background:var(--brand-lt);border-color:var(--brand);color:var(--brand-dk);font-weight:600':''}">${v.nom.split(' ')[0]}</button>`).join('')}
    </div>
    <div class="readout">
      <div class="r-title">Ficha del nutriente</div>
      <div class="r-main" id="nNom">Nitrógeno (N)</div>
      <div class="r-grid">
        <div class="r-cell" style="grid-column:1/-1"><span class="k">Movilidad en el suelo</span><span class="v" id="nMov">—</span></div>
        <div class="r-cell" style="grid-column:1/-1"><span class="k">Síntoma de falta</span><span class="v" id="nFalta">—</span></div>
        <div class="r-cell" style="grid-column:1/-1"><span class="k">Exceso</span><span class="v" id="nExc">—</span></div>
        <div class="r-cell" style="grid-column:1/-1"><span class="k">Relación con el pH</span><span class="v" id="nPh">—</span></div>
      </div>
    </div>`;
  const pintar = (k) => {
    const d = N[k];
    $('#nNom').textContent = d.nom;
    $('#nMov').textContent = d.mov;
    $('#nFalta').textContent = d.falta;
    $('#nExc').textContent = d.exceso;
    $('#nPh').textContent = d.pH;
    $$('#nChips .chip').forEach(c => {
      const on = c.dataset.n === k;
      c.style.background = on ? 'var(--brand-lt)' : '';
      c.style.borderColor = on ? 'var(--brand)' : '';
      c.style.color = on ? 'var(--brand-dk)' : '';
      c.style.fontWeight = on ? '600' : '400';
    });
  };
  $$('#nChips .chip').forEach(c => c.onclick = () => pintar(c.dataset.n));
  pintar('N');
};

/* --------------------------------------------------------- 13 contaminación */
LABS.contaminacion = (root) => {
  root.innerHTML = `
    <div class="chips" id="xTipo" style="margin-bottom:18px">
      <button class="chip" data-x="Pb" style="cursor:pointer;background:var(--brand-lt);border-color:var(--brand);color:var(--brand-dk);font-weight:600">Plomo (metal)</button>
      <button class="chip" data-x="Cd" style="cursor:pointer">Cadmio (metal)</button>
      <button class="chip" data-x="As" style="cursor:pointer">Arsénico (metaloide)</button>
      <button class="chip" data-x="HC" style="cursor:pointer">Hidrocarburo (orgánico)</button>
    </div>
    ${punteroSlider('xPh', 3.5, 9, 0.1, 5.5, { et: 'pH del suelo', suf: '' })}
    ${punteroSlider('xMo', 0, 10, 0.5, 2, { et: 'Materia orgánica', suf: ' %' })}
    ${punteroSlider('xArc', 0, 60, 1, 15, { et: 'Contenido de arcilla', suf: ' %' })}
    <div class="readout">
      <div class="r-title">Movilidad y riesgo</div>
      <div class="r-main" id="xEst">—</div>
      <p id="xTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Movilidad</span><span class="v" id="xMov">—</span></div>
        <div class="r-cell"><span class="k">Persistencia</span><span class="v" id="xPer">—</span></div>
        <div class="r-cell"><span class="k">Retención del suelo</span><span class="v" id="xRet">—</span></div>
        <div class="r-cell"><span class="k">Riesgo para agua subterránea</span><span class="v" id="xRie">—</span></div>
      </div>
    </div>`;
  let tipo = 'Pb';
  const ph = $('#xPh'), mo = $('#xMo'), arc = $('#xArc');

  const upd = () => {
    const P = +ph.value, M = +mo.value, A = +arc.value;
    $('#xPh_o').textContent = P.toFixed(1);
    $('#xMo_o').textContent = M + ' %';
    $('#xArc_o').textContent = A + ' %';

    const retencion = clamp((M * 6) + (A * 1.1), 0, 100); // índice simple 0-100
    const acidez = P < 5.5 ? 'alta' : P < 6.5 ? 'media' : 'baja';

    let mov, per, est, txt, rie;

    if (tipo === 'HC') {
      mov = retencion > 45 ? 'media' : 'alta';
      per = 'degradable (si hay oxígeno y nutrientes)';
      est = M >= 2 ? 'Puede biodegradarse si hay condiciones' : 'Persistirá: falta materia orgánica y actividad biológica';
      txt = 'Los hidrocarburos son moléculas orgánicas: los microorganismos del suelo pueden degradarlas, pero necesitan oxígeno, nutrientes, humedad y temperatura adecuadas. La materia orgánica y la arcilla los retienen y dan tiempo a la degradación.';
    } else if (tipo === 'As') {
      mov = P > 7 ? 'alta (arseniato móvil)' : P < 5 ? 'media-alta' : 'baja-media';
      per = 'permanente (no se degrada)';
      est = P > 7.5 ? 'Riesgo elevado: el arsénico se moviliza en pH alto' : 'Riesgo condicionado por el pH';
      txt = 'El arsénico no se degrada: cambia de forma química. En pH alcalino se moviliza como arseniato; en pH ácido y con hierro tiende a adsorberse. La materia orgánica y la arcilla ayudan a retenerlo.';
    } else {
      const metal = tipo === 'Pb' ? 'plomo' : 'cadmio';
      const muyMovil = P < 5.0;
      mov = muyMovil ? 'alta' : P < 6.0 ? 'media' : 'baja';
      per = 'permanente (no se degrada)';
      est = muyMovil ? `Riesgo alto: el ${metal} se solubiliza en pH ácido`
                     : P > 7 ? `Riesgo bajo: el ${metal} precipita y se adsorbe`
                     : `Riesgo moderado: ${metal} parcialmente retenido`;
      txt = `El ${metal} es un metal: no se degrada, solo cambia de forma. En pH bajo se solubiliza y se vuelve móvil; en pH neutro o alcalino precipita y se adsorbe en arcilla y materia orgánica. Por eso un mismo derrame es un problema distinto según el suelo.`;
    }

    rie = (mov === 'alta' || mov.startsWith('alta')) ? 'alto' : mov === 'media' ? 'medio' : 'bajo';

    $('#xEst').textContent = est;
    $('#xTxt').textContent = txt;
    $('#xMov').textContent = mov;
    $('#xPer').textContent = per;
    $('#xRet').textContent = retencion < 25 ? 'baja' : retencion < 55 ? 'media' : 'alta';
    $('#xRie').textContent = rie;
  };

  $$('#xTipo .chip').forEach(c => c.onclick = () => {
    tipo = c.dataset.x;
    $$('#xTipo .chip').forEach(x => {
      const on = x === c;
      x.style.background = on ? 'var(--brand-lt)' : '';
      x.style.borderColor = on ? 'var(--brand)' : '';
      x.style.color = on ? 'var(--brand-dk)' : '';
      x.style.fontWeight = on ? '600' : '400';
    });
    upd();
  });
  [ph, mo, arc].forEach(s => s.oninput = upd); upd();
};

/* ----------------------------------------------------------- 14 remediación */
LABS.remediacion = (root) => {
  const T = {
    fitoext: { nom: 'Fitoextracción', que: 'Se siembran plantas que absorben el contaminante y se acumulan en la parte aérea. Después se cosechan y se tratan como residuo.', plazo: 'años (varios ciclos)', costo: 'bajo', prof: 'superficial (raíces)', ideal: 'metales en concentración moderada, superficies grandes', limite: 'lenta; no sirve a profundidad; requiere destino para la biomasa contaminada' },
    fitoest: { nom: 'Fitoestabilización', que: 'Las raíces inmovilizan el contaminante en el suelo, reduciendo su movilidad y su biodisponibilidad. No se extrae: se inmoviliza.', plazo: 'meses a años', costo: 'bajo', prof: 'superficial', ideal: 'metales en suelos urbanos o de recreo, control de dispersión', limite: 'el contaminante sigue ahí; exige monitoreo permanente' },
    rizo:    { nom: 'Rizodegradación', que: 'Los microorganismos asociados a las raíces degradan contaminantes orgánicos. Las plantas aportan oxígeno y sustrato.', plazo: 'meses a años', costo: 'bajo-medio', prof: 'zona de raíces', ideal: 'hidrocarburos y plaguicidas en la rizosfera', limite: 'solo contaminantes orgánicos biodegradables' },
    bio:     { nom: 'Biorremediación', que: 'Se estimulan los microorganismos del suelo aportando oxígeno, nutrientes y humedad, o se inoculan cepas específicas.', plazo: 'meses', costo: 'medio', prof: 'media, con inyección', ideal: 'orgánicos biodegradables, in situ', limite: 'no funciona con metales; sensible a temperatura y a la toxicidad del propio contaminante' },
    estab:   { nom: 'Estabilización química', que: 'Se añaden enmiendas (cal, fosfatos, compost, biochar) que precipitan o adsorben el contaminante y reducen su movilidad.', plazo: 'semanas a meses', costo: 'medio', prof: 'la capa tratada', ideal: 'metales en suelos agrícolas o urbanos', limite: 'no elimina el contaminante; el efecto puede revertir si cambia el pH' },
    lavado:  { nom: 'Lavado de suelo (ex situ)', que: 'Se excava el suelo y se lava con una solución que extrae el contaminante, que después se separa y se trata.', plazo: 'días a semanas', costo: 'alto', prof: 'todo el volumen excavado', ideal: 'metales y algunos orgánicos en volúmenes manejables', limite: 'destruye la estructura; caro; genera efluente a tratar' },
    solid:   { nom: 'Solidificación / estabilización', que: 'Se mezcla el suelo con un agente cementante que lo encapsula y reduce la lixiviación del contaminante.', plazo: 'semanas', costo: 'medio-alto', prof: 'el volumen tratado', ideal: 'metales, contención de largo plazo', limite: 'el suelo deja de ser suelo; aumenta el volumen; requiere monitoreo' }
  };
  root.innerHTML = `
    <div class="chips" id="rChips" style="margin-bottom:18px">
      ${Object.entries(T).map(([k, v], i) => `<button class="chip" data-r="${k}" style="cursor:pointer;${i===0?'background:var(--brand-lt);border-color:var(--brand);color:var(--brand-dk);font-weight:600':''}">${v.nom}</button>`).join('')}
    </div>
    <div class="readout">
      <div class="r-title">Ficha de la técnica</div>
      <div class="r-main" id="rNom">Fitoextracción</div>
      <p id="rQue"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Plazo</span><span class="v" id="rPlazo">—</span></div>
        <div class="r-cell"><span class="k">Costo relativo</span><span class="v" id="rCosto">—</span></div>
        <div class="r-cell"><span class="k">Profundidad útil</span><span class="v" id="rProf">—</span></div>
        <div class="r-cell"><span class="k">Indicada para</span><span class="v" id="rIdeal">—</span></div>
        <div class="r-cell" style="grid-column:1/-1"><span class="k">Límite principal</span><span class="v" id="rLim">—</span></div>
      </div>
    </div>`;
  const pintar = (k) => {
    const d = T[k];
    $('#rNom').textContent = d.nom;
    $('#rQue').textContent = d.que;
    $('#rPlazo').textContent = d.plazo;
    $('#rCosto').textContent = d.costo;
    $('#rProf').textContent = d.prof;
    $('#rIdeal').textContent = d.ideal;
    $('#rLim').textContent = d.limite;
    $$('#rChips .chip').forEach(c => {
      const on = c.dataset.r === k;
      c.style.background = on ? 'var(--brand-lt)' : '';
      c.style.borderColor = on ? 'var(--brand)' : '';
      c.style.color = on ? 'var(--brand-dk)' : '';
      c.style.fontWeight = on ? '600' : '400';
    });
  };
  $$('#rChips .chip').forEach(c => c.onclick = () => pintar(c.dataset.r));
  pintar('fitoext');
};

/* ------------------------------------------------------------ 15 integrador */
LABS.integrador = (root) => {
  root.innerHTML = `
    ${punteroSlider('iArc', 5, 60, 1, 25, { et: 'Arcilla', suf: ' %' })}
    ${punteroSlider('iMo', 0.5, 8, 0.1, 2.5, { et: 'Materia orgánica', suf: ' %' })}
    ${punteroSlider('iPh', 4, 9, 0.1, 6.3, { et: 'pH', suf: '' })}
    <div class="readout">
      <div class="r-title">Lectura integrada</div>
      <div class="r-main" id="iEst">—</div>
      <p id="iTxt"></p>
      <div class="r-grid">
        <div class="r-cell"><span class="k">Fertilidad estimada</span><span class="v" id="iFert">—</span></div>
        <div class="r-cell"><span class="k">Retención de nutrientes</span><span class="v" id="iRet">—</span></div>
        <div class="r-cell"><span class="k">Vulnerabilidad a lixiviación</span><span class="v" id="iLix">—</span></div>
        <div class="r-cell"><span class="k">Vulnerabilidad a compactación</span><span class="v" id="iCom">—</span></div>
      </div>
    </div>
    <p class="lab-sub" style="margin-top:14px">Este índice es una aproximación didáctica para ver cómo se combinan las variables. En un estudio real se calcula con análisis de laboratorio y modelos específicos.</p>`;
  const [arc, mo, ph] = ['#iArc', '#iMo', '#iPh'].map(s => $(s));
  const upd = () => {
    const A = +arc.value, M = +mo.value, P = +ph.value;
    $('#iArc_o').textContent = A + ' %';
    $('#iMo_o').textContent = M.toFixed(1) + ' %';
    $('#iPh_o').textContent = P.toFixed(1);

    const fertilidad = clamp(30 + M * 8 + A * 0.5 + (P >= 6 && P <= 7.2 ? 18 : -8), 0, 100);
    const retencion = A > 35 || M > 4 ? 'alta' : A > 18 || M > 2 ? 'media' : 'baja';
    const lix = A < 15 && M < 2 ? 'alta' : A < 25 || M < 3 ? 'media' : 'baja';
    const com = A > 32 ? 'alta' : A > 20 ? 'media' : 'baja';

    let est, txt;
    if (fertilidad >= 70)      { est = 'Suelo con buen potencial'; txt = 'Combina retención y disponibilidad de nutrientes. El punto de atención no es la fertilidad, sino el manejo: un suelo así se degrada rápido si se compacta.'; }
    else if (fertilidad >= 50) { est = 'Suelo funcional con margen de mejora'; txt = 'Puede producir, pero hay al menos un factor limitante. Identifica cuál es antes de intervenir: subir la materia orgánica suele ser la acción con más efecto.'; }
    else                       { est = 'Suelo con limitaciones importantes'; txt = 'La combinación actual limita el crecimiento. Conviene diagnosticar con análisis y atacar primero el factor más restrictivo, no el número que más llame la atención.'; }

    $('#iEst').textContent = est;
    $('#iTxt').textContent = txt;
    $('#iFert').textContent = Math.round(fertilidad) + ' / 100';
    $('#iRet').textContent = retencion;
    $('#iLix').textContent = lix;
    $('#iCom').textContent = com;
  };
  [arc, mo, ph].forEach(s => s.oninput = upd); upd();
};

/* ------------------------------------------------ 16 y 17 (variantes) ----- */
/* alias por si algún módulo usa un tipo no definido explícitamente */
LABS['nutrientes-lista'] = LABS.nutrientes;
