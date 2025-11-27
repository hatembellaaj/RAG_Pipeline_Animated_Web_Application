const phaseText = document.getElementById('phase-text');
const menu = document.getElementById('menu');
const sceneTitle = document.getElementById('scene-title');
const sceneDesc = document.getElementById('scene-desc');
const canvas = document.getElementById('scene-canvas');

const scenes = [
  {
    id: 'intro',
    title: 'ChatGPT answers a health question',
    desc: 'A user asks “How do environmental factors affect health?” while other generative AIs listen in.',
    action: animateCore,
  },
  {
    id: 'use-cases',
    title: 'Use Cases: Chatbot, Callbot & More',
    desc: 'Different channels light up to show where generative AI can help.',
    action: animateUseCases,
  },
  {
    id: 'logic',
    title: 'Pipeline Logic: Ingest & Answer',
    desc: 'A skeleton of the ingestion and answering loop.',
    action: animateLogic,
  },
  {
    id: 'ingestion',
    title: 'Ingestion Flow to Indexing',
    desc: 'Documents flow through cleaning, chunking, and indexing.',
    action: animateIngestion,
  },
  {
    id: 'response',
    title: 'Responding to a User',
    desc: 'Retrieval and LLM orchestration compose the final reply.',
    action: animateResponse,
  },
  {
    id: 'assistant',
    title: 'Assistants in Real Life (Callbot)',
    desc: 'A callbot scenario routes intents and gathers knowledge.',
    action: animateCallbot,
  },
  {
    id: 'constraints',
    title: 'Medical Constraints',
    desc: 'Privacy, security, and compliance gates flash red.',
    action: animateConstraints,
  },
  {
    id: 'solution',
    title: 'RAG On-Prem Remedy',
    desc: 'On-prem RAG keeps PHI local while calling the LLM with filtered chunks.',
    action: animateSolution,
  },
  {
    id: 'tools',
    title: 'Better Representative Chunks',
    desc: 'Diagnostics for chunk quality and faithful answers.',
    action: animateTools,
  },
  {
    id: 'research',
    title: 'New Research: A2A, MCP, ACP',
    desc: 'Emerging paradigms orbit a research hub.',
    action: animateResearch,
  },
];

function updatePhase(text) {
  phaseText.textContent = text;
  phaseText.classList.remove('flash');
  void phaseText.offsetWidth;
  phaseText.classList.add('flash');
}

function clearCanvas() {
  canvas.innerHTML = '';
}

function typeText(element, text, speed = 22, delay = 0) {
  element.textContent = '';
  element.classList.add('typing');

  let index = 0;
  function step() {
    if (index <= text.length) {
      element.textContent = text.slice(0, index);
      index += 1;
      setTimeout(step, speed);
    } else {
      element.classList.remove('typing');
    }
  }

  setTimeout(step, delay);
}

function createCard(title, subtitle) {
  const card = document.createElement('div');
  card.className = 'card pulse';
  const h3 = document.createElement('h3');
  h3.textContent = title;
  const p = document.createElement('p');
  p.textContent = subtitle;
  card.append(h3, p);
  return card;
}

function createPortrait(label, subtitle) {
  const frame = document.createElement('div');
  frame.className = 'photo-frame';

  const portrait = document.createElement('div');
  portrait.className = 'photo user-photo';

  const badge = document.createElement('div');
  badge.className = 'photo-label';
  badge.innerHTML = `<strong>${label}</strong><span>${subtitle}</span>`;

  frame.append(portrait, badge);
  return frame;
}

function createMonitor() {
  const monitor = document.createElement('div');
  monitor.className = 'device monitor';

  const screen = document.createElement('div');
  screen.className = 'screen';
  screen.innerHTML = `
    <div class="window-bar">
      <span></span><span></span><span></span>
    </div>
    <div class="screen-glow"></div>
  `;
  monitor.appendChild(screen);
  return monitor;
}

function createTerminalStack() {
  const stack = document.createElement('div');
  stack.className = 'terminal-stack';
  ['ls -la', 'python ingest.py', 'npm run dev'].forEach((command, idx) => {
    const line = document.createElement('div');
    line.className = 'command-line';
    line.style.animationDelay = `${idx * 200}ms`;
    line.innerHTML = `<span class="prompt">$</span> ${command}`;
    stack.appendChild(line);
  });
  return stack;
}

