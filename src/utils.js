const HINGLISH_MAP = {
  sasta: "cheap",
  mehenga: "expensive",
  wala: ""
};

function normalizeQuery(query) {
  let q = query.toLowerCase();

  Object.keys(HINGLISH_MAP).forEach(word => {
    q = q.replace(word, HINGLISH_MAP[word]);
  });

  return q;
}

function extractIntent(query) {
  return {
    preferCheap: query.includes("cheap") || query.includes("sasta"),
    maxPrice: extractPrice(query),
    preferLatest: query.includes("latest")
  };
}

function extractPrice(query) {
  const match = query.match(/(\d+)\s?k?/);
  if (!match) return null;

  let price = parseInt(match[1], 10);
  if (query.includes("k")) price *= 1000;
  return price;
}

function scoreProduct(product, intent, textScore) {
  let score = 0;

  // text relevance
  score += textScore * 0.3;

  // rating
  score += (product.rating || 0) * 0.15;

  // popularity
  score += Math.log(product.unitsSold + 1) * 0.15;

  // price
  if (intent.preferCheap) {
    score += (1 / product.price) * 10000;
  }

  // stock
  score += product.stock > 0 ? 0.1 : -1;

  // freshness
  const daysOld = (Date.now() - product.createdAt) / (1000 * 60 * 60 * 24);
  score += Math.exp(-daysOld / 365) * 0.1;

  // penalties
  score -= (product.returnRate * 0.2);
  score -= (product.complaints * 0.01);

  return score;
}

module.exports = {
  normalizeQuery,
  extractIntent,
  scoreProduct
};
