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

const totalScenes = 15;

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
  13: { topic: 'HTML', title: '🤖 Robot Playground' },
  14: { topic: 'CSS',  title: '🤖 Robot Playground' },
  15: { topic: 'JS',   title: '🤖 Robot Playground' },
};

let currentScene = 1;
let markerFound = false;

let gamePassedHTML = false;
let gamePassedCSS  = false;
let gamePassedJS   = false;

const elCurrentScene = document.getElementById('current-scene');
const elTopicLabel   = document.getElementById('topic-label');
const elSceneTitle   = document.getElementById('scene-title');
const elProgressFill = document.getElementById('progress-fill');
const elScanHint     = document.getElementById('scan-hint');
const elBtnPrev      = document.getElementById('btn-prev');
const elBtnNext      = document.getElementById('btn-next');

document.getElementById('game-btn-A').onclick = function () { answerGame(0); };
document.getElementById('game-btn-B').onclick = function () { answerGame(1); };
document.getElementById('game-btn-C').onclick = function () { answerGame(2); };
document.getElementById('game-btn-D').onclick = function () { answerGame(3); };

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

    buildRobotScenes();

    await Promise.all([htmlDoc, cssDoc, jsDoc]);
    console.log('Semua scene berhasil dimuat');

  } catch (err) {
    console.error('Gagal memuat scene:', err);
  }
}

