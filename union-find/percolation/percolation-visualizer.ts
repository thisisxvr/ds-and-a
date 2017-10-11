import { Percolation } from './percolation'
import * as createDebug from 'debug'
import * as http from 'http'
import * as path from 'path'
import { URL } from 'url'
import * as fs from 'fs'

process.title = 'percolation-visualizer'
const debug = createDebug('Visualizer: ')
const port = 3000
let system: Percolation
let systemInputs: number[][]

const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) => {
  debug(`${request.url} requested`)

  // const { url, queryData } = URL.parse(request.url!, true)
  const requestedURL = new URL(request.url!, 'http://localhost:3000')
  const url = requestedURL.pathname
  // debug(`url: ${url}, query: ${query}`)

  switch (url) {
    case '/getinputs':
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(getInputFiles()))
      break
    case '/getgriddata':
      response.writeHead(200, {'Content-Type': 'application/json'})
      const input = requestedURL.searchParams.get('input')
      response.end(JSON.stringify(initSystem(input!)))
      break
    case '/opensite':
      response.writeHead(200, {'Content-Type': 'application/json'})
      const row = Number(requestedURL.searchParams.get('row'))
      const column = Number(requestedURL.searchParams.get('column'))
      response.end(JSON.stringify(openSite(row, column)))
      break
    case 'isfull':
      response.writeHead(200, { 'Content-Type': 'text/html' })
      const fullRow = Number(requestedURL.searchParams.get('row'))
      const fullColumn = Number(requestedURL.searchParams.get('column'))
      response.end(system.isFull(fullRow, fullColumn))
      break
    case 'percolates':
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end(system.percolates())
      break
    default:
      fs.readFile(path.resolve(__dirname, 'test/visualizer.html'), (err, data) => {
        if (err) {
          debug(`Visualizer.html not found: ${err}`)
          response.writeHead(404, 'Oops')
          response.end()
        }
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(data)
      })
      break
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err: Error) => {
  if (err) { return debug(`Shit happened: ${err}`) }
  debug(`Server listening on port: ${port}`)
})

function getInputFiles(): string[] {
  let files: string[]
  try { files = fs.readdirSync(path.resolve(__dirname, 'test-data')) }
    catch (err) { throw new Error(`Input files directory not found: ${err}`) }

  // Return all .txt files in dir
  const fileNames = []
  for (const file of files!) {
     if (path.extname(file) === ".txt") { fileNames.push(path.parse(file).name) }
  }
  return fileNames
}

function initSystem(fileName: string): number[][] {
  // Get file from disk
  let fileContents: string
  try { fileContents = fs.readFileSync(path.resolve(__dirname, `test-data/${fileName}.txt`), 'utf-8') }
    catch (err) { throw new Error(`File read error: ${err}`) }

  // Parse file contents and get grid size
  const input = fileContents!.trim().split('\n')
  const gridSize = Number(input[0])

  // Parse the rest of the lines for input, store in array
  systemInputs = []
  systemInputs.push([gridSize, 0])
  for (let i = 1; i < input.length; i++) {
    systemInputs.push(input[i].trim().split(' ').map((n) => Number(n)))
  }

  // Initialize a system and return grid size to the canvas
  system = new Percolation(gridSize)
  return systemInputs
}

function openSite(row: number, column: number) {
  system.open(row, column)
}

    // let opened = 0
    // for (let row = 1; row <= gridSize; row++) {
    //   for (let column = 0; column <= gridSize; column++) {
    //     if (system.isFull(row, column)) {
    //       // draw full
    //       opened++
    //     } else if (system.isOpen(row, column)) {
    //       // draw open
    //       opened++
    //     } else {
    //       // draw blank
    //     }
    //   }
    // }
