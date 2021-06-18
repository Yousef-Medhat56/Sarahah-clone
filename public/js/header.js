  const darkBtn = document.querySelector(".dark");
  const sun = document.querySelector(".dark .fa-sun");
  const moon = document.querySelector(".dark .fa-moon");
  const body = document.querySelector("body");
  const listBtn = document.querySelector(".list-icon");
  const list = document.querySelector("ul");
  const text = document.getElementsByClassName("light-text");
  const form = document.querySelector(".form");
  const footer =document.querySelector(".footer")

  darkBtn.addEventListener("click", function () {
    sun.classList.toggle("fadeIn");
    sun.classList.toggle("fadeOut");
    moon.classList.toggle("fadeIn");
    moon.classList.toggle("fadeOut");
    body.classList.toggle("dark-mode");
    sun.classList.toggle("clicked");
    moon.classList.toggle("clicked");
    darkBtn.classList.toggle("button-clicked");
    for (word of text) {
      word.classList.toggle("dark-text");
    }
    form.classList.toggle("background-light")
    form.classList.toggle("background-dark")
    footer.classList.toggle("background-light")
    footer.classList.toggle("background-dark")
    
  });
  listBtn.addEventListener("click", function () {
    list.classList.toggle("visible");
  });

  