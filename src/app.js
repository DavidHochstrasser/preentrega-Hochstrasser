import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";

const PORT = 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);

// const readProducts = ProductManagerJson.getProducts();

const server = app.listen(PORT, () => {
  console.log(`Express Local Host ${PORT}`);
});
server.on("error", (error) => console.log(`Error del servidor ${error}`));

// app.listen(PORT, () => {
//   console.log(`Servidor Express activo en puerto ${PORT}`);
// });
