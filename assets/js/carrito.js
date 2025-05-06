document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const emptyCartButton = document.getElementById('empty-cart');
    const checkoutButton = document.getElementById('checkout');

    // Obtener carrito desde localStorage o inicializar vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Renderizar productos en el carrito
    function renderCart() {
        cartItemsList.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<tr><td colspan="5">El carrito está vacío.</td></tr>';
            subtotalElement.textContent = `S/ 0.00`;
            totalElement.textContent = `S/ 0.00`;
            return;
        }

        cart.forEach(item => {
            const total = item.price * item.quantity;
            subtotal += total;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <span>${item.name}</span>
                </td>
                <td>S/ ${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                </td>
                <td>S/ ${total.toFixed(2)}</td>
                <td>
                    <button class="btn-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            cartItemsList.appendChild(row);
        });

        subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
        totalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
        saveCart();
    }

    // Guardar carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Actualizar cantidad de un producto
    cartItemsList.addEventListener('input', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const id = parseInt(e.target.dataset.id, 10);
            const newQuantity = parseInt(e.target.value, 10);

            const product = cart.find(item => item.id === id);
            if (product) {
                product.quantity = newQuantity > 0 ? newQuantity : 1; // Evitar cantidades negativas
                renderCart();
            }
        }
    });

    // Eliminar un producto del carrito
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.closest('.btn-remove')) {
            const id = parseInt(e.target.closest('.btn-remove').dataset.id, 10);
            cart = cart.filter(item => item.id !== id);
            renderCart();
        }
    });

    // Vaciar carrito
    emptyCartButton.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
            cart = [];
            renderCart();
        }
    });

    // Finalizar compra
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de continuar.');
            return;
        }
        alert('Gracias por tu compra. ¡Procesaremos tu pedido!');
        cart = [];
        renderCart();
    });

    // Inicializar carrito
    renderCart();
});