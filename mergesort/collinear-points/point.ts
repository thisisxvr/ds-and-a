class Point {
  private x: number
  private y: number
  static scale = 41.25
  get xVal() { return this.x }
  get yVal() { return this.y }

  constructor(x: number, y: number) {
    // Throw an error if either argument falls outside the range 0 — 32767.
    if (!(x >= 0 && x <= 32767) || !(y >= 0 && y <= 32767)) { throw new RangeError() }
    this.x = x, this.y = y
  }

  /** Draws this point. */
  draw() {
    if (typeof (document) !== 'undefined') {
      const canvas = document.getElementById('collinear-graph') as HTMLCanvasElement
      const ctx    = canvas.getContext('2d')!
      const radius = 1

      const centerX = this.scaleX(this.x)
      const centerY = this.scaleY(this.y)

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
      ctx.fillStyle = 'blue'
      ctx.fill()
      ctx.lineWidth = 0.2
      ctx.strokeStyle = 'black'
      ctx.stroke()
    }
  }

  /** Draws the line segment from this point to that point. */
  drawTo(that: Point) {
    if (typeof (document) !== 'undefined') {
      const canvas = document.getElementById('collinear-graph') as HTMLCanvasElement
      const ctx    = canvas.getContext('2d')!

      const centerX = this.scaleX(this.x)
      const centerY = this.scaleY(this.y)
      const destX   = this.scaleX(that.x)
      const destY   = this.scaleY(that.y)

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(destX, destY)
      ctx.stroke()
    }
  }

  /** Returns the string representation of the point. */
  toString(): string { return `(${this.x}, ${this.y})` }

  /** Compare two points by y-coordinates, breaking ties by x-coordinates. */
  compareTo(that: Point): number {
    // This point is lower than that point.
    if (this.y < that.y || (this.y === that.y && this.x < that.x)) { return -1 }
    // This point is higher than that point.
    if (this.y > that.y || (this.y === that.y && this.x > that.x)) { return 1 }
    // The two points are even.
    // if (this.x === that.x && this.y === that.y) { return 0 }
    return 0
  }

  /** The slope between this point and that point. */
  slopeTo(that: Point): number {
    // Horizontal slope.
    if (this.y === that.y) { return 0 }

    if (this.x === that.x) {
      if (this.y === that.y) { return Number.NEGATIVE_INFINITY }  // Degenerate line segment.
      return Number.POSITIVE_INFINITY  // Vertical slope.
    }

    return (that.y - this.y) / (that.x - this.x)
  }

  /** Compare two points by slopes they make with this point. */
  slopeOrder(p: Point, q: Point) {
    const slopeToP = this.slopeTo(p)
    const slopeToQ = this.slopeTo(q)

    if (slopeToP < slopeToQ ) { return -1 }
    if (slopeToP > slopeToQ) { return 1 }
    return 0
  }

  /** Calculates the euclidean distance between this and that point. */
  // SqrRoot((q1 - p1)^2 + (q2 - p2)^2 + ... + (qN - pN)^2)
  public distanceTo(that: Point): number { return Math.sqrt((that.x - this.x) ** 2 + (that.y - this.y) ** 2) }

  /** Scales a given x value to fit on an 800 x 800 canvas. */
  private scaleX(x: number): number { return x / Point.scale }

  /** Scales a given x value to fit on an 800 x 800 canvas. */
  private scaleY(y: number): number { return 800 - (y / Point.scale) }
}