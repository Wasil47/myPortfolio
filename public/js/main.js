const navBar = document.getElementById("navbar"),
hamMenu = document.querySelector(".ham"),
slider = document.getElementById('slider'),
slides = document.getElementById('slides'),
slideArr = document.getElementsByClassName('slide'),
// slideArr = document.querySelectorAll(".slide"),
prev = document.getElementById('prev'),
next = document.getElementById('next'),
html = document.querySelector('html');

// START NAVBAR Hide/Show 
document.addEventListener("DOMContentLoaded", ()=>{ 
  navBar.classList.toggle("hide");
  hamMenu.classList.toggle("active");
});
hamMenu.addEventListener("click", () => {
  navBar.classList.toggle("hide");
  hamMenu.classList.toggle("active");
});
// END NAVBAR Hide/Show 

//START Scroll to section
const scrollLink = document.querySelectorAll('a[href^="#"]');
let fSize = window.getComputedStyle(html, null).getPropertyValue('font-size');

scrollLink.forEach(link => {
  link.addEventListener('click', el => {
    el.preventDefault();
    const fValue = parseInt(fSize);
    const targetEl = document.querySelector(link.getAttribute('href'));
    const posY = targetEl.offsetTop - (fValue*3);    
    window.scroll(0, posY);
  });
});
//END Scroll to section

//START Animate (appear) Items
function throttle(f, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      f();
      time = Date.now();
    }
  }
};
const animateItems = ()=> {
  const windowHeight = window.innerHeight;
  const aboutSection = document.getElementById('about-section');
  const skillSection = document.getElementById('skill-section');
  const contactSection = document.getElementById('contact-section');

  const aboutDistTop = aboutSection.getBoundingClientRect().top;
  const skillDistTop = skillSection.getBoundingClientRect().top;
  const skillDistBot = skillSection.getBoundingClientRect().bottom;
  const contactlDistTop = contactSection.getBoundingClientRect().top;

  const aboutVisible = aboutDistTop + windowHeight * 0 < windowHeight;
  const skillVisible = skillDistTop + windowHeight * 0.3 < windowHeight;
  const skillNotVisible = skillDistBot + windowHeight * 0.5 < windowHeight;
  const contactVisible = contactlDistTop + windowHeight * 0 < windowHeight;    
    
  if (aboutVisible) {
    document.querySelector('.about').classList.remove('hide');
  } 
  if (skillVisible && !skillNotVisible) {
    document.querySelectorAll('.skills').forEach((skill, i)=>{
      setTimeout(()=>{skill.classList.remove('slide-up')}, 200*i);
    });
  }
  if (skillNotVisible || !skillVisible && !skillNotVisible) {
    document.querySelectorAll('.skills').forEach((skill, i)=>{
      setTimeout(()=>{skill.classList.add('slide-up')}, 200*i);      
    });
  }
  if (contactVisible) {    
    const bounce = ()=> {
      document.querySelectorAll('.contact-text').forEach((contact, i)=>{      
        setTimeout(()=>{contact.classList.add('bounce')}, 1000*i);
        contact.onanimationend = () => {
         contact.classList.remove('bounce');
        };
      });
    }
    setTimeout(bounce, 500);
  }
};
window.addEventListener('scroll', throttle(animateItems, 200));
window.addEventListener('DOMContentLoaded', ()=>{
  const helloClass = document.getElementsByClassName('hello')[0].children;
  const hello = () => {
    for (let i = 0; i < helloClass.length; i++) {
    setTimeout(()=>{helloClass[i].classList.remove('hide-hello')}, 500*i);
    }
  };
  setTimeout(hello, 200);  
});
//STOP Animate (appear) Items

// START: InfinitySlider (carousel)
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
// END: InfinitySlider (carousel)