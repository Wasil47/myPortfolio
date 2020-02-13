const navBar = document.getElementById("navbar");
const hamMenu = document.querySelector(".ham");

hamMenu.addEventListener("click", () => {
  navBar.classList.toggle("hide");
  hamMenu.classList.toggle("active");
});