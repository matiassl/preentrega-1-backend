import express, { response }  from "express";

const app = express();

app.get('/',(request , response)=>{
    response.send('Hola Mundo');
})

app.listen(8080, ()=>console.log('Server up'));