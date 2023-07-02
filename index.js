const body = document.body;
const btn = document.querySelector("button");
const heroTitleImg = document.querySelector("#hero-title-img")
const preferenceQuery = window.matchMedia("(prefers-color-scheme: dark)");

const addDarkMode = () => {
  body.classList.remove("light-mode");
  body.classList.add("dark-mode");
  heroTitleImg.setAttribute("src", "./assets/hero_title_dark.png");
};

const addLightMode = () => {
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
  heroTitleImg.setAttribute("src", "./assets/hero_title_light.png");
};

const toggleTheme = () =>
  !body.classList.contains("dark-mode") ? addDarkMode() : addLightMode();

const checkPreference = () =>
  preferenceQuery.matches ? addDarkMode() : addLightMode();

btn.addEventListener("click", toggleTheme);
preferenceQuery.addEventListener("change", checkPreference);
// window.addEventListener("DOMContentLoaded", checkPreference);
(() => checkPreference())();
