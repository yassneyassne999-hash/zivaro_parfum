const STORAGE_KEY = 'zivaro-cart';
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let currentLang = localStorage.getItem('zivaro-lang') || 'ar';

const translations = {
  fr: {
    brandName: 'ZIVARO', brandTag: 'Parfums de Luxe',
    navHome: 'Accueil', navParfums: 'Parfums', navAbout: 'À propos', navContact: 'Contact',
    heroBadge: 'Nouvelle Collection 2026', heroTitle: 'Des fragrances élégantes qui attirent tous les regards.',
    heroText: 'Parfums 30ml inspirés des grandes maisons, avec qualité premium, tenue remarquable et prix séduisants.',
    heroBtnPrimary: 'Commander maintenant', heroBtnSecondary: 'Voir les parfums',
    statClients: 'clients satisfaits', statDelivery: 'livraison rapide', statParfums: 'parfums',
    heroCardTitle: 'Signature Elite', heroCardText: 'Une fragrance chic et captivante', heroCardPrice: 'À partir de 40 DH',
    offerCardTitle: 'Offre spéciale', offerCardText: '4 parfums = 160 DH',
    feature1: 'Qualité Premium', feature2: 'Livraison rapide', feature3: 'Prix accessibles', feature4: 'Satisfaction garantie',
    bestSellersLabel: 'Meilleures ventes', bestSellersTitle: 'Choisissez votre signature', bestSellersText: 'Des accords raffinés et modernes pour toutes les occasions.',
    advantagesLabel: 'Avantages', advantagesTitle: 'Pourquoi choisir ZIVARO ?',
    adv1Title: 'Qualité Premium', adv1Text: 'Des compositions raffinées avec une tenue exceptionnelle.',
    adv2Title: 'Livraison Rapide', adv2Text: 'Expédition fiable partout au Maroc en 24h.',
    adv3Title: 'Prix Accessibles', adv3Text: 'Des offres luxueuses sans compromis sur le style.',
    adv4Title: 'Satisfaction Garantie', adv4Text: 'Une expérience client soignée et rassurante.',
    testimonialsLabel: 'Témoignages', testimonialsTitle: 'Ce que disent nos clients',
    footerText: 'Parfums de luxe inspirés des grandes maisons, à portée de main.', footerContact: 'Contact',
    offerModalTitle: 'Pack 4 parfums = 160 DH', offerModalText: 'Profitez d\'un prix exceptionnel sur notre sélection Premium.', offerModalBtn: 'Profiter de l\'offre'
  },
  ar: {
    brandName: 'زيڤارو', brandTag: 'عطور فاخرة',
    navHome: 'الرئيسية', navParfums: 'العطور', navAbout: 'من نحن', navContact: 'تواصل',
    heroBadge: 'المجموعة الجديدة لسنة 2026', heroTitle: 'روائح أنيقة تجذب كل الأنظار وتترك أثرًا لا يُنسى.',
    heroText: 'عطور 30 مل مستوحاة من أشهر العلامات العالمية، مع جودة مميزة وثبات ممتاز وأسعار تنافسية.',
    heroBtnPrimary: 'اطلب الآن', heroBtnSecondary: 'تصفح العطور',
    statClients: 'عميل راضٍ', statDelivery: 'توصيل سريع', statParfums: 'عطر',
    heroCardTitle: 'التوقيع الفاخر', heroCardText: 'رائحة أنيقة تُلفت الانتباه فورًا', heroCardPrice: 'ابتداءً من 40 درهم',
    offerCardTitle: 'عرض خاص', offerCardText: '4 عطور = 160 درهم',
    feature1: 'جودة مميزة', feature2: 'توصيل سريع', feature3: 'أسعار مناسبة', feature4: 'رضا مضمون',
    bestSellersLabel: 'الأكثر مبيعًا', bestSellersTitle: 'اختر توقيعك', bestSellersText: 'روائح راقية وحديثة تناسب كل المناسبات.',
    advantagesLabel: 'المزايا', advantagesTitle: 'لماذا تختار زيڤارو؟',
    adv1Title: 'جودة مميزة', adv1Text: 'تركيبات راقية مع ثبات استثنائي.',
    adv2Title: 'توصيل سريع', adv2Text: 'شحن موثوق في جميع أنحاء المغرب خلال 24 ساعة.',
    adv3Title: 'أسعار مناسبة', adv3Text: 'عروض فاخرة دون التضحية بالأسلوب.',
    adv4Title: 'رضا مضمون', adv4Text: 'خدمة عملاء ممتازة ومريحة.',
    testimonialsLabel: 'آراء العملاء', testimonialsTitle: 'ماذا يقول عملاؤنا عنّا',
    footerText: 'عطور فاخرة مستوحاة من أشهر العلامات، متاحة بسهولة وبتصميم عصري.', footerContact: 'تواصل',
    offerModalTitle: '4 عطور = 160 درهم', offerModalText: 'استفد من سعر خاص على مجموعتنا الفاخرة.', offerModalBtn: 'استفد من العرض'
  }
};

