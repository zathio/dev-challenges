const images = document.querySelectorAll(".js-image-box"),
      imagePreview = document.querySelector(".js-preview"),
      imagePreviewWrapper = document.querySelector(".js-preview-wrapper");

images.forEach(img => {
    img.addEventListener("click", () => {
        imagePreview.src = img.children[0].src;
        imagePreviewWrapper.classList.add("show");
    })
});

window.addEventListener("click", (e) => {
    if (imagePreviewWrapper.classList.contains("show") && e.target !== imagePreview && !Array.from(images).includes(e.target)) {
        imagePreviewWrapper.classList.remove("show");
    }
})