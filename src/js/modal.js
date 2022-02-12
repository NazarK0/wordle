const modal = document.getElementById("modal-window");
const openBtn = document.getElementById("modal-open");
const closeBtn = document.getElementById("modal-close");

if (openBtn) {
  openBtn.onclick = function() {
    modal.style.display = "block";
  };
}

closeBtn.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};