function buildRobotScenes() {
  const container = document.getElementById('container-robot');

  ['scene-13', 'scene-14', 'scene-15'].forEach(function (id) {
    const entity = document.createElement('a-entity');
    entity.setAttribute('id', id);
    entity.setAttribute('visible', 'false');

    const bg = document.createElement('a-plane');
    bg.setAttribute('position', '0 0.1 0');
    bg.setAttribute('width', '1.8');
    bg.setAttribute('height', '1.1');
    bg.setAttribute('color', '#0a0a1e');
    bg.setAttribute('opacity', '0.95');
    entity.appendChild(bg);

    const title = document.createElement('a-text');
    title.setAttribute('value', '🤖 Robot Playground');
    title.setAttribute('position', '0 0.55 0.01');
    title.setAttribute('align', 'center');
    title.setAttribute('color', '#F7DF1E');
    title.setAttribute('width', '1.8');
    entity.appendChild(title);

    const model = document.createElement('a-entity');
    model.setAttribute('gltf-model', 'url(assets/robot_playground.glb)');
    model.setAttribute('position', '0 -0.05 0.1');
    model.setAttribute('scale', '0.25 0.25 0.25');
    model.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 4000; easing: linear');
    entity.appendChild(model);

    let subText = '';
    if (id === 'scene-13') subText = 'Siap uji kemampuan HTML-mu?';
    else if (id === 'scene-14') subText = 'Siap uji kemampuan CSS-mu?';
    else subText = 'Siap uji kemampuan JavaScript-mu?';

    const sub = document.createElement('a-text');
    sub.setAttribute('value', subText);
    sub.setAttribute('position', '0 -0.38 0.01');
    sub.setAttribute('align', 'center');
    sub.setAttribute('color', '#ffffff');
    sub.setAttribute('width', '1.6');
    entity.appendChild(sub);

    const hint = document.createElement('a-text');
    hint.setAttribute('value', 'Tekan Lanjut untuk memulai mini game!');
    hint.setAttribute('position', '0 -0.48 0.01');
    hint.setAttribute('align', 'center');
    hint.setAttribute('color', '#888888');
    hint.setAttribute('width', '1.6');
    entity.appendChild(hint);

    container.appendChild(entity);
  });
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
  const allIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  allIds.forEach(function (i) {
    const el = document.getElementById('scene-' + i);
    if (el) el.setAttribute('visible', i === num ? 'true' : 'false');
  });

  const gameOverlay = document.getElementById('game-overlay');

  if (num === 10 || num === 11 || num === 12) {
    gameOverlay.classList.remove('hidden');
    const type = num === 10 ? 'html' : num === 11 ? 'css' : 'js';
    initGame(type);
  } else {
    gameOverlay.classList.add('hidden');
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

  if (currentScene === 10 && !gamePassedHTML) {
    showToast('❗ Selesaikan mini game HTML dulu!');
    return;
  }
  if (currentScene === 11 && !gamePassedCSS) {
    showToast('❗ Selesaikan mini game CSS dulu!');
    return;
  }
  if (currentScene === 12 && !gamePassedJS) {
    showToast('❗ Selesaikan mini game JS dulu!');
    return;
  }

  playSound('button1');

  if (currentScene === 3)  { currentScene = 13; updateUI(); return; }
  if (currentScene === 13) { currentScene = 10; updateUI(); return; }
  if (currentScene === 10) { currentScene = 4;  updateUI(); return; }
  if (currentScene === 6)  { currentScene = 14; updateUI(); return; }
  if (currentScene === 14) { currentScene = 11; updateUI(); return; }
  if (currentScene === 11) { currentScene = 7;  updateUI(); return; }
  if (currentScene === 9)  { currentScene = 15; updateUI(); return; }
  if (currentScene === 15) { currentScene = 12; updateUI(); return; }

  if (currentScene < 12) {
    currentScene++;
    updateUI();
  } else {
    showToast('🎉 Selesai! Kamu sudah mempelajari HTML, CSS, dan JavaScript!');
  }
}

function prevScene() {
  if (!markerFound) return;
  playSound('button2');

  if (currentScene === 13) { currentScene = 3;  updateUI(); return; }
  if (currentScene === 10) { currentScene = 13; updateUI(); return; }
  if (currentScene === 4)  { currentScene = 10; updateUI(); return; }
  if (currentScene === 14) { currentScene = 6;  updateUI(); return; }
  if (currentScene === 11) { currentScene = 14; updateUI(); return; }
  if (currentScene === 7)  { currentScene = 11; updateUI(); return; }
  if (currentScene === 15) { currentScene = 9;  updateUI(); return; }
  if (currentScene === 12) { currentScene = 15; updateUI(); return; }

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

let gameState = { index: 0, score: 0, wrongCount: 0, answered: false, type: 'html', locked: false };

function initGame(type) {
  gameState = { index: 0, score: 0, wrongCount: 0, answered: false, type: type, locked: false };

  const retryBtn = document.getElementById('game-retry-btn');
  retryBtn.classList.add('hidden');

  ['A','B','C','D'].forEach(function (opt) {
    const btn = document.getElementById('game-btn-' + opt);
    if (btn) {
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  });

  document.getElementById('game-wrong-display').textContent = '';
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
  document.getElementById('game-wrong-display').textContent =
    gameState.wrongCount > 0 ? '❌ Salah: ' + gameState.wrongCount + ' / 3' : '';
  document.getElementById('game-question-display').textContent = q.q;
  document.getElementById('game-feedback-display').textContent = '';
  document.getElementById('game-result-display').textContent   = '';

  const opts = ['A','B','C','D'];
  opts.forEach(function (opt, i) {
    const btn = document.getElementById('game-btn-' + opt);
    if (btn) {
      btn.textContent      = q.opts[i];
      btn.style.background = defaultColor;
      btn.style.color      = '#ffffff';
      btn.disabled         = false;
      btn.style.opacity    = '1';
      btn.className        = 'game-btn';
    }
  });

  gameState.answered = false;
}

function answerGame(optIndex) {
  if (gameState.answered || gameState.locked) return;

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
    gameState.score++;
  } else {
    if (chosenBtn)  { chosenBtn.style.background  = '#c0392b'; chosenBtn.style.color = '#fff'; }
    if (correctBtn) { correctBtn.style.background = '#27ae60'; correctBtn.style.color = '#fff'; }
    playSound('button4');
    gameState.wrongCount++;
  }

  document.getElementById('game-feedback-display').textContent =
    isCorrect ? '✅ Benar!' : '❌ Salah! Jawaban: ' + q.opts[q.answer];
  document.getElementById('game-score-display').textContent =
    'Skor: ' + gameState.score + ' / ' + questions.length;
  document.getElementById('game-wrong-display').textContent =
    gameState.wrongCount > 0 ? '❌ Salah: ' + gameState.wrongCount + ' / 3' : '';

  if (gameState.wrongCount >= 3) {
    setTimeout(function () {
      endGameFailed();
    }, 1200);
    return;
  }

  setTimeout(function () {
    gameState.index++;
    if (gameState.index < questions.length) {
      renderGameQuestion();
    } else {
      endGameSuccess();
    }
  }, 1500);
}

function endGameSuccess() {
  const questions = gameState.type === 'html' ? htmlQuestions :
                    gameState.type === 'css'  ? cssQuestions  : jsQuestions;
  const total  = questions.length;
  const score  = gameState.score;
  const wrongs = gameState.wrongCount;

  if (gameState.type === 'html') gamePassedHTML = true;
  else if (gameState.type === 'css') gamePassedCSS = true;
  else gamePassedJS = true;

  const bintang = score === total ? '🏆 Sempurna!' :
                  score >= Math.ceil(total / 2) ? '👍 Bagus!' : '📚 Lumayan!';

  const pesan = bintang + ' Skor: ' + score + '/' + total + ' | Salah: ' + wrongs;

  document.getElementById('game-result-display').textContent = pesan;
  document.getElementById('game-question-display').textContent = '✅ Game selesai! Tekan Lanjut →';
  document.getElementById('game-feedback-display').textContent = '';

  ['A','B','C','D'].forEach(function (opt) {
    const btn = document.getElementById('game-btn-' + opt);
    if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; }
  });

  document.getElementById('game-retry-btn').classList.add('hidden');
}

function endGameFailed() {
  const questions = gameState.type === 'html' ? htmlQuestions :
                    gameState.type === 'css'  ? cssQuestions  : jsQuestions;
  const score  = gameState.score;
  const total  = questions.length;

  document.getElementById('game-question-display').textContent = '😢 Salah 3 kali! Ulangi game.';
  document.getElementById('game-result-display').textContent =
    'Skor sementara: ' + score + '/' + total + ' | Salah: ' + gameState.wrongCount;
  document.getElementById('game-feedback-display').textContent = '';

  ['A','B','C','D'].forEach(function (opt) {
    const btn = document.getElementById('game-btn-' + opt);
    if (btn) { btn.disabled = true; btn.style.opacity = '0.4'; }
  });

  document.getElementById('game-retry-btn').classList.remove('hidden');
  gameState.locked = true;
}

function retryGame() {
  initGame(gameState.type);
}