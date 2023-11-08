import fs from "fs";
import ProductManager from "./ProductManager.js";

const productsAll = new ProductManager();

class CartManager {
  static id = 0;
  constructor() {
    this.path = "./carts.json";
    this.products = [];
  }

  async addCarts(product) {
    CartManager.id++;
    const newProduct = {
      ...product,
      id: CartManager.id,
    };
    this.products.push(newProduct);
    this.writeCarts();
    return "carrito agregado";
  }

  async getCarts() {
    const data = await fs.promises.readFile(this.path, "utf8");
    this.products = JSON.parse(data);
    return this.products;
  }

  async getCartsById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (product) {
      return product;
    } else {
      throw new Error("Product not found");
    }
  }

  async addProductInCart(cartId, productID) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((item) => item.cartId === cartId);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...productID,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log(`Producto con id ${cartId} actualizado.`);
    } else {
      console.log(`No se encontró ningún producto con el id ${cartId}.`);
    }
  }

  async writeCarts() {
    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  }
}

const manager1 = new CartManager("./carts.json");

export default CartManager;
