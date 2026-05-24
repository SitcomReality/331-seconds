import { CONSTANTS } from '../core/constants.js';
import { HexMath } from './hex-math.js';

export class HexGrid {
  constructor() {
    this.canvas = document.getElementById('hex-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.hexSize = 30;
    this.cells = [];
    this.selectedCell = null;
    this.hoveredCell = null;
    
    this.setupCanvas();
    this.setupEventListeners();
  }
  
  setupCanvas() {
    const updateSize = () => {
      const container = this.canvas.parentElement;
      const rect = container.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      this.render();
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
  }
  
  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.hoveredCell = this.getCellAtPoint(x, y);
      this.render();
    });
    
    this.canvas.addEventListener('click', (e) => {
      if (this.hoveredCell && !this.hoveredCell.filled) {
        this.selectedCell = this.hoveredCell;
        // Emit event for card placement
        window.dispatchEvent(new CustomEvent('hexCellSelected', {
          detail: this.selectedCell
        }));
      }
    });
  }
  
  initialize() {
    this.cells = HexMath.generateHexGrid(CONSTANTS.HEX_RINGS);
    this.render();
  }
  
  getCellAtPoint(x, y) {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    for (const cell of this.cells) {
      const pos = HexMath.hexToPixel(cell.q, cell.r, this.hexSize);
      const dx = x - (centerX + pos.x);
      const dy = y - (centerY + pos.y);
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < this.hexSize * 0.9) {
        return cell;
      }
    }
    
    return null;
  }
  
  fillCell(q, r, card) {
    const cell = this.cells.find(c => c.q === q && c.r === r);
    if (cell && !cell.filled) {
      cell.filled = true;
      cell.card = card;
      this.render();
      return true;
    }
    return false;
  }
  
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    for (const cell of this.cells) {
      const pos = HexMath.hexToPixel(cell.q, cell.r, this.hexSize);
      const x = centerX + pos.x;
      const y = centerY + pos.y;
      
      this.drawHex(x, y, cell);
    }
  }
  
  drawHex(x, y, cell) {
    const points = HexMath.getHexCorners(x, y, this.hexSize);
    
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    this.ctx.closePath();
    
    // Fill
    if (cell.filled) {
      this.ctx.fillStyle = this.getCardColor(cell.card);
    } else if (cell === this.hoveredCell) {
      this.ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
    } else {
      this.ctx.fillStyle = 'rgba(245, 245, 220, 0.15)';
    }
    this.ctx.fill();
    
    // Stroke
    this.ctx.strokeStyle = cell === this.hoveredCell ? 
      'rgba(255, 215, 0, 1)' : 
      'rgba(212, 184, 150, 0.5)';
    this.ctx.lineWidth = cell === this.hoveredCell ? 3 : 1.5;
    this.ctx.stroke();
  }
  
  getCardColor(card) {
    // Map card colors based on type/quality
    const hue = card.color || 40;
    return `hsla(${hue}, 60%, 60%, 0.6)`;
  }
}