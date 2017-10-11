import PercolationStats from './percolation-stats'
// import debug from 'debug'

describe('Percolation stats for:', () => {
  let stats: PercolationStats

  // beforeEach(() => { stat = new PercolationStats() })

  it('100 trials on a gridsize of 200', () => {
    stats = new PercolationStats(5, 10)
    stats.init()
    // expect(stat = new PercolationStats(200, 100)).toEqual({_gridSize: 200, _trials: 100, debug: [Function debug]})
  })

})