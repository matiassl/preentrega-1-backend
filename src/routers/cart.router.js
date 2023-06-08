import { Router } from 'express';
import CartManager from '../controllers/CartManager.js';

const router = Router();

const Carrito = new CartManager('src/data/carts.json');


//Mostrar Carritos
router.get('/', async (request, response) => {
    const { limit } = request.query;
  
    let carritos = await Carrito.getCarts();
    if (carritos) {
      if (limit) {
        const limitNumber = parseInt(limit);
        carritos = carritos.slice(0, limitNumber);
      }
      return response.json(carritos);
    } else {
      return response.send(`No hay carritos cargados`);
    }
  });
  
//Carrito nuevo
router.post('/', (req, res) => {
  const {productos} = req.body
  Carrito.addCart({productos});
  res.json({ message: 'Producto insertado!' })
})
  

// Mostrar 1 carrito por ID
router.get('/:pid', async (request, response) => {
    const pid = request.params.pid;
    const item = await Carrito.getCartById(pid);

    if (item) {
        return response.send(item);
    }
    else {
        return response.send(` El producto con id: ${pid}  no existe`);
    }
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