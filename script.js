// script.js

// 🔴 هام: ضع رقم هاتفك هنا بصيغة دولية بدون علامة + (مثال: "966551234567")
const WHATSAPP_NUMBER = "201116156583"; 

const orderButtons = document.querySelectorAll('.order-button');
const searchInput = document.getElementById('searchInput'); 
const productCards = document.querySelectorAll('.product-card'); 
const navbar = document.getElementById('mainNavbar');


// ===================================
// 1. وظيفة الإخفاء والإظهار (Navbar Scroll Logic)
// ===================================

let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // التمرير لأسفل: إخفاء النافبار
        navbar.classList.add('navbar-hidden');
    } else {
        // التمرير لأعلى: إظهار النافبار
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = currentScrollY;
});


// ===================================
// 2. وظيفة البحث والـ Animation
// ===================================

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase(); 

    productCards.forEach(card => {
        const productNameElement = card.querySelector('.product-name');
        const productName = productNameElement ? productNameElement.textContent.toLowerCase() : '';
        
        if (productName.includes(searchTerm)) {
            // المنتج مطابق: إظهاره مع تشغيل Animation
            
            // 1. نلغي فئة الإخفاء الدائم
            card.classList.remove('hidden-by-search');
            // 2. نزيل فئة الـ animation القديمة
            card.classList.remove('visible-after-search'); 
            
            // 💡 الخدعة: إجبار المتصفح على إعادة رسم العنصر لإعادة تشغيل الـ animation
            void card.offsetWidth; 
            
            // 3. نضيف فئة الـ animation الجديدة لإظهاره
            card.classList.add('visible-after-search'); 
            
        } else {
            // المنتج غير مطابق: إخفاؤه
            
            // 1. نضيف فئة الإخفاء الدائم
            card.classList.add('hidden-by-search');
            // 2. نزيل أي فئة animation
            card.classList.remove('visible-after-search');
        }
    });
}

// تشغيل دالة البحث عند الكتابة
searchInput.addEventListener('keyup', filterProducts);
searchInput.addEventListener('change', filterProducts);


// ===================================
// 3. وظيفة طلب المنتج (Order Function)
// ===================================

orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        const productName = button.getAttribute('data-product');
        const imageUrl = button.getAttribute('data-image');

        const message = `مرحباً، أود طلب المنتج التالي: 
- اسم المنتج: ${productName}
- رابط الصورة: ${imageUrl}

يرجى تأكيد التفاصيل.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappLink, '_blank');
    });
});
