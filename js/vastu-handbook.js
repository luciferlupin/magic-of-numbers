document.addEventListener('DOMContentLoaded', () => {
    // 1. FAQ Accordion Toggle
    const faqButtons = document.querySelectorAll('.faq-accordion-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            
            // Toggle active state classes
            content.classList.toggle('hidden');
            
            // Rotate icon smoothly
            if (icon) {
                if (content.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // 2. Element Filter Tabs for Vastu Zones
    const zoneTabs = document.querySelectorAll('.zone-filter-tab');
    const zoneCards = document.querySelectorAll('.zone-card');

    zoneTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update tab styling
            zoneTabs.forEach(t => {
                t.classList.remove('bg-[#6B0000]', 'text-white', 'border-[#6B0000]');
                t.classList.add('bg-white', 'text-gray-700', 'border-gray-300', 'hover:bg-gray-50');
            });
            tab.classList.remove('bg-white', 'text-gray-700', 'border-gray-300', 'hover:bg-gray-50');
            tab.classList.add('bg-[#6B0000]', 'text-white', 'border-[#6B0000]');

            const selectedElement = tab.dataset.element;

            // Show/Hide zone cards with animation
            zoneCards.forEach(card => {
                const cardElement = card.dataset.element;
                if (selectedElement === 'All' || cardElement === selectedElement) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize zone card transition styles
    zoneCards.forEach(card => {
        card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    // 3. Sidebar Sticky Nav Active Highlighting on Scroll
    const sections = document.querySelectorAll('main section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');

    if (sections.length > 0 && sidebarLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPos = window.scrollY + 160; // offset for sticky header

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            sidebarLinks.forEach(link => {
                link.classList.remove('text-[#6B0000]', 'font-bold', 'border-l-2', 'border-[#6B0000]');
                link.classList.add('text-gray-600', 'pl-3');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('text-[#6B0000]', 'font-bold', 'border-l-2', 'border-[#6B0000]');
                    link.classList.remove('text-gray-600', 'pl-3');
                }
            });
        });
    }
});
