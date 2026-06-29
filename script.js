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
    offerCardTitle: 'Offre spéciale', offerCardText: 'Pack 4 parfums = 160 DH',
    feature1: 'Qualité Premium', feature2: 'Livraison rapide', feature3: 'Prix accessibles', feature4: 'Satisfaction garantie',
    bestSellersLabel: 'Meilleures ventes', bestSellersTitle: 'Choisissez votre signature', bestSellersText: 'Des accords raffinés et modernes pour toutes les occasions.',
    advantagesLabel: 'Avantages', advantagesTitle: 'Pourquoi choisir ZIVARO ?',
    adv1Title: 'Qualité Premium', adv1Text: 'Des compositions raffinées avec une tenue exceptionnelle.',
    adv2Title: 'Livraison Rapide', adv2Text: 'Expédition fiable partout au Maroc en 24h.',
    adv3Title: 'Prix Accessibles', adv3Text: 'Des offres luxueuses sans compromis sur le style.',
    adv4Title: 'Satisfaction Garantie', adv4Text: 'Une expérience client soignée et rassurante.',
    testimonialsLabel: 'Témoignages', testimonialsTitle: 'Ce que disent nos clients',
    footerText: 'Parfums de luxe inspirés des grandes maisons, à portée de main.', footerContact: 'Contact',
    cartTitle: 'Panier', cartClear: 'Vider', cartWhatsapp: '📲 Commander via WhatsApp',
    offerModalTitle: 'Pack 4 parfums = 160 DH', offerModalText: 'Profitez d\'un prix exceptionnel sur notre sélection Premium.', offerModalBtn: 'Profiter de l\'offre',
    pageTitle: 'ZIVARO – Parfums de Luxe', aboutIntro: 'L\'élégance commence par une identité forte.',
    aboutMission: 'Notre mission', aboutValues: 'Nos valeurs', aboutStatsTitle: 'Chiffres clés',
    contactTitle: 'Contactez-nous', contactText: 'Nous sommes à votre écoute pour vous conseiller et vous accompagner.',
    formName: 'Nom', formEmail: 'Email', formMessage: 'Message', formSend: 'Envoyer',
    contactDetails: 'Coordonnées', addressTitle: 'Adresse', addressText: 'Casablanca, Maroc',
    filtersAll: 'Tous', filtersLuxe: 'Luxe', filtersNiche: 'Niche', filtersDaily: 'Quotidien', filtersOffers: 'Offres',
    cartEmpty: 'Votre panier est vide.', cartTotal: 'Total', removeBtn: 'Supprimer',
    cartConfirm: 'Confirmer la commande via WhatsApp'
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
    cartTitle: 'السلة', cartClear: 'إفراغ', cartWhatsapp: '📲 تأكيد الطلب عبر واتساب',
    offerModalTitle: '4 عطور = 160 درهم', offerModalText: 'استفد من سعر خاص على مجموعتنا الفاخرة.', offerModalBtn: 'استفد من العرض',
    pageTitle: 'زيڤارو – عطور فاخرة', aboutIntro: 'الأناقة تبدأ بهوية قوية.',
    aboutMission: 'رسالتنا', aboutValues: 'قيمنا', aboutStatsTitle: 'أرقام مهمة',
    contactTitle: 'تواصل معنا', contactText: 'نحن جاهزون لنصحك ومرافقتك في اختيار عطورك.',
    formName: 'الاسم', formEmail: 'البريد الإلكتروني', formMessage: 'الرسالة', formSend: 'إرسال',
    contactDetails: 'معلومات التواصل', addressTitle: 'العنوان', addressText: 'الدار البيضاء، المغرب',
    filtersAll: 'الكل', filtersLuxe: 'فخم', filtersNiche: 'نيش', filtersDaily: 'يومي', filtersOffers: 'عروض',
    cartEmpty: 'سلة التسوق فارغة.', cartTotal: 'الإجمالي', removeBtn: 'حذف',
    cartConfirm: 'تأكيد الطلب عبر واتساب'
  }
};

