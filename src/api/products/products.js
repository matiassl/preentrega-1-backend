import { Router } from 'express'
import ProductManager from '../../ProductManager';
const router = Router()

app.get('/', async (request, response) => {
    const { limit } = request.query;

    let products = await Productos.getProducts();

    if (limit) {
        const limitNumber = parseInt(limit);
        products = products.slice(0, limitNumber);
    }

    response.send(products);
});

app.get('/product/:pid', async (request, response) => {
    const pid = request.params.pid;
    const item = await Productos.getProductById(pid);

    if (item) {
        return response.send(item);
    }
    else {
        return response.send(` El producto con id: ${pid}  no existe`);
    }
})