function createAiLogos() {
  const row = document.createElement('div');
  row.id = 'ai-logo-row';
  const logos = [
    { name: 'ChatGPT', tone: 'emerald' },
    { name: 'Gemini', tone: 'sky' },
    { name: 'Claude', tone: 'amber' },
    { name: 'Llama 3', tone: 'pink' },
    { name: 'Mistral', tone: 'violet' },
    { name: 'Grok', tone: 'slate' },
  ];

  logos.forEach((logo, idx) => {
    const chip = document.createElement('div');
    chip.className = `ai-logo ${logo.tone}`;
    chip.textContent = logo.name;
    chip.style.animationDelay = `${idx * 90}ms`;
    row.appendChild(chip);
  });

  return row;
}

function createNode(label, tone = 'cloud') {
  const node = document.createElement('div');
  node.className = `node ${tone}`;
  node.textContent = label;
  return node;
}

function createArrow(from, to, delay = 0) {
  const arrow = document.createElement('div');
  arrow.className = 'arrow';
  arrow.style.left = `${from.x}px`;
  arrow.style.top = `${from.y}px`;
  arrow.style.width = `${to.x - from.x}px`;
  arrow.style.transform = `translateY(${to.y - from.y}px)`;
  arrow.style.animationDelay = `${delay}ms`;
  return arrow;
}

function animateCore() {
  clearCanvas();
  sceneTitle.textContent = scenes[0].title;
  sceneDesc.textContent = scenes[0].desc;
  updatePhase('ChatGPT replies while other frontier models glow in the background.');

  const spotlight = document.createElement('div');
  spotlight.id = 'intro-spotlight';
  canvas.appendChild(spotlight);

  const userCard = createCard('User', 'How do environmental factors affect health?');
  userCard.classList.add('bubble-card', 'from-user');
  userCard.style.left = '40px';
  userCard.style.top = '270px';
  canvas.appendChild(userCard);

  const portrait = createPortrait('Curious User', 'Health researcher');
  portrait.style.left = '52px';
  portrait.style.top = '90px';
  canvas.appendChild(portrait);

  const monitor = createMonitor();
  monitor.style.left = '270px';
  monitor.style.top = '120px';
  canvas.appendChild(monitor);

  const terminals = createTerminalStack();
  terminals.style.left = '510px';
  terminals.style.top = '130px';
  canvas.appendChild(terminals);

  const chatgptCard = createCard(
    'ChatGPT',
    'Air quality, water safety, housing, and heat exposure all shape health outcomes.'
  );
  chatgptCard.classList.add('bubble-card', 'from-ai');
  chatgptCard.style.left = '280px';
  chatgptCard.style.top = '320px';
  const chatgptBody = chatgptCard.querySelector('p');
  chatgptBody.textContent = '';
  canvas.appendChild(chatgptCard);
  typeText(
    chatgptBody,
    'Air quality, water safety, housing, and heat exposure all shape health outcomes.',
    18,
    200
  );

  const summaryCard = createCard(
    'Answer highlights',
    'Reduce pollution exposure, stay hydrated in heat waves, and improve ventilation to protect wellbeing.'
  );
  summaryCard.classList.add('bubble-card', 'callout');
  summaryCard.style.left = '500px';
  summaryCard.style.top = '290px';
  canvas.appendChild(summaryCard);

  const connectors = [
    createArrow({ x: 160, y: 210 }, { x: 340, y: 180 }),
    createArrow({ x: 380, y: 180 }, { x: 560, y: 200 }, 120),
    createArrow({ x: 420, y: 220 }, { x: 320, y: 340 }, 240),
    createArrow({ x: 620, y: 220 }, { x: 570, y: 320 }, 360),
  ];
  connectors.forEach((arrow) => canvas.appendChild(arrow));

  const logos = createAiLogos();
  canvas.appendChild(logos);
}

function animateUseCases() {
  clearCanvas();
  sceneTitle.textContent = scenes[1].title;
  sceneDesc.textContent = scenes[1].desc;
  updatePhase('Channels pulse to showcase chatbot, callbot, copilots, and agents.');

  const channels = [
    ['Chatbot', 'Conversational answers'],
    ['Callbot', 'Voice AI routing'],
    ['Copilot', 'Productivity boosts'],
    ['Agent', 'Autonomous tasks'],
  ];

  channels.forEach((info, idx) => {
    const card = createCard(info[0], info[1]);
    card.style.animationDelay = `${idx * 120}ms`;
    card.style.left = `${12 + idx * 22}%`;
    card.style.top = `${20 + (idx % 2) * 24}%`;
    canvas.appendChild(card);
  });

  const pulse = document.createElement('div');
  pulse.className = 'grid-pulse';
  canvas.appendChild(pulse);
}

