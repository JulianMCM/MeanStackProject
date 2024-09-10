const http = require('http')
const { hostname } = require('os')
const data = JSON.stringify({
    tittle : 'MEAN Stack'
})

const options = {
    hostname: 'localhost',
    port:3000,
    path: '/',
    method: 'POST', //PUT, DELETE, POST
    headers: {
        'Content-type' : 'application/json',
        'Content-Lenght' : data.length
    }
}

const request = http.request(options, response => {
    response.on('data', chunk => {
        process.stdout.write(chunk);
    })
})

request.on('error', error => {
    console.error(error);
})

request.end();