// Configuración: Reemplaza esta URL con la URL de tu Google Apps Script Web App
const GOOGLE_SHEET_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';

// Elementos del DOM
const toggleFormBtn = document.getElementById('toggleFormBtn');
const leadFormContainer = document.getElementById('leadFormContainer');
const leadForm = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');

// 1. Mostrar/Ocultar formulario al hacer clic en "Ver la clase gratuita"
toggleFormBtn.addEventListener('click', () => {
    leadFormContainer.classList.toggle('hidden');
    // Desplazarse suavemente al formulario
    leadFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// 2. Manejar el envío del formulario
leadForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir recarga de página

    // Cambiar texto del botón para feedback
    const submitBtn = leadForm.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Enviando...';
    submitBtn.disabled = true;

    // Recopilar datos
    const formData = new FormData(leadForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        children: formData.get('children'),
        conditions: formData.get('conditions')
    };

    try {
        // Enviar datos a Google Sheets
        const response = await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Éxito: Redirigir a la clase de YouTube
            formMessage.innerText = '¡Listo! Redirigiéndote a la clase...';
            formMessage.className = 'form-message success';
            
            // Pequeña pausa para que el usuario lea el mensaje
            setTimeout(() => {
                window.location.href = 'https://www.youtube.com/watch?v=in9wDdnQORg';
            }, 1500);
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        formMessage.innerText = 'Hubo un problema. Por favor, inténtalo de nuevo.';
        formMessage.className = 'form-message error';
        submitBtn.innerText = 'Enviar y ver clase';
        submitBtn.disabled = false;
    }
});