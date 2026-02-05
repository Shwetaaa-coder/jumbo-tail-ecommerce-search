# LLM Usage Notes

This document captures how Large Language Models (LLMs) were used during the development of this project.

---

## Tools Used
- ChatGPT
- GitHub Copilot

---

## How LLMs Were Used

### 1. System Design & Architecture
- Brainstormed the overall architecture for an e-commerce search engine.
- Discussed approaches for query understanding, intent extraction, and ranking strategies.
- Compared in-memory search vs datastore-based search (Elasticsearch).

---

### 2. Ranking Algorithm Design
- Explored different ranking signals such as:
  - Text relevance
  - Price sensitivity (e.g., queries like "sasta iphone")
  - Ratings and popularity
  - Stock availability
  - Freshness of products
- Helped in defining a weighted scoring model for ranking products.

---

### 3. Query Understanding
- Discussed handling of:
  - Spelling mistakes (e.g., "Ifone" → "iPhone")
  - Hinglish queries common in Indian e-commerce use cases
  - Price-bounded queries (e.g., "iphone 50k")

---

### 4. Code Assistance
- Used LLMs to:
  - Generate boilerplate Express APIs
  - Suggest libraries for fuzzy search (Fuse.js)
  - Refactor and modularize code for readability

All generated code was **reviewed, modified, and fully understood** before being committed.

---

## Ownership & Understanding
LLMs were used as productivity tools to accelerate development.  
All architectural decisions, trade-offs, and final implementations are owned by the author.

---

## Notes
This project was built as part of a backend/system design exercise focusing on:
- Search relevance
- Scalability
- Clean API design
