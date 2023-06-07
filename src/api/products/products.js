import { Router } from 'express'
import ProductManager from '../../ProductManager';
const router = Router()

const Productos = new ProductManager('./products.json');


//Mostrar Productos 
router.get('/', async (request, response) => {
    const { limit } = request.query;

    let products = await Productos.getProducts();

    if (limit) {
        const limitNumber = parseInt(limit);
        products = products.slice(0, limitNumber);
    }

    response.send(products);
});

// Mostrar 1 porducto por ID
router.get('/product/:pid', async (request, response) => {
    const pid = request.params.pid;
    const item = await Productos.getProductById(pid);

    if (item) {
        return response.send(item);
    }
    else {
        return response.send(` El producto con id: ${pid}  no existe`);
    }
})

//Insertar 1 producto
router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail} = req.body
    Productos.addProduct({ title, description, code, price, status, stock, category, thumbnail});
    res.json({ message: 'Producto insertado!' })
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
