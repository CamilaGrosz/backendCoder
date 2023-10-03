import productManager from '/productManager'
import express from 'express'

const app = express()
const port = 8080;

const products = productManager.getProducts();

app.use(express.json());

app.get('/products', (req, res) => {
    try {
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/', (req, res)=>{
    let limit = req.query.limit
    if(!limit || limit < 0 ){
        return res.send({products})
    }
    products.forEach(e => {
        if(e <= limit){
            res.send(e)
        }
    });
})

app.get('/products/:id', (req, res)=>{
    let id = req.params.id
    let product = productManager.getProductById(id)
    if(!product){
        return res.send({products})
    }
    res.send({product})

})

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});