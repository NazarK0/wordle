import GameService from './services/GameService.js';

const game = new GameService('#playground', '#keyboard');

game.createQuizMatrix();
game.createKeyboard();


