import express from "express";


const app = express();
app.use(express.json())

app.get('/',(request , response)=>{
    response.send('Hola Mundo');
})



app.listen(8080, ()=>console.log('Server up'));