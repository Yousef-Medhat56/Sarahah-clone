const modalBtnOn = document.querySelector(".modal-btn");
const modalBtnOff = document.querySelector(".cancel");
const modal = document.querySelector(".modal");

modalBtnOn.addEventListener("click", function () {
  modal.classList.add("modal-on");
});
modalBtnOff.addEventListener("click", function () {
  modal.classList.remove("modal-on");
});
