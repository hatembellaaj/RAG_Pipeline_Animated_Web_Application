# RAG Pipeline Animated Web Application

An interactive single-page web experience that visualizes the full Retrieval Augmented Generation (RAG) pipeline through CSS and JavaScript animations.

## Running locally

```bash
npm install
npm start
# Visit http://localhost:9001
```

## Docker

```bash
docker build -t rag-demo .
docker run -p 9001:9001 rag-demo
# Visit http://localhost:9001
```

All animations play automatically following the configured timeline in `public/app.js`.
