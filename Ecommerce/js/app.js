// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        rating: 4.5,
        reviews: 234,
        badge: "sale",
        description: "Premium wireless headphones with noise cancellation, 30-hour battery life, and crystal-clear audio quality."
    },
    {
        id: 2,
        name: "Smart Watch Pro Series",
        category: "electronics",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        rating: 4.7,
        reviews: 189,
        badge: "hot",
        description: "Feature-packed smartwatch with health monitoring, GPS, water resistance, and 7-day battery life."
    },
    {
        id: 3,
        name: "Classic Leather Jacket",
        category: "clothing",
        price: 149.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        rating: 4.3,
        reviews: 156,
        badge: "new",
        description: "Genuine leather jacket with a timeless design. Perfect for any casual or semi-formal occasion."
    },
    {
        id: 4,
        name: "Running Shoes Ultra Boost",
        category: "clothing",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        rating: 4.6,
        reviews: 312,
        badge: "sale",
        description: "Lightweight and responsive running shoes with superior cushioning technology for maximum comfort."
    },
    {
        id: 5,
        name: "Designer Sunglasses",
        category: "accessories",
        price: 59.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
        rating: 4.2,
        reviews: 98,
        badge: null,
        description: "UV400 protection sunglasses with polarized lenses and a stylish modern frame design."
    },
    {
        id: 6,
        name: "Minimalist Backpack",
        category: "accessories",
        price: 44.99,
        originalPrice: 69.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        rating: 4.4,
        reviews: 201,
        badge: "sale",
        description: "Water-resistant backpack with laptop compartment, multiple pockets, and ergonomic design."
    },
    {
        id: 7,
        name: "Ceramic Plant Pot Set",
        category: "home",
        price: 34.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
        rating: 4.1,
        reviews: 67,
        badge: "new",
        description: "Set of 3 elegant ceramic plant pots in different sizes. Perfect for indoor plants and home decor."
    },
    {
        id: 8,
        name: "Portable Bluetooth Speaker",
        category: "electronics",
        price: 49.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        rating: 4.3,
        reviews: 178,
        badge: "sale",
        description: "Waterproof Bluetooth speaker with 360° sound, 12-hour battery life, and built-in microphone."
    },
    {
        id: 9,
        name: "Cotton Crew Neck T-Shirt",
        category: "clothing",
        price: 24.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        rating: 4.0,
        reviews: 445,
        badge: null,
        description: "Premium 100% cotton t-shirt with a comfortable fit. Available in multiple colors."
    },
    {
        id: 10,
        name: "Scented Candle Collection",
        category: "home",
        price: 29.99,
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400",
        rating: 4.5,
        reviews: 123,
        badge: "sale",
        description: "Set of 4 premium scented candles with natural soy wax. Long-lasting fragrance for your home."
    },
    {
        id: 11,
        name: "Gold Chain Necklace",
        category: "accessories",
        price: 39.99,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
        rating: 4.6,
        reviews: 87,
        badge: "new",
        description: "18K gold-plated chain necklace with an elegant minimalist design. Hypoallergenic material."
    },
    {
        id: 12,
        name: "Throw Pillow Set",
        category: "home",
        price: 42.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400",
        rating: 4.3,
        reviews: 156,
        badge: null,
        description: "Set of 2 decorative throw pillows with soft velvet cover. Perfect accent for your living room."
    }
];

// ============================================
// CART STATE MANAGEMENT
// ============================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cartCount, .mobile-cart-count').forEach(el => {
        if (el) el.textContent = count;
    });
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }

    saveCart();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    showToast('Item removed from cart');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.min(newQuantity, 10);
        saveCart();
        renderCart();
    }
}

