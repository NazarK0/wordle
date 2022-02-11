const validKeys = {
  wordSize: 'Розмір слова',
  maxTries: 'Кількість спроб',
  results: 'Результати',
};

class LocalStorageService {
  static isKeyValid(key) {
    return Object.keys(validKeys).includes(key);
  }

  static set(key, data) {
    if (!LocalStorageService.isKeyValid(key)) return;

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
}


export { validKeys };
export default LocalStorageService;
