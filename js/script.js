// script.js - Interactivity for Magic of Numbers Website

document.addEventListener('DOMContentLoaded', function() {
    // Give every page a visible, accessible current navigation state.
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a[href]').forEach((link) => {
        const linkFile = link.getAttribute('href').split('?')[0].split('#')[0];
        if (linkFile === currentFile) link.setAttribute('aria-current', 'page');
    });

    // Keep the support email while removing any public phone item.
    document.querySelectorAll('.top-contact-bar .top-bar-item').forEach((item) => {
        if (item.querySelector('a[href^="tel:"]')) item.remove();
    });

    // The direct-order WhatsApp announcement is no longer part of the header.
    const flashBanner = document.getElementById('flash-banner');
    if (flashBanner) flashBanner.remove();

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
                header.style.background = '#0B1F33';
            } else {
                header.classList.add('shadow-sm', 'py-4');
                header.classList.remove('shadow-md', 'py-3');
                header.style.background = '#0B1F33';
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

/*
 * Keep the hand-authored legacy detail pages aligned with the audited shop
 * catalogue. These pages previously repeated the same placeholder four times
 * in their thumbnail gallery. Until multi-angle photography is available, show
 * one accurate product image instead of presenting duplicates as other views.
 */
document.addEventListener('DOMContentLoaded', function() {
    const detailPageImages = {
        'product-7-chakra-bracelet.html': 'images/products/catalog/101.jpg',
        'product-tiger-eye-bracelet.html': 'images/products/catalog/102.jpg',
        'product-aries-bracelet.html': 'images/products/catalog/103.jpg',
        'product-rose-quartz-bracelet.html': 'images/products/catalog/104.jpg',
        'product-evil-eye-bracelet.html': 'images/products/catalog/105.jpg',
        'product-navratna-bracelet.html': 'images/products/catalog/106.jpg',
        'product-emerald-bracelet.html': 'images/products/catalog/107.jpg',
        'product-manifestation-bracelet.html': 'images/products/catalog/108.jpg',
        'product-copper-brass-kada.html': 'images/products/catalog/109.jpg',
        'product-mariyam-jasper.html': 'images/products/catalog/110.jpg',
        'product-amethyst-geode.html': 'images/products/catalog/201.jpg',
        'product-citrine-tree.html': 'images/products/catalog/202.jpg',
        'product-shree-yantra.html': 'images/products/catalog/301.jpg',
        'product-1-mukhi-rudraksha.html': 'images/products/catalog/401.jpg',
        'product-5-mukhi-rudraksha.html': 'images/products/catalog/402.jpg',
        'product-amber-mala.html': 'images/products/catalog/403.jpg',
        'product-karungali-mala.html': 'images/products/catalog/404.jpg',
        'product-vastu-metal-strip.html': 'images/products/catalog/501.jpg',
        'product-vastu-pyramid.html': 'images/products/catalog/502.jpg',
        'product-toilet-blocker.html': 'images/products/catalog/503.jpg',
        'product-color-tape.html': 'images/products/catalog/504.jpg',
        'product-shriparni-pyramid.html': 'images/products/catalog/505.jpg'
    };

    const pageName = window.location.pathname.split('/').pop();
    const accurateImage = detailPageImages[pageName];
    if (!accurateImage) return;

    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = accurateImage;
    }

    const thumbnails = Array.from(document.querySelectorAll('img.thumbnail'));
    if (thumbnails.length === 0) return;

    const firstThumbnail = thumbnails[0];
    firstThumbnail.src = accurateImage;
    firstThumbnail.alt = `${mainImage?.alt || 'Product'} image`;
    firstThumbnail.onclick = function() {
        if (typeof window.changeImage === 'function') {
            window.changeImage(accurateImage, firstThumbnail);
        }
    };

    thumbnails.slice(1).forEach((thumbnail) => thumbnail.remove());

    const thumbnailGrid = firstThumbnail.parentElement;
    if (thumbnailGrid) {
        thumbnailGrid.classList.remove('grid-cols-4');
        thumbnailGrid.classList.add('grid-cols-1');
        thumbnailGrid.style.maxWidth = '7rem';
    }
});
