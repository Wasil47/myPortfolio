const navBar = document.getElementById("navbar"),
hamMenu = document.querySelector(".ham"),
slider = document.getElementById('slider'),
slides = document.getElementById('slides'),
slideArr = document.getElementsByClassName('slide'),
// slideArr = document.querySelectorAll(".slide"),
prev = document.getElementById('prev'),
next = document.getElementById('next');

document.addEventListener("DOMContentLoaded", ()=>{ 
  navBar.classList.toggle("hide");
  hamMenu.classList.toggle("active");
});

hamMenu.addEventListener("click", () => {
  navBar.classList.toggle("hide");
  hamMenu.classList.toggle("active");
});


const slide = ()=>{
  let 
  // posInitial = slides.offsetLeft,
  slideSize = slideArr[0].offsetWidth,
  posInitial = -slideSize; // new (testing)
  slides.style.left = -slideSize + "px"; // new (testing)
  slidesLength = slideArr.length,
  firstSlide = slideArr[0],
  lastSlide = slideArr[slideArr.length-1],
  firstClone = firstSlide.cloneNode(true),
  lastClone = lastSlide.cloneNode(true),
  shiftReady = true;

  // Clone first and last slide
  slides.appendChild(firstClone);
  slides.insertBefore(lastClone, firstSlide);

  // Click events
  prev.addEventListener('click', ()=>{shiftSlide(-1)});
  next.addEventListener('click', ()=>{shiftSlide(1)});

  const shiftSlide = (dir) => {
    slides.classList.add('shifting');

    if (shiftReady) {
      if (dir == 1) {
        slides.style.left = (posInitial - slideSize) + "px";
        posInitial-= slideSize;
      } else if (dir == -1) {
        slides.style.left = (posInitial + slideSize) + "px";
        posInitial+= slideSize;
      }
    }
    shiftReady = false; 
  };

  const checkPosition = () => {
    slides.classList.remove('shifting');
    if (slides.style.left == 0 + "px"){
      slides.style.left = -(slideSize * (slidesLength)) + "px";
      posInitial = -(slideSize * (slidesLength));
    } else if (slides.style.left == -(slideSize * (slidesLength+1)) + "px") {
      slides.style.left = -slideSize + "px";
      posInitial = -slideSize;
    }
    shiftReady = true;
  };
  
  // checkPos when transition end
  slides.addEventListener('transitionend', checkPosition); 
    
  // reset position when resize screen
  window.addEventListener('resize', ()=>{
    posInitial = slides.offsetLeft;
    slideSize = slideArr[0].offsetWidth;
    slides.style.left = -slideSize + "px";
    posInitial = -slideSize;
  });
};

slide();