const navBar = document.getElementById("navbar");
const hamMenu = document.querySelector(".ham");

document.addEventListener("DOMContentLoaded", ()=>{ 
  navBar.classList.toggle("hide");
  hamMenu.classList.toggle("active");
});


hamMenu.addEventListener("click", () => {
  navBar.classList.toggle("hide");
  hamMenu.classList.toggle("active");
});