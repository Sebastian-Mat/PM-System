//  Presentation
TweenMax.from("#design", 1, {
  delay: 0.4,
  opacity: 0,
  y: "10px",
  ease: Power3.easeOut,
})
TweenMax.to(".overlay-title", 1, {
  delay: 0.9,
  x: "100%",
  ease: Power3.easeOut,
});
TweenMax.to(".overlay-title-2", 1, {
  delay: 1.5,
  x: "101%",
  ease: Power3.easeOut,
});
TweenMax.to(".overlay-line-1", 1, {
  delay: 2,
  x: "-100%",
  ease: Power3.easeOut,
});
TweenMax.to(".overlay-line-2", 1, {
  delay: 2,
  x: "100%",
  ease: Power3.easeOut,
});
TweenMax.from(".title-text", 1, {
  delay: 2.3,
  opacity: 0,
  y: "-10px",
  ease: Power3.easeOut,
});

TweenMax.to(".pharmacy", 1, {
  delay: 3.7,
  opacity: 0,
  y: "-10px",
  ease: Power3.easeOut,
});
TweenMax.to(".line", 1, {
    delay: 4,
    opacity: 0,
    y: "-10px",
    ease: Power3.easeOut,
  });
TweenMax.to(".title-text", 1, {
  delay: 4.5,
  opacity: 0,
  y: "-10px",
  ease: Power3.easeOut,
});
TweenMax.to("#design", 1, {
  delay: 4.7,
  opacity: 0,
  y: "-10px",
  ease: Power3.easeOut,
})
TweenMax.to(".overlay-home", 2.5, {
  delay: 5.1,
  y: "-100%",
  ease: Power3.easeOut,
});

document.querySelector("#body").style.overflow = "hidden";

setTimeout(() => {
  document.querySelector("#body").style.overflow = "visible";
}, 7000);

//  Initialization
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems);
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});