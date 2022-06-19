import { get } from 'node:http'
import { Transform, Writable } from 'node:stream'
import { createWriteStream } from 'fs'

const url = 'http://localhost:3000'

const getHttpStream = () => new Promise(resolve => get(url, (response) => resolve(response)))

const stream = await getHttpStream()

stream
  .pipe(
    Transform({
      objectMode:true,
      transform(chunk, enc, cb) {
        const item = JSON.parse(chunk)
        const number = /\d+/.exec(item.name)
        const isEven = number % 2 === 0
        item.name = item.name.concat(isEven ? ' is even' : ' is odd')

        // console.log(item)
        cb(null, JSON.stringify(item))
      }
    })
  )
  .filter(chunk => chunk.includes('even'))
  .map(chunk => chunk.concat(',\n'))
  // .pipe(
  //   Writable({
  //     objectMode: true,
  //     write(chunk, enc, cb){
  //       console.log('chuck', chunk)
  //       cb(null, chunk)
  //     }
  //   })
  // )
  .pipe(createWriteStream('output', { flags: 'a'}))