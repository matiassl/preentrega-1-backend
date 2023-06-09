import { Router } from 'express';
import CartManager from '../controllers/CartManager.js';
import ProductManager from '../controllers/ProductManager.js';

const router = Router();

const Carrito = new CartManager('src/data/carts.json');
const Productos = new ProductManager('src/data/products.json');

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
  const { productos } = req.body
  Carrito.addCart({ productos });
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
    return response.send(` El Carrito con id: ${pid}  no existe`);
  }
})

//Añadir producto a un Carrito
router.post('/:cid/product/:pid', async (request, response) => {
  const cid = request.params.cid;
  const cart = await Carrito.getCartById(cid);
  if (cart) {
    const pid = request.params.pid;
    const producto = await Productos.getProductById(pid);
    if (producto) {
       Carrito.addProductToCart(cid, pid)
    }
    else {
      return response.json({ message: ` El producto con id: ${pid}  no existe` });
    }
    return response.send({ message: ` El producto con id: ${pid}  se agrego exitosamente`});
  }
  else {
    return response.send(` El Carrito con id: ${cid}  no existe`);
  }
})


export default router;