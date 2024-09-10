const express = require('express');
const fs = require('fs');
const dir = './public/';
const port = process.env.PORT | 3000;

const app = express ();

app.get('/', (req, res) =>{
    render(res, 'index.html');
})

app.get('/about', (req,res) =>{
    render(res, 'about.html');
})

app.get('/contact', (req,res) =>{
    render(res, 'contact.html');
})

app.listen(port, () =>{
    console.log(`http://localhost:${port}`);
})

const render = (res, file) => {//Buscamos y leemos la pag que queremos cargar
    fs.readFile(dir+file, (err, data) =>{//Damos la ruta y el nombre del archivo a cargar
        if(err){
            res.writeHead(404, {'Content-Type' : 'text/html'});//Si no se encuentra en ninguna de las rutas posibles enviamos como mensaje el error 404 que indica que no se encontro ningun archivo
            res.end('<h1>404 File Not Found</h1>')
        }
        res.writeHead(200,{'Content-Type':'text/html'});//Mensaje 200 indica exito
        return res.end(data);
    });
}