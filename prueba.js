// Http
// se ejecuta con nodemon y el nombre del archivo.
//Comando: nodemon server.js

// const http = require('http')

// servidor
// const server = http.createServer((request, response) => {
//     response.end('hola') //agrega al final del archivo
// })

// server.listen('8080', ()=>{
//     console.log('Servidor activo')
// })


// npm i express
// En el package.json escribir abajo de su main => "type": "module", agregar para utilizar import

import express from 'express'; 

const app = express();

const puerto = 8080
//Crear una ruta
app.get('/saludo', (req, res)=>{ 
    res.send('hola mundo');
})

app.get('/', (req, res)=>{ 
    res.send('hola mundo');
})

//indicar puerto
app.listen('8080', ()=> { 
    console.log('servidor activo')
})

app.get('/bienvenida', (req, res)=>{
    res.send('<html><body style="color: blue"> Biencenidos!! </body></html>')
})

app.get('/usuario',((req, res) =>{
    const usuario = {
        nombre: 'Camila',
        apellido: 'Grosz',
        edad: 20,
        mail: "cgrosz89@gmail.com"
    }
    res.json(usuario)
}))

// app.listen(puerto, ()=>console.log('Servidor activo'))

//Se corre el comando nodemon server.js


// Por id
// const usuarios = [
//     {id:"1", nombre: "Camila", apellido: "Grosz", edad:20, genero: "F"},
//     {id:"2", nombre: "Tomas", apellido: "Gimenez", edad:19, genero: "M"}
// ]

// app.get('/', (req, res)=>{
//     res.send({usuarios})
// })

// app.get('/:userID', (req, res)=>{
//     let idUser = req.params.userID
//     let user = usuarios.find(u => u.id === idUser)
//     if(!user){
//         return res.send({error: "Usuario no encontrado"})
//     }
//     res.send({user})

// })

// app.get('/', (req, res)=>{
//     let genero = req.query.genero
//     if(!genero || (genero !== "F" && genero!== "M")){
//         return res.send({usuarios})
//     }
//     let usuariosFIltrados = usuarios.filter(usuario => usuario.genero === genero)
//     req.send({usuariosFIltrados})
// })

// app.listen('8080', ()=> { 
//     console.log('Servidor activo')
// })