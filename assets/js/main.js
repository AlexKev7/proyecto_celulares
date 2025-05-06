document.addEventListener('DOMContentLoaded', function () {
    // Actualizar contador del carrito
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }

    // Menú hamburguesa para móviles
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    const headerContainer = document.querySelector('.header .container');
    if (headerContainer) {
        headerContainer.prepend(menuToggle);
    }

    menuToggle.addEventListener('click', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('active');
        }
    });

    // Añadir al carrito
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-add-to-cart')) {
            e.preventDefault();
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = parseFloat(e.target.dataset.price);

            if (!productId || !productName || isNaN(productPrice)) {
                alert('Error al añadir el producto al carrito. Datos incompletos.');
                return;
            }

            addToCart(productId, productName, productPrice);
            updateCartCount();
        }
    });

    // Función para añadir productos al carrito
    function addToCart(productId, productName, productPrice) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Producto "${productName}" añadido al carrito.`);
    }

    // Eliminar producto del carrito
    function removeFromCart(productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.id !== productId);

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateCartCount();
    }

    // Inicializar
    updateCartCount();
});

document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('company-kevin-toggle');
    const menu = document.getElementById('company-kevin-menu');

    toggle.addEventListener('click', function (e) {
        e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        menu.classList.toggle('active'); // Alternar la clase 'active' para mostrar/ocultar el submenú
    });

    // Cerrar el submenú si se hace clic fuera de él
    document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
});