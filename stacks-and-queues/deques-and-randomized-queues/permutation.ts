import * as fs from 'fs'
import * as path from 'path'
import * as createDebug from 'debug'
import RandomizedQueue from './randomized-queue'
let debug: createDebug.IDebugger

function init() {
  let files: string[]
  try { files = fs.readdirSync(path.resolve(__dirname, 'test-data')) }
    catch (err) { throw new Error(`Input files directory not found: ${err}`) }

  // Get all .txt files in test-data dir.
  const fileNames = []
  for (const file of files!) {
     if (path.extname(file) === ".txt") { fileNames.push(path.parse(file).name) }
  }

  for (const fileName of fileNames) {
    // Get file from disk.
    let fileContents: string
    try { fileContents = fs.readFileSync(path.resolve(__dirname, `test-data/${fileName}.txt`), 'utf-8') }
      catch (err) { throw new Error(`File read error: ${err}`) }

    debug = createDebug(`${fileName}: `)
    // Parse file contents and call permutation.
    const inputLines = fileContents!.trim().split('\n')
    for (const inputs of inputLines) {
      const data = inputs.split(' ')
      permutation(Math.round(Math.random() * data.length), data)
    }
  }
}

function permutation(k: number, inputs: string[]) {
  const rq = new RandomizedQueue<string>()

  for (const input of inputs) { rq.enqueue(input) }

  for (let i = 0; i < k; i++) {
    debug(rq.dequeue())
  }
}

init()