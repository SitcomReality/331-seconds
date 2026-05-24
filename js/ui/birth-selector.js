import { CONSTANTS } from '../core/constants.js';
import { DeckBuilder } from '../cards/deck-builder.js';

export class BirthSelector {
  constructor(gameState) {
    this.gameState = gameState;
    this.births = [];
    this.onBirthSelected = null;
  }
  
  generateBirths() {
    this.births = [];
    
    for (let i = 0; i < 5; i++) {
      this.births.push(this.generateBirth());
    }
    
    this.render();
  }
  
  generateBirth() {
    // Random entity characteristics
    const color = CONSTANTS.ENTITY_COLORS[
      Math.floor(Math.random() * CONSTANTS.ENTITY_COLORS.length)
    ];
    const form = CONSTANTS.ENTITY_FORMS[
      Math.floor(Math.random() * CONSTANTS.ENTITY_FORMS.length)
    ];
    
    // Random initial stats (representing lottery)
    const capitalBase = Math.random();
    const initialCapital = capitalBase < 0.2 ? 
      20 + Math.random() * 20 :  // Poor
      capitalBase < 0.7 ?
      40 + Math.random() * 30 :  // Middle
      70 + Math.random() * 30;   // Wealthy
    
    const initialVitality = 80 + Math.random() * 40;
    const initialFulfillment = 30 + Math.random() * 40;
    
    const birthData = {
      id: `birth-${Date.now()}-${Math.random()}`,
      color,
      form,
      initialCapital: Math.floor(initialCapital),
      initialVitality: Math.floor(initialVitality),
      initialFulfillment: Math.floor(initialFulfillment),
      traits: this.generateTraits(color, form, initialCapital)
    };
    
    birthData.starterDeck = DeckBuilder.buildStarterDeck(birthData);
    
    return birthData;
  }
  
  generateTraits(color, form, capital) {
    const traits = [color, form];
    
    if (capital > 70) traits.push('privileged');
    if (capital < 30) traits.push('disadvantaged');
    
    return traits;
  }
  
  render() {
    const listEl = document.getElementById('births-list');
    listEl.innerHTML = '';
    
    this.births.forEach(birth => {
      const birthEl = this.createBirthElement(birth);
      listEl.appendChild(birthEl);
    });
  }
  
  createBirthElement(birth) {
    const div = document.createElement('div');
    div.className = 'birth-option';
    
    div.innerHTML = `
      <div class="birth-id">#${birth.id.slice(-8)}</div>
      <div class="birth-parents">${birth.color} ${birth.form} entity</div>
      <div class="birth-stats">
        <div class="birth-stat">
          <span class="birth-stat-label">Vitality</span>
          <span class="birth-stat-value">${birth.initialVitality}</span>
        </div>
        <div class="birth-stat">
          <span class="birth-stat-label">Capital</span>
          <span class="birth-stat-value">${birth.initialCapital}</span>
        </div>
        <div class="birth-stat">
          <span class="birth-stat-label">Fulfillment</span>
          <span class="birth-stat-value">${birth.initialFulfillment}</span>
        </div>
      </div>
      <div class="birth-traits">
        ${birth.traits.map(t => `<span class="trait-badge">${t}</span>`).join('')}
      </div>
    `;
    
    div.addEventListener('click', () => {
      if (this.onBirthSelected) {
        this.onBirthSelected(birth);
      }
    });
    
    return div;
  }
}