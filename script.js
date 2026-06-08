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

    setupGameClicks();

  } catch (err) {
    console.error('Gagal memuat scene:', err);
  }
}

function setupGameClicks() {
  ['A', 'B', 'C', 'D'].forEach(function (opt, i) {
    const el = document.getElementById('html-opt-' + opt);
    if (el) el.addEventListener('click', function () { answerGame('html', i); });
  });

  ['A', 'B', 'C', 'D'].forEach(function (opt, i) {
    const el = document.getElementById('css-opt-' + opt);
    if (el) el.addEventListener('click', function () { answerGame('css', i); });
  });

  ['A', 'B', 'C', 'D'].forEach(function (opt, i) {
    const el = document.getElementById('js-opt-' + opt);
    if (el) el.addEventListener('click', function () { answerGame('js', i); });
  });

  const varBox = document.getElementById('var-box');
  if (varBox) varBox.addEventListener('click', function () {
    playSound('button3');
    const el = document.getElementById('js-info');
    if (el) el.setAttribute('value', 'var: bisa diubah, scope global/function');
  });
  const letBox = document.getElementById('let-box');
  if (letBox) letBox.addEventListener('click', function () {
    playSound('button3');
    const el = document.getElementById('js-info');
    if (el) el.setAttribute('value', 'let: bisa diubah, scope block {}');
  });
  const constBox = document.getElementById('const-box');
  if (constBox) constBox.addEventListener('click', function () {
    playSound('button3');
    const el = document.getElementById('js-info');
    if (el) el.setAttribute('value', 'const: TIDAK bisa diubah setelah ditetapkan');
  });

  const inputBox = document.getElementById('input-box');
  if (inputBox) inputBox.addEventListener('click', function () {
    playSound('button3');
    const randomNum = Math.floor(Math.random() * 10) + 1;
    const result = randomNum * 2;
    const el = document.getElementById('function-result');
    if (el) el.setAttribute('value', 'kaliDua(' + randomNum + ') = ' + result);
  });

  const domBtn = document.getElementById('dom-button');
  if (domBtn) {
    let toggled = false;
    domBtn.addEventListener('click', function () {
      playSound('button3');
      toggled = !toggled;
      const title = document.getElementById('dom-title');
      const info  = document.getElementById('dom-info');
      if (title) title.setAttribute('value', toggled ? 'Teks Berubah!' : 'Halo Dunia');
      if (info)  info.setAttribute('value', toggled ? 'DOM berhasil dimanipulasi!' : 'Tap tombol untuk mengubah isi halaman');
      domBtn.setAttribute('color', toggled ? '#e74c3c' : '#3498db');
    });
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
  if (num === 10) initGame('html');
  if (num === 11) initGame('css');
  if (num === 12) initGame('js');

  const badge = document.getElementById('game-badge');
  if (badge) {
    badge.style.display = (num === 10 || num === 11 || num === 12) ? 'block' : 'none';
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

const htmlQuestions = [
  { q: 'Tag untuk JUDUL UTAMA halaman?', opts: ['<h1>', '<p>', '<div>', '<span>'], answer: 0 },
  { q: 'Tag untuk membuat LINK / tautan?', opts: ['<img>', '<a>', '<button>', '<div>'], answer: 1 },
  { q: 'Tag untuk menampilkan GAMBAR?', opts: ['<video>', '<img>', '<figure>', '<src>'], answer: 1 },
  { q: 'Yang menandai awal dokumen HTML?', opts: ['<html>', '<body>', '<!DOCTYPE html>', '<head>'], answer: 2 },
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

let gameState = { index: 0, score: 0, answered: false };

function initGame(type) {
  gameState = { index: 0, score: 0, answered: false };
  renderGameQuestion(type);
}

function renderGameQuestion(type) {
  const questions = type === 'html' ? htmlQuestions : type === 'css' ? cssQuestions : jsQuestions;
  const prefix = type;
  const q = questions[gameState.index];

  const defaultColor = type === 'html' ? '#264de4' : type === 'css' ? '#1a56db' : '#F7DF1E';
  const textColor    = type === 'js' ? '#000000' : '#ffffff';

  document.getElementById(prefix + '-game-score').setAttribute('value', 'Skor: ' + gameState.score + ' / ' + questions.length);
  document.getElementById(prefix + '-game-question').setAttribute('value', q.q);

  ['A', 'B', 'C', 'D'].forEach(function (opt, i) {
    const box  = document.getElementById(prefix + '-opt-' + opt);
    const text = document.getElementById(prefix + '-opt-' + opt + '-text');
    if (box)  box.setAttribute('color', defaultColor);
    if (text) {
      text.setAttribute('value', q.opts[i]);
      text.setAttribute('color', textColor);
    }
  });

  document.getElementById(prefix + '-game-feedback').setAttribute('value', '');
  document.getElementById(prefix + '-game-result').setAttribute('value', '');
  gameState.answered = false;
}

function answerGame(type, optIndex) {
  if (gameState.answered) return;
  const questions = type === 'html' ? htmlQuestions : type === 'css' ? cssQuestions : jsQuestions;
  const prefix = type;
  const q = questions[gameState.index];
  const opts = ['A', 'B', 'C', 'D'];
  const isCorrect = optIndex === q.answer;

  gameState.answered = true;

  const chosenBox = document.getElementById(prefix + '-opt-' + opts[optIndex]);
  const correctBox = document.getElementById(prefix + '-opt-' + opts[q.answer]);

  if (isCorrect) {
    if (chosenBox) chosenBox.setAttribute('color', '#27ae60');
    playSound('button3');
  } else {
    if (chosenBox) chosenBox.setAttribute('color', '#c0392b');
    if (correctBox) correctBox.setAttribute('color', '#27ae60');
    playSound('button4');
  }

  if (isCorrect) gameState.score++;

  document.getElementById(prefix + '-game-feedback').setAttribute(
    'value',
    isCorrect ? '✅ Benar!' : '❌ Salah! Jawaban: ' + q.opts[q.answer]
  );
  document.getElementById(prefix + '-game-score').setAttribute(
    'value', 'Skor: ' + gameState.score + ' / ' + questions.length
  );

  setTimeout(function () {
    gameState.index++;
    if (gameState.index < questions.length) {
      renderGameQuestion(type);
    } else {
      const total = questions.length;
      const pesan =
        gameState.score === total ? '🏆 Sempurna! Skor ' + gameState.score + '/' + total :
        gameState.score >= Math.ceil(total / 2) ? '👍 Bagus! Skor ' + gameState.score + '/' + total :
        '📚 Terus semangat! Skor ' + gameState.score + '/' + total;
      document.getElementById(prefix + '-game-result').setAttribute('value', pesan);
      document.getElementById(prefix + '-game-question').setAttribute('value', 'Game selesai! Tekan Lanjut →');
    }
  }, 1500);
}