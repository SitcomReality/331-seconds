import { CARD_DEFINITIONS } from './card-definitions.js';

export class DeckBuilder {
  static buildStarterDeck(birthData) {
    const deck = [];
    
    // Add cards based on capital tier
    if (birthData.initialCapital >= 80) {
      // Wealthy
      deck.push(
        CARD_DEFINITIONS.trustFund,
        CARD_DEFINITIONS.trustFund,
        CARD_DEFINITIONS.legacy,
        CARD_DEFINITIONS.education,
        CARD_DEFINITIONS.rest
      );
    } else if (birthData.initialCapital >= 40) {
      // Middle
      deck.push(
        CARD_DEFINITIONS.education,
        CARD_DEFINITIONS.education,
        CARD_DEFINITIONS.rest,
        CARD_DEFINITIONS.struggle,
        CARD_DEFINITIONS.rest
      );
    } else {
      // Poor
      deck.push(
        CARD_DEFINITIONS.debt,
        CARD_DEFINITIONS.struggle,
        CARD_DEFINITIONS.struggle,
        CARD_DEFINITIONS.rest,
        CARD_DEFINITIONS.struggle
      );
    }
    
    return deck;
  }
}