# RAG Pipeline Animated Web Application

An interactive single-page web experience that visualizes a RAG pipeline while opening with a ChatGPT health Q&A scene and nods to other frontier models.

## How to use the app

- **Open the scene menu:** The left menu lists every storyboard step. Click any item to load and replay its animation.
- **Experience the mouse burst:** Click anywhere on the page to trigger a glowing burst animation for extra visual feedback.
- **Read the story:** Each scene shows a title and description above the canvas. Cards and nodes animate automatically once a scene loads.

## Scene guide

1. **ChatGPT answers a health question** – Shows a user asking “How do environmental factors affect health?” with ChatGPT responding and other AIs (Gemini, Mistral, Claude, Llama 3, Grok) illuminated.
2. **Use Cases: Chatbot, Callbot & More** – Highlights channels like chatbot, callbot, copilots, and agents.
3. **Pipeline Logic: Ingest & Answer** – Depicts ingestion, indexing, and answering loops.
4. **Ingestion Flow to Indexing** – Documents flow through cleaning, chunking, and indexing.
5. **Responding to a User** – Retrieval components collect chunks before the LLM answers.
6. **Assistants in Real Life (Callbot)** – Routes intents to knowledge and voice synthesis.
7. **Medical Constraints** – Visualizes privacy, security, and compliance safeguards.
8. **RAG On-Prem Remedy** – Shows on-prem vector storage with policy filters feeding a cloud LLM.
9. **Better Representative Chunks** – Displays quality dials for coverage and faithfulness.
10. **New Research: A2A, MCP, ACP** – Positions emerging research items around a hub.

## Run from the command line

```bash
npm install
npm start
# then open http://localhost:9001 in your browser
```

## Docker

```bash
docker build -t rag-demo .
docker run -p 9001:9001 rag-demo
# then open http://localhost:9001 in your browser
```
