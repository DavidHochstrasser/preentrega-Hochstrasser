import { Router } from "express";
import CartManager from "../CartManager.js";

const CartRouter = Router();
const carts = new CartManager();

CartRouter.post("/", async (req, res) => {
  let newCarts = req.body;
  res.send(await carts.addCarts(newCarts));
});

CartRouter.get("/", async (req, res) => {
  res.send(await carts.getCarts());
});

CartRouter.get("/:id", async (req, res) => {
  res.send(await carts.getCartsById(req.params.id));
});

CartRouter.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productID = req.params.pid;
  res.send(await carts.addProductInCart(cartId, productID));
});

export default CartRouter;
