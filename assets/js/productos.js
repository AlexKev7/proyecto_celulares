document.addEventListener('DOMContentLoaded', function () {
    const products = [
        { id: 1, name: 'iPhone 15 Pro', price: 4999, brand: 'Apple', image: 'iphone-15-pro-max.jpg' },
        { id: 2, name: 'Samsung Galaxy S23 Ultra', price: 3799, brand: 'Samsung', image: 'samsung-galaxy-s23.jpg' },
        { id: 3, name: 'Xiaomi 13 Lite', price: 1899, brand: 'Xiaomi', image: 'xiaomi-13-lite.jpg' },
        { id: 4, name: 'Motorola Edge 40', price: 2199, brand: 'Motorola', image: 'motorola-edge-40.jpg' }
    ];

    const catalogGrid = document.getElementById('catalog-grid');

    function renderProducts(productsToRender) {
        catalogGrid.innerHTML = '';
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="../assets/images/productos/${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='../assets/images/default-product.jpg'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">S/ ${product.price.toLocaleString()}</p>
                    <button class="btn-add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
                </div>
            `;
            catalogGrid.appendChild(productCard);
        });
    }

    // Filtros
    const filterBrand = document.getElementById('filter-brand');
    const filterPrice = document.getElementById('filter-price');
    const clearFiltersButton = document.getElementById('btn-clear-filters');

    function applyFilters() {
        const brand = filterBrand.value;
        const maxPrice = parseInt(filterPrice.value, 10);

        const filteredProducts = products.filter(product => {
            return (!brand || product.brand === brand) &&
                   (!maxPrice || product.price <= maxPrice);
        });

        renderProducts(filteredProducts);
    }

    filterBrand.addEventListener('change', applyFilters);
    filterPrice.addEventListener('change', applyFilters);
    clearFiltersButton.addEventListener('click', () => {
        filterBrand.value = '';
        filterPrice.value = '';
        renderProducts(products);
    });

    // Inicializar catálogo
    renderProducts(products);
});