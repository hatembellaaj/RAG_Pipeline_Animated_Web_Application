const phaseText = document.getElementById('phase-text');
const menu = document.getElementById('menu');
const sceneTitle = document.getElementById('scene-title');
const sceneDesc = document.getElementById('scene-desc');
const canvas = document.getElementById('scene-canvas');

const scenes = [
  {
    id: 'presentation-root',
    title: 'Presentation Roadmap',
    desc: 'The root path through the assistant, web app, data sensitivity, RAG limits, and the next steps.',
    action: animatePresentationRoot,
  },
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
    desc: 'Two parallel flows show how ingestion and user requests progress.',
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
    desc: 'Embedding, retrieval, ranking, and the LLM craft a grounded reply.',
    action: animateResponse,
  },
  {
    id: 'assistant-setup',
    title: 'Create an OpenAI Assistant',
    desc: 'A guided walkthrough of each field required to configure an assistant.',
    action: animateAssistantSetup,
  },
  {
    id: 'assistant',
    title: 'Tools that Tune Generative Responses',
    desc: 'Retrieval, ranking, and guardrails combine with tools to optimize answers.',
    action: animateCallbot,
  },
  {
    id: 'architecture',
    title: 'Architecture: Storyboard to OpenAI Assistant',
    desc: 'How the animated experience exchanges context with the EnviroHealthAdvisor-style assistant.',
    action: animateArchitecture,
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

function getSceneData(id) {
  return scenes.find((scene) => scene.id === id) || { title: '', desc: '' };
}

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

function createUseCaseCard(title, subtitle, tone, symbol) {
  const card = document.createElement('div');
  card.className = `usecase-card ${tone}`;

  const thumb = document.createElement('div');
  thumb.className = 'usecase-thumb';
  thumb.textContent = symbol;

  const label = document.createElement('div');
  label.className = 'usecase-label';
  const h3 = document.createElement('h3');
  h3.textContent = title;
  const p = document.createElement('p');
  p.textContent = subtitle;
  label.append(h3, p);

  card.append(thumb, label);
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
  ['response', 'response', 'response'].forEach((command, idx) => {
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

function renderMermaidDiagram(diagramText, container, key) {
  const wrapper = document.createElement('div');
  wrapper.className = 'mermaid-wrapper';

  if (!window.mermaid) {
    const fallback = document.createElement('pre');
    fallback.className = 'diagram-block';
    fallback.textContent = diagramText;
    wrapper.appendChild(fallback);
    container.appendChild(wrapper);
    return wrapper;
  }

  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    fontFamily: 'Inter, system-ui, sans-serif',
    securityLevel: 'loose',
  });

  const diagramId = `mermaid-${key}-${Date.now()}`;
  const target = document.createElement('div');
  target.id = diagramId;
  target.className = 'mermaid-diagram';
  wrapper.appendChild(target);
  container.appendChild(wrapper);

  mermaid
    .render(diagramId, diagramText)
    .then(({ svg }) => {
      target.innerHTML = svg;
    })
    .catch(() => {
      const fallback = document.createElement('pre');
      fallback.className = 'diagram-block';
      fallback.textContent = diagramText;
      wrapper.appendChild(fallback);
    });

  return wrapper;
}

function animatePresentationRoot() {
  clearCanvas();
  const scene = getSceneData('presentation-root');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('Follow the glowing root path: assistant, web app, safety, open source realities, and what comes next.');

  const path = document.createElement('div');
  path.className = 'root-path';
  canvas.appendChild(path);

  const header = document.createElement('div');
  header.className = 'path-header';
  header.innerHTML = '<h3>Root Path</h3><div class="path-sparkline"></div>';
  path.appendChild(header);

  const sparkline = header.querySelector('.path-sparkline');
  Array.from({ length: 4 }).forEach(() => {
    const dot = document.createElement('div');
    dot.className = 'spark';
    sparkline.appendChild(dot);
  });

  const rail = document.createElement('div');
  rail.className = 'path-rail';
  path.appendChild(rail);

  Array.from({ length: 3 }).forEach((_, idx) => {
    const orb = document.createElement('div');
    orb.className = 'path-orb';
    orb.style.animationDelay = `${idx * 0.4}s`;
    path.appendChild(orb);
  });

  const grid = document.createElement('div');
  grid.className = 'path-grid';
  path.appendChild(grid);

  const steps = [
    {
      title: 'Create an OpenAI assistant',
      desc: 'Spin up env_assistant grounded on curated scientific papers with tuned instructions.',
    },
    {
      title: 'Build the data collection web app',
      desc: 'Capture user prompts and metadata, then stream them to the assistant for recommendations.',
    },
    {
      title: 'Sensitive data + solutions',
      desc: 'Encrypt in transit, redact inputs, and gate responses to respect privacy obligations.',
    },
    {
      title: 'Open-source RAG limitations',
      desc: 'Latency, eval coverage, and maintenance gaps make some OSS stacks risky for production.',
    },
    {
      title: 'Ideas and future work',
      desc: 'Add active learning loops, observability panels, and sandboxed tool calls with more motion.',
    },
  ];

  steps.forEach((step, idx) => {
    const card = document.createElement('div');
    card.className = 'path-step';
    card.style.animationDelay = `${idx * 120}ms`;

    const number = document.createElement('div');
    number.className = 'step-number';
    number.textContent = idx + 1;

    const title = document.createElement('div');
    title.className = 'step-title';
    title.textContent = step.title;

    const desc = document.createElement('p');
    desc.className = 'step-desc';
    desc.textContent = step.desc;

    card.append(number, title, desc);
    grid.appendChild(card);
  });

  const badge = document.createElement('div');
  badge.className = 'path-badge';
  badge.textContent = 'Start here';
  path.appendChild(badge);
}

function animateCore() {
  clearCanvas();
  const scene = getSceneData('intro');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
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
  const scene = getSceneData('use-cases');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('Each channel lights up with a hero image to show how it helps.');

  const gallery = document.createElement('div');
  gallery.className = 'usecase-gallery';
  canvas.appendChild(gallery);

  const channels = [
    ['Chatbot', 'Patient portal Q&A', 'sky', '💬'],
    ['Callbot', 'Voice triage & routing', 'amber', '📞'],
    ['Copilot', 'Workflow copilots', 'violet', '🧭'],
    ['Agent', 'Autonomous field tasks', 'emerald', '🤖'],
  ];

  channels.forEach((info, idx) => {
    const card = createUseCaseCard(info[0], info[1], info[2], info[3]);
    card.style.animationDelay = `${idx * 140}ms`;
    gallery.appendChild(card);
  });

  const pulse = document.createElement('div');
  pulse.className = 'grid-pulse';
  canvas.appendChild(pulse);
}

function animateLogic() {
  clearCanvas();
  const scene = getSceneData('logic');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('Ingestion builds the index while user requests embed, retrieve, and rank.');

  const ingestLabel = document.createElement('div');
  ingestLabel.className = 'flow-label';
  ingestLabel.textContent = 'Ingestion';
  ingestLabel.style.left = '60px';
  ingestLabel.style.top = '60px';
  canvas.appendChild(ingestLabel);

  const ingestSteps = ['Collect Data', 'Cleaning', 'Chunking', 'Embedding', 'Indexing'];
  ingestSteps.forEach((label, idx) => {
    const node = createNode(label, idx < 4 ? 'cloud' : 'secure');
    node.style.left = `${70 + idx * 130}px`;
    node.style.top = '100px';
    node.style.animationDelay = `${idx * 120}ms`;
    canvas.appendChild(node);

    if (idx < ingestSteps.length - 1) {
      const arrow = createArrow(
        { x: 120 + idx * 130, y: 120 },
        { x: 200 + idx * 130, y: 120 },
        idx * 120
      );
      canvas.appendChild(arrow);
    }
  });

  const requestLabel = document.createElement('div');
  requestLabel.className = 'flow-label';
  requestLabel.textContent = 'User Request';
  requestLabel.style.left = '60px';
  requestLabel.style.top = '230px';
  canvas.appendChild(requestLabel);

  const requestSteps = ['Embedding', 'Retrieval', 'Ranking', 'LLM'];
  requestSteps.forEach((label, idx) => {
    const node = createNode(label, idx === requestSteps.length - 1 ? 'cloud' : 'onprem');
    node.style.left = `${100 + idx * 150}px`;
    node.style.top = '270px';
    node.style.animationDelay = `${idx * 140}ms`;
    canvas.appendChild(node);

    if (idx < requestSteps.length - 1) {
      const arrow = createArrow(
        { x: 150 + idx * 150, y: 290 },
        { x: 230 + idx * 150, y: 290 },
        idx * 140
      );
      canvas.appendChild(arrow);
    }
  });
}

function animateIngestion() {
  clearCanvas();
  const scene = getSceneData('ingestion');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('Files stream in gray, turn clean white, chunk, embed, then stack into the index.');

  const track = document.createElement('div');
  track.className = 'ingestion-track';
  canvas.appendChild(track);

  const stages = [
    { title: 'Collect', desc: 'PDF, CSV, EMR files arrive', tone: 'cloud' },
    { title: 'Cleaning', desc: 'Normalize, dedupe, and sanitize', tone: 'cloud' },
    { title: 'Chunking', desc: 'Split into context windows', tone: 'cloud' },
    { title: 'Embedding', desc: 'Vectorize each chunk', tone: 'onprem' },
    { title: 'Indexing', desc: 'Add to secure index', tone: 'secure' },
  ];

  stages.forEach((stage, idx) => {
    const marker = document.createElement('div');
    marker.className = `ingestion-step ${stage.tone}`;
    marker.style.left = `${60 + idx * 190}px`;
    marker.innerHTML = `
      <div class="step-dot"></div>
      <div>
        <h4>${stage.title}</h4>
        <p>${stage.desc}</p>
      </div>
    `;
    track.appendChild(marker);

    if (idx < stages.length - 1) {
      const connector = document.createElement('div');
      connector.className = 'ingestion-connector';
      connector.style.left = `${130 + idx * 190}px`;
      track.appendChild(connector);
    }
  });

  const fileTypes = ['PDF', 'CSV', 'DOCX', 'HTML', 'MD'];
  fileTypes.forEach((type, idx) => {
    const chip = document.createElement('div');
    chip.className = 'file-chip raw';
    chip.textContent = type;
    chip.style.left = '10px';
    chip.style.top = `${40 + idx * 28}px`;
    track.appendChild(chip);

    const delay = idx * 260;
    setTimeout(() => {
      chip.style.left = '70px';
      chip.classList.add('flying');
    }, 200 + delay);

    setTimeout(() => {
      chip.style.left = '250px';
      chip.classList.add('cleaning');
    }, 760 + delay);

    setTimeout(() => {
      chip.classList.remove('raw');
      chip.classList.add('clean');
    }, 1100 + delay);

    setTimeout(() => {
      chip.style.left = '440px';
      chip.classList.add('chunked');
    }, 1500 + delay);

    setTimeout(() => {
      chip.style.left = '630px';
      chip.classList.add('embedded');
    }, 1900 + delay);

    setTimeout(() => {
      chip.style.left = '820px';
      chip.classList.add('indexed');
    }, 2300 + delay);
  });

  const indexStack = document.createElement('div');
  indexStack.className = 'index-stack';
  indexStack.style.left = '780px';
  indexStack.style.top = '120px';
  track.appendChild(indexStack);
}

function animateResponse() {
  clearCanvas();
  const scene = getSceneData('response');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('A user request embeds, retrieves, re-ranks, and flows into the LLM answer.');

  const track = document.createElement('div');
  track.className = 'response-track';
  canvas.appendChild(track);

  const stages = [
    { label: 'User Request', tone: 'secure', detail: 'Health question arrives' },
    { label: 'Embedding', tone: 'cloud', detail: 'Vectorize the query' },
    { label: 'Retrieval', tone: 'onprem', detail: 'Compare with index' },
    { label: 'Ranking', tone: 'amber', detail: 'Score the candidates' },
    { label: 'LLM', tone: 'cloud', detail: 'Compose grounded reply' },
  ];

  stages.forEach((stage, idx) => {
    const block = document.createElement('div');
    block.className = `stage-block ${stage.tone}`;
    block.style.animationDelay = `${idx * 120}ms`;
    block.innerHTML = `
      <div class="stage-label">${stage.label}</div>
      <p>${stage.detail}</p>
    `;
    track.appendChild(block);
  });

  const lane = document.createElement('div');
  lane.className = 'flow-lane';
  track.appendChild(lane);

  ['Vectorize', 'Top-k passages', 'Re-ranked list'].forEach((text, idx) => {
    const chip = document.createElement('div');
    chip.className = 'flow-chip';
    chip.style.setProperty('--delay', `${idx * 0.6}s`);
    chip.textContent = text;
    lane.appendChild(chip);
  });

  const ranking = document.createElement('div');
  ranking.className = 'ranking-panel';
  ranking.innerHTML = `
    <div class="ranking-bar" style="--width: 92%"></div>
    <div class="ranking-bar" style="--width: 76%"></div>
    <div class="ranking-bar" style="--width: 55%"></div>
  `;
  track.appendChild(ranking);

  const answer = document.createElement('div');
  answer.className = 'llm-answer';
  answer.innerHTML = `
    <strong>LLM Response</strong>
    <p>Grounded reply synthesized from the highest ranked passages.</p>
  `;
  track.appendChild(answer);
}

function animateAssistantSetup() {
  clearCanvas();
  const scene = getSceneData('assistant-setup');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('Name, instruct, select tools, and tune sampling before going live.');

  const grid = document.createElement('div');
  grid.className = 'assistant-grid';
  canvas.appendChild(grid);

  const fieldList = document.createElement('div');
  fieldList.className = 'field-list';

  const fields = [
    {
      title: 'Name',
      desc: 'Friendly identifier shown in the dashboard. Use a concise, purpose-driven name (e.g., “Env Health Advisor”).',
    },
    {
      title: 'Instructions',
      desc: 'System-level guidance that sets persona, safety boundaries, tone, and fallback behaviors. Include disclaimers for health/finance.',
    },
    {
      title: 'Model',
      desc: 'Pick the model powering replies (e.g., gpt-4o-mini). Balances quality, latency, and cost.',
    },
    {
      title: 'Tools',
      desc: 'Enable Code Interpreter, Retrieval, and function calling when needed. Document when each tool should be invoked.',
    },
    {
      title: 'Temperature',
      desc: 'Controls randomness (0–2). Lower for deterministic answers; raise slightly for creative tone.',
    },
    {
      title: 'Top P',
      desc: 'Nucleus sampling alternative to temperature. Adjust one sampling setting at a time to avoid unpredictable output.',
    },
    {
      title: 'Max response tokens',
      desc: 'Caps the length of generated answers so the assistant does not stream excessively long replies.',
    },
    {
      title: 'Response format',
      desc: 'Choose text or JSON schema. Structured JSON ensures downstream tools parse the reply safely.',
    },
    {
      title: 'Vector store',
      desc: 'Attach a file search store. Upload PDFs/CSVs/notes, then index them so retrieval can ground answers.',
    },
    {
      title: 'Run configuration',
      desc: 'Threads hold message history. Enable streaming for live tokens and capture run IDs for observability.',
    },
    {
      title: 'Safety & compliance',
      desc: 'Add PII handling rules, rate limits, and error fallbacks. Log tool calls for audit readiness.',
    },
  ];

  fields.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'field-card';
    card.style.animationDelay = `${idx * 80}ms`;
    card.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;
    fieldList.appendChild(card);
  });

  const preview = document.createElement('div');
  preview.className = 'assistant-preview';
  preview.innerHTML = `
    <div class="assistant-window">
      <div class="window-head">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <strong>OpenAI Assistants</strong>
      </div>
      <div class="assistant-body">
        <div class="form-row">
          <label>Name</label>
          <div class="input fake">assistant_env</div>
        </div>
        <div class="form-row">
          <label>Instructions</label>
          <div class="input fake">Provide specific ideas, recommendations, sentiment, summarization...</div>
        </div>
        <div class="pill-row">
          <span class="pill">Model: gpt-4o-mini</span>
          <span class="pill">Temperature: 1.0</span>
          <span class="pill">Top P: 1.0</span>
          <span class="pill">Response format: text</span>
        </div>
        <div class="form-row grid">
          <div>
            <label>Max response tokens</label>
            <div class="input fake">2048</div>
          </div>
          <div>
            <label>Vector store</label>
            <div class="input fake">file-search connected</div>
          </div>
        </div>
        <div class="helper">
          Tip: Toggle tools (Code Interpreter, Retrieval) only when instructions tell the assistant when to use them.
        </div>
      </div>
    </div>
  `;

  grid.append(fieldList, preview);
}

