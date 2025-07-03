function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const isPM = hours >= 12;
  const ampm = isPM ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const formatted = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");

  document.getElementById("clock").textContent = `${formatted} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

function countdown() {
  const now = new Date();
  const lecture = new Date("2025-07-04T20:00:00");
  const diffMs = lecture - now;

  if (diffMs <= 0) {
    document.getElementById("countdown").textContent = "ლექცია დაიწყო!";
    return;
  }

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

  document.getElementById("countdown").textContent =
    days + " დღე, " + hours + " საათი, " + minutes + " წუთი";
}
setInterval(countdown, 1000);
countdown();

let activeSlide = 0;
const slides = document.querySelectorAll(".slide-item");
const pgnbtns = document.querySelector(".pgn-btns");
slides.forEach((slide) => {
  const createdBtn = document.createElement("button");
  pgnbtns.appendChild(createdBtn);
});

const btns = document.querySelectorAll(".pgn-btns button");

function renderActiveSLide() {
  slides.forEach((slide, index) => {
    if (index === activeSlide) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  btns.forEach((btn, index) => {
    if (index === activeSlide) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
renderActiveSLide();

function renderNextSlide() {
  if (activeSlide === slides.length - 1) {
    activeSlide = 0;
  } else {
    activeSlide++;
  }

  renderActiveSLide();
}

let interval = setInterval(() => {
  renderNextSlide();
}, 3000);

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(() => {
    renderNextSlide();
  }, 3000);
}

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    activeSlide = index;
    renderActiveSLide();
    resetInterval();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    if (activeSlide === slides.length - 1) {
      activeSlide = 0;
    } else {
      activeSlide++;
    }
    renderActiveSLide();
    resetInterval();
  } else if (event.key === "ArrowLeft") {
    if (activeSlide === 0) {
      activeSlide = slides.length - 1;
    } else {
      activeSlide--;
    }
    renderActiveSLide();
    resetInterval();
  }
});
