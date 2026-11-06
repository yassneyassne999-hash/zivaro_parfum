// رسالة ترحيب في المتجر
console.log("Welcome to ZIVARO Store!");

// زر اكتشاف المنتجات
document.querySelector(".shop-btn").addEventListener("click", function() {
    console.log("Welcome to ZIVARO!");
});

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰';
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const toast = document.querySelector('.toast');
let toastTimer;

document.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => {
        button.textContent = 'تمت الإضافة ✓';
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
            button.textContent = 'أضيفي للسلة';
        }, 2200);
    });
});

document.querySelectorAll('.language-switch button').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.language-switch button').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        document.documentElement.lang = button.dataset.lang;
        document.documentElement.dir = button.dataset.lang === 'ar' ? 'rtl' : 'ltr';
    });
});

const cart = [];
const cartDrawer = document.querySelector('.cart-drawer');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total');
const checkoutBtn = document.querySelector('.checkout-btn');

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
}

function renderCart() {
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartCount.textContent = quantity;
    cartTotal.textContent = `${total} MAD`;

    if (!cart.length) {
        cartItems.innerHTML = '<p class="empty-cart">السلة فارغة</p>';
        checkoutBtn.href = 'https://wa.me/212632733391';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div><strong>${item.name}</strong><span>${item.price} MAD</span></div>
            <div class="quantity-controls">
                <button type="button" data-action="decrease" data-index="${index}">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="increase" data-index="${index}">+</button>
            </div>
        </div>`).join('');

    const message = encodeURIComponent(`السلام عليكم، أريد طلب:\n${cart.map(item => `- ${item.name} × ${item.quantity}`).join('\n')}\nالمجموع: ${total} MAD`);
    checkoutBtn.href = `https://wa.me/212632733391?text=${message}`;
}

document.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const name = card.querySelector('h3').textContent;
        const price = Number(card.querySelector('.card-footer strong').textContent.replace(/[^0-9]/g, ''));
        const existing = cart.find(item => item.name === name);
        if (existing) existing.quantity += 1;
        else cart.push({ name, price, quantity: 1 });
        renderCart();
        button.textContent = 'تمت الإضافة ✓';
        openCart();
        setTimeout(() => button.textContent = 'أضيفي للسلة', 1800);
    });
});

cartItems.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const item = cart[Number(button.dataset.index)];
    if (button.dataset.action === 'increase') item.quantity += 1;
    else item.quantity -= 1;
    if (item.quantity <= 0) cart.splice(Number(button.dataset.index), 1);
    renderCart();
});

document.querySelector('.cart-toggle').addEventListener('click', openCart);
document.querySelector('.cart-close').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
renderCart();

const perfumesCatalog = document.querySelector('#perfumes-section');
const accessoriesCatalog = document.querySelector('#accessories-section');

function showCatalog(category) {
    const perfumes = category === 'perfumes';
    perfumesCatalog.hidden = !perfumes;
    accessoriesCatalog.hidden = perfumes;
}

document.querySelectorAll('a[href="#perfumes"], a[href="#accessories"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        showCatalog(link.getAttribute('href') === '#perfumes' ? 'perfumes' : 'accessories');
    });
});

showCatalog('accessories');
