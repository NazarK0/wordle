import LocalStorageService, {validKeys} from './LocalStorageService.js';
import words from '../words.js';

const DEFAULT_WORD_SIZE = 3;
const languages = {
  ua: 'Українська',
  en: 'Англійська',
};

class GameService {
  _wordSize  = DEFAULT_WORD_SIZE;
  _results = [];
  _quizWord = null;
  _userWords = [];

  constructor(wordSize = DEFAULT_WORD_SIZE) {
    if (!LocalStorageService.get(validKeys.wordSize)) {
      LocalStorageService.set(validKeys.wordSize, wordSize);
      this._wordSize = wordSize;
    } else {
      this._wordSize = LocalStorageService.get(validKeys.wordSize);
    }


    if (!LocalStorageService.get(validKeys.results)) {
      LocalStorageService.set(validKeys.results, []);
    } else {
      this._results = LocalStorageService.get(validKeys.results);
    }
    
    this.initQuizWord();
    
  }

  get wordSize() { return this._wordSize; }

  _quizRow(userWord = null) {
    let row = '';

    // console.log(userWord);
    if (userWord == null) {
      // console.log(userWord, 'inside');
      for (let letter = 0; letter < this._wordSize; letter++) {
        row += '<div class="letter"></div>\n';
      }
    } else {
      for (let letter = 0; letter < this._wordSize; letter++) {
        row += `<div class="letter">${userWord[letter]}</div>\n`;
      }
    }
    
    return `<div class="matrix-row">${row}</div>`;
  }

  initQuizWord() {
    const validWords = Array.from(words)
      .filter((word) => word.length === this._wordSize);

      const index = Math.round(Math.random() * validWords.length);

      this._quizWord = validWords[index];
  }

  checkQuizWord(userWord) {
    this._userWords.push(userWord);

    if (this._quizWord === userWord) {
      console.log('Match!');
      LocalStorageService.set(validKeys.results, this._results.push({time: new Date().toISOString(), win: true }));
      // LocalStorageService.get(validKeys.results);
    }
  }

  createQuizMatrix() {
    const elementRows = [];

    for (let row = 0; row < this._wordSize; row++) {
      if (row < this._userWords.length) {
        elementRows.push(this._quizRow(this._userWords[row]));
      } else {
        elementRows.push(this._quizRow());
      }
    }
    return elementRows.join('\n');
  }

  _keyboardParser(template) {
    let keyboardRows = [];

    for (let row = 0; row < template.length; row++) {
      const mappedRow = template[row].map((key) => {
        if (key.startsWith('$')) {
          const name = key.substr(1);

          return (
            `<div class="key ctrl ${name}">
              ${name}
            </div>`
          );
        } else {
          return (
            `<div class="key letter">
              ${key}
            </div>`);
        }
      }).join('\n');

      keyboardRows.push(`<div class="keys-row">${mappedRow}</div>`);
    }

    return keyboardRows.join('\n');
  }

  createKeyboard(language = languages.ua) {
    const keysTemplateEn= [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '$backspace'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '$enter'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];
    const keysTemplateUa= [
      ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї', 'ґ', '$backspace'],
      ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', '$enter'],
      ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
    ];

    switch (language) {
      case languages.ua:
        return this._keyboardParser(keysTemplateUa);
      case languages.en:
        return this._keyboardParser(keysTemplateEn);
      default:
        return;
    }
  }
}

export default GameService;
