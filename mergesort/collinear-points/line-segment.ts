
class LineSegment {
  private p: Point
  private q: Point

  /** Constructs the line segment between points p and q. */
  constructor(p: Point, q: Point) { this.p = p, this.q = q }

  /** Draws this line segment. */
  draw() { this.p.drawTo(this.q) }

  /** String representation of this line. */
  toString(): string { return `${this.p.toString()} -> ${this.q.toString()}` }
}