function animateCallbot() {
  clearCanvas();
  const scene = getSceneData('assistant');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('Retrieval, tools, and guardrails cooperate to optimize the LLM response.');

  const grid = document.createElement('div');
  grid.className = 'tool-grid';
  canvas.appendChild(grid);

  const helpers = [
    {
      title: 'Retrieval',
      body: 'Ground answers with search over vector and keyword indexes.',
    },
    {
      title: 'Re-Ranking',
      body: 'Boost precision with cross-encoder scoring before generation.',
    },
    {
      title: 'Guardrails',
      body: 'Detect PII, enforce policy, and route to safe fallbacks.',
    },
    {
      title: 'Tool Use',
      body: 'Functions, calculators, and code execution refine the draft.',
    },
  ];

  const helperList = document.createElement('div');
  helperList.className = 'helper-list';

  helpers.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.style.animationDelay = `${idx * 140}ms`;
    card.innerHTML = `<strong>${item.title}</strong><p>${item.body}</p>`;
    helperList.appendChild(card);
  });

  const diagramText = `flowchart LR\n  User[User request] --> Embed[Embedding]\n  Embed --> Retrieve[Retriever + Vector DB]\n  Retrieve --> Rank[Re-ranker]\n  Rank --> Orchestrator[Tool Orchestrator]\n  Orchestrator -->|Calls| Tools[Domain tools]\n  Orchestrator --> LLM[LLM]\n  Tools --> Orchestrator\n  LLM --> Response[Optimized response]\n  Response --> Feedback[Safety & policy checks]`;

  const mermaidCard = renderMermaidDiagram(diagramText, grid, 'callbot');

  const caption = document.createElement('div');
  caption.className = 'diagram-caption';
  caption.textContent = 'Rendered with Mermaid to show how retrieval, ranking, tools, and guardrails shape the seventh scene.';

  mermaidCard.appendChild(caption);
  grid.append(helperList, mermaidCard);
}

