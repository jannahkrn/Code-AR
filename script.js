const sounds = {};

function loadSounds() {
  const soundNames = ['button1', 'button2', 'button3', 'button4', 'button5'];
  soundNames.forEach(function (name) {
    const audio = new Audio('sounds/' + name + '.mp3');
    audio.preload = 'auto';
    sounds[name] = audio;
  });
}

function playSound(name) {
  const s = sounds[name];
  if (!s) return;
  s.currentTime = 0;
  s.play().catch(function () {});
}

window.addEventListener('DOMContentLoaded', loadSounds);

const totalScenes = 12;

const sceneData = {
  1:  { topic: 'HTML', title: 'Struktur Dokumen' },
  2:  { topic: 'HTML', title: 'Elemen dan Tag' },
  3:  { topic: 'HTML', title: 'Atribut HTML' },
  4:  { topic: 'CSS',  title: 'Selektor dan Properti' },
  5:  { topic: 'CSS',  title: 'Box Model' },
  6:  { topic: 'CSS',  title: 'Flexbox Layout' },
  7:  { topic: 'JS',   title: 'Variabel dan Tipe Data' },
  8:  { topic: 'JS',   title: 'Fungsi (Function)' },
  9:  { topic: 'JS',   title: 'Manipulasi DOM' },
  10: { topic: 'HTML', title: '🎮 Mini Game HTML' },
  11: { topic: 'CSS',  title: '🎮 Mini Game CSS' },
  12: { topic: 'JS',   title: '🎮 Mini Game JS' },
};

let currentScene = 1;
let markerFound = false;

const elCurrentScene = document.getElementById('current-scene');
const elTopicLabel   = document.getElementById('topic-label');
const elSceneTitle   = document.getElementById('scene-title');
const elProgressFill = document.getElementById('progress-fill');
const elScanHint     = document.getElementById('scan-hint');
const elBtnPrev      = document.getElementById('btn-prev');
const elBtnNext      = document.getElementById('btn-next');

async function loadScenes() {
  try {
    const parser = new DOMParser();

    const htmlDoc = fetch('scenes/scene-html.html')
      .then(r => r.text())
      .then(text => {
        const doc = parser.parseFromString(text, 'text/html');
        const container = document.getElementById('container-html');
        doc.querySelectorAll('a-entity[id^="scene-"]').forEach(el => {
          container.appendChild(document.importNode(el, true));
        });
      });

    const cssDoc = fetch('scenes/scene-css.html')
      .then(r => r.text())
      .then(text => {
        const doc = parser.parseFromString(text, 'text/html');
        const container = document.getElementById('container-css');
        doc.querySelectorAll('a-entity[id^="scene-"]').forEach(el => {
          container.appendChild(document.importNode(el, true));
        });
      });

    const jsDoc = fetch('scenes/scene-js.html')
      .then(r => r.text())
      .then(text => {
        const doc = parser.parseFromString(text, 'text/html');
        const container = document.getElementById('container-js');
        doc.querySelectorAll('a-entity[id^="scene-"]').forEach(el => {
          container.appendChild(document.importNode(el, true));
        });
      });

    await Promise.all([htmlDoc, cssDoc, jsDoc]);
    console.log('Semua scene berhasil dimuat');

  } catch (err) {
    console.error('Gagal memuat scene:', err);
  }
}

document.querySelector('a-scene').addEventListener('loaded', function () {
  loadScenes().then(() => {
    const target = document.querySelector('[mindar-image-target]');

    target.addEventListener('targetFound', function () {
      markerFound = true;
      elScanHint.classList.add('hidden');
      playSound('button5');
      updateUI();
    });

    target.addEventListener('targetLost', function () {
      markerFound = false;
      elScanHint.classList.remove('hidden');
    });
  });
});

function showScene(num) {
  for (let i = 1; i <= totalScenes; i++) {
    const el = document.getElementById('scene-' + i);
    if (el) el.setAttribute('visible', i === num ? 'true' : 'false');
  }

  const gameOverlay = document.getElementById('game-overlay');
  const jsOverlay   = document.getElementById('js-interaction-overlay');

  if (num === 10 || num === 11 || num === 12) {
    gameOverlay.classList.remove('hidden');
    jsOverlay.classList.add('hidden');
    const type = num === 10 ? 'html' : num === 11 ? 'css' : 'js';
    initGame(type);
  } else {
    gameOverlay.classList.add('hidden');
  }

  if (num === 7 || num === 8 || num === 9) {
    jsOverlay.classList.remove('hidden');
    setupJsInteractionButtons(num);
  } else {
    jsOverlay.classList.add('hidden');
  }
}

function updateUI() {
  const data = sceneData[currentScene];

  elCurrentScene.textContent = currentScene;
  elTopicLabel.textContent   = data.topic;
  elSceneTitle.textContent   = data.title;
  elProgressFill.style.width = ((currentScene / totalScenes) * 100) + '%';

  elBtnPrev.classList.toggle('disabled', currentScene === 1);

  if (currentScene === totalScenes) {
    elBtnNext.textContent = 'Selesai ✓';
  } else {
    elBtnNext.textContent = 'Lanjut →';
  }

  showScene(currentScene);
}

