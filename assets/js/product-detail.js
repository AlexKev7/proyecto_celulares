document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const quantityInput = document.querySelector('.quantity-input');
    const quantityMinus = document.querySelector('.quantity-btn.minus');
    const quantityPlus = document.querySelector('.quantity-btn.plus');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const relatedProductsContainer = document.getElementById('related-products');

    // Cambiar imagen principal al hacer clic en una miniatura
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });

    // Incrementar o decrementar cantidad
    quantityMinus.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value--;
        }
    });

    quantityPlus.addEventListener('click', () => {
        if (quantityInput.value < 10) {
            quantityInput.value++;
        }
    });

    // Acordeón de especificaciones
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            this.nextElementSibling.style.display = expanded ? 'none' : 'block';
        });
    });

    // Cargar productos relacionados dinámicamente
    const relatedProducts = [
        { id: 2, name: 'Samsung Galaxy S23', price: 3799, image: '../assets/images/productos/samsung-galaxy-s23.jpg' },
        { id: 3, name: 'Xiaomi 13 Lite', price: 1899, image: '../assets/images/productos/xiaomi-13-lite.jpg' }
    ];

    function renderRelatedProducts(products) {
        relatedProductsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" onerror="this.src='../assets/images/default-product.jpg'">
                <h3>${product.name}</h3>
                <p class="price">S/ ${product.price.toLocaleString()}</p>
                <button class="btn-add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
            `;
            relatedProductsContainer.appendChild(productCard);
        });
    }

    renderRelatedProducts(relatedProducts);
});