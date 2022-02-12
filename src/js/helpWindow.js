const helpWindow = document.getElementById("help-window");
const openHelpBtn = document.getElementById("help-open");
const closeHelpBtn = document.getElementById("help-close");

if (openHelpBtn) {
  openHelpBtn.onclick = function() {
    helpWindow.style.display = "block";
  };
}

closeHelpBtn.onclick = function() {
  helpWindow.style.display = "none";
};

helpWindow.onclick = function(event) {
  if (event.target == helpWindow) {
    helpWindow.style.display = "none";
  }
};