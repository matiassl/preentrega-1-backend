import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct2 = async (title, description, price, thumbnail, code, stock) => {
        let products = [];
        try {
            products = await this.getProducts();
        } catch (error) {
            console.log(`Creando archivo.`);
        }
        const id = products.length + 1;
        products.push({ id, title, description, price, thumbnail, code, stock });

        return await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    getProducts = async () => {
        try {
            const products = await fs.promises.readFile(this.path);
            return JSON.parse(products.toString());
        } catch (error) {
            // console.log(error);
            return [];
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        return products.find(product => product.id == id);
    }

    deleteProduct = async (id) => {
        let products = await this.getProducts();
        products = products.filter(product => product.id != id);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    //  updateProduct = async(id, campos) => {
    //     let products = await this.getProducts();
    //     const index = products.findIndex(product => product.id === id);
    //     if (index !== -1) {
    //         const product = products[index];
    //         products[index] = { ...product, ...campos };
    //         await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    //         return products[index];
    //     }
    //     return null;
    // }

    updateProduct = async (id, campos) => {
        let products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
          products[index] = { ...products[index], ...campos };
          await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        }
        return null;
      }
}

export default ProductManager;
// node desafio2.js
// const Productos = new productManager('./products.json');
// await Productos.addProduct2('fideos', 'moño', '100', 'img', '522872', '1');
// await Productos.addProduct2('atun', 'lomito de atun', '799', 'img', '956327', '10');
// await Productos.addProduct2('jabon', 'jabon liquido', '1700', 'img', '087143', '5');
// await Productos.addProduct2('harina', '000', '200', 'img', '647182', '3');
// await Productos.updateProduct(1, { title: 'fideos-matarazzo', price: '99.99' });
// console.log(await Productos.getProductById(1));
// await Productos.deleteProduct(3);
// console.log(await Productos.getProducts());