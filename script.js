const sliderItems = Array.from(document.querySelectorAll(".slider img"));

const controls = document.querySelector(".controls");
const slidesNumber = sliderItems.length;

let currentSlide = 0;

// Control Buttons
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

function nextSlide() {
  currentSlide++;
}

function prevSlide() {
  currentSlide--;
}

nextButton.addEventListener("click", () => {
  nextSlide();
  checker();
  if (currentSlide >= slidesNumber) {
    currentSlide = 0;
    checker();
  }
});

prevButton.addEventListener("click", () => {
  prevSlide();
  checker();
  if (currentSlide < 1) {
    currentSlide = slidesNumber - 1;
    checker();
  }
});

// Control Buttons > Pagination
const dots = document.createElement("div");
dots.classList.add("dots");
controls.appendChild(dots);

for (let i = 0; i < slidesNumber; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.addEventListener("click", () => {
    currentSlide = i;
    checker();
  });
  dot.setAttribute("data-index", i);
  dots.appendChild(dot);
}

const createdDots = document.querySelectorAll(".dot");

// Checker
function checker() {
  // set active class for current slide
  sliderItems.forEach((item, index) => {
    if (index === currentSlide) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // set active class for current dot
  createdDots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

checker();

// Automatically change slides
let autoSlide = setInterval(() => {
  nextSlide();
  checker();
  if (currentSlide >= slidesNumber) {
    currentSlide = 0;
    checker();
  }
}, 4000);

// Stop auto slide on hover
sliderItems.forEach((item) => {
  item.addEventListener("mouseover", () => {
    clearInterval(autoSlide);
  });

  item.addEventListener("mouseout", () => {
    autoSlide = setInterval(() => {
      nextSlide();
      checker();
      if (currentSlide >= slidesNumber) {
        currentSlide = 0;
        checker();
      }
    }, 4000);
  });
});
