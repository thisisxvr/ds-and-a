/// <reference path="brute-collinear-points.ts" />
/// <reference path="point.ts" />

// const debug: createDebug.IDebugger = createDebug('Client: ')

function init(fileContents: string) {
  // Parse file contents and get input count.
  const inputs = fileContents!.trim().split('\n')
  const _ = Number(inputs.shift())
  const points: Point[] = []

  // Parse the rest of the lines for input, store in array.
  for (const pointCoordinates of inputs) {
    const [x, y] = pointCoordinates.split(' ')
    points.push(new Point(Number(x), Number(y)))
  }

  for (const point of points) { point.draw() }

  const bcp = new BruteCollinearPoints(points)
  const segments = bcp.segments()

  for (const segment of segments) {
    // tslint:disable-next-line:no-console
    console.log(segment.toString())
    segment.draw()
  }
}