const AUTO_DELAYS = [1500, 1400, 1400, 1600, 1600, 2000];

const phaseText = document.getElementById('phase-text');
const documentZone = document.getElementById('document-zone');
const chunkZone = document.getElementById('chunk-zone');
const embeddingZone = document.getElementById('embedding-zone');
const vectorGrid = document.getElementById('vector-grid');
const queryDot = document.getElementById('query-dot');
const llmBubble = document.getElementById('llm-bubble');
const llmText = document.getElementById('llm-text');
const toggleAutoBtn = document.getElementById('toggle-auto');
const stage = document.getElementById('stage');
const hintText = document.getElementById('hint-text');

const explanations = [
  'Collecting raw documents from various sources',
  'Cleaning, normalizing and converting data',
  'Cutting documents into semantic chunks',
  'Generating vector embeddings for each chunk',
  'Storing embeddings in the vector database',
  'Retrieving relevant vectors based on similarity search',
  'LLM composes the final grounded answer',
];

const steps = [
  { text: explanations[0], action: createDocuments },
  { text: explanations[1], action: preprocessDocuments },
  { text: explanations[2], action: chunkDocuments },
  {
    text: 'Generating vector embeddings with spatial directionality',
    action: convertToDots,
  },
  { text: explanations[4], action: buildGrid },
  { text: explanations[5], action: triggerRetrieval },
  { text: explanations[6], action: showAnswer },
];

let currentStep = -1;
let autoMode = false;
let autoTimeout;

function updateText(text) {
  phaseText.classList.add('fade-out');
  setTimeout(() => {
    phaseText.textContent = text;
    phaseText.classList.remove('fade-out');
    phaseText.classList.add('fade-in');
    setTimeout(() => phaseText.classList.remove('fade-in'), 500);
  }, 350);
}

function resetScene() {
  clearTimeout(autoTimeout);
  queryDot.classList.remove('active');
  llmBubble.classList.remove('show');
  llmText.style.animation = 'none';
  llmText.style.maxWidth = '0';
  llmText.style.opacity = '0';
  void llmText.offsetWidth;
  llmText.style.animation = '';

  documentZone.innerHTML = '';
  chunkZone.innerHTML = '';
  embeddingZone.innerHTML = '';
  vectorGrid.innerHTML = '';

  documentZone.style.opacity = '1';
  chunkZone.style.opacity = '0';
  embeddingZone.style.opacity = '0';
  vectorGrid.style.opacity = '0';
  vectorGrid.style.transform = 'scale(0.9)';

  currentStep = -1;
  hintText.textContent = 'Cliquez sur la scène pour démarrer et avancer.';
  updateText('Ready to explore the RAG pipeline manually');
}

function createDocuments() {
  const colors = ['#ff9f1c', '#f94144', '#f3722c', '#f8961e', '#43aa8b', '#577590'];
  documentZone.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const doc = document.createElement('div');
    doc.className = 'document';
    const width = 100 + Math.random() * 80;
    const height = 70 + Math.random() * 50;
    doc.style.width = `${width}px`;
    doc.style.height = `${height}px`;
    doc.style.background = `linear-gradient(135deg, ${colors[i % colors.length]}44, ${colors[(i + 2) % colors.length]}aa)`;
    doc.style.borderColor = `${colors[(i + 1) % colors.length]}55`;
    doc.style.animationDelay = `${i * 120}ms`;
    doc.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    documentZone.appendChild(doc);
  }
}

function preprocessDocuments() {
  const docs = document.querySelectorAll('.document');
  docs.forEach((doc, idx) => {
    setTimeout(() => doc.classList.add('whiten'), idx * 120);
  });
}

function chunkDocuments() {
  chunkZone.innerHTML = '';
  chunkZone.style.opacity = '1';
  documentZone.style.opacity = '0.45';
  embeddingZone.style.opacity = '0';
  const docs = document.querySelectorAll('.document');
  docs.forEach((doc, idx) => {
    const chunk = document.createElement('div');
    chunk.className = 'chunk';
    chunk.style.animationDelay = `${idx * 120}ms`;
    const parts = Math.floor(3 + Math.random() * 2);
    for (let p = 0; p < parts; p++) {
      const piece = document.createElement('div');
      piece.className = 'chunk-piece';
      piece.style.width = `${85 + Math.random() * 10}%`;
      piece.style.animationDelay = `${p * 80}ms`;
      chunk.appendChild(piece);
    }
    chunkZone.appendChild(chunk);
  });
}

