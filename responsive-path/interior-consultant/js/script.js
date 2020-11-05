const menuBtn = document.querySelectorAll(".js-toggle-menu"),
      menu = document.querySelector(".js-menu");

menuBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        menu.classList.toggle("show");
    });
})