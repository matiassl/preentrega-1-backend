import express from "express";
import productRouter from './routers/products.router.js';
import cartRouter from './routers/cart.router.js'
const app = express();
app.use(express.json())

app.get('/',(request , response)=>{
    response.send('Hola Mundo');
})

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

app.listen(8080, ()=>console.log('Server up'));

//node ./src/app.js
//node --watch ./src/app.js


// { "title": "fof",
// "description": "fof",
// "code": "fof", 
// "price": "fof",
// "status": "true",
// "stock": "fof", 
// "category": "fof", 
// "thumbnail": "fof" }