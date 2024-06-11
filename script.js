document.addEventListener("DOMContentLoaded", function () {
  const seeMoreButton = document.querySelector(".see-more-button");
  const productCards = document.querySelectorAll(".product-card");
  const cartBadge = document.querySelector(".cart-badge");

  productCards.forEach((card, index) => {
    if (index >= 6) {
      card.classList.add("hidden");
    }
  });

  seeMoreButton.addEventListener("click", () => {
    const hiddenCards = document.querySelectorAll(".product-card.hidden");

    if (hiddenCards.length > 0) {
      hiddenCards.forEach((card) => card.classList.remove("hidden"));
      seeMoreButton.innerHTML =
        'See Less <img src="./assets/images/arrow-right-circle.png" alt="">';
    } else {
      productCards.forEach((card, index) => {
        if (index >= 6) {
          card.classList.add("hidden");
        }
      });
      seeMoreButton.innerHTML =
        'See More Products <img src="./assets/images/arrow-right-circle.png" alt="">';
    }
  });

  updateCartBadge();

  const addToCartButtons = document.querySelectorAll(".product-bottom button");
  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      addToCart(index);
    });
  });

  function addToCart(index) {
    const productCard = productCards[index];
    const productName = productCard.querySelector(".product-name").innerText;
    const productPrice =
      productCard.querySelector(".product-bottom p").innerText;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = {
      name: productName,
      price: productPrice,
      quantity: 1,
    };

    const productIndex = cart.findIndex((item) => item.name === productName);

    if (productIndex > -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
  }

  function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    cartBadge.innerText = totalItems;
  }
});
