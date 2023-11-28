// @ts-nocheck
import { URLSearchParams } from "url"
import busboy from "busboy"

/**
 * @param {Request} request
 * @returns Promise<URLSearchParams>
 */
export async function getBody (request) {
  const headers = Object.fromEntries(request.headers)
  const header = headers['content-type']
  console.debug('getBody()', { type: typeof header, name: 'content-type', header })

  let data = ''
  if (request.body)
  for await (const chunk of request.body) {
    console.debug({chunk})
    data = chunk.toString()
    break;
  }
  console.debug({data})

  const files = {}
  const body = { data: {}, files: undefined}
  await new Promise((resolve, reject) => {
    const bb = busboy({
      headers: Object.fromEntries(request.headers),
    })
    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.debug( 'File [%s]: filename=%j; encoding=%j; mimetype=%j', fieldname, filename, encoding, mimetype )
      console.debug(file)
      const buffers = []
      files[fieldname] = { filename, encoding, mimetype }
      file
        .on('data', (fileData) => {
          console.debug('File [%s] got %d bytes', fieldname, fileData.length)
          buffers.push(fileData) //this adds files as buffers, which can be hard on memory. You can also write to a file using streams here.
        })
        .on('end', () => {
          console.debug('File [%s] Finished', fieldname)
          const buffer = Buffer.concat(buffers)
          files[fieldname]['file'] = buffer
        })
      })
      .on('field', (fieldname, val) => {
        console.debug(`busboy[${fieldname}]: "${val}"`)
        body.data[fieldname] = val
      })
      .on('finish', () => {
        console.debug('Done parsing form!')
        body['files'] = files
        resolve(body)
      })
      .on('error', (err) => {
        console.debug('failed', err)
        reject(err)
      })
    bb.end(data)
  })

  const map = new URLSearchParams(body.data)
  console.debug('Giving Body', map)

  return map
}
