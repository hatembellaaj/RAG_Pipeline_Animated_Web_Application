const TIMINGS = {
  dataToPreprocess: 2500,
  preprocessToChunk: 2000,
  chunkToEmbedding: 2000,
  embeddingToIndex: 2000,
  indexToRetrieval: 3000,
  retrievalToAnswer: 3000,
};

const phaseText = document.getElementById('phase-text');
const documentZone = document.getElementById('document-zone');
const chunkZone = document.getElementById('chunk-zone');
const vectorGrid = document.getElementById('vector-grid');
const queryDot = document.getElementById('query-dot');
const llmBubble = document.getElementById('llm-bubble');
const llmText = document.getElementById('llm-text');

const explanations = [
  'Collecting raw documents from various sources',
  'Cleaning, normalizing and converting data',
  'Cutting documents into semantic chunks',
  'Generating vector embeddings for each chunk',
  'Storing embeddings in the vector database',
  'Retrieving relevant vectors based on similarity search',
  'LLM composes the final grounded answer',
];

function updateText(text) {
  phaseText.classList.add('fade-out');
  setTimeout(() => {
    phaseText.textContent = text;
    phaseText.classList.remove('fade-out');
    phaseText.classList.add('fade-in');
    setTimeout(() => phaseText.classList.remove('fade-in'), 500);
  }, 350);
}

function createDocuments() {
  const colors = ['#ff9f1c', '#f94144', '#f3722c', '#f8961e', '#43aa8b', '#577590'];
  for (let i = 0; i < 8; i++) {
    const doc = document.createElement('div');
    doc.className = 'document';
    doc.style.background = `linear-gradient(135deg, ${colors[i % colors.length]}44, ${colors[(i + 2) % colors.length]}aa)`;
    doc.style.borderColor = `${colors[(i + 1) % colors.length]}55`;
    doc.style.animationDelay = `${i * 120}ms`;
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
  const docs = document.querySelectorAll('.document');
  docs.forEach((doc, idx) => {
    const chunk = document.createElement('div');
    chunk.className = 'chunk';
    chunk.style.animationDelay = `${idx * 120}ms`;
    const parts = Math.floor(3 + Math.random() * 3);
    for (let p = 0; p < parts; p++) {
      const piece = document.createElement('div');
      piece.className = 'chunk-piece';
      piece.style.width = `${60 + Math.random() * 40}%`;
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

function playTimeline() {
  updateText('Collecting raw documents from various sources');
  createDocuments();

  setTimeout(() => {
    updateText(explanations[1]);
    preprocessDocuments();
  }, TIMINGS.dataToPreprocess);

  setTimeout(() => {
    updateText(explanations[2]);
    chunkDocuments();
  }, TIMINGS.dataToPreprocess + TIMINGS.preprocessToChunk);

  setTimeout(() => {
    updateText(explanations[3]);
    convertToDots();
  }, TIMINGS.dataToPreprocess + TIMINGS.preprocessToChunk + TIMINGS.chunkToEmbedding);

  setTimeout(() => {
    updateText(explanations[4]);
    buildGrid();
  }, TIMINGS.dataToPreprocess + TIMINGS.preprocessToChunk + TIMINGS.chunkToEmbedding + TIMINGS.embeddingToIndex);

  setTimeout(() => {
    updateText(explanations[5]);
    triggerRetrieval();
  },
    TIMINGS.dataToPreprocess +
      TIMINGS.preprocessToChunk +
      TIMINGS.chunkToEmbedding +
      TIMINGS.embeddingToIndex +
      TIMINGS.indexToRetrieval);

  setTimeout(() => {
    updateText(explanations[6]);
    showAnswer();
  },
    TIMINGS.dataToPreprocess +
      TIMINGS.preprocessToChunk +
      TIMINGS.chunkToEmbedding +
      TIMINGS.embeddingToIndex +
      TIMINGS.indexToRetrieval +
      TIMINGS.retrievalToAnswer);
}

playTimeline();
