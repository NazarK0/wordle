import LocalStorageService, {validKeys} from './LocalStorageService';
import words from './words.js';

const DEFAULT_WORD_SIZE = 3;

class GameService {
  #wordSize  = DEFAULT_WORD_SIZE;
  #results = [];
  #quizWord = null;

  constructor(wordSize = DEFAULT_WORD_SIZE) {
    if (!LocalStorageService.get(validKeys.wordSize)) {
      LocalStorageService.set(validKeys.wordSize, wordSize);
      this.#wordSize = wordSize;
    } else {
      this.#wordSize = LocalStorageService.get(validKeys.wordSize);
    }


    if (!LocalStorageService.get(validKeys.results)) {
      LocalStorageService.set(validKeys.results, []);
    } else {
      this.#results = LocalStorageService.get(validKeys.results);
    }
    
    this.#initQuizWord();
    
  }

  #initQuizWord() {
    const validWords = Array.from(words)
      .filter((word) => word.length === this.#wordSize);

      const index = Math.round(Math.random() * validWords.length);

      this.#quizWord = validWords[index];
  }

  checkQuizWord(userWord) {
    if (this.#quizWord === userWord) {
      console.log('Match!');
      LocalStorageService.set(validKeys.results, this.#results.push({time: new Date().toISOString(), win: true }));
      // LocalStorageService.get(validKeys.results);
    }
  }
}

export default GameService;