function convertToDots() {
  const chunks = document.querySelectorAll('.chunk');
  chunks.forEach((chunk, idx) => {
    setTimeout(() => {
      chunk.classList.add('dotified');
      chunk.querySelectorAll('.chunk-piece').forEach((piece, pIdx) => {
        piece.style.animation = 'floaty 2.6s ease-in-out infinite';
        piece.style.animationDelay = `${pIdx * 80}ms`;
      });
    }, idx * 120);
  });

  embeddingZone.innerHTML = '';
  const scatterPoints = 20;
  const colors = ['#12d8ff', '#7bd7f3', '#ffd166', '#4cc9f0'];
  for (let i = 0; i < scatterPoints; i++) {
    const point = document.createElement('div');
    point.className = 'embedding-point';
    const size = 10 + Math.random() * 12;
    const x = 8 + Math.random() * 82;
    const y = 8 + Math.random() * 72;
    const rotation = Math.random() * 360;
    const arrow = document.createElement('span');
    arrow.className = 'vector-arrow';
    arrow.style.transform = `rotate(${rotation}deg) scale(${0.6 + Math.random() * 0.7})`;
    point.appendChild(arrow);

    point.style.width = `${size}px`;
    point.style.height = `${size}px`;
    point.style.left = `${x}%`;
    point.style.top = `${y}%`;
    point.style.background = `radial-gradient(circle, ${colors[i % colors.length]}, rgba(16, 120, 255, 0.45))`;
    point.style.animation = 'drift 5s ease-in-out infinite';
    point.style.animationDelay = `${i * 80}ms`;
    embeddingZone.appendChild(point);
  }
  embeddingZone.style.opacity = '1';
  documentZone.style.opacity = '0.35';
  chunkZone.style.opacity = '0.6';
}

function buildGrid() {
  vectorGrid.innerHTML = '';
  const totalCells = 25;
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'vector-cell';
    cell.style.animationDelay = `${(i % 5) * 120}ms`;
    vectorGrid.appendChild(cell);
  }
  vectorGrid.style.opacity = '1';
  vectorGrid.style.transform = 'scale(1)';
  chunkZone.style.opacity = '0.35';
  documentZone.style.opacity = '0.5';
  embeddingZone.style.opacity = '0.25';

  // cascade glow ripple
  setTimeout(() => {
    const cells = vectorGrid.querySelectorAll('.vector-cell');
    cells.forEach((cell, idx) => {
      setTimeout(() => cell.classList.add('glow'), idx * 70);
    });
  }, 200);
}

function triggerRetrieval() {
  queryDot.classList.add('active');
  const cells = Array.from(vectorGrid.querySelectorAll('.vector-cell'));
  const matches = [5, 11, 16];
  matches.forEach((idx, order) => {
    if (cells[idx]) {
      setTimeout(() => cells[idx].classList.add('match'), order * 300 + 400);
    }
  });
}

function showAnswer() {
  llmBubble.classList.add('show');
  llmText.style.animation = 'none';
  void llmText.offsetWidth;
  llmText.style.animation = 'typing 3s steps(36, end) forwards';
}

function nextStep(triggeredByAuto = false) {
  if (autoMode && !triggeredByAuto) return;
  if (currentStep >= steps.length - 1) {
    hintText.textContent = 'Fin du pipeline. Cliquez pour recommencer.';
    return;
  }

  currentStep += 1;
  const step = steps[currentStep];
  updateText(step.text);
  step.action();

  if (!autoMode) {
    hintText.textContent = 'Cliquez pour passer à l’étape suivante.';
  }

  if (autoMode && currentStep < steps.length - 1) {
    autoTimeout = setTimeout(() => nextStep(true), AUTO_DELAYS[currentStep] || 1500);
  } else if (currentStep >= steps.length - 1) {
    autoMode = false;
    toggleAutoBtn.classList.remove('active');
    toggleAutoBtn.textContent = 'Passer en mode auto';
  }
}

function startAutoPlay() {
  resetScene();
  autoMode = true;
  toggleAutoBtn.classList.add('active');
  toggleAutoBtn.textContent = 'Mode auto en cours...';
  hintText.textContent = 'Le mode auto déroule chaque étape.';
  nextStep(true);
}

toggleAutoBtn.addEventListener('click', () => {
  if (autoMode) {
    clearTimeout(autoTimeout);
    autoMode = false;
    toggleAutoBtn.classList.remove('active');
    toggleAutoBtn.textContent = 'Passer en mode auto';
    hintText.textContent = 'Mode manuel actif. Cliquez sur la scène pour avancer.';
  } else {
    startAutoPlay();
  }
});

stage.addEventListener('click', () => {
  if (autoMode) return;
  if (currentStep >= steps.length - 1) {
    resetScene();
    return;
  }
  nextStep();
});

resetScene();
