import LocalStorageService, {validKeys} from './LocalStorageService.js';
import words from '../words.js';
import helpRender from '../helpRender.js';

const MESSAGE_DURATION = 3000;
const DEFAULT_WORD_SIZE = 3;
const DEFAULT_MAX_TRIES = 5;

const languages = {
  ua: 'Українська',
  en: 'Англійська',
};

class GameService {
  _wordSize  = DEFAULT_WORD_SIZE;
  _maxTries  = DEFAULT_MAX_TRIES;
  _results = [];
  _quizWord = null;
  _userWords = [];
  _matrixContainerSelector = null;
  _keyboardContainerSelector = null;
  _currentWordIndex = 0;
  _gameOver = false;

  constructor(matrixContainerSelector,keyboardContainerSelector, wordSize = DEFAULT_WORD_SIZE, maxTries = DEFAULT_MAX_TRIES) {
    this._keyboardContainerSelector = keyboardContainerSelector;
    this._matrixContainerSelector = matrixContainerSelector;
    const helpModal = document.getElementById('modal-content');
    const helpWindow = document.getElementById('help-content');

    if (!LocalStorageService.get(validKeys.maxTries)) {
      LocalStorageService.set(validKeys.maxTries, maxTries);
      this._maxTries = maxTries;
    } else {
      this._maxTries = LocalStorageService.get(validKeys.maxTries);
    }

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

    if (LocalStorageService.get(validKeys.darkTheme) == null) {
      LocalStorageService.set(validKeys.darkTheme, false);
    }
    
    this.initQuizWord();
    helpModal.innerHTML = helpRender(this._maxTries, this._wordSize);
    helpWindow.innerHTML = helpRender(this._maxTries, this._wordSize);
  }

  get wordSize() { return this._wordSize; }

  

  initQuizWord() {
    const validWords = Array.from(words)
      .filter((word) => word.length === this._wordSize);

      const index = Math.round(Math.random() * validWords.length - 1);

      this._quizWord = validWords[index];
  }

  createQuizMatrix() {
    const elementRows = [];
    const playgroundElement = document.querySelector(this._matrixContainerSelector);

    for (let row = 0; row < this._maxTries; row++) {
      if (row < this._userWords.length) {
        if(this._currentWordIndex > 0 && row < this._currentWordIndex) {
          elementRows.push(this._quizRow(this._userWords[row], true));
        } else {
          elementRows.push(this._quizRow(this._userWords[row]));
        }
      } else {
        elementRows.push(this._quizRow());
      }
    }
    playgroundElement.innerHTML = elementRows.join('\n');
  }

  createKeyboard(language = languages.ua) {
    const keyboardElement = document.querySelector(this._keyboardContainerSelector);

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
        keyboardElement.innerHTML =  this._keyboardParser(keysTemplateUa);
        break;
      case languages.en:
        keyboardElement.innerHTML =  this._keyboardParser(keysTemplateEn);
        break;
      default:
        return;
    }