// ============================================
// RENDER PRODUCTS
// ============================================
let displayedProducts = 8;
let currentFilter = 'all';
let currentSort = 'default';

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let filtered = currentFilter === 'all'
        ? [...products]
        : products.filter(p => p.category === currentFilter);

    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        const query = searchInput.value.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }

    // Sort
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    const toShow = filtered.slice(0, displayedProducts);

    grid.innerHTML = toShow.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge.toUpperCase()}</span>` : ''}
                <div class="product-actions">
                    <button class="action-btn" onclick="openQuickView(${product.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" onclick="toggleWishlist(${product.id})" title="Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Load more button visibility
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = toShow.length < filtered.length ? 'inline-block' : 'none';
    }
}

function generateStars(rating) {
    let stars = '';
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalf) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const empty = 5 - full - (hasHalf ? 1 : 0);
    for (let i = 0; i < empty; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// ============================================
// RENDER CART PAGE
// ============================================
function renderCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const emptyCartEl = document.getElementById('emptyCart');
    const cartSummaryEl = document.getElementById('cartSummary');

    if (!cartItemsEl) return;

    if (cart.length === 0) {
        cartItemsEl.classList.add('hidden');
        if (cartSummaryEl) cartSummaryEl.classList.add('hidden');
        if (emptyCartEl) emptyCartEl.classList.remove('hidden');
        return;
    }

    if (emptyCartEl) emptyCartEl.classList.add('hidden');
    cartItemsEl.classList.remove('hidden');
    if (cartSummaryEl) cartSummaryEl.classList.remove('hidden');

    cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="category">${item.category}</p>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <div class="quantity-selector">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" min="1" max="10"
                           onchange="updateQuantity(${item.id}, parseInt(this.value))">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 5.99) : 0;
    const tax = subtotal * 0.08;
    const discount = getDiscount(subtotal);
    const total = subtotal + shipping + tax - discount;

    const setEl = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = `$${val.toFixed(2)}`;
    };

    setEl('subtotal', subtotal);
    setEl('shipping', shipping);
    setEl('tax', tax);
    setEl('total', total);

    if (discount > 0) {
        const discountRow = document.getElementById('discountRow');
        if (discountRow) {
            discountRow.classList.remove('hidden');
            setEl('discount', discount);
        }
    }

    // Checkout page summary
    setEl('checkoutSubtotal', subtotal);
    setEl('checkoutTax', tax);
    setEl('checkoutTotal', total);
}

let appliedPromo = null;

function getDiscount(subtotal) {
    if (appliedPromo === 'SAVE10') return subtotal * 0.10;
    if (appliedPromo === 'SAVE20') return subtotal * 0.20;
    return 0;
}

// ============================================
// RENDER CHECKOUT
// ============================================
function renderCheckout() {
    const checkoutItems = document.getElementById('checkoutItems');
    if (!checkoutItems) return;

    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div class="checkout-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity} × $${item.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

// ============================================
// QUICK VIEW MODAL
// ============================================
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalRating').innerHTML = `${generateStars(product.rating)} <span style="color: var(--gray)">(${product.reviews} reviews)</span>`;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalQty').value = 1;

    // Store current product ID
    modal.dataset.productId = productId;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// WISHLIST (Simple toggle)
// ============================================
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist');
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function startCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!hoursEl) return;

    let totalSeconds = 8 * 3600 + 45 * 60 + 30;

    setInterval(() => {
        if (totalSeconds <= 0) return;
        totalSeconds--;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        hoursEl.textContent = String(h).padStart(2, '0');
        minutesEl.textContent = String(m).padStart(2, '0');
        secondsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
}

// ============================================
// HERO SLIDER
// ============================================
function startHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length === 0) return;

    let current = 0;

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 4000);
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count on page load
    updateCartCount();

    // Render products on home page
    renderProducts();

    // Start animations
    startCountdown();
    startHeroSlider();

    // ---- Mobile Menu ----
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });
    }

    // ---- Filter Buttons ----
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            displayedProducts = 8;
            renderProducts();
        });
    });

    // ---- Category Cards ----
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            currentFilter = card.dataset.category;
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.filter === currentFilter);
            });
            displayedProducts = 8;
            renderProducts();
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ---- Sort Select ----
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            renderProducts();
        });
    }

    // ---- Search ----
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => renderProducts());
    }
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') renderProducts();
            // Live search with debounce
            clearTimeout(searchInput._timeout);
            searchInput._timeout = setTimeout(renderProducts, 300);
        });
    }

    // ---- Load More ----
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayedProducts += 4;
            renderProducts();
        });
    }

    // ---- Quick View Modal ----
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', () => closeModal('quickViewModal'));
    }

    const quickViewModal = document.getElementById('quickViewModal');
    if (quickViewModal) {
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) closeModal('quickViewModal');
        });
    }

    // Quantity buttons in modal
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const modalQty = document.getElementById('modalQty');

    if (qtyMinus) {
        qtyMinus.addEventListener('click', () => {
            const val = parseInt(modalQty.value);
            if (val > 1) modalQty.value = val - 1;
        });
    }
    if (qtyPlus) {
        qtyPlus.addEventListener('click', () => {
            const val = parseInt(modalQty.value);
            if (val < 10) modalQty.value = val + 1;
        });
    }

    // Add to cart from modal
    const modalAddToCart = document.getElementById('modalAddToCart');
    if (modalAddToCart) {
        modalAddToCart.addEventListener('click', () => {
            const productId = parseInt(quickViewModal.dataset.productId);
            const quantity = parseInt(modalQty.value);
            addToCart(productId, quantity);
            closeModal('quickViewModal');
        });
    }

    // ---- Auth Modal ----
    const accountBtn = document.getElementById('accountBtn');
    const authModal = document.getElementById('authModal');
    const authModalClose = document.getElementById('authModalClose');

    if (accountBtn && authModal) {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (authModalClose) {
        authModalClose.addEventListener('click', () => closeModal('authModal'));
    }

    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeModal('authModal');
        });
    }

    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');

            if (tab.dataset.tab === 'login') {
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            } else {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
            }
        });
    });

    // ---- Newsletter Form ----
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }

    // ---- Promo Code ----
    const applyPromo = document.getElementById('applyPromo');
    if (applyPromo) {
        applyPromo.addEventListener('click', () => {
            const promoInput = document.getElementById('promoInput');
            const code = promoInput.value.trim().toUpperCase();

            if (code === 'SAVE10' || code === 'SAVE20') {
                appliedPromo = code;
                updateCartSummary();
                showToast(`Promo code "${code}" applied!`);
            } else {
                showToast('Invalid promo code');
            }
        });
    }

    // ---- Checkout Forms ----
    const shippingForm = document.getElementById('shippingForm');
    if (shippingForm) {
        shippingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Update shipping cost
            const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
            let shippingCost = 5.99;
            if (shippingMethod === 'express') shippingCost = 12.99;
            if (shippingMethod === 'overnight') shippingCost = 24.99;

            const checkoutShipping = document.getElementById('checkoutShipping');
            if (checkoutShipping) checkoutShipping.textContent = `$${shippingCost.toFixed(2)}`;

            // Recalculate total
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = subtotal * 0.08;
            const total = subtotal + shippingCost + tax;
            const checkoutTotal = document.getElementById('checkoutTotal');
            if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;

            // Move to step 2
            document.getElementById('step1').classList.add('hidden');
            document.getElementById('step2').classList.remove('hidden');
            document.querySelectorAll('.step')[0].classList.remove('active');
            document.querySelectorAll('.step')[0].classList.add('completed');
            document.querySelectorAll('.step')[1].classList.add('active');
        });
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Move to step 3
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.remove('hidden');

            // Hide summary on confirmation
            const checkoutSummary = document.getElementById('checkoutSummary');
            if (checkoutSummary) checkoutSummary.classList.add('hidden');

            // Update steps
            document.querySelectorAll('.step')[1].classList.remove('active');
            document.querySelectorAll('.step')[1].classList.add('completed');
            document.querySelectorAll('.step')[2].classList.add('active');

            // Generate order number
            const orderNumber = document.getElementById('orderNumber');
            if (orderNumber) {
                orderNumber.textContent = 'SE-' + Date.now().toString().slice(-8);
            }

            // Clear cart
            cart = [];
            saveCart();
        });
    }

    // Back to shipping button
    const backToShipping = document.getElementById('backToShipping');
    if (backToShipping) {
        backToShipping.addEventListener('click', () => {
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step1').classList.remove('hidden');
            document.querySelectorAll('.step')[1].classList.remove('active');
            document.querySelectorAll('.step')[0].classList.remove('completed');
            document.querySelectorAll('.step')[0].classList.add('active');
        });
    }

    // ---- Card Number Formatting ----
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            val = val.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = val;
        });
    }

    // ---- Card Expiry Formatting ----
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length >= 2) {
                val = val.substring(0, 2) + '/' + val.substring(2);
            }
            e.target.value = val;
        });
    }

    // ---- Close modals on Escape ----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('quickViewModal');
            closeModal('authModal');
        }
    });
});

