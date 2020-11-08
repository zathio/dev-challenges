// Price calculator

const items = document.querySelectorAll(".js-item-price"),
      itemsOld = document.querySelectorAll(".js-item-old-price"),
      shipping = document.querySelector(".js-shipping-price"),
      total = document.querySelector(".js-total-output"),
      quantityItems = document.querySelectorAll(".js-quantity-output"),
      quantityButtons = document.querySelectorAll(".js-quantity-btn");

function updatesValues() {
    let newTotal = parseInt(shipping.dataset.price);
    items.forEach(item => {
        let index = Array.from(items).indexOf(item);
        let newQuantity = quantityItems[index].dataset.quantity;
        let newPrice = (item.dataset.price * newQuantity).toFixed(2);
        quantityItems[index].innerHTML = newQuantity;
        item.innerHTML = `$${newPrice}`;
        itemsOld[index].innerHTML = `$${(itemsOld[index].dataset.price * newQuantity).toFixed(2)}`;
        newTotal += parseFloat(newPrice);
    });
    total.innerHTML = `$${newTotal.toFixed(2)}`;
}

quantityButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let index = Array.from(quantityButtons).indexOf(btn) <= 1 ? 0 : 1;
        let newQuantity = eval(quantityItems[index].dataset.quantity + btn.dataset.type + "1");
        if (newQuantity >= 1) {
            quantityItems[index].dataset.quantity = newQuantity;
            updatesValues();
        }
    })
});

// Form validation

const form = document.querySelector(".js-form"),
      formInputs = document.querySelectorAll(".js-verify-input");

function verifyInput(input) {
    let errorIcon = Array.from(input.parentNode.children).find(child => child.classList.contains("icon-validation"));
    input.classList.add("verify");
    if (input.value === "") {
        if (input.type === "select-one") {
            errorIcon.dataset.errorMsg = "Please select a country";
        } else {
            errorIcon.dataset.errorMsg = "Please fill out this field";
        }
        input.classList.contains("valid") && input.classList.remove("valid");
        return false;
    } else {
        if (input.type === "email" && !/\S+@\S+\.\S+/.test(input.value)) {
            errorIcon.dataset.errorMsg = "Please enter a valid email";
            input.classList.contains("valid") && input.classList.remove("valid");
            return false;
        } else if (input.type === "tel" && isNaN(input.value)) {
            errorIcon.dataset.errorMsg = "Please enter a valid phone number";
            input.classList.contains("valid") && input.classList.remove("valid");
            return false;
        } else if (input.checkValidity()) {
            input.classList.add("valid");
            return true;
        } else {
            input.classList.contains("valid") && input.classList.remove("valid");
            return false;
        }
    }
}

formInputs.forEach(input => {
    input.addEventListener("input", () => {
        verifyInput(input);
    });
});

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (Array.from(formInputs).every(verifyInput)) {
        alert("The form is now valid !")
    } else {
        formInputs.forEach(input => {
            if (!verifyInput(input)) {
                input.closest(".js-input-ctn").classList.add("invalid");
                setTimeout(() => {
                    input.closest(".js-input-ctn").classList.remove("invalid");
                }, 500);
            }
        })
    }
});