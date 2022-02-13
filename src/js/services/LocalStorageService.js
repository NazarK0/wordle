const validKeys = {
  wordSize: 'Розмір слова',
  maxTries: 'Кількість спроб',
  results: 'Результати',
  darkTheme: 'Темна тема'
};

class LocalStorageService {
  static isKeyValid(key) {
    return Object.values(validKeys).includes(key);
  }

  static set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  static get(key)  {
    if (key && LocalStorageService.isKeyValid(key)) {
      try {
        return JSON.parse(localStorage.getItem(key) || '');
      } catch (error) {
        return null;
      }
    } else return null;
  }
  static remove(key)  {
    if (key && LocalStorageService.isKeyValid(key) && localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  }
}


export { validKeys };
export default LocalStorageService;
