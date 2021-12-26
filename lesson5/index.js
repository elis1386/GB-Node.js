const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const cluster = require('cluster')
const os = require('os')

if(cluster.isMaster) {
    console.log(`Master ${process .pid} is running`)
    for(let i = 0; i < os.cpus().length; i++){
        console.log(`Forking process number ${i}`)
        cluster.fork()
    }
}else {
    console.log(`Worker ${process.pid} is running...`)
    const indexPath = path.join(__dirname, 'index.js')
    const readStream = fs.createReadStream(indexPath)
    const server = http.createServer(((request, response) => {
        setTimeout(() => {
            console.log(`Worker ${process.pid} handing request`)
            response.writeHead(200,'OK', {
                'Content-Type': 'text/html',
            })
            readStream.pipe(response)
        },5000)
    }))
server.listen(5555)

}



// const server = http.createServer((request, response) => {

// response.end('Hello from Node.js')
// console.log('url:', request.url)
// console.log('method:', request.method)
// console.log('headers:', request.headers)

// response.setHeader('someHeader', 'someValue')
// response.writeHead(200,'OK!', {
//     'test-head': 'rest-value',
// })
// response.end()

//URL in plural better use 'swith'
//     if(request.url === '/user'){
//         response.write('User found')
//         response.end()
//     }else{
//         response.writeHead(404,'Page not found')
//         response.write('Page not found')
//         response.end()
//     }
// })

//Method
// if(request.method === 'GET'){
//     response.write('Hello!')
//     response.end()
// }else {
//     response.writeHead(405,'Not Allowed')
//     response.write('Method not alowed!')
//     response.end()
// }

// if(request.method === 'POST'){
//     let url = 'http://localhost:5555/user'
//     request.on(url, chunk => data += chunk)
//     request.on('end', () =>{
//         console.log(data)
//         response.end()
//     })
// }

// const {query} = url.parse(request.url, true)
// console.log(query)
// response.end()
    
// if(request.method === 'GET'){
//     response.writeHead(200,'OK!', {
//         'Content-Type': 'text/js',
//     })
// }
// readStream.pipe(response)
// })

// server.listen(5555)