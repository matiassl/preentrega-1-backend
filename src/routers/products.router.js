import { Router } from 'express'
import ProductManager from '../ProductManager.js'
const router = Router()

const Productos = new ProductManager('../data/products.json');


//Mostrar Productos 
router.get('/', async (request, response) => {
    const { limit } = request.query;

    let products = await Productos.getProducts();
    if (products) {
        if (limit) {
            const limitNumber = parseInt(limit);
            products = products.slice(0, limitNumber);
        }
        //return response.send(products);
        return response.json(products)
    }
    else{
        return response.send(` No hay productos cargados`);
    }

});

// Mostrar 1 porducto por ID
router.get('/:pid', async (request, response) => {
    const pid = request.params.pid;
    const item = await Productos.getProductById(pid);

    if (item) {
        return response.send(item);
    }
    else {
        return response.json({ message: ` El producto con id: ${pid}  no existe`});
    }
})

//Insertar 1 producto
router.post('/', (request, response) => {
    const { title, description, code, price, status, stock, category, thumbnail } = request.body
    if (!title || !description || !code || !price || !stock || !category) {
        return response.json({ error: "Todos los campos son obligatorios" });
      }
    Productos.addProduct({ title, description, code, price, status, stock, category, thumbnail });
    response.json({ message: 'Producto insertado!' })
})

//Actualizar 1 producto
router.put('/:id', (req, res) => {
    const id = req.params.id
    const data = req.body
    Productos.updateProduct(id, data);

    res.json({ message: 'Producto actualizado' })
})

//Eliminar 1 producto
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Productos.delete(id);
    res.json({ message: `Producto eliminado` })
})

export default router;