function animateArchitecture() {
  clearCanvas();
  const scene = getSceneData('architecture');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('Telemetry, prompts, and vector lookups flow between the storyboard and the OpenAI Assistant.');

  const grid = document.createElement('div');
  grid.className = 'architecture-grid';
  canvas.appendChild(grid);

  const highlights = [
    {
      title: 'Storyboard UI',
      body: 'Collects clicks and scene context from the animated walkthrough.',
    },
    {
      title: 'Node/Express API',
      body: 'Packages questions, scene IDs, and session info before handing off to the assistant.',
    },
    {
      title: 'EnviroHealthAdvisor Assistant',
      body: 'OpenAI Assistant configured with retrieval + tools for environmental health insights.',
    },
    {
      title: 'Vector + File Search',
      body: 'Searches curated environmental health files and embeddings to ground answers.',
    },
  ];

  const highlightList = document.createElement('div');
  highlightList.className = 'highlight-list';
  highlights.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'highlight-card';
    card.style.animationDelay = `${idx * 120}ms`;
    card.innerHTML = `<strong>${item.title}</strong><p>${item.body}</p>`;
    highlightList.appendChild(card);
  });

  const diagramText = `flowchart LR\n  UI[Animated Storyboard UI] --> API[Node/Express bridge]\n  API --> Assistant[OpenAI Assistant]\n  Assistant -->|Retrieval| VectorStore[Vector store + file search]\n  Assistant --> Tools[Domain tools & calculators]\n  VectorStore --> Assistant\n  Tools --> Assistant\n  Assistant --> Response[Grounded response to UI]\n  Response --> Telemetry[Scene telemetry & follow-up cues]`;

  const diagramCard = renderMermaidDiagram(diagramText, grid, 'architecture');
  const caption = document.createElement('div');
  caption.className = 'diagram-caption';
  caption.textContent = 'Architecture inspired by EnviroHealthAdvisor: the SPA hands context to the OpenAI Assistant, which queries vector/file search before replying.';
  diagramCard.appendChild(caption);

  const figureCard = document.createElement('div');
  figureCard.className = 'architecture-figure';

  const figureImage = document.createElement('img');
  figureImage.src = 'envirohealth-architecture.svg';
  figureImage.alt = 'EnviroHealth Advisor system architecture diagram showing the reverse proxy, FastAPI backend, assistant API, and Open-Meteo services.';
  figureCard.appendChild(figureImage);

  const figureCaption = document.createElement('div');
  figureCaption.className = 'diagram-caption compact';
  figureCaption.textContent = 'EnviroHealth Advisor system architecture now appears directly in the storyboard: the 8th page shows how requests flow through the reverse proxy, FastAPI backend, assistant, and external APIs.';
  figureCard.appendChild(figureCaption);

  grid.append(highlightList, figureCard, diagramCard);
}

function animateConstraints() {
  clearCanvas();
  const scene = getSceneData('constraints');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
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
  const scene = getSceneData('solution');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
  updatePhase('On-prem components call Azure AI Foundry through a private endpoint with only sanitized chunks.');

  const figureFrame = document.createElement('div');
  figureFrame.className = 'figure-frame';

  const figure = document.createElement('img');
  figure.src = 'on-prem-rag-architecture.svg';
  figure.alt = 'On-prem RAG pipeline calling an Azure AI Foundry private endpoint with sanitized chunks only.';
  figure.loading = 'lazy';
  figure.className = 'full-figure';

  const caption = document.createElement('p');
  caption.className = 'figure-caption';
  caption.textContent = 'No raw documents leave the firewall—only filtered, referenced chunks are sent to Azure AI Foundry over a private endpoint.';

  figureFrame.appendChild(figure);
  canvas.appendChild(figureFrame);
  canvas.appendChild(caption);
}

function animateTools() {
  clearCanvas();
  const scene = getSceneData('tools');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
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
  const scene = getSceneData('research');
  sceneTitle.textContent = scene.title;
  sceneDesc.textContent = scene.desc;
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
