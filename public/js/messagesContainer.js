const container = document.querySelector(".messages-container");
const showMsgs = document.querySelector(".messages-container .heading");
const boxIcon = document.querySelector(".heading i");

showMsgs.addEventListener("click", () => {
  container.classList.toggle("full-container");
  boxIcon.classList.toggle("box-icon-clicked");
});
