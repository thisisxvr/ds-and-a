class WeightedQuickUnionPathCompressed {
    get id() { return this._id; }
    get sz() { return this._sz; }
    constructor(size) {
        this._id = new Array(size);
        this._sz = new Array(size);
        for (let i = 0; i < size; i++) {
            this._id[i] = i;
            this._sz[i] = 1;
        }
    }
    union(p, q) {
        const pRoot = this.root(p);
        const qRoot = this.root(q);
        if (pRoot === qRoot) {
            return;
        }
        if (this._sz[pRoot] < this._sz[qRoot]) {
            this._id[pRoot] = qRoot;
            this._sz[qRoot] += this._sz[pRoot];
        }
        else {
            this._id[qRoot] = pRoot;
            this._sz[pRoot] += this._sz[qRoot];
        }
    }
    connected(p, q) {
        return this.root(p) === this.root(q);
    }
    // One-pass variant of path compression:
    // Make every other node in path point to its grandparent (thereby halving path length)
    root(i) {
        while (i !== this._id[i]) {
            this._id[i] = this._id[this._id[i]];
            i = this._id[i];
        }
        return i;
    }
}
/// <reference path="../weighted-quick-union-path-compressed.ts" />
class Percolation {
    get grid() { return this._grid; }
    get sites() { return this._sites; }
    get gridSize() { return this._gridSize; }
    // Creates an n-by-n grid, with all sites blocked
    constructor(n) {
        if (n <= 0) {
            throw new RangeError('A Percolation system must be sized to a positive integer.');
        }
        let name = 0;
        this._grid = [];
        while (name < (Math.pow(n, 2))) {
            for (let i = 0; i < n; i++) {
                const row = [];
                for (let j = 0; j < n; j++) {
                    row[j] = { index: name, isOpen: false };
                    name++;
                }
                this._grid[i] = row;
            }
        }
        // Intialize the algorithm with N^2 objects plus two for the virtual sites
        this._sites = new WeightedQuickUnionPathCompressed((Math.pow(n, 2)) + 2);
        // Arbitrarily set virtual top site to be the last element
        // and virtual bottom to be second to last
        this._virtualTop = this._sites.id.length - 1;
        this._virtualBtm = this._sites.id.length - 2;
        // Connect virtual top site to the top row and virtual bottom site to bottom row
        const topRow = this._grid[0];
        for (let i = 0; i < n; i++) {
            this._sites.union(this._virtualTop, topRow[i].index);
        }
        const btmRow = this._grid[n - 1];
        for (let i = 0; i < n; i++) {
            this._sites.union(this._virtualBtm, btmRow[i].index);
        }
        this._gridSize = n;
    }
    // Open site if not already open
    open(row, column) {
        this.safetyCheck(row, column);
        const site = this._grid[row - 1][column - 1];
        if (site.isOpen) {
            return;
        }
        site.isOpen = true;
        this.meetTheNeighbours(row, column);
    }
    // Is site open?
    isOpen(row, column) {
        this.safetyCheck(row, column);
        const site = this._grid[--row][--column];
        return site.isOpen;
    }
    // Is site full?
    isFull(row, column) {
        this.safetyCheck(row, column);
        const site = this._grid[--row][--column];
        if (!site.isOpen) {
            return false;
        }
        if (this._sites.connected(site.index, this._virtualTop)) {
            return true;
        }
        return false;
    }
    // Returns the number of open sites
    numberOfOpenSites() {
        let count = 0;
        for (let i = 0; i < this._gridSize; i++) {
            for (let j = 0; j < this._gridSize; j++) {
                if (this._grid[i][j].isOpen) {
                    count++;
                }
            }
        }
        return count;
    }
    // Does the system percolate?
    percolates() {
        return this._sites.connected(this._virtualTop, this._virtualBtm);
    }
    // TODO: make async
    // Connect a site to it's open neighbours
    meetTheNeighbours(row, column) {
        const siteRow = row - 1;
        const siteColumn = column - 1;
        const site = this._grid[siteRow][siteColumn];
        // Get neighbours - if any, and connect them
        if (row > 1) {
            const topSite = this._grid[siteRow - 1][siteColumn];
            if (topSite.isOpen) {
                this._sites.union(site.index, topSite.index);
            }
        }
        if (row < this._gridSize) {
            const bottomSite = this._grid[siteRow + 1][siteColumn];
            if (bottomSite.isOpen) {
                this._sites.union(site.index, bottomSite.index);
            }
        }
        if (column > 1) {
            const leftSite = this._grid[siteRow][siteColumn - 1];
            if (leftSite.isOpen) {
                this._sites.union(site.index, leftSite.index);
            }
        }
        if (column < this._gridSize) {
            const rightSite = this._grid[siteRow][siteColumn + 1];
            if (rightSite.isOpen) {
                this._sites.union(site.index, rightSite.index);
            }
        }
    }
    safetyCheck(row, column) {
        if (row < 1 || row > this._gridSize || column < 1 || column > this._gridSize) {
            throw new RangeError(`Row and column indices must be between 1 and ${this._gridSize}`);
        }
    }
}
