document.addEventListener('DOMContentLoaded', () => {
    // 1. Parse query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        showError("Product ID is missing or invalid.");
        return;
    }

    // 2. Find product in database
    if (typeof productsData === 'undefined') {
        showError("Database connection failed. Please reload the page.");
        return;
    }

    const product = productsData.find(p => p.id === productId);

    if (!product) {
        showError("We couldn't find the requested remedy or stone.");
        return;
    }

    // 3. Render page elements
    document.title = `${product.name} - Magic of Numbers | Spiritual Remedies`;
    
    // Breadcrumbs
    const breadcrumbTitle = document.getElementById('breadcrumb-title');
    if (breadcrumbTitle) breadcrumbTitle.innerText = product.name;
    
    // Badge and SKU
    const badge = document.getElementById('product-badge');
    if (badge) {
        badge.innerText = product.badge || product.category;
    }
    const sku = document.getElementById('product-sku');
    if (sku) {
        sku.innerText = `SKU: GST-${product.id}`;
    }

    // Titles
    const title = document.getElementById('product-title');
    if (title) title.innerText = product.name;

    // Price rendering
    const price = document.getElementById('product-price');
    if (price) price.innerText = `₹${product.price.toLocaleString('en-IN')}`;

    const oldPrice = document.getElementById('product-old-price');
    const discount = document.getElementById('product-discount');
    if (product.oldPrice) {
        if (oldPrice) {
            oldPrice.innerText = `₹${product.oldPrice.toLocaleString('en-IN')}`;
            oldPrice.classList.remove('hidden');
        }
        if (discount) {
            const savings = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            discount.innerText = `${savings}% OFF`;
            discount.classList.remove('hidden');
        }
    } else {
        if (oldPrice) oldPrice.classList.add('hidden');
        if (discount) discount.classList.add('hidden');
    }

    // Image & Gallery
    const mainImg = document.getElementById('main-image');
    if (mainImg) {
        mainImg.src = product.image;
        mainImg.alt = product.name;
    }

    const thumbs = document.getElementById('thumbnails-container');
    if (thumbs) {
        thumbs.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            thumbs.innerHTML += `
                <div class="bg-white rounded-lg p-2 border border-gray-200/50 cursor-pointer thumbnail ${i === 0 ? 'selected' : ''}" onclick="changeImage('${product.image}', this)">
                    <img src="${product.image}" alt="${product.name}" class="rounded-lg w-full h-12 object-contain">
                </div>
            `;
        }
    }

    // Descriptions
    const desc = document.getElementById('product-description');
    if (desc) desc.innerText = product.description;

    const tabDesc = document.getElementById('product-tab-description');
    if (tabDesc) tabDesc.innerText = product.description;

    const handbookText = document.getElementById('product-handbook-text');
    if (handbookText) {
        handbookText.innerText = product.handbook || "Detailed Vedic guides and installation instructions are packed and included with your order.";
    }

    // Benefits checklist
    const benefitsList = document.getElementById('product-benefits');
    if (benefitsList) {
        benefitsList.innerHTML = '';
        const benefitsArray = product.benefits || [
            "Premium authentic stone or Vastu energy pacifier tool",
            "Vedic energized and certified for spiritual balance",
            "Designed by experts to boost positive energy flow"
        ];
        benefitsArray.forEach(b => {
            benefitsList.innerHTML += `<li><i class="fas fa-check text-green-500 mr-2"></i>${b}</li>`;
        });
    }

    // Actions container (Add to Cart / Buy on WhatsApp)
    const actions = document.getElementById('actions-container');
    if (actions) {
        actions.innerHTML = `
            <button class="btn-primary flex-1 py-4 text-base font-bold shadow-md rounded-xl" onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}', 'product-detail.html?id=${product.id}')">
                <i class="fas fa-shopping-cart mr-2"></i> Add to Cart
            </button>
            <button class="btn-gold flex-1 py-4 text-base font-bold shadow-md rounded-xl" onclick="buyOnWhatsApp('${product.name.replace(/'/g, "\\'")}', '₹${product.price}')">
                <i class="fab fa-whatsapp mr-2"></i> Buy on WhatsApp
            </button>
        `;
    }

    // Specifications Table
    const specsTable = document.getElementById('product-specs');
    if (specsTable) {
        specsTable.innerHTML = '';
        const defaultSpecs = {
            "Category": product.category,
            "Certification": "100% Authentic Vedic Remedy",
            "Energization": "Energized by Vedic Acharyas",
            "Placement Guide": "Placement instruction leaflet included"
        };
        const activeSpecs = product.specs || defaultSpecs;
        for (const [key, value] of Object.entries(activeSpecs)) {
            specsTable.innerHTML += `
                <tr>
                    <td class="py-1 pr-4 font-semibold text-gray-700">${key}:</td>
                    <td class="py-1 text-gray-600">${value}</td>
                </tr>
            `;
        }
    }
});

function showError(message) {
    const main = document.querySelector('main');
    if (main) {
        main.innerHTML = `
            <div class="max-w-xl mx-auto text-center py-20">
                <i class="fas fa-exclamation-triangle text-5xl text-red-500 mb-6"></i>
                <h2 class="text-2xl font-bold maroon-accent mb-4">Oops! Remedy Not Found</h2>
                <p class="text-gray-600 mb-8">${message}</p>
                <a href="shop.html" class="btn-primary inline-block px-8 py-3 rounded-lg font-bold">Back to Shop</a>
            </div>
        `;
    }
}

// Function to handle image changes in thumbnail gallery
window.changeImage = function(src, element) {
    const mainImg = document.getElementById('main-image');
    if (mainImg) mainImg.src = src;
    
    // Toggle active border styles on thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('selected'));
    if (element) element.classList.add('selected');
}
