import PercolationVisualizer from './percolation-visualizer'

xdescribe('A Percolation can be visualized...', () => {
  let vis: PercolationVisualizer

  beforeEach(() => { vis = new PercolationVisualizer() })

  it('draws', () => {
    vis.draw()
  })

})