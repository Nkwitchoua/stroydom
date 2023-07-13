const body = document.body;
const btn = document.querySelector("#theme-switch-btn");
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

const mobileMenu = document.querySelector("#mobile-menu");
const mobileHeader = document.querySelector("#header-mobile");

const setPositionMobileMenu = () => {
  const rect = mobileHeader.getBoundingClientRect();

  mobileMenu.style.top = rect.bottom + "px";
  mobileMenu.style.left = -rect.left + "px";
}

document.querySelector("#header__menu-btn").addEventListener("click", () => {
  setPositionMobileMenu();
  if(mobileMenu.style.display == "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "flex";
  }
})

const slideBtnR = document.querySelector("#slide-right");
const slideImg = document.querySelector("#slider-image");
const slideCounters = document.querySelectorAll(".slider-counter__circle");
const activeCounterClass = "slider-counter__circle--active";
const slideTime = 3000;

const imagesForSlider = [
  "./assets/slide_img_1.png",
  "./assets/slider-2.jpg",
  "./assets/slider-3.jpg",
  "./assets/slider-4.jpg"
];

let index = Number(slideImg.getAttribute("img-index"));

let setSlideRight;

const slideRight = () => {
  index++;
  
  if(index > imagesForSlider.length - 1) index = 0;
  
  slideImg.setAttribute("src", imagesForSlider[index]);
  
  const currCounter = slideCounters[index];
  const prevCounter = slideCounters[index - 1] || slideCounters[slideCounters.length - 1];
  prevCounter.classList.remove(activeCounterClass);
  currCounter.classList.add(activeCounterClass);

  setCirclePosition();
  
  if(setSlideRight) {
    clearTimeout(setSlideRight);
    setSlideRight = setTimeout(slideRight, slideTime);
  } else {
    setSlideRight = setTimeout(slideRight, slideTime);
  }
}

const counterClickHandler = (event) => {
  const ind = Number(event.target.getAttribute("index"));

  for(let i = 0; i < slideCounters.length; i++) {
    if(slideCounters[i].classList.contains(activeCounterClass)) {
      slideCounters[i].classList.remove(activeCounterClass);
    }

    if(i == ind) slideCounters[ind].classList.add(activeCounterClass);
  }

  slideImg.setAttribute("src", imagesForSlider[ind]);
  setCirclePosition();

  index = ind;
  if(setSlideRight) {
    clearTimeout(setSlideRight);
    setSlideRight = setTimeout(slideRight, slideTime);
  } else {
    setSlideRight = setTimeout(slideRight, slideTime);
  }
}

const movingCircle = document.querySelector("#moving-circle");

const setCirclePosition = () => {
  movingCircle.classList.add("moving-circle--size-animation");
  
  const curr = document.querySelector(".slider-counter__circle--active");
  const rect = curr.getBoundingClientRect();

  console.log(rect);
  console.log(curr.offsetLeft);
  movingCircle.style.left = curr.offsetLeft + "px";
  setTimeout(() => {
    movingCircle.classList.remove("moving-circle--size-animation");
  }, 500)
}

window.addEventListener("DOMContentLoaded", () => {
  setSlideRight = setTimeout(slideRight, slideTime);
  //setSlideRight();
  slideBtnR.addEventListener("click", slideRight);
  
  slideCounters.forEach(counter => {
    counter.addEventListener("click", counterClickHandler, event);
  });

  setCirclePosition();
})

window.addEventListener("resize", () => {
  setCirclePosition();
});

const setMobileVersion = () => {

}

const setDesktopVersion = () => {

}