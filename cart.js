const cartTable = document.querySelector("#cart-table tbody");
const grandTotalElement = document.querySelector("#grand-total");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartTable.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((item, index) => {
        const total = item.price * item.quantity;
        grandTotal += total;

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="qty-input">
                </td>
                <td>${total}</td>
                <td><button data-index="${index}" class="remove-btn">❌</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
    });

    grandTotalElement.textContent = `Grand Total: ₹${grandTotal}`;
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Quantity Change
cartTable.addEventListener("input", (e) => {
    if (e.target.classList.contains("qty-input")) {
        const index = e.target.dataset.index;
        cart[index].quantity = parseInt(e.target.value);
        renderCart();
    }
});

// Remove Item
cartTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        renderCart();
    }
});

renderCart();


