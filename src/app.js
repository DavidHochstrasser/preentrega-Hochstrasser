import express from "express";
import ProductManager from "./ProductManager";

const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ProductManagerJson = new ProductManager();

app.get("/products", async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!limit) {
    return res.send(await ProductManagerJson.readProducts());
  }
  const allProducts = await ProductManagerJson.readProducts();
  const productsLimit = allProducts.slice(0, limit);
  res.send(productsLimit);
});

app.get("/products/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  if (!pid) {
    return res.send(`El producto no existe`);
  }
  const allProducts = await ProductManagerJson.readProducts();
  const productsById = allProducts.find((product) => product.id === pid);
  res.send(productsById);
});

app.listen(PORT, () => {
  console.log(`Servidor Express activo en puerto ${PORT}`);
});
