import express from "express";
import userRouter from './routers/user.router.js'
import productRouter from './api/products/products.js'
const app = express();
app.use(express.json())

app.get('/',(request , response)=>{
    response.send('Hola Mundo');
})

app.use('/', petRouter)

app.listen(8080, ()=>console.log('Server up'));