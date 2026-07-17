// script.js - Interactivity for Magic of Numbers Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation Library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }

    // Dynamic Header Scroll Effect
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md', 'py-3');
                header.classList.remove('shadow-sm', 'py-4');
                header.style.background = 'rgba(255, 255, 255, 0.85)';
            } else {
                header.classList.add('shadow-sm', 'py-4');
                header.classList.remove('shadow-md', 'py-3');
                header.style.background = 'rgba(255, 255, 255, 0.7)';
            }
        });
    }

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Global Add to Cart Function
    window.addToCart = function(product, price, image, link) {
        const existing = cart.find(item => item.product === product);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ product, price, quantity: 1, image: image, link: link });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Visual Feedback
        alert(`${product} added to cart!`);
    };

    window.buyOnWhatsApp = function(productName, price) {
        let message = `*INQUIRY FROM MAGIC OF NUMBERS*\n\n`;
        message += `Hello! I would like to order/inquire about:\n`;
        message += `*Product:* ${productName}\n`;
        message += `*Price:* ${price}\n\n`;
        message += `Please confirm availability and shipping details. Thank you!`;
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/919257925785?text=${encoded}`, '_blank');
    };

    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        // Find the badge span in the header (which is inside the relative div with the cart icon)
        const cartBadges = document.querySelectorAll('.fa-shopping-cart + span');
        cartBadges.forEach(span => span.textContent = count);
    }

    // Testimonials Carousel
    const carousel = document.getElementById('testimonial-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (carousel && prevBtn && nextBtn) {
        let currentIndex = 0;
        const items = carousel.children;
        const totalItems = items.length;

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }

        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });
    }

    // Shop Filters
    const categorySelect = document.querySelector('select[aria-label="Category"]') || document.querySelector('select:first-child');
    const priceRange = document.getElementById('price-range');
    const stoneCheckboxes = document.querySelectorAll('input[type="checkbox"][name="stone"]');
    const zodiacSelect = document.querySelector('select[aria-label="Zodiac Sign"]') || document.querySelector('select:last-child');

    function filterProducts() {
        const selectedCategory = categorySelect ? categorySelect.value : 'All Categories';
        const maxPrice = priceRange ? parseFloat(priceRange.value) : 500;
        const selectedStones = Array.from(stoneCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const selectedZodiac = zodiacSelect ? zodiacSelect.value : 'All Signs';

        document.querySelectorAll('#product-grid > div').forEach(product => {
            const category = product.dataset.category;
            const price = parseFloat(product.dataset.price);
            const stone = product.dataset.stone;
            const zodiac = product.dataset.zodiac;

            let show = true;

            if (selectedCategory !== 'All Categories' && category !== selectedCategory) show = false;
            if (price > maxPrice) show = false;
            if (selectedStones.length > 0 && !selectedStones.includes(stone)) show = false;
            if (selectedZodiac !== 'All Signs' && zodiac !== selectedZodiac && zodiac !== 'All') show = false;

            product.style.display = show ? 'block' : 'none';
        });
    }

    if (categorySelect) categorySelect.addEventListener('change', filterProducts);
    if (priceRange) priceRange.addEventListener('input', filterProducts);
    stoneCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
    if (zodiacSelect) zodiacSelect.addEventListener('change', filterProducts);

    // Quick View Modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
    modal.innerHTML = `
        <div class="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h3 class="text-xl font-bold mb-4" id="modal-title"></h3>
            <img id="modal-image" class="w-full h-48 object-cover mb-4 rounded" alt="">
            <p id="modal-description" class="mb-4"></p>
            <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-bold gold-accent" id="modal-price"></span>
            </div>
            <button class="btn-primary w-full" id="modal-add-to-cart">Add to Cart</button>
            <button class="mt-4 text-gray-600 underline" id="modal-close">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.textContent === 'Quick View') {
            btn.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const title = productCard.querySelector('h3').textContent;
                const image = productCard.querySelector('img').src;
                const price = productCard.querySelector('.gold-accent').textContent;

                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-image').src = image;
                document.getElementById('modal-price').textContent = price;
                document.getElementById('modal-description').textContent = 'Detailed description of the product...'; // Placeholder
                document.getElementById('modal-add-to-cart').dataset.product = title;
                document.getElementById('modal-add-to-cart').dataset.price = price.replace('$', '');

                modal.classList.remove('hidden');
            });
        }
    });

    document.getElementById('modal-close').addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    document.getElementById('modal-add-to-cart').addEventListener('click', function() {
        const product = this.dataset.product;
        const price = parseFloat(this.dataset.price);
        addToCart(product, price);
        modal.classList.add('hidden');
    });

    // Close banner
    const closeBanner = document.getElementById('close-banner');
    if (closeBanner) {
        closeBanner.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile nav when clicking on a link
    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

});
