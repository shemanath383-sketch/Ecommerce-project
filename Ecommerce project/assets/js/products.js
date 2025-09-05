// Load cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const productCard = e.target.closest(".product-card");
        const name = productCard.dataset.name;
        const price = parseFloat(productCard.dataset.price);

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart!`);
    });
});




// Filter products if voice search query exists
const searchQuery = localStorage.getItem("voiceSearchQuery");
if (searchQuery) {
    document.querySelectorAll(".product-card").forEach(card => {
        const name = card.dataset.name.toLowerCase();
        if (!name.includes(searchQuery)) {
            card.style.display = "none";
        }
    });
    localStorage.removeItem("voiceSearchQuery");
}



