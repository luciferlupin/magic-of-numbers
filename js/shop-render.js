const PRODUCTS_PER_PAGE = 12;
let currentPage = 1;

function renderShopProducts(products, category = 'All Categories', minPrice = null, maxPrice = null, searchQuery = null) {
    const grid = document.getElementById('shop-product-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    // 1. Show/Hide search banner display
    const searchDisplay = document.getElementById('search-query-display');
    const searchText = document.getElementById('search-query-text');
    if (searchDisplay && searchText) {
        if (searchQuery && searchQuery.trim() !== '') {
            searchText.textContent = `"${searchQuery}"`;
            searchDisplay.classList.remove('hidden');
        } else {
            searchDisplay.classList.add('hidden');
        }
    }
    
    let filteredProducts = products;
    
    // 2. Apply Category Filter
    if (category !== 'All Categories') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    // 3. Apply Price Filters
    if (minPrice !== null && minPrice !== '') {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== null && maxPrice !== '') {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    // 4. Apply Search Filter
    if (searchQuery !== null && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
    }
    
    // 5. Render Empty State
    if (filteredProducts.length === 0) {
        grid.innerHTML = `<div class="col-span-full h-64 flex flex-col items-center justify-center text-gray-500">
            <i class="fas fa-search-minus text-4xl mb-4 text-gray-300"></i>
            <p class="text-lg">No products found matching your criteria.</p>
        </div>`;
        const paginationContainer = document.getElementById('pagination-container');
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    // 6. Calculate Pagination
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // 7. Render Products for Current Page
    paginatedProducts.forEach(product => {
        const badgeHTML = product.badge ? `<span class="absolute top-3 right-3 bg-red-500 text-white text-xs px-2.5 py-1 rounded shadow-sm z-10">${product.badge}</span>` : '';
        const oldPriceHTML = product.oldPrice ? `<span class="text-sm text-gray-500 line-through ml-2">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : '';
        
        let link = product.link || 'shop.html';

        const cardHTML = `
            <div class="product-card group cursor-pointer relative fade-in-up" onclick="window.location.href='${link}'">
                ${badgeHTML}
                <div class="overflow-hidden h-48 rounded-t-lg">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                </div>
                <div class="p-5 flex flex-col justify-between h-[160px]">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate" title="${product.name}">${product.name}</h3>
                        <div class="flex items-center mb-4">
                            <span class="text-lg font-bold gold-accent">₹${product.price.toLocaleString('en-IN')}</span>
                            ${oldPriceHTML}
                        </div>
                    </div>
                    <div class="flex space-x-2 mt-auto">
                        <button class="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2.5 px-3 rounded-lg flex-1 transition-colors" onclick="event.stopPropagation(); window.location.href='${link}'">Details</button>
                        <button class="btn-gold hover:opacity-90 text-sm font-medium py-2.5 px-3 rounded-lg flex-1 transition-colors flex items-center justify-center space-x-1 shadow-sm" onclick="event.stopPropagation(); addToCart('${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}', '${link}')">
                            <i class="fas fa-shopping-cart text-[11px]"></i><span class="md:hidden lg:inline"> Add</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });

    // 8. Render Pagination Controls
    const paginationContainer = document.getElementById('pagination-container');
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
        if (totalPages > 1) {
            // Prev Button
            const prevButton = document.createElement('button');
            prevButton.className = `px-3 py-2 rounded-lg text-sm font-medium border ${currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' : 'text-gray-700 border-gray-300 hover:bg-gray-50 bg-white'}`;
            prevButton.innerHTML = '<i class="fas fa-chevron-left text-xs"></i>';
            if (currentPage > 1) {
                prevButton.addEventListener('click', () => {
                    currentPage--;
                    renderShopProducts(products, category, minPrice, maxPrice, searchQuery);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                });
            }
            paginationContainer.appendChild(prevButton);

            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `px-3.5 py-2 rounded-lg text-sm font-semibold border ${i === currentPage ? 'bg-[#6B0000] text-white border-[#6B0000]' : 'text-gray-700 border-gray-300 hover:bg-gray-50 bg-white'}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    renderShopProducts(products, category, minPrice, maxPrice, searchQuery);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                });
                paginationContainer.appendChild(pageBtn);
            }

            // Next Button
            const nextButton = document.createElement('button');
            nextButton.className = `px-3 py-2 rounded-lg text-sm font-medium border ${currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50' : 'text-gray-700 border-gray-300 hover:bg-gray-50 bg-white'}`;
            nextButton.innerHTML = '<i class="fas fa-chevron-right text-xs"></i>';
            if (currentPage < totalPages) {
                nextButton.addEventListener('click', () => {
                    currentPage++;
                    renderShopProducts(products, category, minPrice, maxPrice, searchQuery);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                });
            }
            paginationContainer.appendChild(nextButton);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyPriceBtn = document.getElementById('apply-price-filter');
    const clearPriceBtn = document.getElementById('clear-price-filter');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    if (categoryBtns.length > 0 && typeof productsData !== 'undefined') {
        // Init URL Category & Search
        const urlParams = new URLSearchParams(window.location.search);
        const urlCategory = urlParams.get('category');
        const urlSearch = urlParams.get('search');
        let activeCategory = 'All Categories';
        let activeSearch = urlSearch ? urlSearch : null;
        
        // If there's an active top-nav search, prefill the text input visually
        const searchInputs = document.querySelectorAll('input[name="search"]');
        if (activeSearch) {
            searchInputs.forEach(input => input.value = activeSearch);
        }
        
        if (urlCategory) {
            const valid = Array.from(categoryBtns).some(btn => btn.dataset.category === urlCategory);
            if(valid) activeCategory = urlCategory;
        }

        // Highlight Logic
        function updateCategoryHighlight(targetCategory) {
            categoryBtns.forEach(btn => {
                if(btn.dataset.category === targetCategory) {
                    btn.classList.add('text-[#D4AF37]', 'font-bold');
                    btn.classList.remove('text-gray-600', 'font-medium');
                } else {
                    btn.classList.remove('text-[#D4AF37]', 'font-bold');
                    btn.classList.add('text-gray-600', 'font-medium');
                }
            });
        }

        updateCategoryHighlight(activeCategory);
        renderShopProducts(productsData, activeCategory, null, null, activeSearch);

        // Sidebar Category Clicks
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedCat = e.target.dataset.category;
                activeCategory = selectedCat;
                updateCategoryHighlight(selectedCat);
                currentPage = 1;
                
                renderShopProducts(productsData, activeCategory, minPriceInput.value, maxPriceInput.value, activeSearch);
                
                const url = new URL(window.location);
                url.searchParams.set('category', selectedCat);
                window.history.pushState({}, '', url);
            });
        });

        // Price Engine
        if(applyPriceBtn) {
            applyPriceBtn.addEventListener('click', () => {
                currentPage = 1;
                renderShopProducts(productsData, activeCategory, minPriceInput.value, maxPriceInput.value, activeSearch);
                if(minPriceInput.value || maxPriceInput.value) {
                    clearPriceBtn.classList.remove('hidden');
                }
            });
        }
        
        // Clear Price Output
        if(clearPriceBtn) {
            clearPriceBtn.addEventListener('click', () => {
                minPriceInput.value = '';
                maxPriceInput.value = '';
                currentPage = 1;
                renderShopProducts(productsData, activeCategory, null, null, activeSearch);
                clearPriceBtn.classList.add('hidden');
            });
        }

        // Clear Search Button
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                const url = new URL(window.location);
                url.searchParams.delete('search');
                window.history.pushState({}, '', url);
                
                const searchInputs = document.querySelectorAll('input[name="search"]');
                searchInputs.forEach(input => input.value = '');
                
                activeSearch = null;
                currentPage = 1;
                renderShopProducts(productsData, activeCategory, minPriceInput.value, maxPriceInput.value, null);
            });
        }
    }
});
