import GameService from './services/GameService.js';

const playgroundElement = document.getElementById('playground');
const keyboardElement = document.getElementById('keyboard');

const game = new GameService();

playgroundElement.innerHTML = game.createQuizMatrix();
keyboardElement.innerHTML = game.createKeyboard();


