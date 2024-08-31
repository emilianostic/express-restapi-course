const express = require('express')
const morgan = require('morgan')
const app = express()

let products = [
    {
        id: 1,
        name: "laptop",
        price: 3000
    }
]
app.use(morgan('dev'))

app.use(express.json())//middleware para que postee el json

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/products', (req, res) => {
    res.send('obteniendo productos')
})

app.post('/products/', (req, res) => {
   const newProduct = ({...req.body, id: products.length + 1})
   products.push(newProduct)
    res.send(newProduct)
})

app.put('/products/:id', (req, res) => {
    newData = req.body //{name; "asaas"}
    const productFound = products.find((products)=> products.id === parseInt(req.params.id)
)

if(!productFound) return res.status(404).json({
 message: "product not found"
})
   products = products.map(p => p.id === parseInt(req.params.id)? {...p, ...newData } : p)
 
    res.json({
        message: 'Producto actualizado'
    })
})

app.delete('/products/:id', (req, res) => {

    const productFound = products.find((product)=> product.id === parseInt(req.params.id)
)

if(!productFound) return res.status(404).json({
 message: "product not found"
})
products = products.filter((p)=> p.id !== parseInt(req.params.id))

res.sendStatus(204)


})
app.get('/products/:id', (req, res) => {
   const productFound = products.find((products)= products.id === parseInt(req.params.id)
   )

   if(!productFound) return res.status(404).json({
    message: "product not found"
   })
   res.json(productFound)
})

app.listen(3000)
console.log(`Server on port ${3000}`)
