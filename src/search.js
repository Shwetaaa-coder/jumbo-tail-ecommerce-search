const Fuse = require("fuse.js");
const { normalizeQuery, extractIntent, scoreProduct } = require("./utils");
const { getAllProducts } = require("./catalog");

function searchProducts(query) {
  const normalizedQuery = normalizeQuery(query);
  const intent = extractIntent(normalizedQuery);

  const products = getAllProducts();

  const fuse = new Fuse(products, {
    keys: ["title", "description"],
    threshold: 0.4
  });

  let candidates = fuse.search(normalizedQuery);

  let results = candidates.map(c => {
    const score = scoreProduct(c.item, intent, 1 - c.score);
    return { ...c.item, score };
  });

  // price filter
  if (intent.maxPrice) {
    results = results.filter(p => p.price <= intent.maxPrice);
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

module.exports = { searchProducts };