function animateLogic() {
  clearCanvas();
  sceneTitle.textContent = scenes[2].title;
  sceneDesc.textContent = scenes[2].desc;
  updatePhase('Ingestion prepares data; requests fetch answers in a loop.');

  const ingest = createNode('Ingestion', 'onprem');
  ingest.style.left = '80px';
  ingest.style.top = '80px';
  canvas.appendChild(ingest);

  const index = createNode('Index', 'secure');
  index.style.left = '260px';
  index.style.top = '200px';
  canvas.appendChild(index);

  const answer = createNode('Answering', 'cloud');
  answer.style.left = '480px';
  answer.style.top = '120px';
  canvas.appendChild(answer);

  const arrows = [
    createArrow({ x: 120, y: 120 }, { x: 320, y: 220 }),
    createArrow({ x: 320, y: 220 }, { x: 540, y: 160 }, 200),
    createArrow({ x: 520, y: 160 }, { x: 160, y: 120 }, 400),
  ];
  arrows.forEach((a) => canvas.appendChild(a));
}

function animateIngestion() {
  clearCanvas();
  sceneTitle.textContent = scenes[3].title;
  sceneDesc.textContent = scenes[3].desc;
  updatePhase('Docs are cleaned, chunked, and finally indexed.');

  const steps = [
    createNode('Docs', 'cloud'),
    createNode('Cleaning', 'cloud'),
    createNode('Chunking', 'cloud'),
    createNode('Indexing', 'secure'),
  ];

  steps.forEach((node, idx) => {
    node.style.left = `${70 + idx * 160}px`;
    node.style.top = '140px';
    node.style.animationDelay = `${idx * 140}ms`;
    canvas.appendChild(node);
  });

  steps.slice(0, -1).forEach((_, idx) => {
    const arrow = createArrow({ x: 120 + idx * 160, y: 160 }, { x: 220 + idx * 160, y: 160 }, idx * 140);
    canvas.appendChild(arrow);
  });

  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  canvas.appendChild(confetti);
}

function animateResponse() {
  clearCanvas();
  sceneTitle.textContent = scenes[4].title;
  sceneDesc.textContent = scenes[4].desc;
  updatePhase('Relevant chunks are retrieved, then composed by the LLM.');

  const query = createNode('User Query', 'secure');
  query.style.left = '80px';
  query.style.top = '200px';
  canvas.appendChild(query);

  const retrieval = createNode('Retriever', 'onprem');
  retrieval.style.left = '260px';
  retrieval.style.top = '200px';
  canvas.appendChild(retrieval);

  const llm = createNode('LLM', 'cloud');
  llm.style.left = '440px';
  llm.style.top = '200px';
  canvas.appendChild(llm);

  [
    createArrow({ x: 120, y: 220 }, { x: 300, y: 220 }),
    createArrow({ x: 320, y: 220 }, { x: 500, y: 220 }, 200),
  ].forEach((a) => canvas.appendChild(a));

  const bubble = document.createElement('div');
  bubble.id = 'answer-bubble';
  bubble.textContent = 'Grounded answer is built from top-ranked passages...';
  canvas.appendChild(bubble);
}

function animateCallbot() {
  clearCanvas();
  sceneTitle.textContent = scenes[5].title;
  sceneDesc.textContent = scenes[5].desc;
  updatePhase('A call comes in, intents route to knowledge and voice synthesis.');

  const phone = createNode('Call In', 'secure');
  phone.style.left = '80px';
  phone.style.top = '120px';
  canvas.appendChild(phone);

  const intent = createNode('Intent Router', 'cloud');
  intent.style.left = '240px';
  intent.style.top = '80px';
  canvas.appendChild(intent);

  const kb = createNode('Knowledge', 'onprem');
  kb.style.left = '240px';
  kb.style.top = '220px';
  canvas.appendChild(kb);

  const tts = createNode('Voice Synth', 'cloud');
  tts.style.left = '440px';
  tts.style.top = '140px';
  canvas.appendChild(tts);

  [
    createArrow({ x: 120, y: 140 }, { x: 280, y: 100 }),
    createArrow({ x: 120, y: 140 }, { x: 280, y: 240 }, 120),
    createArrow({ x: 280, y: 240 }, { x: 480, y: 180 }, 240),
    createArrow({ x: 280, y: 100 }, { x: 480, y: 180 }, 360),
  ].forEach((a) => canvas.appendChild(a));
}

