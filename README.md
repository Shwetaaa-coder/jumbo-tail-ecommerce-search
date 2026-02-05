# E-commerce Search Engine (Node.js)

## Overview

This project implements an **e-commerce product search microservice** for a large electronics catalog (mobiles, accessories, laptops, gadgets), inspired by real-world platforms like Flipkart and Amazon. The focus is on **search relevance and ranking**, handling noisy Indian user queries such as Hinglish, spelling mistakes, and price-based intent.

The service is built using **Node.js and Express**, stores data **in-memory**, and ranks products using a **multi-factor scoring algorithm**.

---

## Key Features

* 🔍 **Fuzzy search** (handles typos like *Ifone → iPhone*)
* 🇮🇳 **Hinglish query understanding** (*sasta*, *mehenga*, etc.)
* 🧠 **Intent-based ranking** (cheap, latest, price-bound queries)
* ⭐ **Multi-signal ranking** using ratings, price, popularity, stock, freshness
* ⚡ **Low latency** (<1000ms) using in-memory storage
* 🧩 Clean, modular, and extensible architecture

---

## Example Queries Supported

* `Latest iphone`
* `Sasta wala iphone`
* `Ifone 16`
* `iphone 16 red color`
* `iphone 50k`
* `iphone cover strong`

---

## Architecture (High Level)

```
Client
  ↓
Search API (Express)
  ↓
Query Normalization + Intent Extraction
  ↓
Fuzzy Matching (Fuse.js)
  ↓
Ranking Engine (Multi-factor scoring)
  ↓
In-memory Product Catalog
```

---

## Ranking Strategy

Each product is assigned a final score based on a weighted combination of signals:

* **Text relevance** (title + description match)
* **User ratings & review count**
* **Units sold (popularity)**
* **Price sensitivity** (boosted for queries like *sasta*)
* **Freshness** (newer products ranked higher for *latest*)
* **Stock availability** (out-of-stock demoted)
* **Penalty signals** (returns, complaints)

> The final score determines the order of products in search results.

---

## Tech Stack

* **Node.js**
* **Express.js**
* **Fuse.js** (fuzzy text search)
* **UUID** (ID generation)
* **In-memory data store** (can be extended to Redis / Elasticsearch)

---

## API Endpoints

### 1. Store Product

**POST** `/api/v1/product`

Request:

```json
{
  "title": "Iphone 17",
  "description": "6.3-inch OLED display, A19 chip",
  "rating": 4.2,
  "stock": 100,
  "price": 81999,
  "mrp": 82999,
  "currency": "Rupee"
}
```

Response:

```json
{
  "productId": 101
}
```

---

### 2. Update Product Metadata

**PUT** `/api/v1/product/meta-data`

Request:

```json
{
  "productId": 101,
  "Metadata": {
    "ram": "8GB",
    "storage": "128GB",
    "color": "red"
  }
}
```

---

### 3. Search Products

**GET** `/api/v1/search/product?query=Sasta Iphone`

Response:

```json
{
  "data": [
    {
      "productId": 80,
      "title": "Iphone 13",
      "price": 35000,
      "stock": 10
    }
  ]
}
```

---

## How to Run Locally

```bash
npm install
node src/index.js
```

Server starts on:

```
http://localhost:3000
```

Health check:

```
GET /health
```

---

## Performance Considerations

* In-memory catalog for fast reads
* Candidate reduction before ranking
* Linear scoring only on matched products

> In production, this system can be extended using **Elasticsearch (BM25)** or **Redis** for scalability.

---

## LLM Usage Disclosure

AI tools (ChatGPT / Copilot) were used to accelerate:

* Boilerplate code generation
* Ranking algorithm brainstorming
* Query normalization ideas

All generated code and logic were **reviewed, modified, and fully understood** by the author.

---

## Future Improvements

* Elasticsearch integration
* Personalized ranking
* Learning-to-rank (ML-based)
* Query analytics & logging
* Caching frequent searches

---

## Author

Built as a system design & backend engineering exercise focusing on **search relevance and scalability**.
