// Configuración: Reemplaza esta URL con la URL de tu Google Apps Script Web App
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyi9VkRqh6m3lKYtxHSwGvJM7rgO2_hmfidi-_h-yLIPc9DEveRgm7_S0FrDNbHU4vb3Q/exec';

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


const inputCodePhone = document.getElementById('codephone');

inputCodePhone.addEventListener('keypress', (e) => {
  // Cancela la pulsación si la tecla no es un número del 0 al 9
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
});

inputCodePhone.addEventListener('keyup', (e) => {
    var value = inputCodePhone.value.replace(/[^0-9]/g, '');

  // Cancela la pulsación si la longitud es mayor a 12
  if(value.length >= 1) {
    inputCodePhone.value = value.replace(/^(\d+)$/g, '+$1');
  } else {
    inputCodePhone.value = value;
  }
});

const inputTelefono = document.getElementById('phone');

inputTelefono.addEventListener('keypress', (e) => {
  // Cancela la pulsación si la tecla no es un número del 0 al 9
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
});

inputTelefono.addEventListener('keyup', (e) => {
    var value = inputTelefono.value.replace(/[^0-9]/g, '');

  // Cancela la pulsación si la longitud es mayor a 12
  if(value.length >= 7) {
    inputTelefono.value = value.replace(/^(\d{1,3})(\d+)$/g, '$1-$2');
  } else {
    inputTelefono.value = value;
  }
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


    var phone = formData.get('phone') ? (formData.get('codephone') ? formData.get('codephone')+ ' ' + formData.get('phone') : formData.get('phone')) : '';
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: phone,
        children: formData.get('children'),
        conditions: formData.get('conditions'),
        Date: new Date().toISOString()
    };

    $.ajax({
        url: GOOGLE_SHEET_URL,
        method: 'POST',
        data: data,
        success: function(response) {
            // Éxito: Redirigir a la clase de YouTube
            formMessage.innerText = 'Gracias por la información! Será redirigido a la Clase gratuita: Simplifica y Nutre...';
            formMessage.className = 'form-message success';

            leadForm.reset();
            // submitBtn.innerText = 'Enviar y ver clase';
            // submitBtn.disabled = false;
            
            // Pequeña pausa para que el usuario lea el mensaje
            setTimeout(() => {
                window.location.href = 'https://www.youtube.com/watch?v=in9wDdnQORg';
            }, 1500);
        },
        error: function(error) {
            console.error('Error:', error);
            formMessage.innerText = '❌ Hubo un error al enviar su solicitud. Por favor, inténtelo de nuevo.';
            formMessage.className = 'form-message error';
            submitBtn.innerText = 'Enviar y ver clase';
            submitBtn.disabled = false;
        }
    });

    // try {
    //     // Enviar datos a Google Sheets
    //     const response = await fetch(GOOGLE_SHEET_URL, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     });

    //     if (response.ok) {
    //         // Éxito: Redirigir a la clase de YouTube
    //         formMessage.innerText = '¡Listo! Redirigiéndote a la clase...';
    //         formMessage.className = 'form-message success';
            
    //         // Pequeña pausa para que el usuario lea el mensaje
    //         setTimeout(() => {
    //             window.location.href = 'https://www.youtube.com/watch?v=in9wDdnQORg';
    //         }, 1500);
    //     } else {
    //         throw new Error('Error en el servidor');
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    //     formMessage.innerText = 'Hubo un problema. Por favor, inténtalo de nuevo.';
    //     formMessage.className = 'form-message error';
    //     submitBtn.innerText = 'Enviar y ver clase';
    //     submitBtn.disabled = false;
    // }
});