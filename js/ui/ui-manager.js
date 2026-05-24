export class UIManager {
  constructor(gameState, hexGrid) {
    this.gameState = gameState;
    this.hexGrid = hexGrid;
    this.selectedCardIndex = null;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    window.addEventListener('hexCellSelected', (e) => {
      this.handleCellSelection(e.detail);
    });
  }
  
  showGameScreen() {
    document.getElementById('birth-selection').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
  }
  
  showEndScreen() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('end-screen').classList.add('active');
    this.renderEndScreen();
  }
  
  showBirthSelection() {
    document.getElementById('end-screen').classList.remove('active');
    document.getElementById('birth-selection').classList.add('active');
  }
  
  update() {
    this.updateStats();
    this.renderHand();
    
    if (this.gameState.isGameOver()) {
      this.showEndScreen();
    }
  }
  
  updateStats() {
    document.getElementById('vitality-value').textContent = 
      Math.floor(this.gameState.vitality);
    document.getElementById('capital-value').textContent = 
      Math.floor(this.gameState.capital);
    document.getElementById('fulfillment-value').textContent = 
      Math.floor(this.gameState.fulfillment);
    document.getElementById('seconds-value').textContent = 
      this.gameState.secondsRemaining;
  }
  
  renderHand() {
    const handEl = document.getElementById('hand');
    handEl.innerHTML = '';
    
    this.gameState.hand.forEach((card, index) => {
      const cardEl = this.createCardElement(card, index);
      handEl.appendChild(cardEl);
    });
  }
  
  createCardElement(card, index) {
    const div = document.createElement('div');
    div.className = `card ${card.quality || ''}`;
    if (index === this.selectedCardIndex) {
      div.classList.add('selected');
    }
    
    div.innerHTML = `
      <div class="card-cost">1</div>
      <div class="card-name">${card.name}</div>
      <div class="card-type">${card.type}</div>
      <div class="card-description">${card.description}</div>
    `;
    
    div.addEventListener('click', () => {
      this.selectedCardIndex = index;
      this.renderHand();
    });
    
    return div;
  }
  
  handleCellSelection(cell) {
    if (this.selectedCardIndex === null) return;
    
    const success = this.gameState.playCard(
      this.selectedCardIndex, 
      { q: cell.q, r: cell.r }
    );
    
    if (success) {
      this.hexGrid.fillCell(cell.q, cell.r, 
        this.gameState.hand[this.selectedCardIndex]);
      this.selectedCardIndex = null;
      this.update();
    }
  }
  
  renderEndScreen() {
    const stats = document.getElementById('end-stats');
    stats.innerHTML = `
      <div class="end-stat">
        <div class="end-stat-label">Vitality</div>
        <div class="end-stat-value">${Math.floor(this.gameState.vitality)}</div>
      </div>
      <div class="end-stat">
        <div class="end-stat-label">Capital</div>
        <div class="end-stat-value">${Math.floor(this.gameState.capital)}</div>
      </div>
      <div class="end-stat">
        <div class="end-stat-label">Fulfillment</div>
        <div class="end-stat-value">${Math.floor(this.gameState.fulfillment)}</div>
      </div>
    `;
    
    const score = this.gameState.calculateFinalScore();
    document.getElementById('legacy-score').textContent = 
      `Legacy Score: ${Math.floor(score)}`;
    
    document.getElementById('return-to-lobby').addEventListener('click', () => {
      this.gameState.reset();
      this.showBirthSelection();
      window.location.reload(); // Simple reload for now
    });
  }
}