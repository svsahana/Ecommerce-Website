
const products = [
  { id: 1, name: "Luna Denim Tops", brand: "Frost & Cook", price: 139, image: "img/products/f1.jpg", description: "Stylish denim top with modern design for casual outings." },
  { id: 2, name: "Casuality", brand: "Skyline Water", price: 120, image: "img/products/f2.jpg", description: "Comfortable casual wear with premium fabric." },
  { id: 3, name: "Striped Top", brand: "Blue Horizon", price: 99, image: "img/products/f3.jpg", description: "Trendy striped top perfect for everyday fashion." },
  { id: 4, name: "Galaxy Printed Tee", brand: "Moon Fashions", price: 110, image: "img/products/f4.jpg", description: "Unique galaxy printed tee with soft cotton fabric." },
  { id: 5, name: "Celestial Rough Top", brand: "Twinkle Trends", price: 105, image: "img/products/f5.jpg", description: "Rough look celestial top with chic styling." },
  { id: 6, name: "Orions Limited", brand: "Cosmospheral", price: 125, image: "img/products/f6.jpg", description: "Limited edition Orion collection stylish wear." },
  { id: 7, name: "White Legs", brand: "Skyline Wardrobe", price: 140, image: "img/products/f7.jpg", description: "Classic white leg wear, versatile and trendy." },
  { id: 8, name: "Cosmographic Classic Top", brand: "Orbit Fashions", price: 132, image: "img/products/f8.jpg", description: "Classic cosmographic top with elegant patterns." },
  { id: 9, name: "Class 8 Randy Blouse", brand: "Nova Collection", price: 115, image: "img/products/n1.jpg", description: "Randy blouse designed for elegance and comfort." },
  { id: 10, name: "Meet You Again", brand: "Cosmic Cause", price: 150, image: "img/products/n2.jpg", description: "Trendy outfit to make every meeting memorable." },
  { id: 11, name: "Galaxy Brad Dress", brand: "Your Galaxy", price: 175, image: "img/products/n3.jpg", description: "Fashionable galaxy-themed dress for parties." },
  { id: 12, name: "Celestial Chic", brand: "Luke Fril Jeans", price: 160, image: "img/products/n4.jpg", description: "Chic celestial style jeans with comfort fit." },
  { id: 13, name: "Lunar Denim Jeans", brand: "Blue Horizon", price: 145, image: "img/products/n5.jpg", description: "Trendy lunar denim jeans with stylish finish." },
  { id: 14, name: "Prostate", brand: "Nova Collection", price: 138, image: "img/products/n6.jpg", description: "Elegant and bold collection for a unique look." },
  { id: 15, name: "Brad Dress Celestial", brand: "Moon Fashions", price: 155, image: "img/products/n7.jpg", description: "Celestial inspired brad dress for special occasions." },
  { id: 16, name: "Cosmic Chic Blouse", brand: "Twinkle Trends", price: 148, image: "img/products/n8.jpg", description: "Stylish chic blouse with cosmic design." }
];

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id")); 


const product = products.find(p => p.id === productId);

if (product) {
    
    document.getElementById("MainImg").src = product.image;

   
    document.getElementById("product-brand").textContent = product.brand;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = "$" + product.price;
    document.getElementById("product-description").textContent = product.description;

    
    const smallImgsContainer = document.getElementById("smallimg");
    smallImgsContainer.innerHTML = "";

    
    for (let i = 0; i < 4; i++) {
        const div = document.createElement("div");
        div.className = "small-img-col";
        const img = document.createElement("img");
        img.src = product.image; 
        img.className = "small-img";
        img.width = "100%";
        img.onclick = () => document.getElementById("MainImg").src = product.image;
        div.appendChild(img);
        smallImgsContainer.appendChild(div);
    }
} else {
    
    document.getElementById("prodetails").innerHTML = "<p>Product not found.</p>";
}


document.querySelectorAll('.heart-icon').forEach(icon => {
  icon.addEventListener('click', (e) => {
    e.preventDefault(); 
    icon.classList.toggle('liked');
  });
});

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}


function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
  alert(product.name + " added to cart!");
}


function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  displayCart();
}


function updateQuantity(productId, newQty) {
  let cart = getCart();
  let item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty > 0 ? newQty : 1;
  }
  saveCart(cart);
  displayCart();
}


function displayCart() {
  const cart = getCart();
  const tbody = document.querySelector("#cart tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    let subtotal = item.price * item.quantity;
    total += subtotal;

    let row = `
      <tr>
        <td><a href="#" onclick="removeFromCart(${item.id})"><i class="far fa-times-circle"></i></a></td>
        <td><img src="${item.image}" alt="${item.name}" width="50"></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
        <td>$${subtotal}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  document.getElementById("cart-total").textContent = "$" + total;
}

function updateCartInfo() {
  const cart = getCart();
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("total-items").textContent = `Total items in cart: ${totalItems}`;
}

  

document.addEventListener("DOMContentLoaded", function() {


  displayCart(); 
  updateCartInfo(); 


  const cartTable = document.querySelector("#cart tbody");
  cartTable.addEventListener("click", function(e) {
    if (e.target.closest(".remove")) {
      e.preventDefault();
      const index = e.target.closest(".remove").dataset.index;
      let cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      displayCart(); 
    }
  });   
});


function viewProduct(element) {
  const product = {
    name: element.getAttribute("data-name"),
    brand: element.getAttribute("data-brand"),
    price: element.getAttribute("data-price"),
    img: element.getAttribute("data-img"),
    description: element.getAttribute("data-description") || "No description available"
  };

  
  localStorage.setItem("selectedProduct", JSON.stringify(product));


  window.location.href = "sproduct.html";
}

const newsletterBtn = document.querySelector("#newsletter button");
if (newsletterBtn) {
  newsletterBtn.addEventListener("click", function () {
    const emailInput = document.querySelector("#newsletter input");
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("newsletterEmail", email);
    alert("Thanks for signing up!");
    emailInput.value = "";
  });
}

