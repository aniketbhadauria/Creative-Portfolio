const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

let magnets = document.querySelectorAll(".magnetic-area");
let strength = 75;

magnets.forEach((magnet) => {
  magnet.addEventListener("mousemove", moveMagnet);
  magnet.addEventListener("mouseout", function (event) {
    TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut });
  });
});

function moveMagnet(event) {
  let magnetButton = event.currentTarget;
  let bounding = magnetButton.getBoundingClientRect();

  TweenMax.to(magnetButton, 1, {
    x:
      ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
      strength,
    y:
      ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
      strength,
    ease: Power4.easeOut,
  });
}

gsap.set(".card-1", { rotation: -10 });
gsap.set(".card-2", { rotation: -20 });
gsap.set(".card-3", { rotation: -15 });

gsap.registerPlugin(ScrollTrigger);

const cards = document.querySelectorAll(".card");

ScrollTrigger.create({
  trigger: ".contact",
  start: "-50% top",
  onUpdate: (self) => {
    const progress = self.progress;
    cards.forEach((card, index) => {
      gsap.to(card, { y: -300 * progress, overwrite: true });
    });
  },
});

function splitTextIntoSpans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const text = element.innerText;
    element.innerHTML = "";

    text.split("").forEach((char) => {
      if (char === " ") {
        element.innerHTML += "&nbsp;";
      } else {
        const span = document.createElement("span");
        span.innerText = char;

        const div = document.createElement("div");
        div.className = "letter";
        div.appendChild(span);

        element.appendChild(div);
      }
    });
  });
}

splitTextIntoSpans("h1");

document.querySelectorAll("h1").forEach((h1) => {
  const spans = h1.querySelectorAll(".letter span");

  gsap.to(spans, {
    x: 0,
    duration: 1,
    ease: "power4.out",
    delay: (index) => Math.random() * 0.5 + 0.25,
    scrollTrigger: {
      trigger: h1,
      start: "top 90%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
});
