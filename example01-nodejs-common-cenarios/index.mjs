// 1 - teminal inputs

// const stdin = process.stdin

// const stdout = process.stdout.on('data', msg => process.stdout.write(msg.toString().toUpperCase()))

// stdin.pipe(stdout)

// 2
//  node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

import http from 'http'
import { createReadStream } from 'fs'

http.createServer((request, response) => {
  createReadStream('big.file')
    .pipe(response)
}).listen(3000, () => console.log("Server listening at 3000"))