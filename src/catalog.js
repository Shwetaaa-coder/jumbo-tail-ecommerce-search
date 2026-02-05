const products = [];
let autoId = 1;

function addProduct(product) {
  const newProduct = {
    productId: autoId++,
    unitsSold: product.unitsSold ?? Math.floor(Math.random() * 10000),
    returnRate: product.returnRate ?? Math.random(),
    complaints: product.complaints ?? Math.floor(Math.random() * 100),
    createdAt: Date.now(),
    metadata: {},
    ...product
  };

  products.push(newProduct);
  return newProduct;
}

function updateMetadata(productId, metadata) {
  const product = products.find(p => p.productId === productId);
  if (!product) throw new Error("Product not found");

  product.metadata = { ...product.metadata, ...metadata };
  return product;
}

function getAllProducts() {
  return products;
}

module.exports = {
  addProduct,
  updateMetadata,
  getAllProducts
};
