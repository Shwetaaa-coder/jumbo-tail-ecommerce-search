const express = require("express");
const bodyParser = require("body-parser");
const { addProduct, updateMetadata } = require("./catalog");
const { searchProducts } = require("./search");

const app = express();
app.use(bodyParser.json());

/**
 * Store Product
 */
app.post("/api/v1/product", (req, res) => {
  try {
    const product = addProduct(req.body);
    res.json({ productId: product.productId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Update Metadata
 */
app.put("/api/v1/product/meta-data", (req, res) => {
  try {
    const { productId, Metadata } = req.body;
    const product = updateMetadata(productId, Metadata);
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

/**
 * Search Products
 */
app.get("/api/v1/search/product", (req, res) => {
  try {
    const { query } = req.query;
    const results = searchProducts(query);
    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
});

app.listen(3000, () => {
  console.log("Search service running on port 3000");
});
