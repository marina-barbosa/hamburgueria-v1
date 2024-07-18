

const menu = document.querySelector("#menu")
const cartBtn = document.querySelector("#cart-btn")
const cartModal = document.querySelector("#cart-modal")
const cartItemContainer = document.querySelector("#cart-items")
const cartTotal = document.querySelector("#cart-total")
const checkoutBtn = document.querySelector("#checkout-btn")
const closeModalBtn = document.querySelector("#close-modal-btn")
const cartCounter = document.querySelector("#cart-count")
const addressInput = document.querySelector("#address")
const addressWarn = document.querySelector("#address-warn")
const cart = []
let totalQtd = 0;

// abrir modal do carrinho
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex"
})


// fechar modal do carrinho
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none"
  }
})

// fechar modal do carrinho
closeModalBtn.addEventListener("click", () => {
  cartModal.style.display = "none"
})

// adicionar item ao carrinho
menu.addEventListener("click", (event) => {
  let parentButton = event.target.closest(".add-to-cart-btn")

  if (parentButton) {
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))
    addToCart(name, price)
  }
});

// função para add no carrinho
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name)

  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.push({
      name,
      price,
      quantity: 1
    })
  }
  totalQtd++
  updateCartModal()
}
// atualiza carrinho
function updateCartModal() {
  cartItemContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const cartItemElement = document.createElement('div')
    cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>

        <button class="remove-from-cart-btn" data-name="${item.name}">
          Remover
        </button>
      </div>
    `

    total += item.price * item.quantity;

    cartItemContainer.appendChild(cartItemElement)
  })

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  cartCounter.innerHTML = totalQtd;

  // removendo item do carrinho
  const removeBtns = document.querySelectorAll(".remove-from-cart-btn")
  removeBtns.forEach(btn => {
    btn.addEventListener("click", function (event) {
      const name = event.target.getAttribute("data-name")
      removeCartItem(name)
      updateCartModal()
    })
  })
}

// removendo item do carrinho
// cartItemContainer.addEventListener("click", (event) => {
//   if (event.target.classList.contains("remove-from-cart-btn")) {
//     const name = event.target.getAttribute("data-name")
//     removeCartItem(name)
//     updateCartModal()
//   }
// })




// função REMOVER item do carrinho
function removeCartItem(name) {
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity--;
      totalQtd--
      updateCartModal();
      return;
    }

    cart.splice(index, 1);
    totalQtd--
    updateCartModal();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value

  if (inputValue !== "") {
    addressInput.classList.remove("bprder-red-500")
    addressWarn.classList.add("hidden")
  }
})

// finalizar pedido
checkoutBtn.addEventListener("click", function (event) {
  const isOpen = checkRestaurantOpen();
  if (!isOpen) {

    Toastify({
      text: "Ops! O restaurante esta fechado do momento.",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#ef4444",
      }
    }).showToast();

    return;
  }

  if (cart.length <= 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden")
    addressInput.classList.add("border-red-500")
    return;
  }
  let totalPrice = 0
  const cartItems = cart.map((item) => {
    totalPrice += item.price * item.quantity;
    return (
      `${item.name} - Qtd: ${item.quantity} x R$ ${item.price.toFixed(2)} | `
    )
  }).join("")
  const mensagem = encodeURIComponent(cartItems)
  const phone = "556298619456"


  window.open(`https://wa.me/${phone}?text=${mensagem}Total: R$ ${totalPrice} | Endereço: ${addressInput.value}`, "_blank")

  cart = []
  updateCartModal()
})

// verificar a hora e manipular o card horario
function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")
} else {
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-500")
}
















