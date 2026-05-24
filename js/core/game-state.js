import { CONSTANTS } from './constants.js';

export class GameState {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.secondsRemaining = CONSTANTS.TOTAL_SECONDS;
    this.vitality = 100;
    this.capital = 50;
    this.fulfillment = 50;
    this.deck = [];
    this.hand = [];
    this.placedTiles = [];
    this.birthData = null;
  }
  
  initializeFromBirth(birthData) {
    this.birthData = birthData;
    this.vitality = birthData.initialVitality;
    this.capital = birthData.initialCapital;
    this.fulfillment = birthData.initialFulfillment;
    this.deck = [...birthData.starterDeck];
    this.shuffleDeck();
    this.drawHand();
  }
  
  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
  
  drawHand() {
    const handSize = Math.min(CONSTANTS.HAND_SIZE, this.deck.length);
    this.hand = this.deck.splice(0, handSize);
  }
  
  playCard(cardIndex, hexCoords) {
    if (cardIndex < 0 || cardIndex >= this.hand.length) return false;
    if (this.secondsRemaining <= 0) return false;
    
    const card = this.hand[cardIndex];
    
    // Place tile on grid
    this.placedTiles.push({
      coords: hexCoords,
      card: card
    });
    
    // Apply card effects
    this.applyCardEffects(card);
    
    // Remove card from hand
    this.hand.splice(cardIndex, 1);
    
    // Decrement seconds
    this.secondsRemaining--;
    
    // Draw new card if deck has cards
    if (this.deck.length > 0) {
      this.hand.push(this.deck.shift());
    }
    
    return true;
  }
  
  applyCardEffects(card) {
    this.vitality += card.effects.vitality || 0;
    this.capital += card.effects.capital || 0;
    this.fulfillment += card.effects.fulfillment || 0;
    
    // Clamp values
    this.vitality = Math.max(0, this.vitality);
    this.capital = Math.max(0, this.capital);
    this.fulfillment = Math.max(0, this.fulfillment);
  }
  
  calculateFinalScore() {
    return (this.vitality + this.capital) + (this.fulfillment * 2);
  }
  
  isGameOver() {
    return this.secondsRemaining <= 0 || this.vitality <= 0;
  }
}