    Array.from(document.querySelectorAll('.key.letter'))
      .forEach((key) => key.addEventListener('click', this._onLetterKeyClickHandler ));
    Array.from(document.querySelectorAll('.key.ctrl'))
      .forEach((key) => key.addEventListener('click', this._onCtrlKeyClickHandler ));
  }

  _quizRow(userWord = null, compareToQuizWord = false) {
    let row = '';

    if (userWord == null) {
      for (let letter = 0; letter < this._wordSize; letter++) {
        row += '<div class="letter"></div>\n';
      }
    } else if (compareToQuizWord) {
      for (let letter = 0; letter < this._wordSize; letter++) {
        if (userWord[letter] == this._quizWord[letter]) {
          row += `<div class="letter right-place">${userWord[letter]}</div>\n`;
        } else if (this._quizWord.includes(userWord[letter])) {
          row += `<div class="letter wrong-place">${userWord[letter]}</div>\n`;
        } else {
          row += `<div class="letter not-in-word">${userWord[letter]}</div>\n`;
        }
      }
    } else {
      for (let letter = 0; letter < this._wordSize; letter++) {
        if (userWord[letter] == null) {
          row += `<div class="letter"></div>\n`;
        } else {
          row += `<div class="letter filled">${userWord[letter]}</div>\n`;
        }
      }
    }
    
    return `<div class="matrix-row">${row}</div>`;
  }

  _onCtrlKeyClickHandler = (event) =>{
    const isGameNotAllowed = this._results
      .filter((res) => new Date(res.time).toLocaleDateString() === new Date().toLocaleDateString())
      .length  > 0;

    if (isGameNotAllowed) {
      this._message('Продовжуйте завтра');
      return;
    }

    switch (event.currentTarget.innerText) {
      case 'enter':
        this._onEnterKlickHandler();
        break;
      case 'backspace':
        this._onBackspaceKlickHandler();
        break;
      default:
        break;
    }
  };

  _onLetterKeyClickHandler = (event) => {
    const isGameNotAllowed = this._results
      .filter((res) => new Date(res.time).toLocaleDateString() === new Date().toLocaleDateString())
      .length  > 0;

    if (isGameNotAllowed) {
      this._message('Продовжуйте завтра');
      return;
    }
    const letter = event.currentTarget.innerText;

    if (this._gameOver) {
      this._message('Продовжуйте завтра');
      return;
    }

    if (this._userWords[this._currentWordIndex] == null && this._userWords.length <= this._maxTries) {
      this._userWords.push('');
    }

    if (this._userWords[this._currentWordIndex].length < this._wordSize && this._userWords.length <= this._maxTries) {
      this._userWords[this._currentWordIndex] += letter;
      this.createQuizMatrix();
    }
  };

  _onEnterKlickHandler() {
    const word = this._userWords[this._currentWordIndex];

    if (this._gameOver) {
      this._message('Продовжуйте завтра');
      return;
    }
    if (this._currentWordIndex === this._maxTries - 1) {
      this._message('Продовжуйте завтра, ви не вгадали');
      this._saveResult(false);
      return;
    }

    if( word && (word.length !== this._wordSize)) {
      this._message('Не достатньо букв');
    } else if (words.includes(word)) {
      const isWordDuplicated =  this._userWords
        .filter(uw => uw === word)
        .length > 1;
      
      if (isWordDuplicated) {
        this._message('Слово дублюється');
        return;
      }
      this._currentWordIndex++;
      this.createQuizMatrix();

      if(this._currentWordIndex <= this._maxTries && word === this._quizWord){
        this._message('Перемога!');
        this._saveResult(true);
      } 
    } else if (!word) {
      this._message('Введіть слово');
    } else {
      this._message('Слова немає в словнику');
    }
  }
  _onBackspaceKlickHandler() {
    const word = this._userWords[this._currentWordIndex];

    if(word) {
      this._userWords[this._currentWordIndex] = word.substr(0, word.length - 1);
      this.createQuizMatrix();
    }
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

  _message(text) {
    const messageBox = document.getElementById('message-box');
    const message = document.getElementById('message');

    message.innerText = text;
    messageBox.style.display = 'flex';

    setTimeout(() => {
      messageBox.style.display = 'none';
    }, MESSAGE_DURATION);
  }

  _saveResult(isWinner) {
    const dateNow = new Date();
    const previousWeek = new Date(dateNow.getTime() - 7 * 24 * 60 * 60 * 1000);
    let resultsList = LocalStorageService.get(validKeys.results);

    const result = {
      time: new Date().getTime(),
      tries: this._currentWordIndex,
      wordSize: this._wordSize,
      win: isWinner
    };

    resultsList.push(result);
    resultsList = resultsList.filter(res => res.time >= previousWeek && res.time <= dateNow);

    LocalStorageService.set(validKeys.results, resultsList);
    this._gameOver = true;
  }

}

export default GameService;
