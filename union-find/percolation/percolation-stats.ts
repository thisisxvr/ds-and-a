import createDebug from 'debug'

class PercolationStats {
  debug = createDebug('Stats: ')
  private _openSites: number[]
  private _gridSize: number
  private _trials: number

  constructor(gridSize: number, trials: number) {
    if (gridSize < 1 || trials < 1) { throw new RangeError() }

    this._gridSize = gridSize
    this._trials   = trials
  }

  // Sample mean of percolation threshold
  mean(): number {
    // Let x = number of open sites
    // Let T = number of experiments
    // Sample mean x̅ = (x1 + x2 + ... + xT) / T
    const sum = this._openSites.reduce((sum, val) => sum + val , 0)
    return sum / this._trials
  }

  // Sample standard deviation of percolation threshold
  stddev(): number {
    // Let x = number of open sites
    // Let T = number of experiments
    // Sample standard deviation s = (x1 - x̅)^2 + (x2 - x̅)^2 + ... + (xT - x̅)^2 / T - 1
    const x̅ = this.mean()
    const s = this._openSites.reduce((_sum, val) => ((val - x̅) * (val - x̅)), 0)
    return s / (this._trials - 1)
  }

  // Low endpoint of 95% confidence interval
  confidenceLo(): number {
    const x̅ = this.mean()
    const s = this.stddev()
    return x̅ - ((1.96 * s) / Math.sqrt(this._trials))
  }

  // High endpoint of 95% confidence interval
  confidenceHi(): number {
    const x̅ = this.mean()
    const s = this.stddev()
    return x̅ + ((1.96 * s) / Math.sqrt(this._trials))
  }

  // Begin Monte Carlo simulation
  init(): void {
    let system: Percolation
    this._openSites = []

    // On each iteration:
    for (let i = 0; i < this._trials; i++) {
      // Initialize a new system
      system = new Percolation(this._gridSize)
      while (!system.percolates()) {
        // ...and open sites at random until system percolates
        const row    = this.getRandomIndex()
        const column = this.getRandomIndex()
        system.open(row, column)
      }
      // Log the number of open sites in system
      this._openSites.push(system.numberOfOpenSites())
    }
    // Calculate stats after trials are done
    this.debug(`mean                    = ${this.mean()}`)
    this.debug(`stddev                  = ${this.stddev()}`)
    this.debug(`95% confidence interval = [${this.confidenceLo()}, ${this.confidenceHi()}]`)
  }

  // Returns a random number between 1 and the size of grid, both inclusive
  private getRandomIndex(): number {
    return Math.floor(Math.random() * (this._gridSize - 1 + 1) + 1)
  }
}