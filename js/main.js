import { GameState } from './core/game-state.js';
import { HexGrid } from './hex/hex-grid.js';
import { UIManager } from './ui/ui-manager.js';
import { BirthSelector } from './ui/birth-selector.js';

class Game {
  constructor() {
    this.state = new GameState();
    this.hexGrid = new HexGrid();
    this.ui = new UIManager(this.state, this.hexGrid);
    this.birthSelector = new BirthSelector(this.state);
    
    this.init();
  }
  
  init() {
    // Set up birth selector callback
    this.birthSelector.onBirthSelected = (birthData) => {
      this.startLife(birthData);
    };
    
    // Initialize birth selector
    this.birthSelector.generateBirths();
  }
  
  startLife(birthData) {
    this.state.initializeFromBirth(birthData);
    this.hexGrid.initialize();
    this.ui.showGameScreen();
    this.ui.update();
  }
}

// Start the game
const game = new Game();