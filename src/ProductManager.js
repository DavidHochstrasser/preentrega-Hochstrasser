import fs from "fs";

class ProductManager {
  static id = 0;
  constructor() {
    this.path = "./productos.json";
    this.products = [];
  }

  async addProduct(product) {
    ProductManager.id++;
    const newProduct = {
      ...product,
      id: ProductManager.id,
    };
    this.products.push(newProduct);
    this.writeProducts();
    return newProduct;
  }

  async getProducts() {
    const data = await fs.promises.readFile(this.path, "utf8");
    this.products = JSON.parse(data);
    return this.products;
  }

  async getProductsById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (product) {
      return product;
    }
  }

  async updateProduct(id, newData) {
    const products = await this.getProducts();
    const productIndex = products.findIndex((item) => item.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...newData,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log(`Producto con id ${id} actualizado.`);
    } else {
      console.log(`No se encontró ningún producto con el id ${id}.`);
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredProducts = products.filter((item) => item.id != id);

    if (products.length === filteredProducts.length) {
      console.log(`No se encontro producto con el ID ${id}`);
      return;
    }

    await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
    console.log(`Producto con ID ${id} eliminado`);
  }

  async writeProducts() {
    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
  }
}

const manager1 = new ProductManager("./productos.json");
// console.log(manager1.getProducts());

//Productos de ejemplos

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
const newProduct4 = {
  titulo: "titulo4",
  description: "descripcion4",
  price: 4000,
  thumbnail: "thumbnail4",
  code: "code4",
  stock: 40,
};
const newProduct5 = {
  titulo: "titulo5",
  description: "descripcion5",
  price: 5000,
  thumbnail: "thumbnail5",
  code: "code5",
  stock: 50,
};
const newProduct6 = {
  titulo: "titulo6",
  description: "descripcion6",
  price: 6000,
  thumbnail: "thumbnail6",
  code: "code6",
  stock: 60,
};
const newProduct7 = {
  titulo: "titulo7",
  description: "descripcion7",
  price: 7000,
  thumbnail: "thumbnail7",
  code: "code7",
  stock: 70,
};
export default ProductManager;

//Agregar Productos al Array
// manager1.addProduct(newProduct);
// manager1.addProduct(newProduct2);
// manager1.addProduct(newProduct3);
// manager1.addProduct(newProduct4);
// manager1.addProduct(newProduct5);
// manager1.addProduct(newProduct6);
// manager1.addProduct(newProduct7);

//LLamar Productos en Array
// manager1.getProducts().then((products) => {
//   console.log(products);
// });

//Modificar Producto Update
// await manager1.updateProduct(1, {
//   titulo: "New Product Updated",
//   description: "New Product Updated",
// });titulo: "New Product Updated",

// manager1.updateProduct(2, titulo);

//Buscar Productos por ID
// console.log(manager1.getProductsById(1));

//Borra Producto por ID
// await manager1.deleteProduct(3);
