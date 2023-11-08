import { Router } from "express";
import ProductManager from "../ProductManager.js";

const ProductRouter = Router();
const ProductManagerJson = new ProductManager();

ProductRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  res.send(await ProductManagerJson.addProduct(newProduct));
});

ProductRouter.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!limit) {
    return res.send(await ProductManagerJson.getProducts());
  }
  const allProducts = await ProductManagerJson.getProducts();
  const productsLimit = allProducts.slice(0, limit);
  res.send(productsLimit);
});

ProductRouter.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid);
  if (!pid) {
    return res.send("El producto no existe");
  }
  const allProducts = await ProductManagerJson.getProducts();
  const productsById = allProducts.find((product) => product.id === pid);
  res.send(productsById);
});

ProductRouter.put("/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  let updateProduct = req.body;
  try {
    await ProductManagerJson.updateProduct(id, updateProduct);
    res.send(`Producto con ID ${id} se ha cargado correctamente.`);
  } catch (error) {
    res.status(404).send(`No se encontro el producto con el ID ${id}`);
  }
});

ProductRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await ProductManagerJson.deleteProduct(id));
});

export default ProductRouter;
