const darkBtn = document.querySelector(".dark");
const sun = document.querySelector(".dark .fa-sun");
const moon = document.querySelector(".dark .fa-moon");
const body = document.querySelector("body");
const listBtn = document.querySelector(".list-icon");
const list = document.querySelector("ul");

darkBtn.addEventListener("click", function () {
  sun.classList.toggle("fadeIn");
  sun.classList.toggle("fadeOut");
  moon.classList.toggle("fadeIn");
  moon.classList.toggle("fadeOut");
  body.classList.toggle("dark-mode");
});
listBtn.addEventListener("click", function () {
  list.classList.toggle("visible");
});
