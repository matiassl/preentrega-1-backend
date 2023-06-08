import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async ( title, description, code, price, status, stock = true, category, thumbnail) => {
        let products = [];
        try {
            products = await this.getProducts();
        } catch (error) {
            console.log(`Creando archivo.`);
        }
        const id = products.length + 1;
        products.push({ id,  title, description, code, price, status, stock, category, thumbnail });

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
