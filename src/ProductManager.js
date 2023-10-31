import fs from "fs";

class ProductManager {
  static id = 0;
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(product) {
    ProductManager.id++;
    const newProduct = {
      ...product,
      id: ProductManager.id,
    };
    this.products.push(newProduct);
    await this.escribirArchivoConProductos();
    return newProduct;
  }

  async getProducts() {
    return this.products;
  }

  async getProductsById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (product) {
      return product;
    } else {
      throw new Error("Product not found");
    }
  }

  async updateProduct(id, newData) {
    const productIndex = this.products.findIndex((item) => item.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...this.products[productIndex],
        ...newData,
        id: id,
      };
      this.products[productIndex] = updatedProduct;
      await this.escribirArchivoConProductos();
      return updatedProduct;
    } else {
      throw new Error("Product not found");
    }
  }

  async deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter((item) => item.id !== id);

    if (this.products.length < initialLength) {
      await this.escribirArchivoConProductos();
    } else {
      throw new Error("Product not found");
    }
  }

  async escribirArchivoConProductos() {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );
  }
}

const manager1 = new ProductManager("./productos.json");

// console.log(manager1.getProducts());
const newProduct = {
  titulo: "titulo1",
  description: "descripcion1",
  price: 1000,
  thumbnail: "thumbnail1",
  code: "code1",
  stock: 10,
};
const newProduct2 = {
  titulo: "titulo2",
  description: "descripcion2",
  price: 2000,
  thumbnail: "thumbnail2",
  code: "code2",
  stock: 20,
};
const newProduct3 = {
  titulo: "titulo3",
  description: "descripcion3",
  price: 3000,
  thumbnail: "thumbnail3",
  code: "code3",
  stock: 30,
};

export default ProductManager;
//Agregar Productos al Array
// manager1.addProduct(newProduct);
// manager1.addProduct(newProduct2);
// manager1.addProduct(newProduct3);

//LLamar Productos en Array
// manager1.getProducts().then((products) => {
//   console.log(products);
// });

//Modificar Producto Update
// await manager1.updateProduct(1, {
//   titulo: "New Product Updated",
// });

// manager1.updateProduct(2, titulo);

//Buscar Productos por ID
// manager1.getProductsById(1);

//Borra Producto por ID
// await manager1.deleteProduct(3);