// ===== CART =====
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  renderCart();
  showToast(name + ' ✓ أضيف للسلة');
}

function renderCart() {
  const items = document.getElementById('cart-items');
  const totalBox = document.getElementById('total');
  const count = document.getElementById('cart-count');
  if (count) count.textContent = cart.length;
  if (!items) return;
  items.innerHTML = '';
  let total = 0;
  if (!cart.length) {
    items.innerHTML = '<p style="text-align:center;padding:20px 0;color:#7a6e58">السلة فارغة.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      const p = document.createElement('p');
      p.innerHTML = '<span style="color:#f8f3e8">' + item.name + '</span> <span style="color:#e8c96a;font-weight:700"> — ' + item.price + ' DH</span> <button onclick="removeFromCart(' + index + ')" style="background:transparent;border:0;color:#c9a84c;cursor:pointer;margin-right:8px;">حذف</button>';
      items.appendChild(p);
    });
  }
  if (totalBox) totalBox.textContent = 'الإجمالي: ' + total + ' DH';
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  cart = [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  renderCart();
}

function showCart() {
  const box = document.getElementById('cart-box');
  if (box) box.style.display = 'block';
  renderCart();
}

function closeCart() {
  const box = document.getElementById('cart-box');
  if (box) box.style.display = 'none';
}

// ===== ORDER MODAL =====
function openOrderModal() {
  if (!cart.length) {
    showToast('⚠️ السلة فارغة!');
    return;
  }
  // عرض ملخص السلة في الـ modal
  let summary = '';
  let total = 0;
  cart.forEach(item => {
    summary += '• ' + item.name + ' (' + item.price + ' DH)\n';
    total += item.price;
  });
  const summaryEl = document.getElementById('order-summary');
  if (summaryEl) summaryEl.textContent = 'الإجمالي: ' + total + ' DH';

  document.getElementById('order-name').value = '';
  document.getElementById('order-city').value = '';
  document.getElementById('order-address').value = '';
  document.getElementById('order-phone').value = '';

  const modal = document.getElementById('order-modal');
  if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  closeCart();
}

function closeOrderModal() {
  const modal = document.getElementById('order-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function submitOrder() {
  const name    = document.getElementById('order-name').value.trim();
  const city    = document.getElementById('order-city').value.trim();
  const address = document.getElementById('order-address').value.trim();
  const phone   = document.getElementById('order-phone').value.trim();

  if (!name || !city || !address || !phone) {
    alert('⚠️ رجاءً أكمل جميع الحقول');
    return;
  }

  let productsList = '';
  let total = 0;
  cart.forEach((item, i) => {
    productsList += (i + 1) + '. ' + item.name + ' — ' + item.price + ' DH\n';
    total += item.price;
  });

  const msg = 'مرحباً ZIVARO 🌹\n\nطلب جديد:\n\n' + productsList + '\n💰 الإجمالي: ' + total + ' DH\n\n👤 الاسم: ' + name + '\n🏙️ المدينة: ' + city + '\n📍 الموقع: ' + address + '\n📞 الهاتف: ' + phone + '\n\nشكراً! 🌹';

  window.open('https://wa.me/212778224439?text=' + encodeURIComponent(msg), '_blank');
  clearCart();
  closeOrderModal();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeOrderModal();
});

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 1800);
}

// ===== OFFER MODAL =====
function closeOfferModal() {
  const modal = document.getElementById('offer-modal');
  if (modal) modal.classList.remove('show');
}

// ===== LANG =====
function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'ar' : 'fr';
  localStorage.setItem('zivaro-lang', currentLang);
  document.body.classList.toggle('lang-ar', currentLang === 'ar');
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  updateLanguage();
}

function updateLanguage() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang]?.[key]) el.textContent = translations[currentLang][key];
  });
  renderCart();
}

// ===== FILTERS =====
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach((card) => {
        card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) ? 'block' : 'none';
      });
    });
  });
}

// ===== MENU =====
function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.toggle('lang-ar', currentLang === 'ar');
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  updateLanguage();
  renderCart();
  initMenu();
  initFilters();

  document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(btn.getAttribute('data-name'), Number(btn.getAttribute('data-price'))));
  });

  document.querySelector('[data-lang-toggle]')?.addEventListener('click', toggleLanguage);

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  reveals.forEach((section) => observer.observe(section));

  const modal = document.getElementById('offer-modal');
  if (modal) setTimeout(() => modal.classList.add('show'), 500);
});
