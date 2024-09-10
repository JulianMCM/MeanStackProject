//require, exports, module, _dirname, _filename

// console.log(__dirname) muestra el nombre y ruta del directorio
// console.log(__filename) muestra el nombre y ruta del archivo
// console.log(module) muestra informacion del modulo actual

let names = ['Jill','Lynn','Mike']
let scores = [100,90,89]

exports.names = names //Exportar data a otros lados, se utiliza el .nombre para exportas varios a la vez
module.exports.scores = scores
exports.data = [1,2,3]

//console.log(exports) //muestra si el modulo actual se esta utilizando en algun otro lugar, se esta exportando en otro modulo