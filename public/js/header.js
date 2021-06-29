// defining variables
const darkBtn = document.querySelector(".dark");
const sun = document.querySelector(".dark .fa-sun");
const moon = document.querySelector(".dark .fa-moon");
const body = document.querySelector("body");
const listBtn = document.querySelector(".list-icon");
const list = document.querySelector("ul");
const text = document.getElementsByClassName("light-text");
const bg = document.getElementsByClassName("background-light");
const footer = document.querySelector(".footer");
let dark = localStorage.getItem("dark");

// creating dark mode function
const darkMode = function () {
  // adding dark mode
  if (dark === "true") {
    sun.classList.remove("fadeIn");
    sun.classList.add("fadeOut");
    moon.classList.add("fadeIn");
    moon.classList.remove("fadeOut");
    body.classList.add("dark-mode");
    sun.classList.add("clicked");
    moon.classList.add("clicked");
    darkBtn.classList.add("button-clicked");
    for (word of text) {
      word.classList.add("dark-text");
    }
    for (back of bg) {
      back.classList.add("background-dark");
    }
  }
  //removing dark mode
  else {
    sun.classList.add("fadeIn");
    sun.classList.remove("fadeOut");
    moon.classList.remove("fadeIn");
    moon.classList.add("fadeOut");
    body.classList.remove("dark-mode");
    sun.classList.remove("clicked");
    moon.classList.remove("clicked");
    darkBtn.classList.remove("button-clicked");
    for (word of text) {
      word.classList.remove("dark-text");
    }
    for (back of bg) {
      back.classList.remove("background-dark");
    }
  }
};
//run dark mode function when page loads
darkMode();

//changing dark to true or removing it in the local storage
darkBtn.addEventListener("click", () => {
  if (dark === "true") {
    localStorage.removeItem("dark");
  } else {
    localStorage.setItem("dark", "true");
  }
  //updating "dark" value from the local storage
  dark = localStorage.getItem("dark");
  //run dark mode function after clicking dark mode button
  darkMode();
  //adding transition to elements only when clicking button
  darkBtn.classList.add("transition");
  sun.classList.add("transition");
  moon.classList.add("transition");
  body.classList.add("transition");
  footer.classList.add("transition");
});

// list button function

listBtn.addEventListener("click", function () {
  list.classList.toggle("visible");
});
