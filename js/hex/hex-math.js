export class HexMath {
  static generateHexGrid(rings) {
    const cells = [];
    
    // Add center cell
    cells.push({ q: 0, r: 0, filled: false, card: null });
    
    // Add rings
    for (let ring = 1; ring <= rings; ring++) {
      const ringCells = this.getRingCells(ring);
      cells.push(...ringCells);
    }
    
    return cells;
  }
  
  static getRingCells(ring) {
    const cells = [];
    
    // Start at top and go clockwise
    let q = 0;
    let r = -ring;
    
    const directions = [
      { q: 1, r: 0 },   // SE
      { q: 0, r: 1 },   // S
      { q: -1, r: 1 },  // SW
      { q: -1, r: 0 },  // NW
      { q: 0, r: -1 },  // N
      { q: 1, r: -1 }   // NE
    ];
    
    for (const dir of directions) {
      for (let i = 0; i < ring; i++) {
        cells.push({ q, r, filled: false, card: null });
        q += dir.q;
        r += dir.r;
      }
    }
    
    return cells;
  }
  
  static hexToPixel(q, r, size) {
    const x = size * (3/2 * q);
    const y = size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
    return { x, y };
  }
  
  static getHexCorners(x, y, size) {
    const corners = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      corners.push({
        x: x + size * Math.cos(angle),
        y: y + size * Math.sin(angle)
      });
    }
    return corners;
  }
}