const WA_NUMBER = '212778224439';

function buildWhatsAppMessage() {
  const t = translations[currentLang];
  let msg = currentLang === 'ar'
    ? 'مرحباً، أريد طلب العطور التالية من ZIVARO:\n\n'
    : 'Bonjour, je voudrais commander les parfums suivants de ZIVARO:\n\n';
  let total = 0;
  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name} — ${item.price} DH\n`;
    total += item.price;
  });
  msg += `\n${t.cartTotal}: ${total} DH`;
  msg += currentLang === 'ar'
    ? '\n\nأرجو التأكيد والتوصيل 🙏'
    : '\n\nMerci de confirmer et d\'organiser la livraison 🙏';
  return encodeURIComponent(msg);
}

function confirmOrder() {
  if (!cart.length) return;
  const msg = buildWhatsAppMessage();
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  renderCart();
  showToast(`${name} ${currentLang === 'ar' ? 'أضيف إلى السلة ✓' : 'ajouté au panier ✓'}`);
}

function renderCart() {
  const items = document.getElementById('cart-items');
  const totalBox = document.getElementById('total');
  const count = document.getElementById('cart-count');
  const t = translations[currentLang];
  if (count) count.textContent = cart.length;
  if (!items) return;
  items.innerHTML = '';
  let total = 0;
  if (!cart.length) {
    items.innerHTML = `<p style="text-align:center;padding:20px 0;color:var(--muted)">${t.cartEmpty}</p>`;
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      const p = document.createElement('p');
      p.innerHTML = `<span style="color:var(--text)">${item.name}</span> <span style="color:var(--accent-2);font-weight:700">— ${item.price} DH</span> <button class="remove-btn" onclick="removeFromCart(${index})">${t.removeBtn}</button>`;
      items.appendChild(p);
    });
  }
  if (totalBox) totalBox.textContent = `${t.cartTotal}: ${total} DH`;
  const waBtn = document.getElementById('cart-wa-btn');
  if (waBtn) {
    waBtn.disabled = cart.length === 0;
    waBtn.style.opacity = cart.length === 0 ? '0.4' : '1';
    waBtn.style.cursor = cart.length === 0 ? 'not-allowed' : 'pointer';
  }
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

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 1800);
}

function closeOfferModal() {
  const modal = document.getElementById('offer-modal');
  if (modal) modal.classList.remove('show');
}

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
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang]?.[key]) el.placeholder = translations[currentLang][key];
  });
  const waBtn = document.getElementById('cart-wa-btn');
  if (waBtn) waBtn.textContent = translations[currentLang].cartWhatsapp;
  renderCart();
}

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

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

function injectCartWhatsAppButton() {
  const footer = document.querySelector('.cart-footer');
  if (!footer) return;
  const oldClear = footer.querySelector('.btn-primary');
  if (oldClear) oldClear.remove();
  const waBtn = document.createElement('button');
  waBtn.id = 'cart-wa-btn';
  waBtn.type = 'button';
  waBtn.textContent = translations[currentLang].cartWhatsapp;
  waBtn.onclick = confirmOrder;
  waBtn.style.cssText = `
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: #fff; border: 0; border-radius: 999px;
    padding: 11px 18px; font-weight: 700; font-size: 0.9rem;
    cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(37,211,102,0.35); flex: 1;
  `;
  waBtn.onmouseenter = () => { waBtn.style.transform = 'translateY(-2px)'; waBtn.style.boxShadow = '0 8px 28px rgba(37,211,102,0.5)'; };
  waBtn.onmouseleave = () => { waBtn.style.transform = ''; waBtn.style.boxShadow = '0 4px 20px rgba(37,211,102,0.35)'; };
  footer.appendChild(waBtn);
}

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.toggle('lang-ar', currentLang === 'ar');
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  updateLanguage();
  renderCart();
  initMenu();
  initFilters();
  injectCartWhatsAppButton();
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