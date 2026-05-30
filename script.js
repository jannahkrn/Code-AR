const totalScenes = 9;

const sceneData = {
  1: { topic: 'HTML', title: 'Struktur Dokumen' },
  2: { topic: 'HTML', title: 'Elemen dan Tag' },
  3: { topic: 'HTML', title: 'Atribut HTML' },
  4: { topic: 'CSS',  title: 'Selektor dan Properti' },
  5: { topic: 'CSS',  title: 'Box Model' },
  6: { topic: 'CSS',  title: 'Flexbox Layout' },
  7: { topic: 'JS',   title: 'Variabel dan Tipe Data' },
  8: { topic: 'JS',   title: 'Fungsi (Function)' },
  9: { topic: 'JS',   title: 'Manipulasi DOM' },
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

// Load konten scene dari file terpisah
async function loadScenes() {
  try {
    const htmlRes = await fetch('scenes/scene-html.html');
    const htmlText = await htmlRes.text();
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

// Setup event MindAR
document.querySelector('a-scene').addEventListener('loaded', function () {
  loadScenes().then(() => {
    const target = document.querySelector('[mindar-image-target]');

    target.addEventListener('targetFound', function () {
      markerFound = true;
      elScanHint.classList.add('hidden');
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
    if (el) {
      el.setAttribute('visible', i === num ? 'true' : 'false');
    }
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

  if (currentScene < totalScenes) {
    currentScene++;
    updateUI();
  } else {
    showToast('Semua materi selesai! Kamu sudah mempelajari HTML, CSS, dan JavaScript.');
  }
}

function prevScene() {
  if (!markerFound) return;

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