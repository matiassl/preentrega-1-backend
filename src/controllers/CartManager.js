import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    addCart = async ({productos}) => {
        let carritos = [];
        try {
          carritos = await this.getCarts();
        } catch (error) {
          console.log(`Creando archivo.`);
        }
        const id = carritos.length + 1;
        carritos.push({
          id,
          productos
        });
        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'));
    };

    // createCart2 = async () => {
    //     const carritos = {
    //         productos: []
    //     };

    //     const contenido = JSON.stringify(carritos, null, 2);

    //     fs.writeFile('carrito.json', contenido, (error) => {
    //         if (error) {
    //             console.error('Error al crear el archivo:', error);
    //         } else {
    //             console.log('Archivo de carrito creado exitosamente.');
    //         }
    //     });
    // }

    // addProduct = async (title, description, code, price, status, stock, category, thumbnail) => {
    //     let products = [];
    //     try {
    //         products = await this.getProducts();
    //     } catch (error) {
    //         console.log(`Creando archivo.`);
    //     }
    //     const id = products.length + 1;
    //     products.push({ id, title, description, code, price, status, stock, category, thumbnail });

    //     return await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    // }

    //Lee todos los Carritos
    getCarts = async () => {
        try {
            const carts = await fs.promises.readFile(this.path);
            return JSON.parse(carts.toString());
        } catch (error) {
            // console.log(error);
            return [];
        }
    }

    //Leer productos de un Carrito
    getCartById = async (id) => {
        const cart = await this.getCarts();
        return cart.find(cart => cart.id == id);
    }

    addProductToCart = async (cartId, productId) => {
        const cart = await this.getCartById(cartId);

        if (cart) {
            const product = cart.productos.find(product => product.id == productId);
            if (product) {
                product.quantity += 1;
            } else {
                cart.productos.push({ id: productId, quantity: 1 });
            }
            const carts = await this.getCarts();
            const updatedCarts = carts.map(carrito => carrito.id === cartId ? cart : carrito);
            await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts, null, '\t'));
            console.log('Producto agregado al carrito exitosamente.');
        } else {
            console.log('El carrito no existe.');
        }

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

export default CartManager;
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