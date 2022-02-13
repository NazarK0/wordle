import ratingRender from './ratingRender.js';
import LocalStorageService, {validKeys} from './services/LocalStorageService.js';

const modal = document.getElementById("modal-window");
const modalContent = document.getElementById("modal-content");
const openRatingBtn = document.getElementById("rating-open");
const closeBtn = document.getElementById("modal-close");

openRatingBtn.onclick = function() {
    const results = LocalStorageService.get(validKeys.results);
    modalContent.innerHTML = ratingRender(results);
    modal.style.display = "block";
  };

closeBtn.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};