function animateConstraints() {
  clearCanvas();
  sceneTitle.textContent = scenes[6].title;
  sceneDesc.textContent = scenes[6].desc;
  updatePhase('Compliance locks guard PHI with audit trails and encryption.');

  const shield = document.createElement('div');
  shield.id = 'shield';
  canvas.appendChild(shield);

  ['PHI encryption', 'Audit logs', 'Access policy'].forEach((text, idx) => {
    const badge = createCard(text, 'Required');
    badge.classList.add('alert');
    badge.style.left = `${90 + idx * 170}px`;
    badge.style.top = `${180 + (idx % 2) * 30}px`;
    badge.style.animationDelay = `${idx * 120}ms`;
    canvas.appendChild(badge);
  });
}

function animateSolution() {
  clearCanvas();
  sceneTitle.textContent = scenes[7].title;
  sceneDesc.textContent = scenes[7].desc;
  updatePhase('On-prem vector store feeds only curated chunks to the cloud LLM.');

  const store = createNode('On-Prem Vector Store', 'onprem');
  store.style.left = '80px';
  store.style.top = '180px';
  canvas.appendChild(store);

  const filter = createNode('Policy Filter', 'secure');
  filter.style.left = '300px';
  filter.style.top = '180px';
  canvas.appendChild(filter);

  const llm = createNode('Cloud LLM', 'cloud');
  llm.style.left = '520px';
  llm.style.top = '180px';
  canvas.appendChild(llm);

  [
    createArrow({ x: 140, y: 200 }, { x: 340, y: 200 }),
    createArrow({ x: 360, y: 200 }, { x: 580, y: 200 }, 200),
  ].forEach((a) => canvas.appendChild(a));

  const badge = document.createElement('div');
  badge.id = 'green-badge';
  badge.textContent = 'PHI stays local';
  canvas.appendChild(badge);
}

function animateTools() {
  clearCanvas();
  sceneTitle.textContent = scenes[8].title;
  sceneDesc.textContent = scenes[8].desc;
  updatePhase('Quality dials highlight coverage, grounding, and hallucination checks.');

  ['Coverage', 'Faithfulness', 'Noise filter'].forEach((label, idx) => {
    const dial = document.createElement('div');
    dial.className = 'dial';
    dial.style.left = `${100 + idx * 180}px`;
    dial.style.top = '160px';
    dial.style.animationDelay = `${idx * 200}ms`;
    dial.innerHTML = `<span>${label}</span>`;
    canvas.appendChild(dial);
  });

  const warning = document.createElement('div');
  warning.id = 'warning-card';
  warning.innerHTML = '<strong>Edge Case:</strong> "How many times does \'disease\' appear?" requires exact match logic.';
  canvas.appendChild(warning);
}

function animateResearch() {
  clearCanvas();
  sceneTitle.textContent = scenes[9].title;
  sceneDesc.textContent = scenes[9].desc;
  updatePhase('Research acronyms orbit the hub: Agents-to-Agents, MCP, ACP.');

  const hub = document.createElement('div');
  hub.id = 'research-hub';
  hub.textContent = 'Research Hub';
  canvas.appendChild(hub);

  ['A2A', 'MCP', 'ACP', 'Eval', 'Safety'].forEach((label, idx) => {
    const chip = document.createElement('div');
    chip.className = 'chip';
    chip.textContent = label;
    chip.style.setProperty('--angle', `${idx * 72}deg`);
    chip.style.setProperty('--delay', `${idx * 120}ms`);
    canvas.appendChild(chip);
  });
}

function buildMenu() {
  scenes.forEach((scene, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = `${idx + 1}. ${scene.title}`;
    btn.dataset.scene = scene.id;
    btn.addEventListener('click', () => selectScene(idx));
    menu.appendChild(btn);
  });
}

function selectScene(index) {
  const buttons = menu.querySelectorAll('button');
  buttons.forEach((btn, idx) => btn.classList.toggle('active', idx === index));
  const scene = scenes[index];
  scene.action();
}

function spawnClickBurst(event) {
  const burst = document.createElement('div');
  burst.className = 'click-burst';
  burst.style.left = `${event.clientX}px`;
  burst.style.top = `${event.clientY}px`;
  document.body.appendChild(burst);
  requestAnimationFrame(() => burst.classList.add('active'));
  setTimeout(() => burst.remove(), 750);
}

document.addEventListener('click', spawnClickBurst);

buildMenu();
selectScene(0);
