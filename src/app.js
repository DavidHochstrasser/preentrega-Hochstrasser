import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import * as path from "path";
import __dirname from "./utils.js";
import ProductManager from "./ProductManager.js";

const ProductManagerJson = new ProductManager();

const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor Express activo en puerto ${PORT}`);
});
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Websockets
socketServer.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("agregarProducto", async (nuevoProducto) => {
    socketServer.emit(
      "productoCreado",
      await ProductManagerJson.addProduct(nuevoProducto)
    );
  });

  socket.on("eliminarProducto", async (productoId) => {
    socketServer.emit(
      "productoEliminado",
      await ProductManagerJson.deleteProduct(productoId)
    );
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

app.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {
    title: "Real Time Products",
  });
});

// Handlebars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));

// Static

app.use("/", express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  let allProducts = await ProductManagerJson.getProducts();
  res.render("home", {
    title: "Express Avanzado | Handlebars",
    productos: allProducts,
  });
});

app.get("/:id", async (req, res) => {
  console.log(req.params);
  let prod = await ProductManagerJson.getProductsById(req.params.id);
  res.render("prod", {
    title: "Express Avanzado | Handlebars",
    productos: prod,
  });
});

app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
