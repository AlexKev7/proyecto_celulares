document.addEventListener('DOMContentLoaded', function () {
    // Validación del formulario
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Obtener los datos del formulario
        const formData = {
            nombre: document.getElementById('name').value.trim(),
            correo: document.getElementById('email').value.trim(),
            telefono: document.getElementById('phone').value.trim(),
            asunto: document.getElementById('subject').value,
            mensaje: document.getElementById('message').value.trim()
        };

        // Validar campos obligatorios
        if (!formData.nombre || !formData.correo || !formData.mensaje) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        // Validar formato del correo electrónico
        if (!validateEmail(formData.correo)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Enviar los datos al servidor
        try {
            const response = await fetch('https://tu-backend.onrender.com/api/contacto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('¡Mensaje enviado exitosamente!');
                contactForm.reset();
            } else {
                alert('Hubo un error al enviar el mensaje.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo conectar con el servidor.');
        }
    });

    // Validar formato de correo electrónico
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Inicializar el mapa de Google
    function initMap() {
        const storeLocation = { lat: -12.046374, lng: -77.042793 }; // Coordenadas de Lima
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: storeLocation,
        });

        new google.maps.Marker({
            position: storeLocation,
            map: map,
            title: 'Tienda de Celulares',
        });
    }

    // Mostrar mensaje si Google Maps no carga
    setTimeout(() => {
        if (typeof google === 'undefined') {
            document.getElementById('map').innerHTML = `
                <div class="map-error">
                    <p>No se pudo cargar el mapa. Visítanos en:</p>
                    <p><strong>Av. Arequipa 123, Lima, Perú</strong></p>
                </div>
            `;
        }
    }, 3000);

    // Inicializar el mapa
    window.initMap = initMap;
});