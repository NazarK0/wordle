import LocalStorageService, {validKeys} from './services/LocalStorageService.js';

const settingsWindow = document.getElementById("settings-window");
const openSettingsBtn = document.getElementById("settings-open");
const closeSettingsBtn = document.getElementById("settings-close");

const maxTries = document.getElementById("max-tries");
const wordSize = document.getElementById("word-size");

const darkThemeToggler = document.getElementById("dark-theme");
let isDarkTheme = darkThemeToggler.checked;

const fetchData = () => {
  maxTries.value = LocalStorageService.get(validKeys.maxTries);
  wordSize.value = LocalStorageService.get(validKeys.wordSize);
  darkThemeToggler.value = LocalStorageService.get(validKeys.darkTheme);
  isDarkTheme = darkThemeToggler.checked;
};

if (openSettingsBtn) {
  openSettingsBtn.onclick = function() {
    fetchData();
    settingsWindow.style.display = "block";
  };
}

closeSettingsBtn.onclick = function() {
  settingsWindow.style.display = "none";
};

settingsWindow.onclick = function(event) {
  if (event.target == settingsWindow) {
    settingsWindow.style.display = "none";
  }
};

fetchData();

maxTries.oninput = (event) => {
  const value = event.currentTarget.value;

  if (value < 1) LocalStorageService.set(validKeys.maxTries, 1);
  else if (value  > 20) LocalStorageService.set(validKeys.maxTries, 20);
  else LocalStorageService.set(validKeys.maxTries, Number(value));
};

wordSize.oninput = (event) => {
  const value = event.currentTarget.value;

  if (value < 3) LocalStorageService.set(validKeys.wordSize, 3);
  else if (value  > 20) LocalStorageService.set(validKeys.wordSize, 20);
  else LocalStorageService.set(validKeys.wordSize, Number(value));
};