function nextScene() {
  if (!markerFound) return;
  playSound('button1');

  if (currentScene === 3)  { currentScene = 10; updateUI(); return; }
  if (currentScene === 10) { currentScene = 4;  updateUI(); return; }
  if (currentScene === 6)  { currentScene = 11; updateUI(); return; }
  if (currentScene === 11) { currentScene = 7;  updateUI(); return; }
  if (currentScene === 9)  { currentScene = 12; updateUI(); return; }

  if (currentScene < totalScenes) {
    currentScene++;
    updateUI();
  } else {
    showToast('🎉 Selesai! Kamu sudah mempelajari HTML, CSS, dan JavaScript!');
  }
}

function prevScene() {
  if (!markerFound) return;
  playSound('button2');

  if (currentScene === 10) { currentScene = 3;  updateUI(); return; }
  if (currentScene === 4)  { currentScene = 10; updateUI(); return; }
  if (currentScene === 11) { currentScene = 6;  updateUI(); return; }
  if (currentScene === 7)  { currentScene = 11; updateUI(); return; }
  if (currentScene === 12) { currentScene = 9;  updateUI(); return; }

  if (currentScene > 1) {
    currentScene--;
    updateUI();
  }
}

function showToast(message) {
  let toast = document.getElementById('finish-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'finish-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(function () {
    toast.style.display = 'none';
  }, 4000);
}

function setupJsInteractionButtons(sceneNum) {
  const infoEl    = document.getElementById('js-interaction-info');
  const btnsEl    = document.getElementById('js-interaction-buttons');
  btnsEl.innerHTML = '';

  if (sceneNum === 7) {
    infoEl.textContent = 'Tap var, let, atau const untuk penjelasan';

    const varBtn = document.createElement('button');
    varBtn.className = 'js-btn js-btn-var';
    varBtn.textContent = 'var';
    varBtn.onclick = function () {
      playSound('button3');
      infoEl.textContent = 'var: bisa diubah, scope global / function';
    };

    const letBtn = document.createElement('button');
    letBtn.className = 'js-btn js-btn-let';
    letBtn.textContent = 'let';
    letBtn.onclick = function () {
      playSound('button3');
      infoEl.textContent = 'let: bisa diubah, scope block { }';
    };

    const constBtn = document.createElement('button');
    constBtn.className = 'js-btn js-btn-const';
    constBtn.textContent = 'const';
    constBtn.onclick = function () {
      playSound('button3');
      infoEl.textContent = 'const: TIDAK bisa diubah setelah ditetapkan';
    };

    btnsEl.appendChild(varBtn);
    btnsEl.appendChild(letBtn);
    btnsEl.appendChild(constBtn);
  }

  if (sceneNum === 8) {
    infoEl.textContent = 'Tap Input untuk mencoba fungsi kaliDua()';

    const inputBtn = document.createElement('button');
    inputBtn.className = 'js-btn js-btn-input';
    inputBtn.textContent = '▶ Tap Input';
    inputBtn.onclick = function () {
      playSound('button3');
      const randomNum = Math.floor(Math.random() * 10) + 1;
      const result = randomNum * 2;
      infoEl.textContent = 'kaliDua(' + randomNum + ') = ' + result;
    };

    btnsEl.appendChild(inputBtn);
  }

  if (sceneNum === 9) {
    infoEl.textContent = 'Tap tombol untuk mengubah isi halaman';
    let toggled = false;

    const domBtn = document.createElement('button');
    domBtn.className = 'js-btn js-btn-dom';
    domBtn.textContent = '🖱 Ubah Teks DOM';
    domBtn.onclick = function () {
      playSound('button3');
      toggled = !toggled;

      const domTitle = document.getElementById('dom-title');
      const domInfo  = document.getElementById('dom-info');

      if (domTitle) domTitle.setAttribute('value', toggled ? 'Teks Berubah!' : 'Halo Dunia');
      if (domInfo)  domInfo.setAttribute('value', toggled ? 'DOM berhasil dimanipulasi!' : 'Tap tombol untuk mengubah isi halaman');

      infoEl.textContent = toggled ? '✅ DOM berhasil dimanipulasi!' : 'Tap tombol untuk mengubah isi halaman';
      domBtn.style.background = toggled ? '#e74c3c' : '#3498db';
    };

    btnsEl.appendChild(domBtn);
  }
}

const htmlQuestions = [
  { q: 'Tag untuk JUDUL UTAMA halaman?', opts: ['<h1>', '<p>', '<div>', '<span>'], answer: 0 },
  { q: 'Tag untuk membuat LINK / tautan?', opts: ['<img>', '<a>', '<button>', '<div>'], answer: 1 },
  { q: 'Tag untuk menampilkan GAMBAR?', opts: ['<video>', '<img>', '<figure>', '<src>'], answer: 1 },
  { q: 'Yang menandai awal dokumen HTML?', opts: ['<html>', '<body>', '<!DOCTYPE>', '<head>'], answer: 2 },
];

const cssQuestions = [
  { q: 'Properti CSS untuk WARNA TEKS?', opts: ['color', 'background', 'font-size', 'margin'], answer: 0 },
  { q: 'Properti untuk UKURAN HURUF?', opts: ['font-weight', 'font-size', 'text-size', 'letter-spacing'], answer: 1 },
  { q: 'Properti JARAK LUAR elemen?', opts: ['padding', 'border', 'margin', 'gap'], answer: 2 },
  { q: 'Nilai display untuk FLEXBOX?', opts: ['block', 'inline', 'grid', 'flex'], answer: 3 },
];

const jsQuestions = [
  { q: 'let x = 5; x = x * 2; // x = ?', opts: ['5', '10', '52', 'undefined'], answer: 1 },
  { q: 'Keyword variabel TIDAK bisa diubah?', opts: ['var', 'let', 'const', 'def'], answer: 2 },
  { q: 'typeof "Halo" // hasilnya?', opts: ['number', 'boolean', 'string', 'object'], answer: 2 },
  { q: 'Cara memanggil fungsi "sapa"?', opts: ['sapa', 'sapa()', 'call sapa', 'run sapa'], answer: 1 },
];

let gameState    = { index: 0, score: 0, answered: false, type: 'html' };
let currentGameBtns = [];

function initGame(type) {
  gameState = { index: 0, score: 0, answered: false, type: type };

  const color = type === 'html' ? '#264de4' : type === 'css' ? '#1a56db' : '#b8a600';
  document.querySelectorAll('.game-btn').forEach(function (btn) {
    btn.style.background = color;
    btn.style.color = '#ffffff';
  });

  ['A','B','C','D'].forEach(function(opt, i) {
    const btn = document.getElementById('game-btn-' + opt);
    if (btn) {
      btn.onclick = function () { answerGame(i); };
    }
  });

  renderGameQuestion();
}

function renderGameQuestion() {
  const questions = gameState.type === 'html' ? htmlQuestions :
                    gameState.type === 'css'  ? cssQuestions  : jsQuestions;
  const q = questions[gameState.index];
  const defaultColor = gameState.type === 'html' ? '#264de4' :
                       gameState.type === 'css'  ? '#1a56db' : '#b8a600';

  document.getElementById('game-score-display').textContent =
    'Skor: ' + gameState.score + ' / ' + questions.length;
  document.getElementById('game-question-display').textContent = q.q;
  document.getElementById('game-feedback-display').textContent = '';
  document.getElementById('game-result-display').textContent   = '';

  const opts = ['A','B','C','D'];
  opts.forEach(function (opt, i) {
    const btn = document.getElementById('game-btn-' + opt);
    if (btn) {
      btn.textContent    = q.opts[i];
      btn.style.background = defaultColor;
      btn.style.color    = '#ffffff';
      btn.disabled       = false;
      btn.className      = 'game-btn';
    }
  });

  gameState.answered = false;
}

function answerGame(optIndex) {
  if (gameState.answered) return;

  const questions = gameState.type === 'html' ? htmlQuestions :
                    gameState.type === 'css'  ? cssQuestions  : jsQuestions;
  const q = questions[gameState.index];
  const opts = ['A','B','C','D'];
  const isCorrect = optIndex === q.answer;

  gameState.answered = true;

  opts.forEach(function (opt) {
    const btn = document.getElementById('game-btn-' + opt);
    if (btn) btn.disabled = true;
  });

  const chosenBtn  = document.getElementById('game-btn-' + opts[optIndex]);
  const correctBtn = document.getElementById('game-btn-' + opts[q.answer]);

  if (isCorrect) {
    if (chosenBtn) { chosenBtn.style.background = '#27ae60'; chosenBtn.style.color = '#fff'; }
    playSound('button3');
  } else {
    if (chosenBtn)  { chosenBtn.style.background  = '#c0392b'; chosenBtn.style.color = '#fff'; }
    if (correctBtn) { correctBtn.style.background = '#27ae60'; correctBtn.style.color = '#fff'; }
    playSound('button4');
  }

  if (isCorrect) gameState.score++;

  document.getElementById('game-feedback-display').textContent =
    isCorrect ? '✅ Benar!' : '❌ Salah! Jawaban: ' + q.opts[q.answer];
  document.getElementById('game-score-display').textContent =
    'Skor: ' + gameState.score + ' / ' + questions.length;

  setTimeout(function () {
    gameState.index++;
    if (gameState.index < questions.length) {
      renderGameQuestion();
    } else {
      const total = questions.length;
      const pesan =
        gameState.score === total          ? '🏆 Sempurna! Skor ' + gameState.score + '/' + total :
        gameState.score >= Math.ceil(total / 2) ? '👍 Bagus! Skor ' + gameState.score + '/' + total :
                                               '📚 Terus semangat! Skor ' + gameState.score + '/' + total;
      document.getElementById('game-result-display').textContent   = pesan;
      document.getElementById('game-question-display').textContent = 'Game selesai! Tekan Lanjut →';
      document.getElementById('game-feedback-display').textContent = '';

      opts.forEach(function (opt) {
        const btn = document.getElementById('game-btn-' + opt);
        if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; }
      });
    }
  }, 1500);
}