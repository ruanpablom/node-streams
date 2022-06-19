import http from 'node:http'
import { Readable } from 'node:stream'
import { randomUUID } from 'node:crypto'

function* run(){
  for(let i = 0; i <= 99; i++){
    const data = {
      id: randomUUID(),
      name: `Ruan-${i}`,
      at: Date.now()
    }
    yield data
  }
}

function handler(request, response) {
  const readableStream = Readable({
    // read(){
    //   this.push('Hello')
    //   this.push('World')
    //   this.push(null)
    // }

    read() {
      for(const data of run()){
        this.push(JSON.stringify(data).concat("\n"))
      }
      // to finish the stream
      this.push(null)
    }
  })

  readableStream.pipe(response)
}

http.createServer(handler)
  .listen(3000, () => console.log('Server listening on 3000'))