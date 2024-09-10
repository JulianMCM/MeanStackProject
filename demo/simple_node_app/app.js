//Creamos nuestra coneccion

const http = require('http');
const fs = require('fs');
const dir = './public/';
const port = process.env.PORT | 3000; //Usa un puerto libre, de lo contrario usara el puerto 3000

const server = http.createServer((req, res) =>{

    if(req.url === '/') {//Comprobamos si esta en la ruta raiz y cargamos la pag de inicio
        render(res, 'index.html');
    }else if (req.url === '/about'){
        render(res, 'about.html');
    }else if (req.url === '/contact'){
        render(res, 'contact.html');
    }else{
        res.writeHead(404, {'Content-Type' : 'text/html'});//Si no se encuentra en ninguna de las rutas posibles enviamos como mensaje el error 404 que indica que no se encontro ningun archivo
        res.end('<h1>404 File Not Found</h1>')
    }

}).listen(port, ()=>{ //Nos muestra en consola el numero del puerto que se esta usando
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