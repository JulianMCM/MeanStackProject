
let fs = require('fs')
let total = 0

//I/O Cycle
fs.readFile('.index.js', () => { //Se asegura que la funcion que esta en "setImmediate" siempre se ejecute primero
    setTimeout(print1, 0) //Es una funcion asincrona que permite cargar el resto del codigo para que de tiempo a establecer las variables necesarias, en este caso "n"
    setImmediate(print2) //Prioriza una funcion, en este caso "print2"
})

let n = 1

function print1() {
    total = n * 10;
    console.log("Total 1: ", total)
    n++;
}

function print2() {
    total = n * 10;
    console.log("Total 2: ", total)
}